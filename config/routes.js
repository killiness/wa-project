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
  'POST /api/v1/user/login':       {controller:'UserController',action:'login'},
  'POST /api/v1/user/register':    {controller:'UserController',action:'register'},
  'POST /api/v1/user/token':       {controller:'UserController',action:'token'},
  'POST /api/v1/user/info':        {controller:'UserController',action:'info'},
  'POST /api/v1/user/spead':       {controller:'UserController',action:'spreadInfo'},

  'GET  /api/v1/message/list':      {controller:'MessageInfoController',action:'messageList'},
  'POST /api/v1/message/add':       {controller:'MessageInfoController',action:'create'},
  'POST /api/v1/message/update':    {controller:'MessageInfoController',action:'update'},
  'POST /api/v1/message/info':      {controller:'MessageInfoController',action:'info'},

  'POST /api/v1/client/list':       {controller:'ClientInfoController',action:'clientInfo'},
  'POST /api/v1/client/create': {controller:'ClientInfoController',action:'create'},
  'POST /api/v1/client/info':        {controller:'ClientInfoController',action:'info'},
  'POST /api/v1/client/start':        {controller:'ClientInfoController',action:'start'},

  'POST /api/v1/address/add':   {controller:'AddressBookController',action:'create'},
  'POST /api/v1/address/list':  {controller:'AddressBookController',action:'addressList'},
  'POST /api/v1/address/info':       {controller:'AddressBookController',action:'info'},
  'POST /api/v1/address/add_more':   {controller:'AddressBookController',action:'createMore'},
  'POST /api/v1/address/to_list':   {controller:'AddressBookController',action:'toList'},

  'POST /api/v1/send/list': {controller:'SendMessageController',action:'sendListbyUser'},
  'POST /api/v1/send/info':     {controller:'SendMessageController',action:'info'},
  'POST /api/v1/send/to_list':     {controller:'SendMessageController',action:'toList'},
  'POST /api/v1/send/all':     {controller:'SendMessageController',action:'listAll'},
};

