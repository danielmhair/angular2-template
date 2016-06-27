'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TodoSchema = new Schema({
  title: String,
  details: String

  //array: [],
  //boolean: Boolean,
  //myClass: MyClass,          //If we had a class defined outside of this Schema Object, you could declare it in here
  //arrOfMyClass: [MyClass]
}, { collection: 'Todos'});

module.exports = mongoose.model('Todos', TodoSchema);
