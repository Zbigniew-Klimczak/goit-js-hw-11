import Notiflix from 'notiflix';
import { fetchSearchquery } from './js/fetchSearchquery';
const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const loadmoreButton = document.querySelector('.load-more');
let inputValue;
let actualPage;
form.addEventListener('submit', formSubmit);
function formSubmit(event) {
  loadmoreButton.classList.add('hidden');
  event.preventDefault();
  gallery.replaceChildren();
  actualPage = 1;
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  inputValue = searchQuery.value.trim();
  if (inputValue === '') {
    Notiflix.Notify.info('Please enter your search query first.');
  }
  if (inputValue !== '') {
    fetchSearchquery(inputValue, actualPage);
  }
}
export function collectData(results) {
  if (actualPage === 1) {
    if (results.totalHits === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if (results.totalHits > 0) {
      Notiflix.Notify.success(`Hooray! We found ${results.totalHits} images.`);
      galleryCreate(results.hits);
      if (results.totalHits > 40) {
        loadmoreButton.classList.remove('hidden');
      }
    }
  }
  if (actualPage > 1) {
    loadmoreButton.classList.remove('hidden');
    galleryCreate(results.hits);
    if (results.totalHits === gallery.childElementCount) {
      loadmoreButton.classList.add('hidden');
      Notiflix.Notify.warning(
        `We're sorry, but you've reached the end of search results.`
      );
    }
  }
}
function galleryCreate(data) {
  for (let i = 0; i < data.length; i++) {
    const photoCard = document.createElement('div');
    photoCard.classList.add('photo-card');
    gallery.append(photoCard);
    const img = document.createElement('img');
    img.setAttribute('src', data[i].webformatURL);
    img.setAttribute('alt', data[i].tags);
    img.setAttribute('loading', 'lazy');
    img.classList.add('gallery-img');
    photoCard.append(img);
    const info = document.createElement('div');
    info.classList.add('info');
    photoCard.append(info);
    const infoLikes = document.createElement('p');
    infoLikes.textContent = data[i].likes;
    infoLikes.classList.add('info-item');
    info.append(infoLikes);
    const likes = document.createElement('b');
    likes.textContent = 'Likes';
    infoLikes.prepend(likes);
    const infoViews = document.createElement('p');
    infoViews.textContent = data[i].views;
    infoViews.classList.add('info-item');
    info.append(infoViews);
    const views = document.createElement('b');
    views.textContent = 'Views';
    infoViews.prepend(views);
    const infoComments = document.createElement('p');
    infoComments.textContent = data[i].comments;
    infoComments.classList.add('info-item');
    info.append(infoComments);
    const comments = document.createElement('b');
    comments.textContent = 'Comments';
    infoComments.prepend(comments);
    const infoDownloads = document.createElement('p');
    infoDownloads.textContent = data[i].downloads;
    infoDownloads.classList.add('info-item');
    info.append(infoDownloads);
    const downloads = document.createElement('b');
    downloads.textContent = 'Downloads';
    infoDownloads.prepend(downloads);
  }
}
loadmoreButton.addEventListener('click', () => {
  loadmoreButton.classList.add('hidden');
  actualPage = actualPage + 1;
  fetchSearchquery(inputValue, actualPage);
});
