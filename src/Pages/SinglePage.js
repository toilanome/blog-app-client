  import axios from "axios";
  import { useContext, useEffect, useState } from "react";
  import { Link, useParams } from "react-router-dom";
  import { formatISO9075 } from "date-fns";
  import { getPost, getUserDetail } from "../api/auth";
  import banner from "../Img/Rectangle_1.png";
  import { FaRegEdit } from "react-icons/fa";
  import Rectangle_1 from "../Img/Rectangle_1.png";
  import { ContextMain } from "../Context/context";
  import { useMutation, useQuery, useQueryClient } from "react-query";
  import { createComment, deleteComment } from "../api/comment";
  import { toast } from "react-toastify";
  import { CiEdit } from "react-icons/ci";
  import { RiDeleteBin6Line } from "react-icons/ri";
  import { IoIosOptions } from "react-icons/io";
  const SinglePage = () => {
    const [postInfo, setPostInfo] = useState(null);
    const [userDetail, setUserDetail] = useState("");
    const [inputComment, setInputComment] = useState("");
    const [comments, setComments] = useState([]);
    const { posts, updateComentMutation } = useContext(ContextMain);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [dropdownStates, setDropdownStates] = useState([]);


    const { id } = useParams();
    const queryClient = useQueryClient();

    const handleDropdownToggle = (index) => {
      const updatedDropdownStates = [...dropdownStates];
      updatedDropdownStates[index] = !updatedDropdownStates[index];
      setDropdownStates(updatedDropdownStates);
    };

    useEffect(() => {
      const fetchInfo = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          if (token) {
            const res = await getUserDetail();
            const detail = res.data;
            setUserDetail(detail);
          }
        } catch (error) {}
      };

      fetchInfo();
    }, [id]);

    const { data: postDetail, refetch } = useQuery({
      queryKey: ["POSTDETAIL", id],
      queryFn: async () => {
        const { data } = await getPost(id);
        setPostInfo(data);
        return data;
      },
    });

    const deleteComentMutation = useMutation({
      mutationFn: async (id) => await deleteComment(id),
      onSuccess: () => {
        queryClient.invalidateQueries(["POSTDETAIL"]);

        refetch();
        toast.success("Xóa comment thành công");
      },
      onError() {
        toast.error("Xóa comment thất bại");
      },
    });

    const postComment = useMutation({
      mutationFn: async (comment) => await createComment(comment),
      onSuccess() {
        queryClient.invalidateQueries(["POSTDETAIL"]);
      },
    });
    const onChange = (e) => {
      const { name, value } = e.target;
      setInputComment({
        ...inputComment,
        [name]: value,
      });
    };

    const handleSubmitComment = async (e) => {
      e.preventDefault();

      const updateComment = {
        ...inputComment,
        posts: id,
      };

      try {
        const response = await postComment.mutateAsync(updateComment);
        const newComment = response?.data?.newComment;

        // Xóa nội dung comment sau khi thành công
        // setInputComment();
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    };

    const handleUpdateComment = async (commentId) => {
      const updateComment = {
        ...inputComment,
      };

      try {
        const response = await updateComentMutation.mutateAsync({
          id: commentId,
          ...updateComment,
        });
        const newComment = response?.data?.newComment;

        // Xóa nội dung comment sau khi thành công
        setInputComment({ comment: "" });
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    };


    console.log("all comment ", postInfo?.postDoc?.comments);

    const createdAtDate = postInfo?.postDoc?.createdAt
      ? new Date(postInfo.postDoc.createdAt)
      : null;
    const scrollTop = () => {
      window.scrollTo(0, 0);
    };

    const checkUserDeleteComment = postInfo?.postDoc?.comments?.filter(
      (item) => item.users === userDetail?.response?._id
    );

    return (
      <>
        <div className="container mt-10">
          <div className="text-center mb-4">
            <h2 className="font-bold text-5xl mb-4">
              {postInfo?.postDoc?.title}{" "}
            </h2>
            <time className="text-[#6E6E6E] break-words text-base">
              {createdAtDate && formatISO9075(createdAtDate)}
            </time>

            <span className="block text-xs font-semibold mb-4">
              by @{postInfo?.postDoc?.author?.userName}
            </span>

            {postInfo?.postDoc?.author?._id === userDetail?.response?._id && (
              <Link to={`/editPost/${postInfo?.postDoc?._id}`}>
                <div
                  className=" flex items-center justify-center pt-4 bg-gradient-to-r from-[#313131] to-[#000]  border rounded-lg p-4 w-[138px] h-10 text-center "
                  style={{ margin: "0px auto" }}
                >
                  <FaRegEdit className="text-white " />
                  <button className=" text-white font-mono  w-[138px] h-10 tracking-wider text-sm font-bold   text-center ">
                    Edit post
                  </button>
                </div>
              </Link>
            )}
          </div>

          <div>
            <img
              src={`http://localhost:4000/${postInfo?.postDoc?.cover}`}
              className="h-[440px] w-full"
            />
          </div>

          <div className="mt-14 mb-14">
            <p
              dangerouslySetInnerHTML={{ __html: postInfo?.postDoc?.content }}
            ></p>
          </div>
          <hr />

          <section className="mt-20 mb-20 ">
            <h4 className="shadow-md text-[#313131] font-semibold text-2xl mb-7">
              Short Reads
            </h4>

            <div>
              <div className="grid grid-cols-3  gap-12">
                {posts?.allPost?.slice(7, 10).map((item) => (
                  <>
                    <div className="grid grid-cols-2 " key={item._id}>
                      <div className="mr-5">
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

          <section className="mt-20 mb-20 ">
            <h4 className="shadow-md text-[#313131] font-normal text-2xl mb-7 tracking-widest">
              COMMENTS
            </h4>

            <div className="mb-10">
              <div class=" w-full  bg-white">
                <div>
                  <form onSubmit={handleSubmitComment}>
                    <textarea
                      placeholder="Add your comment..."
                      class="p-2 focus:outline-1 focus:outline-blue-500 font-bold border-[0.1px] resize-none h-[120px] border-[#9EA5B1] rounded-md w-full"
                      onChange={onChange}
                      name="comment"
                    ></textarea>
                    <div class="flex justify-end">
                      <button class="text-sm font-semibold absolute bg-[#313131] w-fit text-white py-2 rounded px-3">
                        Post
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <hr className="border " />

            {comments.map((item) => (
              <div className="mt-5 grid grid-cols-[100px_minmax(600px,_1fr)] gap-4"> 
                <div className="mr-3 w-full">
                  <img
                    src="https://tse1.mm.bing.net/th?id=OIP.Y9MaxiVxV-8HnzG7MuNC3wHaE8&pid=Api&rs=1&c=1&qlt=95&w=179&h=119"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <div>
                    <h3 className="font-semibold text-base ">{item.userName}</h3>
                    <p className="text-sm text-[#313131]">{item.comment}</p>
                  </div>
                  {checkUserDeleteComment &&
                  userDetail?.response?._id === item.users ? (
                    <span
                      className="block cursor-pointer"
                      onClick={() => deleteComentMutation.mutateAsync(item._id)}
                    >
                      X
                    </span>
                  ) : null}
                </div>
              </div>
            ))}

            {postInfo?.postDoc?.comments?.map((item, index) => (
              <div className="mt-5 grid grid-cols-[100px_minmax(600px,_1fr)] gap-4">
                <div className="mr-3 w-full">
                  <img
                    src="https://tse1.mm.bing.net/th?id=OIP.Y9MaxiVxV-8HnzG7MuNC3wHaE8&pid=Api&rs=1&c=1&qlt=95&w=179&h=119"
                    className="rounded-xl"
                  />
                </div>
                <div className="flex">
                  <div className="mr-2">
                    <h3 className="font-semibold text-base ">{item.userName}</h3>

                    {isEditing && editingCommentId === item._id ? (
                      // Hiển thị vùng nhập khi đang chỉnh sửa
                      <>
                        <textarea
                          defaultValue={inputComment?.comment} // Đảm bảo giá trị của vùng nhập
                          onChange={onChange}
                          name="comment"
                          className="p-2 focus:outline-1 focus:outline-blue-500 font-bold border-[0.1px] resize-none h-[120px] border-[#9EA5B1] rounded-md w-full"
                        ></textarea>
                        <div className="flex justify-end">
                          <div>
                            <button
                              onClick={() => {
                                setIsEditing(false);
                                setEditingCommentId(null);
                              }} // Hủy việc chỉnh sửa
                              className="text-sm font-semibold  bg-gray-500 w-fit text-white py-2 rounded px-3"
                            >
                              Cancel
                            </button>
                          </div>

                          <button
                            onClick={() => {
                              setIsEditing(false);
                              handleUpdateComment(item._id);
                            }} // Xử lý hành động cập nhật
                            className="text-sm font-semibold  bg-[#313131] w-fit text-white py-2 rounded px-3 ml-2"
                          >
                            Save
                          </button>
                        </div>
                      </>
                    ) : (
                      // Hiển thị vùng comment khi không ở chế độ chỉnh sửa
                      <p className="text-sm text-[#313131]">{item.comment}</p>
                    )}
                  </div>

                  <div className="inline-block relative w-24">
                    {checkUserDeleteComment &&
                    userDetail?.response?._id === item.users ? (
                      <div className="group">
                        <button
                          className="text-gray-500 hover:text-gray-700 focus:outline-none focus:border-none focus:ring-0 mt-[6px]"
                          onClick={() => handleDropdownToggle(index)}
                        >
                          <IoIosOptions />
                        </button>
                        { dropdownStates[index] && (
                          <div className="absolute mt-1 space-y-2 w-10 border border-gray-400 rounded-lg pl-3  w-24">
                            <div className="flex items-center">
                            <span
                              className="block cursor-pointer text-gray-500 hover:text-red-500 flex items-center text-sm"
                              onClick={() =>{
                              if(window.confirm("Bạn có muốn xóa bình luận không ?")) 
                                deleteComentMutation.mutateAsync(item._id)
                              }
                              
                              }
                            >
                            Delete <RiDeleteBin6Line className="ml-4" />
                            </span>
                              </div>
                            
                            {!isEditing && (
                              <div className="flex items-center">
                                    <span
                                className="block cursor-pointer text-gray-500 hover:text-blue-500 flex text-sm items-center"
                                onClick={() => {
                                  setIsEditing(true);
                                  setEditingCommentId(item._id);
                                }}
                              >
                              Update <CiEdit className="ml-2" />
                              </span>
                              </div>
                            
                            )}
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </>
    );
  };

  export default SinglePage;
