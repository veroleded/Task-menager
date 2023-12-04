const objectionUnique = require('objection-unique');
const BaseModel = require('./BaseModel.cjs');
const Task = require('./Task.cjs');

const unique = objectionUnique({ fields: ['name'] });

module.exports = class Statuses extends unique(BaseModel) {
  static get tableName() {
    return 'statuses';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
      },
    };
  }

  static get relationMappings() {
    return {
      tasks: {
        relation: BaseModel.HasManyRelation,
        modelClass: Task,
        join: {
          from: 'statuses.id',
          to: 'tasks.statusId',
        },
      },
    };
  }

  static async beforeDelete({ asFindQuery }) {
    const deletedStatus = await asFindQuery().select('id');
    const deletedStatusID = deletedStatus[0].id;
    const hasTask = await this.relatedQuery('tasks').for(deletedStatusID);
    console.log(hasTask);
    if (hasTask.length > 0) {
      throw new Error('Cannot delete label with task');
    }
  }
};
