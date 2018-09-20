module.exports={
    port: "9098",
    password: "123456",
    token: "qs",
    vhost_dir: "/etc/nginx/vhost",
    vhost_template: "server\n" +
        "    {\n" +
        "        listen 80;\n" +
        "        #listen [::]:80;\n" +
        "        server_name [#server_name#];\n" +
        "        index index.html index.htm index.php default.html default.htm default.php;\n" +
        "        root  [#root#];\n" +
        "\n" +
        "        #error_page   404   /404.html;\n" +
        "        location / {\n" +
        "                autoindex on;\n" +
        "                index index.html index.htm index.php;\n" +
        "                if (!-e $request_filename){\n" +
        "                        rewrite ^(.*)$ /index.php/$1 last;\n" +
        "                }\n" +
        "        }\n" +
        "\n" +
        "        location ~ [^/]\\.php(/|$)\n" +
        "        {\n" +
        "                        fastcgi_split_path_info ^(.+\\.php)(/.+)$;\n" +
        "                        try_files $fastcgi_script_name =404;\n" +
        "                        set $path_info $fastcgi_path_info;\n" +
        "                        fastcgi_param PATH_INFO $path_info;\n" +
        "                        fastcgi_index index.php;\n" +
        "                        include fastcgi.conf;\n" +
        "\n" +
        "            fastcgi_pass unix:/run/php/php7.2-fpm.sock;\n" +
        "        }\n" +
        "\n" +
        "        location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf)$\n" +
        "        {\n" +
        "            expires      30d;\n" +
        "        }\n" +
        "\n" +
        "        location ~ .*\\.(js|css)?$\n" +
        "        {\n" +
        "            expires      12h;\n" +
        "        }\n" +
        "\n" +
        "       # access_log  /home/wwwlogs/book.t4tstudio.com.log  access;\n" +
        "    }"
};