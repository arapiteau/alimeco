const userArgs = process.argv.slice(2);

const Product = require('./models/product');

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const ProductSchema = mongoose.model('Product').schema;
const attrIndexToName = Object.keys(ProductSchema.paths);


const fs = require('fs');
let content;

fs.readFile('./files/Table_Ciqual_2016_mod060320_utf8.csv', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    content = data;
    let lines = data.split('\n');
    // On retire le header et la dernière ligne vide
    lines = lines.slice(1, lines.length - 1);
    for (const lineIndex in lines) {
        console.log(lineIndex);
        const strAttributes = lines[lineIndex].split(';');
        const productDetail = {};
        for (const attrIndex in strAttributes) {
            const strAttrValue = strAttributes[attrIndex];
            const attrName = attrIndexToName[attrIndex];
            if (ProductSchema.paths[attrName].instance == 'Number') {
                if (!strAttrValue.match(/[a-z<-]/)) {
                    productDetail[attrName] = Number(strAttrValue);
                }
            }
            else {
                productDetail[attrName] = strAttrValue;
            }
        }
        const product = new Product(productDetail);
        // console.log(productDetail);
        product.save((err) => {
            if (err) {
                return err;
            }
            console.log('Nouveau produit : ' + productDetail.nom);
        });
    }    
});