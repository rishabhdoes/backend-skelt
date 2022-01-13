const express=require('express');

const app=express();

const path=require('path');

const mongoose = require('mongoose');

main().catch(err => console.log( err));

async function main() {
  await mongoose.connect('mongodb+srv://op:op@cluster0.7xqxp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
  console.log("done!!");
}

const product= require('./models/product');

app.set('views',path.join(__dirname,'views'));

app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));//to parse the post type body
const methodoverride = require('method-override')


app.use(methodoverride('_method'))

app.get('/products', async(req,res)=>
{  const { category } =req.query;

if(category){
const products=await product.find({ category });
res.render('products/index.ejs',{products,category});
}
else{
  const products=await product.find({});

 res.render('products/index.ejs',{products,category:"all"});
}

})

app.post('/products',async (req,res)=>{
const newproduct =  new product(req.body);
await newproduct.save();
console.log(newproduct);
res.redirect(`/products/${newproduct._id}`);

})

app.get('/products/new', (req,res)=>{
  res.render('products/new.ejs');
})

app.get('/products/:id',async (req,res)=>{
  
  const { id }=req.params;

 const foundproduct= await product.findById(id)

 console.log(foundproduct);

 res.render('products/show',{product:foundproduct})

})
app.get('/products/:id/edit',async (req,res)=>{
  
  const { id }=req.params;

 const foundproduct= await product.findById(id);
//res.send("ooop");
 res.render('products/edit ',{product:foundproduct});

})

app.put('/products/:id',async (req,res)=>{
  const {id}=req.params;
  const uid=id.trim();
 const p=  await product.findByIdAndUpdate(uid, req.body)
 


 res.redirect(`/products/${uid}`);
 
})

app.delete('/products/:id',async(req,res)=>{
  
  const{id}=req.params;
  const p=await product.findByIdAndDelete(id);

  res.redirect('/products');
})



app.listen(3000,()=>{
    console.log("listening from port 3000");})
