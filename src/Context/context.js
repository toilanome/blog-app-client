import React, {createContext, useContext, useState} from 'react'
import {useMutation,useQueryClient,useQuery} from 'react-query'
import { getCategory } from '../api/category'
import {  createPost, deletePost, getAllPost, getPost } from '../api/auth'
import { toast } from 'react-toastify'
import { createComment, deleteComment, updateComment } from '../api/comment'
import { useNavigate, useParams } from 'react-router-dom'
export const ContextMain = createContext({})

const ContextProvider = ({children}) => {

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { data: categories, isLoading, isError } = useQuery({
        queryKey: ['CATEGORY'],
        queryFn: async () => {
            try {
                const { data } = await getCategory();
                return data
            } catch (error) {
                console.error('Error fetching products:', error);
                throw error;
            }
        },
        retry:0
    });

    const { data: allPosts, refetch } = useQuery({
        queryKey: ["POSTS"],
        queryFn: async () => {
            try {
                const { data } = await getAllPost();
                return data
            } catch (error) {
                console.error('Error fetching products:', error);
                throw error;
            }
        }  ,
        retry:2

    });
  

    const createComentMutation = useMutation({
        mutationFn: async(comment) => await createComment(comment),
        onSuccess() {
            toast.success("Comment thành công")
        }   
    })

    const deleteComentMutation = useMutation({
        mutationFn: async(id) => await deleteComment(id),
        onSuccess (){
            toast.success("Xóa comment thành công")
        },
        onError(){
            toast.error("Xóa comment thất bại")
        }   
    })

    const updateComentMutation = useMutation({
        mutationFn: async(comment) => await updateComment(comment),
        onSuccess (){
            queryClient.invalidateQueries(["POSTDETAIL"])
            toast.success("Update comment thành công")
        },
        onError(){
            toast.error("Update comment thất bại")
        }   
    })

    const deleteDetailPost = useMutation({
        mutationFn: async (id) => await deletePost(id),
        onSuccess (){
            console.log("Deleting post was successful");
            queryClient.invalidateQueries(["POSTS"])
            toast.success("Delete post thành công")
        },
        onError(){
            toast.error("Delete post thất bại")
        }   
    })

    const mutationCreatePost = useMutation({
        mutationFn : async (post) => await  createPost(post),
        onSuccess (){
            queryClient.invalidateQueries(["POSTS"]);
        },
        onError(){
            toast.error("Tạo bài post thất bại")
        }   
    })

    const values = {categories, isError,isLoading,allPosts,createComentMutation, deleteComentMutation ,updateComentMutation,deleteDetailPost, mutationCreatePost}
  return (
        <ContextMain.Provider value={  values }>
            {children}
        </ContextMain.Provider>
  )
}

export default ContextProvider