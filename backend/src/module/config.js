const dotenv = require('dotenv');

let config = null;


const loadConfig = () => {
    if (config !== null) {
        return config;
    }
    const loadedConfig = dotenv.config().parsed
    config = {
        port: parseInt(loadedConfig.PORT || '8080', 10),
        // mongoUri: loadedConfig.MONGO_URI,
        // jwtSecret: loadedConfig.JWT_SECRET,
    }
    return config;
}

module.exports = loadConfig();