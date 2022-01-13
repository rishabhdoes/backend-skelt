const mongoose=require('mongoose');
const { insertMany } = require('./models/product');

const product= require('./models/product');

main().catch(err => console.log( err));

async function main() {
  await mongoose.connect('mongodb+srv://op:op@cluster0.7xqxp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
  console.log("done!!");
}

// const p=new product({

//     name:'ruby',
//     price:1.99,
//     category:'fruit'
// })

// p.save().then(p=>{console.log(p);})

// .catch(e=>{console.log(e)})


const seedproduct=[
    {
        name:'mango',
        price:45,
        category:'fruit'
    },


    {
        name:'litchi',
        price:65,
        category:'vegs'
    },

    {
        name:'potato',
        price:24,
        category:'vegs'
    }

]

product.insertMany(seedproduct)
.then(res=>{console.log(res)})

.catch(err=>{console.log(err)})