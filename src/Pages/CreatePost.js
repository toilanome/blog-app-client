import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';

const CreatePost = () => {
  const [files, setFiles] = useState(null); // Updated to use null instead of an empty string

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };
  
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
  
      try {
        const response = await fetch('https://blog-app-serverr.onrender.com/api/auth/post', {
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.ok) {
          alert("Tạo thành công");
        } else {
          throw new Error('Failed to create post');
        }
      } catch (error) {
        console.error(error);
        // Handle error
      }
  
      console.log('file:', files);
    },
  });

  const handleContentChange = (value) => {
    formikValidate.setFieldValue('content', value);
  };

  const handleFileChange = (e) => {
    // Use e.target.files to get the selected files
    setFiles(e.target.files);
  };

  const token = localStorage.getItem('accessToken');

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

          <ReactQuill value={formikValidate.values.content} onChange={handleContentChange} modules={modules} className='break-words' style={{ whiteSpace: 'pre-wrap' }} />
          <button type="submit" className="mt-4 bg-gradient-to-r from-[#313131] to-[#000]bg-slate-600 text-white w-full h-9 font-bold text-sm">
            CREATE POST
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
