/**
 * Role.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    key:{
      type:"string",
    },
    name:{
      type:"string",
    },
    description:{
      type:"string",
    }
    
  },

};

