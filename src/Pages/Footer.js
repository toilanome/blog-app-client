import logo_footer from '../Img/logo_footer.png';
import { FaArrowRight } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
        <footer className="container pt-12 pl-16 bg-gradient-to-r from-[#313131] to-[#000]">
            <div className="grid grid-cols-2 gap-[252px] mb-20">
                <div >
                    <div className='mb-6'>
                        <img src={logo_footer}/>
                    </div>
                    <div className='w-[519px] pr-20'>
                    <p className='text-white text-sm font-normal leading-9'>Gates is a blog that focuses on Japanese art and anime. They feature information on Otaku conventions and other anime topics. Hear from famous anime filmmakers and artists as well as plenty of news about the art of cartoon creation in the Japanese culture.</p>
                    </div>
                  
                </div>
                <div className=' bg-[#FAFAFA] w-[406px] h-12 flex items-center p-2' >
                <div className='bg-gradient-to-r from-[#313131] to-[#000] mr-6'>
                <button className=' text-white font-mono  w-[93px] h-7 text-[12px] font-semibold tracking-wider'>SUBSCRIBE</button>

                </div>
                <input className='border-none outline-none'  placeholder='Enter your email'/>

                <FaArrowRight className='ml-12'/>
              </div>
            </div>
            <hr />
            <div className='pt-5 pb-5'>
                <span className='text-white'>@copyright 2021 Gates</span>
            </div>
        </footer>
    </>
  )
}

export default Footer