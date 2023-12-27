import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { formatISO9075 } from "date-fns";
import { ContextMain } from "../Context/context";
import { CiSearch } from "react-icons/ci";
import { getCategory, getDetailCategory } from "../api/category";
import { useMutation } from "react-query";
import Loading from "../components/Loading";

const Blog = () => {
  const [category, setCategory] = useState([]);
  const [selectCategoryId, setSelectCategoryId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [fillItemSearch, setFillItemSearch] = useState("");

  const location = useLocation();
  const thePost = posts?.allPost;
  console.log("the post", thePost);

  const isHomePage = location.pathname === "/";

  
  useEffect(() => {
    const feth = async () => {
      try {
        const response = await getCategory();
        const allCategory = response.data;
        setCategory(allCategory);

        await fetch("https://blog-app-serverr.onrender.com/api/auth/getPost").then(
          (response) => {
            response.json().then((posts) => {
              setPosts(posts);
            });
          }
        );
      } catch (error) {}
    };
    feth();
  }, []);
  console.log("check post ", posts);

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

  console.log("category", category);

  const handleSearch = (query) => {
    if (!query) {
      return setFillItemSearch(null);
    }
    const fillterd = thePost?.filter((post) =>
      post?.title?.toLowerCase().includes(query.toLowerCase())
    );

    setFillItemSearch(fillterd);
  };
  console.log("fil", fillItemSearch);

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  const {isLoading} = useContext(ContextMain)
  if(isLoading){
   return <Loading />
  } 

  return (
    <>
      <section className="container mt-10 mb-20">
        {/* <h4 className="shadow-md text-shadow mb-7 ">Blog</h4>    */}

        <div>
          <div className="mx-auto max-w-screen-xl">
            <nav className="text-sm sm:text-base bg-white p-4 md:p-6 lg:p-6 rounded-md shadow-lg flex items-center justify-between">
              <ol className="list-none p-0 inline-flex space-x-2">
                <li className="flex items-center"></li>
                {/* <li className="flex items-center">
              <Link to={'/'} className="text-gray-600 hover:text-blue-500 transition-colors duration-300">
                Home
              </Link>
              <span className="mx-2">/</span>
            </li> */}
                <li className="flex items-center">
                  <span className="text-gray-800">Blog</span>
                </li>
              </ol>
              <div className="flex ">
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-4 py-1 text-gray-800  focus:outline-none rounded-l-xl border-1 border-solid border-gray-300 "
                  style={{ border: "1px solid gray" }}
                />
                <div>
                  <button className=" flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg text-xl">
                    <CiSearch />
                  </button>
                </div>
              </div>
            </nav>
          </div>

          <div class="flex min-h-screen flex-row bg-gray-100 text-gray-800">
            <aside class="sidebar w-48 -translate-x-full transform bg-white p-4 transition-transform duration-150 ease-in md:translate-x-0 md:shadow-md border mt-4">
              <div class="my-4 w-full border-b-4 border-indigo-100 text-center">
                <span class="font-mono text-xl font-bold tracking-widest">
                  {" "}
                  CATEGORY{" "}
                </span>
              </div>
              <div class="my-4"></div>

              <nav className=" ">
                {category?.map((item) => (
                  <div key={item._id} className="mb-3">
                    <a
                      onClick={() => handleClick(item._id)}
                      className={`mr-5 border-b-2 ${
                        location.pathname === "/login"
                          ? "border-gray-800"
                          : "border-transparent"
                      } hover:text-gray-800 text-[#313131] font-semibold text-base  hover:border-gray-800 cursor-pointer `}
                    >
                      {item?.name}
                    </a>
                  </div>
                ))}
              </nav>
              <div>
                <span></span>
              </div>
            </aside>
            <main class="main -ml-48 flex flex-grow flex-col p-4 transition-all duration-150 ease-in md:ml-0">
              <div class=" h-full  bg-white   shadow-md ">
                {fillItemSearch?.length > 0  ? (  fillItemSearch?.map((item) => (
                  <div
                    className="ml-10 mr-10 mt-8 mb-8 grid grid-cols-[800px_minmax(140px,_1fr)] gap-4"
                    key={item._id}
                  >
                    <div>
                      <span className="mr-5 text-[#6E6E6E] text-sm">
                        {item.author.userName}
                      </span>
                      <span className="text-[#6E6E6E] text-sm">
                        {" "}
                        {formatISO9075(new Date(item.createdAt))}
                      </span>
                      <Link to={`/post/${item._id}`}>
                        <h3
                          className="mt-3 mb-3 text-2xl font-medium hover:text-gray-500"
                          onClick={scrollTop}
                        >
                          {item.title}{" "}
                        </h3>
                      </Link>
                      <p className="text-[#6E6E6E] text-base">{item.summary}</p>
                    </div>
                    <div>
                      <Link to={`/post/${item._id}`}>
                        <img
                          src={item.cover}
                          onClick={scrollTop}
                        />
                      </Link>
                    </div>
                  </div>
                )) ) : (
                  filterPosts?.map((item) => (
                    <div
                      className="ml-10 mr-10 mt-8 mb-8 grid grid-cols-[800px_minmax(140px,_1fr)] gap-4"
                      key={item._id}
                    >
                      <div>
                        <span className="mr-5 text-[#6E6E6E] text-sm">
                          {item.author.userName}
                        </span>
                        <span className="text-[#6E6E6E] text-sm">
                          {" "}
                          {formatISO9075(new Date(item.createdAt))}
                        </span>
                        <Link to={`/post/${item._id}`}>
                          <h3
                            className="mt-3 mb-3 text-2xl font-medium hover:text-gray-500"
                            onClick={scrollTop}
                          >
                            {item.title}{" "}
                          </h3>
                        </Link>
                        <p className="text-[#6E6E6E] text-base">{item.summary}</p>
                      </div>
                      <div>
                        <Link to={`/post/${item._id}`}>
                          <img
                            src={item.cover}
                            onClick={scrollTop}
                          />
                        </Link>
                      </div>
                    </div>
                  ))
                )}
                
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
