const fs = require('fs')
const path = require('path')
const qiniu = require('qiniu')
const readlineSync = require('readline-sync')

const conf = require('./conf')
const conf_util = require('./conf_util')

const pwd = readlineSync.question('Input the password !\r\n> ', {
    hideEchoBack: true
})

try {
    conf.passwd = conf_util(conf.passwd, pwd)
    conf.bucket = conf_util(conf.bucket, pwd)
    conf.zone = conf_util(conf.zone, pwd)
    conf.AK = conf_util(conf.AK, pwd)
    conf.SK = conf_util(conf.SK, pwd)
} catch(e) {
    console.log('Invalid !')
    return
}

const localFile = readlineSync.question('Input the file path !\r\n> ', {
    hideEchoBack: false
})

if (!fs.existsSync(localFile)) {
    console.log('File not Found! Bye!')
    return
}

console.log(`Upload ${localFile} to CDN ...`)


function upload(localFile) {
    const saveKey = path.basename(localFile)
    const mac = new qiniu.auth.digest.Mac(conf.AK, conf.SK)
    const options = { scope: conf.bucket }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(mac)

    const config = new qiniu.conf.Config()
    config.zone = qiniu.zone[conf.zone]
    config.useHttpsDomain = true
    config.useCdnDomain = true

    const resumeUploader = new qiniu.resume_up.ResumeUploader(config)
    const putExtra = new qiniu.resume_up.PutExtra()
    putExtra.resumeRecordFile = conf.bucket + '.json'
    resumeUploader.putFile(uploadToken, saveKey, localFile, putExtra, function(respErr, respBody, respInfo) {
        if (respErr || respInfo.statusCode != 200) {
            console.log('Upload error!')
            console.log()
            console.log(respErr || respInfo)
            process.exit()
        } else {
            console.log(respBody)
            console.log('Upload success!')
            console.log()
            console.log('You can use this link to download the file:')
            console.log('http://upload.liuzy88.com/' + respBody.key + '?_=' + Date.now())
            process.exit()
        }
    })
}

upload(localFile)