import React, { useState, useEffect, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Edittor from '../Edittor';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { ContextMain } from '../Context/context';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [postInfo, setPostInfo] = useState(null);
  const { isLoading } = useContext(ContextMain);
  const [loading, setLoading] = useState(false); 
  const { id } = useParams();
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get(`https://blog-app-serverr.onrender.com/api/auth/post/${id}`);
        const dataPost = response.data;
        setPostInfo(dataPost);

        setContent(dataPost?.postDoc?.content || '');
        setTitle(dataPost?.postDoc?.title || '');
        setSummary(dataPost?.postDoc?.summary || '');
        setCategoryName(dataPost?.postDoc?.category?.name || '');
      } catch (error) {
        console.error(error);
      }
    };

    fetchInfo();
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const token = localStorage.getItem('accessToken');
  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('categoryName', categoryName);

    if (files && files.length > 0) {
      data.set('img', files[0]);
    }

    try {
      setLoading(true); // Set loading to true before making the request

      const response = await fetch(`https://blog-app-serverr.onrender.com/api/auth/post/${id}`, {
        method: 'PUT',
        body: data,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setLoading(false)

        toast.success('Update bài viết thành công');
        setTimeout(() => {
          window.location.href="/blog"

        },2000)
      } else {
        toast.error('Update bài viết thất bại');
      }
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi khi cập nhật bài viết');
    } finally {
      setLoading(false); // Reset loading to false when the update operation is complete
    }
  };

  return (
    <>
      <div className='container min-h-full mb-96 flex justify-center mt-16'>
        <form
          onSubmit={onSubmit}
          encType='multipart/form-data'
          className='shadow-[0_0_18px_6px_rgba(0,0,0,0.3)] p-5 rounded-md background-form w-[1000px]'
        >
          <h4 className='text-center text-shadow mb-7 text-xl'>Update Post</h4>

          <input
            type='text'
            placeholder='Enter title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full border border-gray-500 rounded-lg mb-2 pl-3 '
          />
          <br />
          <input
            type='text'
            placeholder='summary'
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className='w-full border border-gray-500 rounded-lg mb-2 pl-3'
          />
          <br />
          <input
            type='text'
            placeholder='Category'
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className='w-full border border-gray-500 rounded-lg mb-2 pl-3'
          />
          <br />
          <input type='file' onChange={handleFileChange} className='w-full border border-gray-500 rounded-lg mb-2 text-sm' />
          <br />
          <Edittor onChange={setContent} value={content} />

          <button type='submit' className='mt-4 bg-gradient-to-r from-[#313131] to-[#000]bg-slate-600 text-white w-full h-9 font-bold text-sm'>
            {loading === true ? "Loading..." : 'UPDATE POST'}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditPost;
