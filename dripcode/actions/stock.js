"use server"

import { prisma } from "./client";



    
    // model ProductColor {
        //   id       Int       @id @default(autoincrement())
        //   color    Color
        //   products Product[]
        //   url        String 
        //   imageId  Int
        // }
        
        // model Product {
        //   id          Int            @id @default(autoincrement())
        //   name        String
        //   description String
        //   slug        String
        //   price       Float
        //   stock       Int
        //   colors      ProductColor[]
        //   category    String
        //   cartItem    CartItem[]
        // }
export async function addProductToStore({name,description,price,stock,colors,images,category}){
    if(!name || !stock|| !price || !colors || colors.length==0 || !images || colors.length != images.length )
        return {status:404,message:"all fields are needed"}
    
    const variants= colors.map((color,i)=>({color,url:images[i]}))
    try {
        await prisma.product.create({
            data:{name,description,price,stock,category,colors:{
                create:variants
            }}
        })
        return {status:200,message:"product added "}
    } catch (error) {
        console.error(error.message)
        return {status:500,message:"error occured"}
    }  
}

export async function removeProductFromStore({id}){
    if(!id)return {status:500,message:"product id is needed to to this action"}
    
    try {
        await prisma.product.delete({
            where:{id}
        })
        return {status:200,message:"product deleted"}

    } catch (error) {
        console.error(error.message)
        return {status:500,message:"error deleting product"}
    }
}

export async function updateProduct(data,id){

    try {
        await prisma.product.update({
            where:{id:Number(id)},
            data})
        return {status:200,message:"product updated"}

    } catch (error) {
        console.error(error.message)
        return {status:500,message:"error updating product"}
    }
    
}

export async function getProducts(){
    try {
        const products=await prisma.product.findMany({include:{colors:true}})
        return {products,status:200}
    } catch (error) {
        console.error(error.message)
        return {status:500, message:"error getting products"}
    }
}
export async function getProductById(id){
    try {
        let product=await prisma.product.findUnique({
            where:{
                id:Number(id)
            },
            include:{
                colors:true
               
            }
        })
        console.log(product)
        return {status:200,product}
    } catch (error) {
        console.error(error.message)
        return {status:500,message:"error fetching product"}
    }
}
export async function clearProducts(){
    try {
        await prisma.productColor.deleteMany()
        await prisma.product.deleteMany()
    } catch (error) {
        console.error(error.message)
        return {status:500,messsage:"error clearing products"}
    }
}

export async function getProductsByCategory({category = "All",sortBy,query}){

    try {
            const sortMapping={
                "Latest arrivals":{createdAt:'desc'},
                "Price: Low to high":{price:"asc"},
                "Price: High to low":{price:"desc"},
                "Trending:":{price:'asc'},
                "Relevance":{id:'asc'}
            }
            const where={
                ...(category != 'All' && {category}),
                
                   ...(query && {name:{
                        contains:query,
                        mode:"insensitive"
                    }})
                
            }
            const orderBy=sortMapping[sortBy] || {id:'asc'}

            const queryOptions={
                where,
                include:{colors:true},
                orderBy:orderBy
            }
            let products=await prisma.product.findMany(queryOptions)
            return {products,status:200,message:"got products successfully"}
       
    } catch (error) {
        console.error(error.message)
        return {status:500,message:"error fetching products"}
    }
}
