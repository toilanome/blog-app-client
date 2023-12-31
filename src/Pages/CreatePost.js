import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { ContextMain } from '../Context/context';
import { useQueries, useQueryClient } from 'react-query'

const CreatePost = () => {
  const [files, setFiles] = useState(null); 
  const [loading, setLoading] = useState(false)
  const {mutationCreatePost} = useContext(ContextMain)
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const queryClient = useQueryClient()

  
  
  const formikValidate = useFormik({
    initialValues: {
      title: '',
      summary: '',
      content: '',
      categoryName: ''
    },
  
    validate: (values) => {
      const errors = {};
  
      if (!values.title || values.title.length <= 6) {
        errors.title = "Bắt buộc phải nhập title và phải lớn hơn 6 ký tự ";
      }
      if (!values.summary) {
        errors.summary = "Hãy nhập tóm tắt câu chuyện ";
      }
      if (!values.content) {
        errors.content = "Hãy nhập câu chuyện ";
      }
  
      const validCategories = ["Tình cảm", "Huyền huyễn", "Anime", "Trọng sinh"];
      if (!values.categoryName) {
        errors.categoryName = "Hãy nhập 1 trong các danh mục sau: Tình cảm, Huyền huyễn, Anime, Trọng sinh";
      } else if (!validCategories.includes(values.categoryName)) {
        errors.categoryName = "Chưa nhập đúng danh mục";
      }
  
      return errors;
    },
    onSubmit: async (values) => {
      const data = new FormData();
      data.set('title', values.title);
      data.set('summary', values.summary);  
      data.set('content', values.content);
      data.set('categoryName', values.categoryName);
      data.set('img', files[0]);
      
      console.log("data", data);
      try {
        setLoading(true)
        const response = await mutationCreatePost.mutateAsync(data)
        console.log("Rét ro", response);
      if(response.status === 200 ){
        
        setLoading(false)

        toast.success("Tạo bài viết thành công <3")
        // setTimeout(() =>{
        //   window.location.href="/blog"
        // },2000)

      }

  
        
      } catch (error) {
        toast.error("Có lỗi gì đó đã xảy ra !!!!!!!!!!!")


        // Handle error
      }
  
    },
  });

  const handleContentChange = (value) => {
    formikValidate.setFieldValue('content', value);
  };

  const handleFileChange = (e) => {
    // Use e.target.files to get the selected files
    setFiles(e.target.files);
  };


  return (
    <>
      <div className='container min-h-full mb-96 flex justify-center mt-16'>
        <form onSubmit={formikValidate.handleSubmit} encType="multipart/form-data" className='shadow-[0_0_18px_6px_rgba(0,0,0,0.3)] p-5 rounded-md background-form w-[1000px]'>
          <h4 className="text-center text-shadow mb-7 text-xl">Create New Post</h4>
          
          {formikValidate.touched.title &&
            formikValidate.errors.title && (
              <span className="text-red-500">
                {formikValidate.errors.title}
              </span>
            )}
          <input
            type="text" // Updated to text type
            placeholder="Enter title"
            onChange={formikValidate.handleChange}
            onBlur={formikValidate.handleBlur}
            defaultValue={formikValidate.values.title}
            name='title'
            className='w-full border border-gray-500 rounded-lg mb-2 pl-3'
          />
          <br />

          {formikValidate.touched.summary &&
            formikValidate.errors.summary && (
              <span className="text-red-500">
                {formikValidate.errors.summary}
              </span>
            )}
          <input
            type="text" // Updated to text type
            placeholder="summary"
            onChange={formikValidate.handleChange}
            onBlur={formikValidate.handleBlur}
            defaultValue={formikValidate.values.summary}
            name='summary'
            className='w-full border border-gray-500 rounded-lg mb-2 pl-3'
          />
          <br />

          {formikValidate.touched.categoryName &&
            formikValidate.errors.categoryName && (
              <span className="text-red-500">
                {formikValidate.errors.categoryName}
              </span>
            )}
          <input
            type="text" // Updated to text type
            placeholder="category"
            onChange={formikValidate.handleChange}
            onBlur={formikValidate.handleBlur}
            defaultValue={formikValidate.values.categoryName}
            name='categoryName'
            className='w-full border border-gray-500 rounded-lg mb-2 pl-3'
          />
          <br />

          <input type="file" onChange={handleFileChange} 
            className='w-full border border-gray-500 rounded-lg mb-2 text-sm'
          />
          <br />


          {formikValidate.touched.content &&
            formikValidate.errors.content && (
              <span className="text-red-500">
                {formikValidate.errors.content}
              </span>
            )}
          <ReactQuill value={formikValidate.values.content} onChange={handleContentChange} modules={modules} className='break-words' style={{ whiteSpace: 'pre-wrap' }} />
          <button type="submit" className="mt-4 bg-gradient-to-r from-[#313131] to-[#000]bg-slate-600 text-white w-full h-9 font-bold text-sm">
           {loading === true ? "Loading..." : "CREATE POST" } 
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
