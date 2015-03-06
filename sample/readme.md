# 环境搭建
## 1、在orp机器的webserver/conf/nginx.conf中添加nginx虚拟主机配置：

     server {
         listen  8280 default;
         location /static/mobile {
             # fis
             # root /home/work/orp/app/hotspot/template;
             root /home/work/orp/app/hotspot/views;
             break;
         }   
         location /static/builder {
             # fis
             # root /home/work/orp/app/hotspot/template_builder;
             root /home/work/orp/app/hotspot/modules/Builder/views;
             break;
         }   
         location / { 
             rewrite ^/(.*)$ /hotspot/index.php/$1 break;
             root  /home/work/orp/webroot/;
             set $phpvm zend;
             include  fastcgi_params;
             fastcgi_pass  unix:/home/work/orp/php/var/php-cgi.sock;
         }   
     }  
## 2、svn co https://svn.baidu.com/app/lightapp/trunk/ui/app/hotspot

## 3、cd hotspot && make
按照提示简历mydev文件
使用sh smartssh.sh -s -l $name@$tagart $password -l $name@$local $password
建立本机与目标机器之间的信任关系，避免重复输密码
若make失败，出现tar：template：'no such file or directory'类似，在hotspot下创立目录template

## 4、浏览器输入$host:8280/app/hello查看环境是否搭建成功
如果弹出'操作失败，请再试一次'，进入_myenv.hotspot,执行sh evn.sh -r hotspot

## 5、预览机访问配置
    server {
        listen 8270 default;

        location / { 
            proxy_pass http://hotspot.baidu.com/;
            proxy_set_header Cookie "$http_cookie;orp_preview=1";-

            include fastcgi_params;
        }   
    }   
