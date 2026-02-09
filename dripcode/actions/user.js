// import { prisma } from "./client";


// export async function signup({username,email,password}){
//     if(!username || !email || !password)return {status:404,message:"all fields are required"}

//     try {
        
//         await prisma.user.create({
//             data:{
//                 username,email,password
//             }
//         })
//         return {status:200,message:"signed up"}
//     } catch (error) {
//         console.error(error.message)
//         return {status:500,message:"failed signing up"}
//     }

// }

// export async function login({email,password}){
//     if(!email || !password)return {status:404,message:"all fields are required"}
//     try { 
//         let user=await prisma.user.findUnique({where:{
//             email,password
//         }})
//         if(!user)return {status:404,message:"wrong credentials"}
//         return {status:200,message:"logged in"}
//     } catch (error) {
//         console.error(error.message)
//         return {status:500,message:"error logging in"}    
//     }
// }
// export async function logout(id){
//     try {
        
//         await prisma.user.delete({
//             where:{
//                 id
//             }
//         })
//         return {status:200,message:"logged out successfully"}
//     } catch (error) {
//         console.error(error.message)
//         return {status:500,message:"failed to logout "}
//     }
// }