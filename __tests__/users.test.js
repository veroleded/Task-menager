import _ from 'lodash';
import fastify from 'fastify';

import init from '../server/plugin.js';
import encrypt from '../server/lib/secure.cjs';
import { getTestData, prepareData } from './helpers/index.js';

describe('test users CRUD', () => {
  let app;
  let knex;
  let models;
  const testData = getTestData();

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });
    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;

    // TODO: пока один раз перед тестами
    // тесты не должны зависеть друг от друга
    // перед каждым тестом выполняем миграции
    // и заполняем БД тестовыми данными
    await knex.migrate.latest();
    await prepareData(app);
  });

  beforeEach(async () => {
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('users'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newUser'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const paramsNew = testData.users.new;
    const paramsExisting = testData.users.existing;
    const responseNew = await app.inject({
      method: 'POST',
      url: app.reverse('users'),
      payload: {
        data: paramsNew,
      },
    });

    const responseExisting = await app.inject({
      method: 'POST',
      url: app.reverse('users'),
      payload: {
        data: paramsExisting,
      },
    });

    expect(responseNew.statusCode).toBe(302);
    expect(responseExisting.statusCode).toBe(422);
    const expected = {
      ..._.omit(paramsNew, 'password'),
      passwordDigest: encrypt(paramsNew.password),
    };
    const user = await models.user.query().findOne({ email: paramsNew.email });
    expect(user).toMatchObject(expected);
  });

  it('edit', async () => {
    const editingUser = testData.users.existing;
    const user = await app.objection.models.user.query().findById.fromJson(2);
    // console.log(user);
    const response = await app.inject({
      method: 'get',
      url: app.reverse('userEdit', { id: `${editingUser.id}` }),
      payload: user,
    });
    console.log(response);
    expect(response.statusCode).toBe(302);
  });

  afterEach(async () => {
    // Пока Segmentation fault: 11
    // после каждого теста откатываем миграции
    // await knex.migrate.rollback();
  });

  afterAll(async () => {
    await app.close();
  });
});
