import './index.html';
import './style/index.scss';
import './libs/youtubeLightbox/youtubeLightbox.css';
import 'swiper/swiper-bundle.css';

import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

// Слайдер

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

// Беджики к карточкам

const tags = [
  {
    name: 'Товар дня',
    color: '#FFA726',
  },
  {
    name: 'Хит',
    color: '#AC59F1',
  },
  {
    name: 'Распродажа',
    color: '#39B0F4',
  },
];

const discounts = [
  {
    percent: '0-30',
    color: '#18C576',
  },
  {
    percent: '30-90',
    color: '#FF5BC6',
  },
];

const tagsOnSite = document.querySelectorAll('.card__tag');
const discountsOnSite = document.querySelectorAll('.card__discount');

tagsOnSite.forEach((tagHtml) => {
  tags.forEach((tag) => {
    if (tag.name === tagHtml.textContent) {
      tagHtml.style.backgroundColor = tag.color;
    }
  });
});

discountsOnSite.forEach((discountHtml) => {
  discounts.forEach((discount) => {
    const limitValues = discount.percent.split('-').map((str) => Number(str));
    const discountHtmlValue = Number(discountHtml.textContent.slice(1, -1));

    if (discountHtmlValue >= limitValues[0] && discountHtmlValue <= limitValues[1]) {
      discountHtml.style.backgroundColor = discount.color;
    }
  });
});

// Модальное окно с формой

const modal = document.querySelector('.modal');
const openBtns = document.querySelectorAll('[data-modal]');

function openModal() {
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  // document.body.style.paddingRight = '15px';
}

function closeModal() {
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
  // document.body.style.paddingRight = '0';
}

openBtns.forEach((btn) => {
  btn.addEventListener('click', openModal);
});

modal.addEventListener('click', (e) => {
  if (e.target == modal || e.target.getAttribute('data-close') == '') closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && modal.classList.contains('show')) closeModal();
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('dataForm');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const consent = document.getElementById('consent');

    console.log('Имя:', name.value);
    console.log('Телефон:', phone.value);
    console.log('Согласие на обработку персональных данных:', consent.checked);

    form.reset();
  });
});
