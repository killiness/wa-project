/**
 * ClientInfo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    phoneInfo: {
      type: 'string',
      description: 'phone info',
      maxLength: 200,
      example: '2-1-4'
    },


    session: {
      type: 'string',
      description: 'client id',
    },
    
   
    sentCount: {
      type: 'number',
      columnType:'int',
      description: 'send data count',
    },

    userID: {
      type: 'number',
      columnType:'int',
      description: 'user'
    },

    clientState: {
      type: 'string',
      description:'client state 1:usefull;2 noused; 3 others;'
    }
  },

};

