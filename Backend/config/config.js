require('dotenv').config();
let CONFIG = {};
CONFIG.app = process.env.APP || 'dev';
CONFIG.port = process.env.PORT || '3000';
CONFIG.app_id = process.env.APP_ID;
CONFIG.app_secret = process.env.APP_SECRET;
CONFIG.db_driver = process.env.DB_DRIVER || 'mongo';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '27017';
CONFIG.db_name = process.env.DB_NAME || 'connect'
CONFIG.db_user = process.env.DB_USER || 'root';
CONFIG.db_password = process.env.DB_PASSWORD || '';
module.exports = CONFIG;