const imagContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
let count = 5;
const apiKey = "7bDAXlnl7FHAPcpeqXVTBLndLoSmb3lzqdcPIdAEDHQ";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}
`;

//Helper function to set Attribute on dom elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// check if all images were load

function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
		count = 30;
	}
}

// Create Elements for links and photos, add to dom
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	photosArray.forEach((photo) => {
		//create <a> to link to unsplash
		const item = document.createElement("a");
		// item.setAttribute("href", photo.links.html);
		// item.setAttribute("target", "_blank");
		setAttributes(item, {
			href: photo.links.html,
			target: "_blank",
		});

		// Create <img> for photo
		const img = document.createElement("img");
		// img.setAttribute("src", photo.urls.regular);
		// img.setAttribute("alt", photo.alt_description);
		// img.setAttribute("title", photo.alt_description);
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});

		//put image inside a, then put both on inside imageContainer Element
		img.addEventListener("load", imageLoaded);

		item.appendChild(img);
		imagContainer.appendChild(item);
	});
}

// Get Photos from unsplash API

async function getPhotosFromUnsplash() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {
		console.log(error);
	}
}

// Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener("scroll", () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotosFromUnsplash();
	}
});

getPhotosFromUnsplash();
