/* global ValidateForm:true */

ValidateForm = {
  opts: {},

  _validations: [],

  _validators: [],

  addValidator: function (dataTag, callback) {
    this._validators.push({
      'data-tag': dataTag,
      'callback': callback
    });
  },

  findValidator: function (tag) {
    tag = `data-${tag}`;
    var validator = _.findWhere(this._validators, { 'data-tag': tag });
    if(validator) {
      return validator.callback
    } else {
      this.log("[ValidateForm] No validator found for tag", tag);
    }
  },

  config: function (opts) {
    this.opts = opts;
  },

  clearInputStatus: function (el) {
    $(el).removeClass('is-valid is-invalid');
    this._removeInputErrorMessage(el);
  },

  validate: function (formSelector) {
    var inputs = $(formSelector).find(':input');
    var hasError;
    this._clearPreviousValidations();
    for(var i = 0; i < inputs.length; i++) {
      this.validateInput(inputs[i]);
    }
    hasError = this._validations.indexOf(false) >= 0;
    this.log("\n[ValidateForm] valid form:", hasError, this._validations);
    return !hasError;
  },

  validateInput: function (el) {
    this.el = el;
    this.$el = $(el);
    this._runValidations()
  },

  _runValidations: function () {
    var instance = this;
    this.clearInputStatus(instance.$el);
    var dataTags = instance.$el.data() || {};
    this.log("\n[ValidateForm] running validations on", instance.el.name, dataTags);
    _.each(Object.keys(dataTags), function (tag) {
      var validator = instance.findValidator(tag);
      if (typeof validator === "function") {
        validator(instance.$el, instance);
      }
    })
  },

  _showError: function (msg) {
    this.$el.addClass('is-invalid');
    this._addInputErrorMessage(msg);
  },

  _showSuccess: function () {
    this.$el.addClass('is-valid');
  },

  _addInputErrorMessage: function (defMsg) {
    var customMsg = this.$el.attr('data-msg');
    var msg = (customMsg) ? customMsg : defMsg;

    this.$el.siblings('.err-msg').text(msg);
  },

  _removeInputErrorMessage: function (el) {
    $(el).siblings('.err-msg').text('');
  },

  _clearPreviousValidations: function () {
    this._validations = [];
  },

  log: function () {
    if (!ValidateForm.opts.debug) return;

    if (window.console && console.debug) {
      console.debug.apply(console, arguments);
    } else if (window.console) {
      console.log.apply(console, arguments);
    }
  }
}

(function ($, ValidateForm) {
  /**
   * Create $ version of plugin for ease of use
   * @param options
   * @returns {*}
   */
  $.fn.validateForm = function () {
    return ValidateForm.validate(this);
  };
})(jQuery, ValidateForm);
