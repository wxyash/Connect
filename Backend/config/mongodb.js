const CONFIG = require('./config');
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${CONFIG.db_user}:${CONFIG.db_password}@${CONFIG.db_host}:${CONFIG.db_port}/${CONFIG.db_name}`, { useNewUrlParser: true }).then((connection) => {
    console.log('connected successfully');
}).catch((err) => {
    console.log(err.message);
});
module.exports = mongoose