/**
 * MessageInfo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    content: {
      type: 'string',
      required: true,
      description: 'message info',
      example: 'Mary Sue van der McHenst'
    },


    totalSend: {
      type: 'number',
      columnType: 'int',
      description: '总发送数量',
    },

    state: {
      type: 'string',
      columnName:'state',
      description: '当前状态',
    },

    send: {
      type: 'number',
      columnType: 'int',
      description: '已发送数量',
    },

    isRandomSend: {
      type: 'boolean',
      description: '随机发送',
    },

    userID: {
      type: 'number',
      columnType: 'int',
      description: '已发送数量'
    },
  },

};

