// @ts-check

const objectionUnique = require('objection-unique');
const BaseModel = require('./BaseModel.cjs');
const encrypt = require('../lib/secure.cjs');

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
