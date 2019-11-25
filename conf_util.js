const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function md5(data) {
    return crypto.createHash('md5').update(data).digest('hex');
}

function en128(data, key) {
    const cipher = crypto.createCipher('aes-128-ecb', key);
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

function de128(data, key) {
    const cipher = crypto.createDecipher('aes-128-ecb', key);
    return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
}

// use AES encrypt conf_me.js to conf.js
if (fs.existsSync(path.join(__dirname, 'conf_me.js'))) {
    try {
        const conf = require('./conf_me');
        const passwd = conf.passwd;
        for (let k in conf) {
            conf[k] = en128(conf[k], passwd);
        }
        fs.writeFileSync(path.join(__dirname, 'conf.js'), `module.exports = ${JSON.stringify(conf, null, 2)}`);
    } catch(e) {
    }
}

module.exports = function(enData, key) {
    return de128(enData, key);
}