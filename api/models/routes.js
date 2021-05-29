/**
 * Role.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {

    attributes: {
        path: {
            type: 'string',
            description: 'title',
        },

        component: {
            type: 'string',
            description: 'component',
        },

        redirect:{
            type: 'string',
            description: 'redirect',
        },

        alwaysShow: {
            type:'boolean',
            description: 'alwaysShow',
        },

        meta:{
            type:"number",
        },

        parent:{
            type:"number"
        }
    },

};

