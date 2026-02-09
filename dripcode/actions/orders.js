"use server"
import { revalidatePath } from 'next/cache'
import {prisma} from './client'
import {auth} from "@clerk/nextjs/server"

export async function createOrder(){
    try {
        const {userId}=await auth()
        if(!userId)throw new Error("Unauthorized")
        await prisma.$transaction(async (tx)=>{
    const cart=await tx.cart.findUnique({
        where:{
            userId
        },
        include:{
            cartItems:{
                include:{
                    product:true
                }
            }
            }})
 if (!cart || cart.cartItems.length === 0) {
    throw new Error("Cannot place an order with an empty cart");
}
        const cartItems=[]
        /* create the cartItem with the order */
        for(const item of cart.cartItems){
            if(item.product.stock<item.quantity){throw new Error(`Product ${item.product.name} is out of stock`)}
            await tx.product.update({
                where:{id:item.productId},
                data:{stock:{decrement:item.quantity}}
            })
            cartItems.push({
                description: item.product.description,
                name: item.product.name,
                slug: item.product.slug,
                price: item.product.price,
                category: item.product.category,
                quantity: item.quantity,
                color: item.color,
                url: item.url,
                productId: item.productId
            })
    }
        const totalPrice=cartItems.reduce((acc,cur)=>acc+cur.quantity*cur.price,0)
        await tx.order.create({
            data:{

                userId,
                orderItems:{
                    createMany:{data:cartItems}
                },
                totalPrice
            }
        })

        /*delete old cartItems*/
        await tx.cartItem.deleteMany({
                    where:{
                        cartId:cart.id
                    }
                })
    })
    

        
        return {status:200,message:"order created successfully"}
    } catch (error) {
        console.error(error.message)
        return {status:500,message:"failed to create your order"}
    }
}


export async function getAllOrders(){
    try {
        let orders = await prisma.order.findMany({
            include:{
                user:{
                    select:{
                        username:true
                    }
                }
            }
        })
        return {orders,status:200,message:"orders return successfully"}
    } catch (error) {
        console.error(error.message)
        return {status:500,message:"error getting orders"}
    }
}
export async function getMyOrders(status,query=""){
    try {
        let {userId}=await auth()
        let orders=await prisma.order.findMany({
            where:{
                userId,
                status,
                orderItems:{
                    some:{
                        name:{
                            contains:query,
                            mode:'insensitive'
                        }
                    }
                }
            },
            include:{
                orderItems:true
            }
        })
        return {orders,status:200,message:"orders return successfully"}
    } catch (error) {
        console.error(error.message)
        return {status:500,message:"error getting orders"}
    }
}

export async function getOrdersByStatus(status){
    status=status.toUpperCase()
    const where = status=="ALL" ? {} : {status}
    try {
        let orders = await prisma.order.findMany({
            where ,
            include:{
                user:{
                    select:{
                        username:true
                    }
                },
                orderItems:{
                    take:1,
                    select:{
                        url:true
                    }
                }
            }
        })
        return {orders,status:200,message:"orders return successfully"}
    } catch (error) {
        console.error(error.message)
        return {status:500,message:"error getting orders"}
    }
}

export async function updateOrderStatus({orderId,status}){
    console.log('upadting')
    try {
        let orders=await prisma.order.update({
            where:{
                id:orderId
            },
            data:{
                status
            }
        })
        console.log('updated')
        revalidatePath('/delivery/orders')
        return {orders,status:200,message:"order updated successfully"}
    } catch (error) {
        console.error(error.message)
        return {status:500,message:"error updating order"}
    }
}

export async function getOrderById(orderId){
    try {
        const order=await prisma.order.findUnique({
            where:{
                id:orderId
            },
            include:{
                user:true,
                orderItems:true
            }
        })
        return {status:200,order}
    } catch (error) {
        console.error(error.message)
        return {status:500,message:"failed to get order"}
    }
}
