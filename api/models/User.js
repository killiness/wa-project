/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
      description: 'Full representation of the user\'s name.',
      maxLength: 120,
      unique: true,
      example: 'Mary Sue van der McHenst'
    },

    password: {
      type: 'string',
      required: true,
      description: 'Securely hashed representation of the user\'s login password.',
      protect: true,
      example: '2$28a8eabna301089103-13948134nad'
    },

    roleKey: {
      type: 'string',
    },

    emailAddress: {
      type: 'string',
      description: 'email address',
      example: 'aaa@xx.com'
    },


    totalSend: {
      type: 'number',
      columnType: 'int',
      description: '总发送数量'
    },

    send: {
      type: 'number',
      columnType: 'int',
      description: '已发送数量'
    },

    balance: {
      type: 'number',
      defaultsTo: 0,
    },

    lastLoginIp: {
      type: 'string',
      description: 'ip address',
      example: '127.0.0.1'
    },

    lastLoginTime: {
      type: 'string',
      columnType: 'datetime',
      description: 'last time'
    },
  },
  customToJSON: function () {
    // No password return result copy
    return _.omit(this, ['password'])
  },
};

