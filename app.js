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
]

// Объявление доступов
const list = document.querySelector('.js-gallery')
const modal = document.querySelector('.js-lightbox')
const modalImg = document.querySelector('.lightbox__image')
const modalBtnClose = document.querySelector('[data-action="close-lightbox"]')
const modalOverlay = document.querySelector('.lightbox__overlay')

// Создание галереи
galleryItems.forEach(({ preview, original, description }) => {
  const item = document.createElement('li')
  const itemLink = document.createElement('a')
  const itemImg = document.createElement('img')
  list.appendChild(item)
  item.appendChild(itemLink)
  itemLink.appendChild(itemImg)
  itemImg.setAttribute('src', preview)
  itemImg.setAttribute('alt', description)
  item.classList.add('gallery__item')
  itemLink.classList.add('gallery__link')
  itemImg.classList.add('gallery__image')
})

// Слушатели событий
list.addEventListener('click', e => {
  const scroll = openModal(e)
  window.addEventListener('keydown', scroll)

  modalBtnClose.addEventListener('click', closeModal)

  modalOverlay.addEventListener('click', closeModal)

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal()
      console.log('not closed')
    }
  })
})

// Функции
function getImgData(img) {
  return galleryItems.find(({ preview }) => preview === img.target.src)
}

function getImgDataId(imgData) {
  return galleryItems.indexOf(imgData)
}

function closeModal() {
  modal.classList.remove('is-open')
  modalImg.setAttribute('src', '')
  modalImg.setAttribute('alt', '')

  window.removeEventListener('keydown', scroll)
  modalBtnClose.removeEventListener('click', closeModal)
  modalOverlay.removeEventListener('click', closeModal)
  window.removeEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal()
      console.log('not closed')
    }
  })
}

function openModal(e) {
  modal.classList.add('is-open')
  const imgData = getImgData(e)
  modalImg.setAttribute('src', imgData.original)
  modalImg.setAttribute('alt', imgData.description)
  let imgDataId = getImgDataId(imgData)
  return function scroll(e) {
    console.log(galleryItems[imgDataId])
    if (e.key === 'ArrowRight') {
      imgDataId += 1
      if (imgDataId >= galleryItems.length) {
        imgDataId = 0
      }
    }
    if (e.key === 'ArrowLeft') {
      imgDataId -= 1
      if (imgDataId < 0) {
        imgDataId = galleryItems.length - 1
      }
    }
    console.log(imgDataId)
    modalImg.setAttribute('src', galleryItems[imgDataId].original)
    modalImg.setAttribute('alt', galleryItems[imgDataId].description)
  }
}
