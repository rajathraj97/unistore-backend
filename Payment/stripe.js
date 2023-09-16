const { default: axios } = require('axios')

require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET)

const stripeMethod= {}

stripeMethod.checkout = async(req,res) =>{
        console.log(req.body,'body')
        console.log('in ctlr payment')
        const {products} = req.body
        console.log(products,'product')
        const lineitems = products.map((product)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:product.name 
                },
                unit_amount:product.price * 100
            },
            
            quantity:product.quantity
        }))

        console.log(lineitems,'ine')
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineitems,
            mode:'payment',
            success_url:"http://localhost:3000/success",
            cancel_url:"http://localhost:3000/failure"
        })
        


        res.json({url:session.url,products})
        
        
   
}

module.exports = stripeMethod