var express = require('express'); //api node sugar coat
var app = express();
var bodyParser = require('body-parser'); // get / post data rest api res.body
var cors = require('cors'); // cross oringe reuest
app.use(cors());
app.use(bodyParser.json());
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://jitender:jitender@localhost:27017/dojo';

mongo.connect(url, (err)=>{
    console.log('Mongoddb connected!!!!!')
})

app.get('/data', (req, res)=>{
    mongo.connect(url, (err, db)=>{
        var collection = db.collection('ninja');
        collection.find({}).toArray((x, result)=>{
            res.send(result);
        })
    })
})

app.post('/data', (req, res)=>{
    mongo.connect(url, (err, db)=>{
        var collection = db.collection('ninja');
        var sendBOdy = {
            nama: req.body.nama,
            usia: req.body.usia
        }
        collection.insert(sendBOdy, (x, result)=>{
            res.send(result);
        })
    })
})

app.listen(3210, ()=>{
    console.log('Server connected to @port 3210!');
})