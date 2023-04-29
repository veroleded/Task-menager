// @ts-check

const objectionUnique = require('objection-unique');
const { Model } = require('objection');
const BaseModel = require('./BaseModel.cjs');
const encrypt = require('../lib/secure.cjs');
const Task = require('./Task.cjs');

const unique = objectionUnique({ fields: ['email'] });

module.exports = class User extends unique(BaseModel) {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string', minLength: 1, maxLength: 255 },
        lastName: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', pattern: '^\\S+@\\S+\\.\\S+$' },
        password: { type: 'string', minLength: 3 },
      },
    };
  }

  static get relationMappings() {
    return {
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: 'users.id',
          to: 'tasks.creatorId',
        },
      },
    };
  }

  static async beforeDelete({ asFindQuery }) {
    const users = await Task.query().where('userId', asFindQuery().id);
    if (users.length > 0) {
      throw new Error('Cannot delete user because they have tasks');
    }
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set password(value) {
    this.passwordDigest = encrypt(value);
  }

  verifyPassword(password) {
    return encrypt(password) === this.passwordDigest;
  }
};
