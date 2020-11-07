var express = require('express');
var router = express.Router();

/* GET home page. */
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
  res.render('index', { products,admin:false});
});

module.exports = router;
