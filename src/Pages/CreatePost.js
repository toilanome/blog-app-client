import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [categoryName, setCategoryName] = useState('');
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

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleFileChange = (e) => {
    // Use e.target.files to get the selected files
    setFiles(e.target.files);
  };

  const token = localStorage.getItem('accessToken')
  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('categoryName', categoryName);
    data.set('img', files[0]);


    try {
      const response = await fetch('https://blog-app-serverr.onrender.com/api/auth/post',{
        method:'POST',
        body:data,
        headers: {Authorization: `Bearer ${token}`}
    })

    if(response.ok) {
      alert("Tạo thành công")
    }
    if (!response.ok) {
      throw new Error('Failed to create post');
  }
    } catch (error) {
      
    }
   
   

    console.log('file:', files);
  };

  return (
    <>
    <div className='container  min-h-full  mb-96 flex justify-center mt-16' >
    <form onSubmit={onSubmit} encType="multipart/form-data" className='  shadow-[0_0_18px_6px_rgba(0,0,0,0.3)] p-5 rounded-md background-form w-[1000px]'>
    <h4 className=" text-center text-shadow mb-7 text-xl ">Create New Post</h4>
   
        <input
          type="text" // Updated to text type
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full border border-gray-500 rounded-lg mb-2 pl-3 '
          
        />
        <br />
        <input
          type="text" // Updated to text type
          placeholder="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className='w-full border border-gray-500 rounded-lg mb-2 pl-3'

        />
        <br />
        <input
          type="text" // Updated to text type
          placeholder="category"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className='w-full border border-gray-500 rounded-lg mb-2 pl-3'

        />
        <br />
        <input type="file" onChange={handleFileChange} 
          className='w-full border border-gray-500 rounded-lg mb-2 text-sm'
          />
        <br />
        <ReactQuill value={content} onChange={handleContentChange} modules={modules} className='break-words'
         style={{ whiteSpace: 'pre-wrap' }} />
        <button type="submit" className="mt-4 bg-gradient-to-r from-[#313131] to-[#000]bg-slate-600 text-white w-full h-9 font-bold text-sm">
          CREATE POST
        </button>
       
      </form>
    </div>

    
   
    
      
    </>
  );
};

export default CreatePost;
