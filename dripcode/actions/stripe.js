"use server"
import Stripe from 'stripe'
import {redirect} from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

export async function createCheckoutSession(){
    const {userId}=await auth()
    const cart=await prisma.cart.findUnique({
        where:{userId},
        include:{
            cartItems:{
                include:{product:true}
            }
        }
    })
    if(!cart || cart.cartItems.length ==0){
        throw new Error("Cart is empty")
    }
    const outOfStock = cart.cartItems.find(item => item.quantity > item.product.stock);
if (outOfStock) return { error: `${outOfStock.product.name} is out of stock!` };
    const line_items=cart.cartItems.map((item)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:item.product.name,
                description:item.product.description,
                images:[item.url],
                metadata:{
                    productId:item.productId.toString(),
                    color:item.color
                }   
                     },
                unit_amount:Math.round(item.product.price*100),
        },
        quantity:item.quantity
    }))
    let base_url=""
    if(process.env.NODE_ENV == "production"){
        base_url=process.env.NEXT_PUBLIC_BASE_URL
    }
    else{
        base_url=process.env.NEXT_PUBLIC_BASE_URL_Production
    }
    const session=await stripe.checkout.sessions.create({
        line_items,
        mode:"payment",
        success_url:`${base_url}/success`,
        cancel_url:`${base_url}/`,
        metadata:{
            userId
        }
    })

    redirect(session.url)
}