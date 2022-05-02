import axios from 'axios';

//* base url to make requests to the movie database
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
});

// so if we type
//* instance.get('/loginpage');
// then what it actually looks like is - https://api.themoviedb.org/3/loginpage || basically appending it to baseURL

export default instance;