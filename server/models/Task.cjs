const { Model } = require('objection');
const BaseModel = require('./BaseModel.cjs');
const User = require('./User.cjs');
const Status = require('./Status.cjs');
const Label = require('./Label.cjs');

module.exports = class Task extends BaseModel {
  static get tableName() {
    return 'tasks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'creatorId', 'statusId'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
        description: { type: 'string' },
        creatorId: { type: 'integer' },
        statusId: { type: 'integer' },
        executorId: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'tasks.creatorId',
          to: 'users.id',
        },
      },
      executor: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'tasks.executorId',
          to: 'users.id',
        },
      },
      status: {
        relation: Model.BelongsToOneRelation,
        modelClass: Status,
        join: {
          from: 'tasks.statusId',
          to: 'statuses.id',
        },
      },
      labels: {
        relation: Model.ManyToManyRelation,
        modelClass: Label,
        join: {
          from: 'tasks.id',
          through: {
            from: 'taskslabels.taskId',
            to: 'taskslabels.labelId',
          },
          to: 'labels.id',
        },
      },
    };
  }

  // static modifiers = {
  //   filterCreator(query, id) {
  //     query.where('creatorId', id);
  //   },

  //   filterExecutor(query, id) {
  //     query.where('executorId', id);
  //   },

  //   filterStatus(query, id) {
  //     query.where('statusId', id);
  //   },

  //   filterLabel(query, id) {
  //     query.where('labels.id', id);
  //   },
  // };
};
