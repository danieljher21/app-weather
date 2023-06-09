import axios from 'axios';

const searchImages = async (query) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${query}`,
      {
        headers: {
          Authorization: 'Client-ID GLClExnb1suc1gvRBD2RhD2An1McNnj6rlClu9xh7l0'
        }
      }
    );
    const images = response.data.results;
    return images;
  } catch (error) {
    console.log(error);
  }
};

export { searchImages };
