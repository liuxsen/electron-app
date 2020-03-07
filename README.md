# electron-app
electron-app

npm install
npm run dev
npm run start


# 笔记

**如何为已经安装的nginx 添加模块**
- **目的** 安装 [nginx-http-flv-module](https://github.com/winshining/nginx-http-flv-module/blob/master/README.CN.md)
- 执行 `nginx/sbin/nginx -V` 查看历史安装命令
- 下载 [nginx-http-flv-module](https://github.com/winshining/nginx-http-flv-module/archive/v1.2.6.tar.gz) 并解压
- cd /usr/local/nginx.1.2.7
- ./configure --prefix=/usr/local/nginx --add-module=../nginx-http-flv-module-1.2.7 --with-http_ssl_module --with-debug