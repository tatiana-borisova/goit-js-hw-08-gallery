const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const paletteEl = document.querySelector('.gallery');
const cardsMarkup = createMarkup(galleryItems);
const modal = document.querySelector('.lightbox');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const modalImgEl = document.querySelector('.lightbox__image');
const overlayEl = document.querySelector('.lightbox__overlay');
let currentIndex = 0;

paletteEl.insertAdjacentHTML('beforeend', cardsMarkup);
paletteEl.addEventListener('click', onPaletteContainerClick);
closeModalBtn.addEventListener('click', onCloseModal);
overlayEl.addEventListener('click', onCloseModal);

function createMarkup(gallery) {
  return gallery
    .map(({ preview, original, description }, index) => {
      return `
      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            loading="lazy"
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            data-index="${index}"
            alt="${description}"
          />
        </a>
      </li>
    `;
    })
    .join('');
}

function onPaletteContainerClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  onOpenModal(event.target);
}

function onOpenModal(img) {
  window.addEventListener('keydown', onKeyDown);
  modal.classList.add('is-open');
  modalImgEl.src = img.dataset.source;
  modalImgEl.alt = img.alt;
  modalImgEl.dataset.index = img.dataset.index;
  currentIndex = Number(img.dataset.index);
}

function getImgDataId(imgData) {
  return galleryItems.indexOf(imgData);
}

function swipeRight() {
  currentIndex += 1;
  if (currentIndex >= galleryItems.length) {
    currentIndex = 0;
  }
  modalImgEl.src = galleryItems[currentIndex].original;
  modalImgEl.alt = galleryItems[currentIndex].description;
}

function swipeLeft() {
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = galleryItems.length - 1;
  }
  modalImgEl.src = galleryItems[currentIndex].original;
  modalImgEl.alt = galleryItems[currentIndex].description;
}

function onKeyDown(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
  if (event.code === 'ArrowRight') {
    swipeRight();
  }
  if (event.code === 'ArrowLeft') {
    swipeLeft();
  }
}
