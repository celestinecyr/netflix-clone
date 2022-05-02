import React from 'react';

import Row from '../src/components/Row/Row';
import Banner from '../src/components/Banner/Banner';
import Nav from '../src/components/Nav/Nav';

import requests from './requests';

import './App.css';

function App() {
  return (
    <div className="app">
      <Nav/>
      <Banner />
      <Row title="NETFLIX ORIGINALS" isLargeRow fetchUrl={requests.fetchNetflixOriginals}/>        
      {/* i.e. fetchUrl = /discover/tv?api_key=${API_KEY}&with_network=123 */}
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated}/>
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}/>
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}/>
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}/>
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies}/>
      <Row title="Documentry Movies" fetchUrl={requests.fetchDocumentaries}/>
    </div>
  );
}

export default App;
