/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  if (!(await Role.count() > 0)) {
    await Role.createEach([
      { key: 'admin', name: 'Super Admin', description: 'is a admin' },
      { key: 'editor', name: 'Normal Editor', description: 'is a user' },
      // etc.
    ]);
  }


  // await User.createEach([{
  //   name: 'kall',
  //   password: await sails.helpers.passwords.hashPassword('asd123'),
  //   roleKey: 'admin'
  // }, {
  //   name: 'jws',
  //   password: await sails.helpers.passwords.hashPassword('asd123'),
  //   roleKey: 'editor'
  // }]);

  // await AddressBook.createEach([{
  //   phoneNumber: '13452462429',
  //   userID: '1'
  // },
  //   {
  //     phoneNumber: '13452462428',
  //     userID: '2'
  //   }, {
  //   phoneNumber: '13452462427',
  //   userID: '2'
  // }, {
  //   phoneNumber: '13452462426',
  //   userID: '2'
  // }]);

  // await SendMessage.createEach([{
  //   address: "123452462428",
  //   content: "sssssss",
  //   messaageID: '1'
  // }, {
  //   address: "123452462428",
  //   content: "sssssss",
  //   messaageID: '1'
  // }, {
  //   address: "123452462428",
  //   content: "sssssss",
  //   messaageID: '1'
  // }, {
  //   address: "123452462428",
  //   content: "sssssss",
  //   messaageID: '1'
  // }])


};
