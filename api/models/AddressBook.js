/**
 * AddressBook.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    countryCode: {
      type: 'string',
      description: 'code info',
      maxLength: 10,
      example: '86'
    },


    phoneNumber: {
      type: 'string',
      description: '号码',
    },


    messageID: {
      type: 'number',
      columnType: 'int',
      description: 'message',
    },

    userID: {
      type: 'number',
      columnType: 'int',
      description: 'user'
    },
  },

};

