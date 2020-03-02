// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by validate-form.js.
import { name as packageName } from "meteor/yashwanth947:validate-form";

// Write your tests here!
// Here is an example.
Tinytest.add('validate-form - example', function (test) {
  test.equal(packageName, "validate-form");
});
