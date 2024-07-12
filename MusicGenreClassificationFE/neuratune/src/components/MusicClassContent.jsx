import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MusicClassContent = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [genre, setGenre] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const navigate = useNavigate()
  

  useEffect(() => {
      // Function to retrieve CSRF token from cookies
      const getCsrfToken = () => {
          const cookies = document.cookie.split(';');
          for (let cookie of cookies) {
              if (cookie.trim().startsWith('csrftoken=')) {
                  return cookie.split('=')[1];
              }
          }
          return null;  // Fallback in case the token is not found
      };

      // Fetch the CSRF token and store it in the state
      const token = getCsrfToken();
      setCsrfToken(token);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      axios.post('http://localhost:8000/api/classify', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': csrfToken, 
        }
      })
      .then(response => {
          console.log(response.data.genre);
          setGenre(response.data.genre);
          // alert(response.data.message);
      })
      .catch(error => {
          console.error('There was an error uploading the file!', error);
      });

      
      // console.log(genre)
    } catch (error) {
      console.log(error)
      if (error.message == "Login needed"){
        navigate("/login")
      }else{
        console.error("Error uploading file: ", error);
      }
      
    }
  };

  return (
    <div className='w-[80%] h-full p-2 pt-0 pl-1 flex-col gap-2 text-white lg:flex bg-violet-950'>
      <div className='bg-black h-[100%] rounded flex flex-col'>
        <h1 className="text-2xl flex font-bold my-5 w-[60%] mx-auto justify-center border">Music Genre Classifier</h1>
        <form onSubmit={handleSubmit}>
          <div className="items-center justify-center w-[60%] mx-auto">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                {fileName ? (
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{fileName}</p>
                ) : (
                  <div>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">MP3, WAV, FLAC (MAX. 50MB)</p>
                  </div>
                )}
              </div>
              <input type="file" id="dropzone-file" accept="audio/*" onChange={handleFileChange} className="hidden" />
            </label>
            <div className='w-[60%] mx-auto justify-center'>
              <button
                type="submit"
                className="bg-blue-500 w-full justify-center text-white my-3 py-2 rounded hover:bg-blue-700"
              >
                Predict Genre
              </button>
            </div>
          </div>
        </form>
        {genre && (
          <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
            <p className="font-bold">Predicted Genre:</p>
            <p>{genre}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MusicClassContent;
