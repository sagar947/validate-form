Package.describe({
  name: 'yashwanth947:validate-form',
  version: '0.0.1',
  summary: 'A micro library for Meteor form validation.',
  git: 'https://github.com/sagar947/validate-form.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');

  api.use([
    'underscore'
  ], 'client');

  api.add_files([
    'client.js',
    'validate-form.js'
  ], 'client');

});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('yashwanth947:validate-form');
  api.mainModule('validate-form-tests.js');
});
