var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  let products=[
    {
      name:"Iphone 11",
      catogery:'mobile',
      description:'this is a good phone',
      image:'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone11-select-2019-family_GEO_EMEA?wid=441&amp;hei=529&amp;fmt=jpeg&amp;qlt=95&amp;op_usm=0.5,0.5&amp;.v=1567022219953'
    },{
      name:"Iphone 12",
      catogery:'mobile',
      description:'this is a good phone',
      image:'https://www.citypng.com/public/uploads/preview/-11598467352bzdw9z3vxp.png'
      
    },{
      name:"PocoPhone F1 ",
      catogery:'mobile',
      description:'this is a good phone',
      image:'https://global.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1534849174.26284528.png'      
    },{
      name:"Pixel 4a ",
      catogery:'mobile',
      description:'this is a good phone',
      image:'https://static.toiimg.com/img/77334819/Master.jpg'      
    }
  ]
  res.render('admin/view-Products',{admin:true, products})
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
