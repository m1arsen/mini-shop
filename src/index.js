import './index.html';
import './style/index.scss';
import './libs/youtubeLightbox/youtubeLightbox.css';
import 'swiper/swiper-bundle.css';

import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

const swiperContainer = document.querySelector('.swiper__container');
const swiperWrapper = document.querySelector('.products__vertical-block');
const swiperSlides = document.querySelectorAll('.products__vertical-card');

let swiper;
const pagination = document.createElement('div');
pagination.className = 'swiper-pagination';

function initSwiper() {
  swiper = new Swiper('.swiper', {
    modules: [Pagination],
    centeredSlides: true,
    spaceBetween: 16,
    slidesPerView: 1.5,
    pagination: {
      el: '.swiper-pagination',
    },
  });
}

function destroySwiper() {
  if (swiper) {
    swiper.destroy(true, true);
    swiper = null;
  }
  swiperContainer.classList.remove('swiper');
  swiperWrapper.classList.remove('swiper-wrapper');
  swiperSlides.forEach((slide) => slide.classList.remove('swiper-slide'));
  const paginationEl = document.querySelector('.swiper-pagination');
  if (paginationEl) {
    paginationEl.remove();
  }
}

function checkScreenWidth() {
  const screenWidth = document.body.clientWidth;
  if (screenWidth < 540) {
    if (!swiper) {
      swiperContainer.classList.add('swiper');
      swiperWrapper.classList.add('swiper-wrapper');
      swiperSlides.forEach((slide) => slide.classList.add('swiper-slide'));
      swiperContainer.appendChild(pagination);
      initSwiper();
    }
  } else {
    destroySwiper();
  }
}

// Проверка при загрузке страницы
checkScreenWidth();

// Проверка при изменении размера окна
window.addEventListener('resize', checkScreenWidth);
