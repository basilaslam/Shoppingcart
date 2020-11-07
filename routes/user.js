const { response } = require('express');
var express = require('express');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers')
const userHelpers=require('../helpers/user-helpers')



/* GET home page. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{

      res.render('user/view-Products',{admin:false, products})

  })
  // res.render('index', { products,admin:false});
});


router.get('/login',(re,res)=>{
  res.render('user/login')
})

router.get('/signup',(req,res)=>{
  res.render('user/signup')
})
router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response);
  })

})

router.post('/login',(req,res)=>{
userHelpers.doLogin(req.body)
})


module.exports = router;
