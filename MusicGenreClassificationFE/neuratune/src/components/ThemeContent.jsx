// src/components/TopThemes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BillboardTopSongs = () => {
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState(null);
    const [themes, setThemes] = useState([]);
    const [flag, setFlag] = useState(false);
  
    useEffect(() => {
      const fetchTopSongs = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/billboard-top-songs/');
          setSongs(response.data);
        } catch (error) {
          console.error('Error fetching songs:', error);
          setError('Failed to fetch songs');
        }
      };
      
      const fetchThemes = async () => {
        try {
          axios.get('http://localhost:8000/api/latest-analysis/').then((response)=>{
            setThemes(JSON.parse(response.data));
            setFlag(true);
            console.log(typeof(response.data))
            // // console.log(response.data[0].)
            // console.log(themes)
          })
          
        } catch (error) {
          console.error("Error fetching the latest analysis:", error);
        }
      };
      
      fetchTopSongs();
      fetchThemes();
    }, []);


    return (
      <div className='w-[80%] h-full p-2 pt-0 pl-1 flex-col gap-2 text-white lg:flex bg-violet-950'>
          <div className='bg-black h-[100%] rounded flex flex-col lg:flex-row justify-around relative'>
              <div className='w-[50%] p-4 border'>
                  <h1 className="text-3xl font-bold">Billboard Top 5 Songs</h1>
                  {error ? (
                      <p className="text-red-500">{error}</p>
                  ) : (
                      <ul className="space-y-4">
                          {songs.map((song, index) => (
                              <li key={index} className="p-4 shadow rounded-md">
                                  <h2 className="text-xl font-semibold text-white">{song.title}</h2>
                                  <p className="text-gray-700">Artist: {song.artist}</p>
                              </li>
                          ))}
                      </ul>
                  )}
              </div>
              <div className='w-[50%] p-4 border'>
                  <h1 className='p-2 text-3xl font-bold'>Top 5 Themes in Top 100 Billboard Songs</h1>
                  <ul className="space-y-4">
                      {(!flag) ?
                          (<div className='flex items-center'>
                              <span>
                                  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                  </svg>
                              </span>
                              <h1 className="ml-2 text-lg">waiting...</h1>
                          </div>) : (themes.map((itm, index) => (
                              <li key={index} className="p-4 shadow rounded-md">
                                  <h2 className="text-xl font-semibold text-white">{itm["theme"]}</h2>
                                  <p className="text-gray-700">{itm["score"]}</p>
                              </li>
                          )))}
                    </ul>
                </div>
            </div>
        </div>
      );
    };
    
    export default BillboardTopSongs;



// import React from 'react'

// const ThemeContent = () => {
//   return (
//     <div className='w-[80%] h-full p-2 pt-0 pl-1 flex-col gap-2 text-white lg:flex bg-violet-950'>
//       <div className='bg-black h-[100%] rounded flex flex-col'>
//         hello
//       </div>
//     </div>
//   )
// }

// export default ThemeContent
