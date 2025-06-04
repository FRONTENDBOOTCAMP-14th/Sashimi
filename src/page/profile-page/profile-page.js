document.addEventListener('DOMContentLoaded', function () {
  // 프로필 편집 버튼 선택
  const editButton = document.querySelector('.profile-button.edit');
  // 편집 완료 버튼 선택
  const completeButton = document.querySelector('.profile-button.complete');

  // 프로필 편집 버튼 클릭 이벤트
  if (editButton) {
    editButton.addEventListener('click', function () {
      // 프로필 편집 페이지로 이동
      window.location.href = '/src/page/profile-page/profile-page-edit.html';
    });
  }

  // 편집 완료 버튼 클릭 이벤트
  if (completeButton) {
    completeButton.addEventListener('click', function () {
      // 메인 페이지로 이동
      window.location.href = '/src/page/main-page/main-page.html';
    });
  }
});
