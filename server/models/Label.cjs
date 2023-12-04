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
      labelsTasks: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Task,
        join: {
          from: 'labels.id',
          through: {
            from: 'tasks_labels.labelId',
            to: 'tasks_labels.taskId',
          },
          to: 'tasks.id',
        },
      },
    };
  }

  static async beforeDelete() {
    const hasTask = await Task.query()
      .join('tasks_labels', 'task.id', '=', 'taskLabels.taskId')
      .where('tasks_labels.labelId', this.id)
      .first();
    if (hasTask) {
      throw new Error('Cannot delete label with task');
    }
  }
};
