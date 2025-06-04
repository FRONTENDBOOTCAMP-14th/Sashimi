$('.main-cont-list.important, .main-cont-list.popular').slick({
  infinite: false,
  arrows: false,
  slidesToShow: 8.3,
  slidesToScroll: 2,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5.3,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3.3,
        slidesToScroll: 1,
      },
    },
  ],
});

$('.main-cont-list.quick, .main-cont-list.live, .main-cont-list.event').slick({
  infinite: false,
  arrows: false,
  slidesToShow: 5.3,
  slidesToScroll: 2,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3.3,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2.3,
        slidesToScroll: 1,
      },
    },
  ],
});

$('.main-cont-list.only').slick({
  infinite: false,
  arrows: false,
  slidesToShow: 6.2,
  slidesToScroll: 2,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4.2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2.2,
        slidesToScroll: 1,
      },
    },
  ],
});

document.querySelector('.main-page-modal').showModal();

document.querySelector('.search-btn').addEventListener('click', () => {
  const dialog = document.querySelector('.search-header');
  if (dialog) {
    dialog.showModal();
  }
});

// 닫기 버튼 기능 추가 (선택 사항)
document.querySelector('.search-header .close-btn')?.addEventListener('click', () => {
  const dialog = document.querySelector('.search-header');
  if (dialog) {
    dialog.close();
  }
});
