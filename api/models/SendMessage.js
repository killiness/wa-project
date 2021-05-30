/**
 * SendMessage.js
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
      maxLength: 1000,
      example: 'Mary Sue van der McHenst'
    },

    address: {
      type: 'string',
      description: 'address'
    },
    
    messageID:{
      type: "number",
    },

    client: {
      type: 'string',
      description: '总发client',
    },

    state: {
      type: "number",
    }

  },

};

