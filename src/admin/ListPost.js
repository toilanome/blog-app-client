import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ContextMain } from '../Context/context'
import Loading from '../components/Loading.js'

const ListPost = () => {    

    const {posts,deleteDetailPost , isLoading} = useContext(ContextMain)
    if(isLoading) {
      return <Loading />
    }
    console.log("Post", posts);
  return (
    <>
        <div className="py-1 bg-blueGray-50 w-full " style={{marginTop:"-80px"}}>
<div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24" style={{width:"100%"}}>
  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
    <div className="rounded-t mb-0 px-4 py-3 border-0">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 className="font-semibold text-base text-blueGray-700"></h3>
        </div>
      
      </div>
    </div>

    <div className="block w-full overflow-x-auto">
      <table className="items-center bg-transparent w-full border-collapse ">
        <thead>
          <tr className='text-center'>
            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                          Title
                        </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Summary
                        </th>
           <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Images
                        </th>
            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Category
                        </th>
            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Author
                        </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Content
                        </th>

          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                          Actions
                        </th>  
          </tr>
        </thead>

       <tbody>
          {posts?.allPost?.map((item) =>(
            <tr key={item._id}>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs  p-4 text-left text-blueGray-700 ">
              {item.title}
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs  p-4 ">
            {item.summary}

            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs  p-4 ">
            <img src={item.cover} />

            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs  p-4 "  style={{wordBreak:'break-word'}}>

            {item?.category?.name ? item?.category?.name : ''}

            </td>

            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs  p-4 ">
            {item?.author?.userName}

            </td>
            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs p-4 " style={{wordBreak:'break-word'}} >

              <p dangerouslySetInnerHTML={{ __html: item?.content?.slice(0,300) }}></p>
            

            </td>

            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs  p-4">
              <button className="bg-red-500 text-white active:bg-red-800 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={() => deleteDetailPost.mutate(item._id)}>Delete</button>
             
            </td>
          
          </tr>
          ))}
          
         
        </tbody> 

      </table>
    </div>
  </div>
</div>

                </div>
    </>
  )
}

export default ListPost