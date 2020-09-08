const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false,
  imagesLoaded = 0,
  totalImages = 0,
  photosArray = [];

//Unsplash API
const imagesLoading = 5,
  apiKey = "",
  apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imagesLoading}`;

//check if all images are loaded
const imageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    imagesLoaded = 0;
    ready = true;
    loader.hidden = true;

    //load more images after intial load
    imagesLoading = 30;
  }
};
//helper function to set attributes on DOM elements
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};
//Create elements for links, photos.
const displayPhotos = () => {
  totalImages = photosArray.length;
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
    //Event listener to check when finished loading
    image.addEventListener("load", imageLoaded);
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

//check to see if scrolling near bottom of page. Load more photos.

addEventListener("scroll", () => {
  if ((innerHeight = scrollY >= document.body.offsetHeight - 1000 && ready)) {
    ready = false;
    getPhotos();
  }
});
getPhotos();
