/* Global ValidateForm template */

Meteor.startup(function () {

  var form = ValidateForm;

  $(body).on('blur', 'form.validate [data-onblur]', function (e) {
    form.validateInput(e.target);
  });

  $body().on('focus', 'form.validate input, form.validate textarea', function (e) {
    form.clearInputStatus(e.target);
  });

});