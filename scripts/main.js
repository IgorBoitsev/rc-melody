'use strict';

const homeLevels = document.querySelector('.home-levels'),
      levels = document.querySelectorAll('.level'),
      selectorUp = document.querySelector('.selector-up'),
      selectorDown = document.querySelector('.selector-down'),
      selector = document.querySelector('.selector'),
      buttonPrimary = document.querySelector('.button-primary'),
      modalFlats = document.querySelector('.modal-flats'),
      flatsList = document.querySelector('.flats-list'),
      closeBtn = document.querySelector('.close-btn');

// Функция смены подсветки этажа при нажатии на стрелочки
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

// Функция смены номера этажа при нажатии на стрелочки
const checkFloorNumber = (direction) => {

  // Текущий,предыдущий и следующий номера этажей
  const currenLlevelNumber = +selector.textContent,
        upperLevelNumber = +selector.textContent + 1,
        lowerLevelNumber = +selector.textContent - 1;

  switch (direction) {
    case 'up':
      if (currenLlevelNumber == 18 || (currenLlevelNumber == 17 && upperLevelNumber == 18)) {
        selectorUp.style.display = 'none';
        selector.style.marginTop = '26px';
      } else {
        selectorDown.style.display = 'block';
        selector.style.marginBottom = '0px';
        selectorUp.style.display = 'block';
        selector.style.marginTop = '0px';
      }
      break;
  
    case 'down':
      //
      if (currenLlevelNumber == 2 || (currenLlevelNumber == 3 && lowerLevelNumber == 2)) {
        selectorDown.style.display = 'none';
        selector.style.marginBottom = '27px';
      } else {
        selectorUp.style.display = 'block';
        selector.style.marginTop = '0px';
        selectorDown.style.display = 'block';
        selector.style.marginBottom = '0px';
      }
      break;
  }

}

// Смена подсветки при наведении мышкой на этаж
levels.forEach(level => {
  level.addEventListener('mouseover', e => {
    // Скрытие выделенного этажа
    levels.forEach(item => item.classList.remove('is-active'));
    // Выделение другого этажа
    e.target.classList.add('is-active');
    // Изменение номера этажа
    selector.textContent = e.target.dataset.floor;

    if (e.target.dataset.floor == 18) {
      selectorUp.style.display = 'none';
      selector.style.marginTop = '26px';
    } else {
      selectorUp.style.display = 'block';
      selector.style.marginTop = '0px';
    }

    if (e.target.dataset.floor == 2) {
      selectorDown.style.display = 'none';
      selector.style.marginBottom = '27px';
    } else {
      selectorDown.style.display = 'block';
      selector.style.marginBottom = '0px';
    }
  })
})

// Функия открытия модульного окна
const modalFlatsOpen = (floorNumber) => {
  const flatsLayoutHeader = modalFlats.querySelector('.flats-layout-header');
  flatsLayoutHeader.textContent = `Этаж ${floorNumber}`;
  modalFlats.style.display = 'flex';
}

// Функция получения данных о квартирах на этаже
const getFloorInfo = async () => {
  let floorInfo = await fetch('./floor-db.json')
                          .then(response => response.json())

  return floorInfo;
}

// Создание списка с описанием квартирами для модульного окна
const flatsListRender = async (floorNumber) => {
  flatsList.textContent = '';
  let floor = '';

  await getFloorInfo()  
    .then(floorList => {
      floor = floorList[+floorNumber - 2];
    });

  floor.flatsList.forEach(elem => {
    const flat = document.createElement('li');
    flat.classList.add('flats-list-item');
    if (elem.isSold)  flat.classList.add('sold');
    flat.dataset.number = elem.number;
    flat.textContent = `${elem.rooms ? elem.rooms + '-х комн. квартира' : 'студия'}, ${elem.square} кв. м`;

    flatsList.append(flat);
  })

  const flats = document.querySelectorAll('.flat'),
        flatsListItems = document.querySelectorAll('.flats-list-item');
  
  // Подсветка квартиры на плане при наведении на список квартир
  flatsListItems.forEach(item => {
    item.addEventListener('mouseover', e => {
      // console.log(1);
      flats.forEach(flat => {
        if (flat.dataset.number.substr(1) == e.target.dataset.number.substr(1)) {
          flat.classList.add('is-active')
        } else {
          flat.classList.remove('is-active')
        }
      });
    })
  })
  // Сброс подсветки квартиры, если не наведен курсор на список квартир
  flatsListItems.forEach(item => {
    item.addEventListener('mouseout', () => {
      flats.forEach(flat => flat.classList.remove('is-active'))
    })
  })
  // Подсветка описания квартиры при наведении на квартиру на плане
  flats.forEach(flat => {
    flat.addEventListener('mouseover', e => {
      flatsListItems.forEach(item => {
        if (e.target.dataset.number.substr(1) == item.dataset.number.substr(1)) {
          item.classList.add('is-active')
        } else {
          item.classList.remove('is-active')
        }
      })
    })
  })
  // Сброс подсветки квартиры
  flats.forEach(flat => {
    flat.addEventListener('mouseout', () => {
      flatsListItems.forEach(item => item.classList.remove('is-active'))
    })
  })
}
// Этажом выше
selectorUp.addEventListener('click', () => {
  checkFloorNumber('up');
  changeFloor('up');
});
// Этажом ниже
selectorDown.addEventListener('click', () => {
  checkFloorNumber('down');
  changeFloor('down');
})
// Открытие модульного окна
levels.forEach(level => {
  level.addEventListener('click', e => {
    flatsListRender(e.target.dataset.floor);
    modalFlatsOpen(e.target.dataset.floor);
  })
})
buttonPrimary.addEventListener('click', () => {
  flatsListRender(selector.textContent);
  modalFlatsOpen(selector.textContent);
})
// Закрытие модульного окна
closeBtn.addEventListener('click', () => {
  modalFlats.style.display = 'none';
})