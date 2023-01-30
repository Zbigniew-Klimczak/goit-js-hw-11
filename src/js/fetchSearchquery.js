import { collectData } from '..';
const axios = require('axios').default;
const API_KEY = '33245282-6e238748bd483492097eba1b8';
export async function fetchSearchquery(searchquery, page) {
  try {
    const response = await axios.get(
      'https://pixabay.com/api/?key=' +
        API_KEY +
        '&q=' +
        encodeURIComponent(searchquery) +
        '&image_type=photo' +
        '&orientation=horizontal' +
        '&safesearch=true' +
        '&per_page=40' +
        '&page=' +
        page
    );
    console.log(response.data);
    collectData(response.data);
  } catch (error) {
    console.log(error);
  }
}
