# PCBOnline 2.0版本
报价页面2.0
# 部署说明
1. yarn 安装依赖
2. yarn build 打包并把生成的dist文件夹压缩成dist.zip文件
3. 上传压缩文件到服务器的/root/deploy 文件夹下
4. 运行 ./web-run.sh 命令

nginx配置示例：
```nginx
server {
        listen       8083;
        server_name  localhost;
        location / {
            proxy_pass http://127.0.0.1:8080;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        client_max_body_size 10m;

        #pcbonline 线上前端
        location /base {
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods "GET,POST,OPTIONS,DELETE,PATCH,PUT,HEAD";
            add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
            rewrite  ^/base/(.*)$ /$1 break; 
            error_page 405 =200 http://$host$request_uri;
            proxy_set_header request_uri $request_uri;
            proxy_pass https://www.pcbonline.com/;
        }

        #pcbonline 线上后端
        location /sys {
            rewrite  ^/sys/(.*)$ /$1 break; 
            add_header Access-Control-Allow-Origin "$http_origin";
            add_header Access-Control-Allow-Credentials "true";
            add_header Access-Control-Allow-Methods "GET,POST,OPTIONS,DELETE,PATCH,PUT,HEAD";
            add_header Access-Control-Allow-Headers "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type";
            proxy_set_header request_uri $request_uri;
            proxy_pass https://sys.pcbonline.com/;
        }
    }.
```

# 手动设置远程仓库地址
```
git remote rm origin
git remote add origin https://gitee.com/pcbonline_1/pcbonline-v3.git
```