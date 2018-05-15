const mysql = require('mysql_promise')
const PAPA = require('papaparse')
const fs = require('fs')
var query = mysql.config({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBKEY,
    database: process.env.DBINSTANCE
});

exports.getContacts = (req, res) =>{
let isDeleted = null;
query('SELECT * FROM `contacts` WHERE `isDeleted` IS ?', [isDeleted])
    .then(function(rows){
        res.send(JSON.stringify({"contacts": rows}))
    })
    .catch(function(err){
        console.log(err);
    })
}

exports.getSpecificContact = (req, res) =>{
    let key = req.params.id;
    query('SELECT * FROM contacts WHERE `key`=?', [key])
        .then(function(rows){
            res.send(JSON.stringify({"status": 200, "error": null, "response": rows}))
        })
        .catch(function(err){
            console.log(err);
        })
}

exports.pushContact = (req, res) =>{
    let SET = req.body;
    query('INSERT INTO `contacts` SET ?', SET)
        .then(function(rows){
            res.send(JSON.stringify({"contacts": rows}))
        })
        .catch(function(err){
            console.log(err);
        })
}

exports.updateContact = (req, res) =>{
    let sql='UPDATE contacts SET firstname=?,lastname=?,email=?,mobile=?,photo=?,gender=? where `key`=?'
    let values=[req.body.firstname,req.body.lastname,req.body.email,req.body.mobile,req.body.photo,req.body.gender,req.params.id]
    query(sql,values)
        .then(function(rows){
            res.send(JSON.stringify({"contacts": rows}))
        })
        .catch(function(err){
            console.log(err);
        })
}

exports.deleteContact = (req, res) => {
    let key = req.params.id;
    query('UPDATE contacts SET `isDeleted`=true where `key`=?', [key])
        .then(function(rows){
            console.log('Contact removed')
            res.redirect('/');
        })
        .catch(function(err){
            console.log(err);
        })
}

exports.sendCSV = (req,res) =>{
    let isDeleted = null;
    var columns = ['contacts','firstname','lastname','email','mobile','photo','gender'];
    var ws = fs.createWriteStream('contact.csv');
    var values = [];
query('SELECT * FROM `contacts` WHERE `isDeleted` IS ?', [isDeleted])
    .then(function(rows){
        // Parse CSV string
        ws.write(rows.join('| '));
        res.set('Content-Type', 'application/octet-stream');
        res.send(rows);
    })
    .then(()=>{
        ws.close();
    })
    .catch(function(err){
        console.log(err);
    })
}
