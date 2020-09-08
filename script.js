const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

//Unsplash API
const count = 10;
const apiKey = "";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//helper function to set attributes on DOM elements
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};
//Create elements for links, photos.
const displayPhotos = () => {
  for (let photo of photosArray) {
    //create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    //create <img> for photo
    const image = document.createElement("img");
    setAttributes(image, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //put <img> inside <a>, then put both inside imageContainer element
    item.appendChild(image);
    imageContainer.appendChild(item);
  }
};

//Get photos from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
};

getPhotos();
