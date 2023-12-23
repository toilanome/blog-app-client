import  { InsanceToken , TokenComment, baseCategory} from "./baseAuth"

export const createComment = (comment) =>{
    return TokenComment.post(`/`, comment)
}

export const deleteComment = (id) =>{
    return TokenComment.delete(`/${id}`)
}

export const updateComment = (comment) =>{
    return TokenComment.put(`/${comment.id}`, comment)
}
