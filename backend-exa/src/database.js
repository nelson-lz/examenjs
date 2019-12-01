const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI;

mongoose.connect(URI,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
      useFindAndModify:false,
      useCreateIndex:true
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));


