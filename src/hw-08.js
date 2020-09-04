'use strict';

import galleryitems from './gallery-items.js';

const createGalleryCard = gallery => {
  const itemRef = document.createElement('li');
  itemRef.classList.add('gallery__item');

  const linkRef = document.createElement('a');
  linkRef.classList.add('gallery__link');
  linkRef.setAttribute('href', gallery.original);

  const imageRef = document.createElement('img');
  imageRef.classList.add('gallery__image');
  imageRef.setAttribute('src', gallery.preview);
  imageRef.setAttribute('data-source', gallery.original);
  imageRef.setAttribute('alt', gallery.description);

  linkRef.appendChild(imageRef);
  itemRef.appendChild(linkRef);

  return itemRef;
};

const galleryCards = galleryitems.map(gallery => createGalleryCard(gallery));

const refs = {
  list: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.lightbox__image'),
  lightboxBtn: document.querySelector('button[data-action="close-lightbox"]'),
  lightboxcontent: document.querySelector('.lightbox__content'),
};

let bigImageUrl;

refs.list.append(...galleryCards);
refs.list.addEventListener('click', onImageClick);
refs.lightboxBtn.addEventListener('click', closeModalBtn);
refs.lightbox.addEventListener('click', closeModalDiv);

function onImageClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  window.addEventListener('keydown', onPressEscape);
  getBigImageUrl();
  addAndRemoveClass();
}

function getBigImageUrl() {
  bigImageUrl = event.target.getAttribute('data-source');
  refs.lightboxImage.src = bigImageUrl;
}

function addAndRemoveClass() {
  refs.lightbox.classList.toggle('is-open');
}

function clearImageSrc() {
  refs.lightboxImage.src = '';
}

function closeModalBtn() {
  removeOnPressEscape();
  addAndRemoveClass();
  clearImageSrc();
}

function closeModalDiv(event) {
  if (event.target === refs.lightboxcontent) {
    closeModalBtn();
  }
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    refs.lightbox.classList.remove('is-open');
    clearImageSrc();
    removeOnPressEscape();
  }
}

function removeOnPressEscape() {
  window.removeEventListener('keydown', onPressEscape);
}
