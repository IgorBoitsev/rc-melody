'use strict';

const homeLevels = document.querySelector('.home-levels'),
      levels = document.querySelectorAll('.level'),
      selectorUp = document.querySelector('.selector-up'),
      selectorDown = document.querySelector('.selector-down'),
      selector = document.querySelector('.selector');

//
const changeFloor = (direction) => {

  // Текущий,предыдущий и следуующий номера этажей
  const currenLlevelNumber = +selector.textContent,
        upperLevelNumber = +selector.textContent + 1,
        lowerLevelNumber = +selector.textContent - 1;

  let nextLevel = '';

  if (direction == 'up') {

    if (currenLlevelNumber < 18) {
      // Скрытие выделенного этажа
      levels[currenLlevelNumber - 2].classList.remove('is-active');
      // Выделение следующего этажа
      levels[upperLevelNumber - 2].classList.add('is-active');
      nextLevel = upperLevelNumber;
    } else {
      nextLevel = '18';
    }
  }

  if (direction == 'down') {

    if (currenLlevelNumber >= 3) {
      // Скрытие выделенного этажа
      levels[currenLlevelNumber - 2].classList.remove('is-active');
      // Выделение следующего этажа
      levels[lowerLevelNumber - 2].classList.add('is-active');
      nextLevel = lowerLevelNumber;
    } else {
      nextLevel = '2';
    }
  }

  // Изменение цифры этажа в селекторе
  if (nextLevel < 10) {
    selector.textContent = '0' + nextLevel;
  } else {
    selector.textContent = nextLevel;
  }

}

// 
const checkFloorNumber = (direction) => {

  // Текущий,предыдущий и следующий номера этажей
  const currenLlevelNumber = +selector.textContent,
        upperLevelNumber = +selector.textContent + 1,
        lowerLevelNumber = +selector.textContent - 1;

  switch (direction) {
    case 'up':
      // 
      if (currenLlevelNumber == 18 || (currenLlevelNumber == 17 && upperLevelNumber == 18)) {
        selectorUp.style.display = 'none';
        selector.style.marginTop = '26px';
      } else {
        selectorUp.style.display = 'block';
        selector.style.marginTop = '0px';
      }
      break;
  
    case 'down':
      //
      if (currenLlevelNumber == 2 || (currenLlevelNumber == 3 && lowerLevelNumber == 2)) {
        selectorDown.style.display = 'none';
        selector.style.marginBottom = '26px';
      } else {
        selectorDown.style.display = 'block';
        selector.style.marginBottom = '0px';
      }
      break;
  }

}

levels.forEach(level => {
  level.addEventListener('mouseover', e => {
    // Скрытие выделенного этажа
    levels.forEach(item => item.classList.remove('is-active'));
    // Выделение другого этажа
    e.target.classList.add('is-active');
    // Изменение номера этажа
    selector.textContent = e.target.dataset.floor;
  })
})

// Этажом выше
selectorUp.addEventListener('click', () => {
  // checkFloorNumber('up');
  changeFloor('up');
});
// Этажом ниже
selectorDown.addEventListener('click', () => {
  // checkFloorNumber('down');
  changeFloor('down');
})