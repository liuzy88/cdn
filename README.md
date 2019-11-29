# CDN文件上传客户端

## 用途

- 命令行上传文件到七牛云存储

## 使用此工具

```bash
# 下载Linux x64版
wget http://upload.liuzy88.com/cli-linux
# 下载Mac x64版
wget http://upload.liuzy88.com/cli-macos
# 下载Windwos x64版
wget http://upload.liuzy88.com/cli-win.exe

# 执行
> ./cli-linux
Please input password!
> ***********
Please input file path!
> README.md
Upload README.md to CDN...
{ hash: 'FjUaiYkTZiDriZBRPfb-dIx1yKSl', key: 'README.md' }
Upload success!

You can use this link to download the file:
http://upload.liuzy88.com/README.md?_=1565936014397

```

## 做自己工具

- 登陆自己的七牛云存储，查看参数
- 新建`conf_me.js`文件，参照`conf.js`填入明文件
- 执行`node conf_util.js`加密参数到`conf.js`
- 执行`pkg index.js`打包为可执行文件
