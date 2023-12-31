import  { InsanceToken ,baseAuth} from "./baseAuth"
export const signUp = (user) =>{
    return baseAuth.post('/signup', user)
}
export const signIn = (user) =>{
    return baseAuth.post('/signin', user)
}
export const getUserDetail = () =>{
    return InsanceToken.get('/userDetail')
}
export const createPost = (post) =>{
    return InsanceToken.post('/post', post)
}
export const getPost = (id) =>{
    return baseAuth.get(`/post/${id}`)
}
export const getAllPost = () =>{
    return baseAuth.get(`/getPost`)
}
export const deletePost = (id) =>{
    return InsanceToken.delete(`/post/${id}`)
}

