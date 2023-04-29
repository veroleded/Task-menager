const objectionUnique = require('objection-unique');
const { Model } = require('objection');
const BaseModel = require('./BaseModel.cjs');
const Task = require('./Task.cjs');

const unique = objectionUnique({ fields: ['name'] });

module.exports = class Status extends unique(BaseModel) {
  static get tableName() {
    return 'statuses';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 20 },
      },
    };
  }

  static get relationMappings() {
    return {
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: 'statuses.id',
          to: 'tasks.statusId',
        },
      },
    };
  }

  static async beforeDelete({ asFindQuery }) {
    const tasks = await Task.query().where('statusId', asFindQuery().id);
    if (tasks.length > 0) {
      throw new Error('Cannot delete status because they have tasks');
    }
  }
};
