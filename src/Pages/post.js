import React, { useContext, useEffect, useState } from "react";
import { formatISO9075 } from "date-fns";
import { Link, useLocation } from "react-router-dom";
import Rectangle_1 from "../Img/Rectangle_1.png";
import { FaArrowRight } from "react-icons/fa6";
import ContextProvider, { ContextMain } from "../Context/context";
import { getCategory, getDetailCategory } from "../api/category";
import { useMutation } from "react-query";

// import Rectangle_2 from '../Img/Rectangle_2.png'
const Post = ({ posts }) => {
  const [category, setCategory] = useState([]);
  const [selectCategoryId, setSelectCategoryId] = useState();
  const location = useLocation();
  const thePost = posts?.allPost;

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getCategory();
        const allCategory = response.data;

        setCategory((prevCategory) => {
          if (!selectCategoryId && allCategory.length > 0) {
            setSelectCategoryId(allCategory[0]._id);
          }
          return allCategory;
        });
      } catch (error) {}
    };

    fetch();
  }, [setCategory, setSelectCategoryId]);
  console.log("check category", category);

  const mutationCategoryDetail = useMutation({
    mutationFn: async (_id) => await getDetailCategory(_id),
    onSuccess() {
      console.log("thành công");
    },
  });

  const handleClick = async (_id) => {
    setSelectCategoryId(_id);
    mutationCategoryDetail.mutateAsync(_id);
  };

  const filterPosts = selectCategoryId
    ? thePost?.filter((post) => post?.category?._id === selectCategoryId)
    : thePost;

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <section className="mt-20 mb-20 container">
        <h4 className="shadow-md text-shadow mb-7 ">New & Trendy</h4>

        <div>
          {thePost?.slice(0, 1).map((item) => (
            <>
              <div className="grid grid-cols-2 " key={item._id}>
                <div>
                  <Link to={`/post/${item._id}`}>
                    <img
                      src={item.cover}
                      onClick={scrollTop}
                    />
                  </Link>
                </div>

                <div className="bg-cover flex flex-col justify-center items-center">
                  <div className="ml-[82px] mr-[82px] w-[471px] h-[185px]">
                    <div>
                      <span className="mr-5">{item.author?.userName}</span>
                      <span>* {formatISO9075(new Date(item.createdAt))} </span>
                    </div>
                    <Link to={`/post/${item._id}`}>
                      <h5
                        className="font-bold text-lg cursor-pointer"
                        onClick={scrollTop}
                      >
                        {item?.title}
                      </h5>
                    </Link>

                    <p className="text-[#6E6E6E]">{item?.summary}</p>

                    <div className="mt-8 flex items-center justify-between ">
                      <span className="text-[#6E6E6E]">12 Min Read</span>
                      <div className="flex items-center ">
                        <Link to={`/post/${item._id}`}>
                          <span
                            className="mr-2 font-extrabold "
                            onClick={scrollTop}
                          >
                            Read Full
                          </span>
                        </Link>
                        <FaArrowRight />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}

          {thePost?.slice(1, 2).map((item) => (
            <div className="grid grid-cols-2 " key={item._id}>
              <div className="bg-cover flex flex-col justify-center items-center">
                <div className="ml-[82px] mr-[82px] w-[471px] h-[185px]">
                  <div>
                    <span className="mr-5">{item?.author?.userName}</span>
                    <span>* {formatISO9075(new Date(item.createdAt))} </span>
                  </div>

                  <Link to={`/post/${item._id}`}>
                    <h5
                      className="font-bold text-lg cursor-pointer"
                      onClick={scrollTop}
                    >
                      {item?.title}
                    </h5>
                  </Link>
                  <p className="text-[#6E6E6E]">{item?.summary}</p>

                  <div className="mt-8 flex items-center justify-between ">
                    <span className="text-[#6E6E6E]">12 Min Read</span>
                    <div className="flex items-center ">
                      <Link to={`/post/${item._id}`}>
                        <span
                          className="mr-2 font-extrabold "
                          onClick={scrollTop}
                        >
                          Read Full
                        </span>
                      </Link>
                      <FaArrowRight />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Link to={`/post/${item._id}`}>
                  <img
                    src={item.cover}
                    onClick={scrollTop}
                    className="w-full"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 mb-20 container">
        <h4 className="shadow-md text-[#313131] font-semibold text-2xl mb-7">
          Now Trending
        </h4>

        <div>
          <div className="grid grid-cols-3 gap-28">
            {thePost?.slice(1, 4).map((item) => (
              <div key={item._id}>
                <div className="mb-5">
                  <Link to={`/post/${item._id}`}>
                    <img 
                      src={item.cover}
                      className="rounded-md h-52 w-full"
                      onClick={scrollTop}
                    />
                  </Link>
                </div>
                <div className="h-64">
                  <div>
                    <span className="mr-5 text-xs">
                      {item?.author?.userName}
                    </span>
                    <span className="text-xs text-[#6E6E6E] ">
                      {formatISO9075(new Date(item.createdAt))}{" "}
                    </span>
                  </div>

                  <Link to={`/post/${item._id}`}>
                    <h5
                      className="font-extrabold text-xl break-words hover:text-gray-700"
                      onClick={scrollTop}
                    >
                      {item.title}
                    </h5>
                  </Link>

                  <div className="h-[120px]">
                    <p className="text-[#6E6E6E] break-words">{item.summary}</p>
                  </div>

                  <div className="mt-8 flex items-center justify-between ">
                    <span className="text-[#6E6E6E]">12 Min Read</span>
                    <div className="flex items-center ">
                      <Link to={`/post/${item._id}`}>
                        <span
                          className="mr-2 font-extrabold hover:text-gray-700 "
                          onClick={scrollTop}
                        >
                          Read Full
                        </span>
                      </Link>
                      <FaArrowRight />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 mb-20 container">
        <h4 className="shadow-md text-[#313131] font-semibold text-2xl mb-7">
          Short Reads
        </h4>

        <div>
          <div className="grid grid-cols-3  gap-12">
            {thePost?.slice(7, 10).map((item) => (
              <>
                <div className="grid grid-cols-2 ">
                  <div className="mr-5">
                    <Link to={`/post/${item._id}`}>
                      <img
                        src={item.cover}
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

                      <p className="text-[#6E6E6E] break-words ">
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

      <section className="mt-20 mb-20 container">
        <h4 className="shadow-md text-[#313131] font-semibold text-2xl mb-7">
          Blog
        </h4>

        <nav className="">
          {category?.map((item) => (
            <a
              key={item._id}
              onClick={() => handleClick(item._id)}
              className={`mr-5 border-b-2 ${
                selectCategoryId === item._id
                  ? "border-gray-800 text-gray-800 font-semibold"
                  : "border-transparent text-[#313131]"
              } hover:text-gray-800 text-base hover:border-gray-800 cursor-pointer`}
            >
              {item?.name}
            </a>
          ))}
        </nav>
        <hr />

        <div className="mt-9">
          <div className="grid grid-cols-[796px_minmax(398px,_1fr)]  gap-20 ">
            <div className="p-6 border border-gray-300 rounded-lg">
              <div className="grid grid-cols-2 gap-7">
                {filterPosts?.slice(3, 4).map((item) => (
                  <div>
                    <div className="mb-6">
                      <Link to={`/post/${item._id}`}>
                        <img
                          src={item.cover}
                          className="rounded-lg"
                          onClick={scrollTop}
                        />
                      </Link>
                    </div>
                    <div>
                      <div className="mb-4">
                        <span className="text-xs text-[#6E6E6E] ">
                          {formatISO9075(new Date(item.createdAt))}
                        </span>
                      </div>
                      <Link to={`/post/${item._id}`}>
                        <h5
                          className="font-extrabold text-xl break-words mb-5"
                          onClick={scrollTop}
                        >
                          {item.title}
                        </h5>
                      </Link>

                      <p className="text-[#6E6E6E] break-words">
                        {item.summary}
                      </p>

                      <div className="mt-12 flex items-center ">
                        <Link
                          className="mr-2 font-extrabold text-sm "
                          to={`/post/${item._id}`}
                          onClick={scrollTop}
                        >
                          Load More
                        </Link>
                        <FaArrowRight />
                      </div>
                    </div>
                  </div>
                ))}

                <div>
                  {filterPosts?.slice(3, 7).map((item) => (
                    <div className="flex gap-3 mb-9" key={item._id}>
                      <div>
                        <Link to={`/post/${item._id}`}>
                          <img
                            src={item.cover}
                            className="w-40 rounded-lg"
                            onClick={scrollTop}
                          />
                        </Link>
                      </div>
                      <div>
                        <Link to={`/post/${item._id}`}>
                          <h5
                            className="font-bold text-lg break-words"
                            onClick={scrollTop}
                          >
                            {item.title}
                          </h5>
                        </Link>

                        <span className="text-[#6E6E6E] break-words text-sm">
                          {formatISO9075(new Date(item.createdAt))}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-gray-300 rounded-lg p-4 pl-10">
              <h5 className="mb-5">Manga reads</h5>

              <div className="pr-15">
                {thePost?.slice(2, 7).map((item) => (
                  <div className="flex gap-3 mb-9">
                    <div>
                      <Link to={`/post/${item._id}`}>
                        <img
                          src={item.cover}
                          className="w-40 rounded-lg"
                          onClick={scrollTop}
                        />
                      </Link>
                    </div>
                    <div>
                      <Link to={`/post/${item._id}`}>
                        <h5
                          className="font-bold text-sm break-words"
                          onClick={scrollTop}
                        >
                          {item.title}
                        </h5>
                      </Link>

                      <span className="text-[#6E6E6E] break-words text-xs">
                        {formatISO9075(new Date(item.createdAt))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Post;
