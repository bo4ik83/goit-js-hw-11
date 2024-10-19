import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '46607456-5552cc86243543e4de6027df0';
const BASE_URL = 'https://pixabay.com/api/';
const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

async function fetchImages(query) {
  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
  );
  if (!response.ok) {
    throw new Error('Error fetching data');
  }
  return response.json();
}

function clearGallery() {
  gallery.innerHTML = '';
}

function createImageCard(image) {
  return `
    <li class="gallery-item">
      <a href="${image.largeImageURL}" class="gallery-link">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${image.likes}</p>
        <p><b>Views:</b> ${image.views}</p>
        <p><b>Comments:</b> ${image.comments}</p>
        <p><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </li>
  `;
}

function renderGallery(images) {
  clearGallery();
  const markup = images.map(createImageCard).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh(); // Оновлюємо SimpleLightbox
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = event.currentTarget.elements.query.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
    });
    return;
  }

  try {
    const data = await fetchImages(query);
    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'No Results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderGallery(data.hits);
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong! Please try again later.',
    });
  }
});
