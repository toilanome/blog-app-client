import React, { useEffect, useState , useContext} from 'react'
import Post from './post'
import banner from '../Img/Hero.png'
import { FaArrowRight } from "react-icons/fa6";
import { ContextMain } from '../Context/context';
import Loading from '../components/Loading';
const HomePage = () => {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    fetch('https://blog-app-serverr.onrender.com/api/auth/getPost').then(response =>{
      response.json().then(posts =>{
        setPosts(posts)
        
      })
    })
  console.log(posts);

  }, [])
  const {isLoading} = useContext(ContextMain)
  if(isLoading){
   return <Loading />
  } 
  return (
<>

    <div>
        <div className='relative container'>
          <img  src={banner} className='object-cover'/>
          <div className='absolute top-1/4 left-24 '>
              <div className='space-y-5 '>
                <h1 className=' text-[83px] font-normal leading-[95px] tracking-wide text-[#FFFFFF] font-serif'>Welcome to <br/> Gates</h1>
                <p className='text-[#FAFAFA] font-medium text-[18px leading-7]'>Get the latest news on your favourite mangas, anime and <br/> manhwa around the world!</p>
              </div>
              <div className='mt-9 bg-[#FAFAFA] w-[406px] h-12 flex items-center p-2' >
                <div className='bg-gradient-to-r from-[#313131] to-[#000] mr-6'>
                <button className=' text-white font-mono  w-[93px] h-7 text-[12px] font-semibold tracking-wider'>SUBSCRIBE</button>

                </div>
                <input className='border-none outline-none'  placeholder='Enter your email'/>

                <FaArrowRight className='ml-12'/>
              </div>

          </div>
           
        </div>

       
    </div>
   


    <Post posts= {posts} />

    
</>
    
  )
}

export default HomePage