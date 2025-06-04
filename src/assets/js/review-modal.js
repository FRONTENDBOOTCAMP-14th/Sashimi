// 플로팅 버튼과 모달 제어
const makingStoryModal = document.querySelector('.making-story-modal');
const floatingButton = document.querySelector('.floating-button');

floatingButton.addEventListener('click', () => {
  makingStoryModal.showModal();
  document.body.style.overflow = 'hidden';
});

makingStoryModal.addEventListener('close', () => {
  document.body.style.overflow = '';
});

makingStoryModal.addEventListener('click', (e) => {
  if (e.target === makingStoryModal) {
    makingStoryModal.close();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && makingStoryModal.open) {
    makingStoryModal.close();
  }
});
