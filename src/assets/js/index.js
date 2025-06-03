let anchors_arr = ['intro', 'about', 'experience', 'workflow'];
let anchors_cnt = anchors_arr.length;

$(document).ready(function () {
  $('#fullpage').fullpage({
    anchors: anchors_arr,
    navigation: true,
    scrollOverflow: false,
    afterRender: function () {
      dotColorChange(1);
      console.log('afterRender');
    },
    afterLoad: function (anchorLink, index) {
      console.log('afterLoad');
      jQuery('.section.active [data-aos]').addClass('aos-init');
      jQuery('.section.active [data-aos]').addClass('aos-animate');
    },
    onLeave: function (origin, destination, direction, trigger) {
      console.log('onLeave');
      if ((origin === anchors_cnt && destination === anchors_cnt - 1) === false) {
        if (destination != anchors_cnt) {
          jQuery('.section [data-aos]').removeClass('aos-animate');
        }
      }
      dotColorChange(destination);
    },
    onSlideLeave: function () {
      console.log('onSlideLeave');
      jQuery('.slide [data-aos]').removeClass('aos-animate');
    },
    afterSlideLoad: function () {
      console.log('afterSlideLoad');
      jQuery('.slide.active [data-aos]').addClass('aos-animate');
    },
  });

  AOS.init({
    duration: 700,
  });
});

function dotColorChange(destination) {}

$(document).ready(function () {
  let $workflowArea = $('.workflow-area');

  function disableFullpageScroll() {
    if (typeof fullpage_api !== 'undefined') {
      fullpage_api.setAllowScrolling(false);
      fullpage_api.setKeyboardScrolling(false);
    }

    // fullpage.js로 wheel 이벤트 전달되지 않도록 차단
    $workflowArea.on('wheel.fpStop touchmove.fpStop', function (e) {
      e.stopPropagation(); // fullpage에게 이벤트 전달 차단
    });
  }

  function enableFullpageScroll() {
    if (typeof fullpage_api !== 'undefined') {
      fullpage_api.setAllowScrolling(true);
      fullpage_api.setKeyboardScrolling(true);
    }

    // wheel 이벤트 핸들러 제거
    $workflowArea.off('wheel.fpStop touchmove.fpStop');
  }

  $workflowArea.on('mouseenter', function () {
    disableFullpageScroll();
  });

  $workflowArea.on('mouseleave', function () {
    enableFullpageScroll();
  });

  // 모바일 대응
  $workflowArea.on('touchstart', function () {
    disableFullpageScroll();
  });

  $workflowArea.on('touchend', function () {
    enableFullpageScroll();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.workflow-nav button');
  const contents = document.querySelectorAll('.workflow-content');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      // 모든 버튼에서 active 제거
      buttons.forEach((btn) => btn.parentElement.classList.remove('active'));
      button.parentElement.classList.add('active');

      // 모든 콘텐츠 숨기기
      contents.forEach((content) => (content.style.display = 'none'));

      // name 속성으로 콘텐츠 선택
      const targetClass = button.getAttribute('name');
      const targetContent = document.querySelector(`.workflow-content.${targetClass}`);
      if (targetContent) {
        targetContent.style.display = 'block';
      }
    });
  });

  // 초기 상태: 첫 번째 콘텐츠만 표시
  contents.forEach((content, index) => {
    content.style.display = index === 0 ? 'block' : 'none';
  });
});
