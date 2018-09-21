var express = require('express');
var router = express.Router();
var fs=require("fs");
var config=require('../config');

router.get('/getConfig',function (req,res) {
    var file=req.query.file;
    var content=fs.readFileSync(config.vhost_dir+'/'+file).toString();
    // var sname=content.match(/server_name(.*?);/)[1];
    // var sroot=content.match(/root(.*?);/)[1];
    res.send({
        // vhost:sname.trim(),
        // root:sroot.trim()
        content:content
    });
});

router.post('/addVhost',function (req,res) {
    var sname=req.body.vhost;
    var sroot=req.body.dir;

    var content=config.vhost_template.replace("[#server_name#]",sname)
                    .replace('[#root#]',sroot);

    fs.writeFileSync(config.vhost_dir+'/'+sname+'.conf',content);
    require('child_process').exec('service nginx restart');
    res.send({
        code:200,
        msg:'ok'
    });
});

router.get('/delVhost',function (req,res) {
    var file=req.query.name;
    require('child_process').exec('rm -f '+config.vhost_dir+'/'+file+' && service nginx restart');
    res.send({
        code:200,
        msg:'ok'
    });
});

router.post('/editVhost',function (req,res) {
    var file=req.body.name;
    require('child_process').exec('rm -f '+config.vhost_dir+'/'+file);

    // var sname=req.body.vhost;
    // var sroot=req.body.dir;
    var content=req.body.content;

    // var content=config.vhost_template.replace("[#server_name#]",sname)
    //     .replace('[#root#]',sroot);

    fs.writeFileSync(config.vhost_dir+'/'+sname+'.conf',content);
    require('child_process').exec('service nginx restart');
    res.send({
        code:200,
        msg:'ok'
    });
});

module.exports = router;