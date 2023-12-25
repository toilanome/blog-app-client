import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { ContextMain } from '../Context/context';
const ShortRead = ( {scrollTop}) => {
    const { posts } = useContext(ContextMain);

  return (
   <>
   <section className="mt-20 mb-20 ">
            <h4 className="shadow-md text-[#313131] font-semibold text-2xl mb-7">
              Short Reads
            </h4>

            <div>
              <div className="grid grid-cols-3  gap-12" >
                {posts?.allPost?.slice(7, 10).map((item,index) => (
                  <>
                    <div className="grid grid-cols-2 " key={item._id}>
                      <div className="mr-5"  key={item._id}>
                        <Link to={`/post/${item._id}`}>
                          <img
                            src={`http://localhost:4000/${item.cover}`}
                            className="h-24 w-full hover:text-gray-700"
                            onClick={scrollTop}
                          />
                        </Link>
                      </div>
                      <div className=" flex flex-col  items-center">
                        <div className="space-y-1">
                          <Link to={`/post/${item._id}`}>
                            <h5
                              className="font-bold text-lg break-words hover:text-gray-700"
                              onClick={scrollTop}
                            >
                              {item.title}
                            </h5>
                          </Link>

                          <p className="text-[#6E6E6E] break-words text-sm">
                            {item?.summary}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </section>
   </>
  )
}

export default ShortRead