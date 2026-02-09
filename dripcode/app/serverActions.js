"use server"

import { addItemToCart } from "../actions/cart"
import { getProductsByCategory } from "../actions/stock"

export async function addItemToCartAction(formData){
    const id=formData.get("id")
    const url=formData.get("url")
    const color=formData.get("color")
    await addItemToCart({productId:id,url,color})
}

export async function getCustomProducts(formData){
    const category=formData.get('category')
    const sortBy=formData.get('sort')
    const q=formData.get('q')
    await getProductsByCategory({sortBy,q,category})
}