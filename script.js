//Unsplash API
const count = 10;
const apiKey = "q8ZKvVsNdMzBMND8fuz8jTw6IXAHPireJ4jlMfuhBoA";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Get photos from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
  } catch (error) {}
};

getPhotos();
