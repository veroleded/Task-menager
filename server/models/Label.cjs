const { Model } = require('objection');
const objectionUnique = require('objection-unique');
const BaseModel = require('./BaseModel.cjs');
const Task = require('./Task.cjs');

const unique = objectionUnique({ fields: ['name'] });

module.exports = class Label extends unique(BaseModel) {
  static get tableName() {
    return 'labels';
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
        relation: Model.ManyToManyRelation,
        modelClass: Task,
        join: {
          from: 'labels.id',
          through: {
            from: 'taskslabels.labelId',
            to: 'taskslabels.taskId',
          },
          to: 'tasks.id',
        },
      },
    };
  }
};
