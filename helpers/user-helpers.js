var db=require('../config/connection')
const bcrypt = require('bcrypt')
const collection = require('../config/collections')
const { response } = require('express')
const collections = require('../config/collections')
var objectId = require('mongodb').ObjectID


    module.exports={

    doSignup: (userData)=>{
        return new Promise(async (resolve,reject)=>{
            userData.Password= await bcrypt.hash(userData.Password,10)
        db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
            resolve(data.ops[0])
        })
            
    
    
            })
        
    },
    doLogin:(userData)=>{
        return new Promise(async (resolve,reject)=>{
            let loginStatus = false
            let response={}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
            if(user){
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status){
                        console.log('login success');
                        response.user=user
                        response.status = true
                        resolve(response)
                    }else{
                        
                        console.log('Failed');
                        resolve({status:false})
                    }
                })

            }else{
                resolve({status:false})
                console.log('failed');

            }
        })
    },
    addToCart:(proId,userId)=>{
        return new Promise(async (resolve,reject)=>{
let userCart = await db.get().collection(collection.CART_COLLECTION).findOne({user:objectId(userId)})
if(userCart){
    db.get().collection(collection.CART_COLLECTION)
    .updateOne({user:objectId(userId)},
    {
            $push:{products:objectId(proId)}

    }).then((response)=>{
        resolve()
    }
    )

}else{
    let cartobj = {user:objectId(userId),
        products : [objectId(proId)]
}
db.get().collection(collection.CART_COLLECTION).insertOne(cartobj).then((response)=>{
resolve()
})
}
        })
    },getCartProducts:(userId)=>{
return new Promise(async (resolve,reject)=>{
    let cartItems = await db.get().collection(collection.CART_COLLECTION).aggregate([
    {
        $match:{user:objectId(userId)}
    },
    {
        $lookup:{
            from:collection.PRODUCT_COLLECTION,
            let:{prodList:'$products'},
            pipeline:[
                {
                    $match:{
                        $expr:{
                            $in:['$_id','$$prodList']
                        }
                    }
                }
            ],
            as:'cartItems'
        }
    }
    ]).toArray()
resolve(cartItems[0].cartItems)
})
    },
    getCartCount:(userId)=>{
        return new Promise(async (resolve,reject)=>{
            let count = 0
            let cart = await db.get().collection(collection.CART_COLLECTION).findOne({user:objectId(userId)})
            if (cart){
                count = cart.products.length
            }
            resolve(count)
        })
    }

}