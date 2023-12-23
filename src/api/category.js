import  { InsanceToken , baseCategory} from "./baseAuth"

export const getCategory = () =>{
    return baseCategory.get('/' )
}
export const getDetailCategory = (id) =>{
    return baseCategory.get(`/${id}` )
}

// export const getDetailCategory = (id) =>{
//     return baseCategory.get(`/${id}` )
// }