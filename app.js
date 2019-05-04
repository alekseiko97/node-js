const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const router = express.Router();
const uri = "mongodb+srv://alekseiko97:Dofkrudwod7@cluster0-zy0vf.gcp.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

app.use(express.static(__dirname + '/semantic'));

var itemsArray = [];

client.connect(err => {
    if (err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
    }
    const collection = client.db("test").collection("items").find();
    collection.forEach(function(doc, err) {

        if ( err ) console.log(err);
        console.log(doc);
        itemsArray.push(doc);
    });
    //perform actions on the collection object
    client.close();
});

router.get('/', function( req, res ) {
    console.log(itemsArray.length);
    res.render('index.ejs', {
        items: itemsArray
    });
});

app.use('/', router);

app.listen(PORT, function() {
    console.log("Application is running on port " + PORT);
});

