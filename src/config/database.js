/* eslint-disable no-console */

import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/caranalytics', { useNewUrlParser: true}, (err) => {
  if(err) {
    console.log(err)
  } else {
    console.log("mongodb is running")
  }
});

mongoose.set('useCreateIndex', true);
