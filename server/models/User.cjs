// @ts-check

const objectionUnique = require('objection-unique');
const encrypt = require('../lib/secure.cjs');
const BaseModel = require('./BaseModel.cjs');
const Task = require('./Task.cjs');

const unique = objectionUnique({ fields: ['email'] });

module.exports = class User extends unique(BaseModel) {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password', 'firstName', 'lastName'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', pattern: '([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9_-]+)' },
        password: { type: 'string', minLength: 3 },
        firstName: { type: 'string', minLength: 1 },
        lastName: { type: 'string', minLength: 1 },
      },
    };
  }

  static get relationMappings() {
    return {
      createdTasks: {
        relation: BaseModel.HasManyRelation,
        modelClass: Task,
        join: {
          from: 'users.id',
          to: 'tasks.creatorId',
        },
      },
      executedTasks: {
        relation: BaseModel.HasManyRelation,
        modelClass: Task,
        join: {
          from: 'users.id',
          to: 'tasks.executorId',
        },
      },
    };
  }

  static async beforeDelete({ asFindQuery }) {
    const deletedUser = await asFindQuery().select('id');
    const deletedUserID = deletedUser[0].id;
    const hasCreateTask = await User.relatedQuery('createdTasks').for(deletedUserID);
    const hasExecuteTask = await User.relatedQuery('executedTasks').for(deletedUserID);
    if (hasCreateTask.length > 0 || hasExecuteTask.length > 0) {
      throw new Error('Cannot delete user with task');
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
