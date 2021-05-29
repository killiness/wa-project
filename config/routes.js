/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/
  'POST /api/v1/login':       {controller:'UserController',action:'login'},
  'POST /api/v1/register':    {controller:'UserController',action:'register'},
  'POST /api/v1/token':       {controller:'UserController',action:'token'},

  'POST /api/v1/messages':      {controller:'MessageInfoController',action:'messageList'},
  'POST /api/v1/add_message':   {controller:'MessageInfoController',action:'create'},
  'POST /api/v1/update_message':{controller:'MessageInfoController',action:'update'},

  'POST /api/v1/clients':       {controller:'ClientInfoController',action:'clientInfo'},
  'POST /api/v1/client_create': {controller:'ClientInfoController',action:'create'},
};
