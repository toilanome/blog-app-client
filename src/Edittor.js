import ReactQuill from 'react-quill';

const Edittor = ({value,onChange}) => {
    const modules = {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          ['clean'],
        ],
      };
  return (

    <ReactQuill
                onChange={onChange}
                modules={modules}
                value={value}
                className='break-words'
                style={{ whiteSpace: 'pre-wrap' }}
            />
  )
}

export default Edittor