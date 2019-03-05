const CONFIG = require('./config');
const mongoose = require('mongoose');
mongoose.connect('mongodb://'+CONFIG.db_host+'/'+CONFIG.db_name, { useNewUrlParser: true }).then((connection) => {
    console.log('connected successfully');
}).catch((err) => {
    console.log('error connecting');
});
module.exports = mongoose