var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    console.log(products);
      res.render('admin/view-Products',{admin:true, products})

  })
});

router.get('/add-product',(req,res)=>{
  res.render('admin/add-product')
})


router.post('/add-product',(req,res)=>{


  productHelpers.addProduct(req.body,(id)=>{
    let image = req.files.Image
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
          

    })

    res.render("admin/add-product")

  })
})

module.exports = router;
