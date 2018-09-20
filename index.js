var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs=require("fs");

var ejs = require('ejs');
ejs.delimiter="?";

var config=require("./config");

var app = express();
app.use(session({
    secret: config.token,
    resave: false,
    name: 'session',
    cookie: {
        maxAge: 3600 * 1000 // 有效期，单位是毫秒
    },
    saveUninitialized: false,
    // store: new FileStore()
}));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine','ejs');
app.use(express.static('asset'));

app.get('/',function(req,res){
    res.render('index');
});

app.get('/login',function (req,res) {
    if (req.session.login){
        res.redirect('/admin');
    }else{
        res.render('login');
    }
});

app.post('/login',function (req, res) {
    if (req.body.password != config.password) {
        res.send('密码错误<a href="/login">返回重试</a>');
    }else{
        req.session.login=true;
        res.redirect('admin');
    }
});

app.get('/logout',function (req,res) {
    req.session.login=0;
    res.redirect('/');
});

app.get('/admin',function (req,res) {
    if (!req.session.login){
        res.redirect('/login');
    }else{
        var vhosts=fs.readdirSync(config.vhost_dir);

        res.render('admin',{
            vhosts:vhosts
        });
    }
});

app.use('/api',require('./src/api'));

var server = app.listen(config.port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('nginx_vhost listening at http://'+host+':'+port);
});