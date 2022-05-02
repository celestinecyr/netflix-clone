import React, {useState, useEffect} from 'react'

import axios from '../../axios';                //we're not importing axios pkg, but the axios that we have alr coded --> 
import Youtube from 'react-youtube';
import movieTrailer from "movie-trailer";

import "./Row.css";

const POSTER_URL = "https://image.tmdb.org/t/p/original";

function Row({title, fetchUrl, isLargeRow}) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //we need to have a snippet of code which runs based on a specific condition(s)
  //basically when the row loads, we wanna 'feed' it with the info that it needs
  useEffect(() =>{
    //if empty [] - run once when row loads, and dont run again || if [movies] - run once when row loads, and run again every time movies changes
    // async function fetchData () {
    const fetchData = async () => {
      const responseData = await axios.get(fetchUrl)
      // when we type axios here, we get baseUrl (don't confuse this with npm axios)
      // hence we are basically requesting for (eg) --> https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_network=123
    
      //console.log(request);     //we need to see what is the data structure that we're getting
      setMovies(responseData.data.results);
      return responseData;
    }
    fetchData();
  }, [fetchUrl]);
  
  //console.table(movies);

  const opts = {
    height: "390",
    width: "99%",
    playerVars: {
      //https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    console.table(movie?.title)
    console.log("clicked")
    if (trailerUrl){
      setTrailerUrl('')
    } else {
      movieTrailer(movie?.name || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);      //to get everything after the ? in the url
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error) => console.log(error));
    }
  };

  return (
    <div className='row'>
      <h3>{title}</h3>
      
      <div className='row_posters'>
        {movies?.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            //className={ isLargeRow ? `row_posterLarge` : `row_poster` }
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}    //everything is row_poster but if is large row then row_posterLarge
            src={`${POSTER_URL}${isLargeRow ? movie?.poster_path : movie?.backdrop_path}`}
            alt={movie?.name} 
          />
        ))}
      </div>
      <div>
        {/* Only when we have trailerUrl then we wanna show TY video */}
        {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;