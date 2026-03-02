"use server"
import { revalidatePath } from "next/cache";
import { prisma } from "./client";
import { auth } from "@clerk/nextjs/server";

// export async function createCart(userId){
//     try {
//         await prisma.cart.create({
//             data:{
//                 userId
//             }
//         })
//         return {status:200,message:"cart created"}
//     } catch (error) {
//         console.error(error.message)
//         return {status:500,message:"error creating cart"}
//     }
// }

export async function addItemToCart({ productId, color, quantity = 1, url }) {
  try {
    const { userId } = await auth();
    const cart = await prisma.cart.findUnique({ where: { userId } });
    
    if (!cart) return { status: 500, message: "User doesn't have cart" };

    // ONE call instead of two!
    await prisma.cartItem.upsert({
      where: {
        cartId_productId_color: { // This is your unique constraint from schema
          cartId: cart.id,
          productId: Number(productId),
          color
        }
      },
      update: {
        quantity: { increment: quantity } // Database-level addition
      },
      create: {
        cartId: cart.id,
        productId: Number(productId),
        color,
        quantity,
        url
      }
    });

    revalidatePath('/', 'layout');
    return { status: 200, message: "Items handled successfully" };
  } catch (error) {
    console.error(error.message);
    return { status: 500, message: "Error adding item" };
  }
}

export async function updateQuantity({cartItemId,quantity}){

    try {
       if(quantity==0){
        await prisma.cartItem.delete({
            where:{id:cartItemId}
        })
       }
       else{
           await prisma.cartItem.update({
               where:{id:cartItemId},
               data:{quantity}
            })
        }
        revalidatePath('/', 'layout');
    
    
    return {status:200,message:"quantity modifed"}
} catch (error) {
        console.error(error.message)
        return {status:500,message:"error adding item to cart"}
    }
}

export async function deleteFromCart(id){
    try {
        
        await prisma.cartItem.delete({
            where:{id}
        })
        return {status:200,message:"product deleted"}
    } catch (error) {
        console.error(error.message)
        return {status:500,message:"error deleting product"}
    }
}
export async function getCartItems(userId){
    try {
        let cartProducts=await prisma.cart.findUnique({
            where:{
                userId
            },
            select:{
                cartItems:{
                    include:{
                        product:true
                    }
                }
        }})
        return {cartItems:cartProducts,status:200}
    } catch (error) {
        console.error(error.message)
        return {status:500,message:"error fetching cart"}
    }
}

