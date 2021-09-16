
// Menus
const mainMenu = document.querySelector(".menu_type_main");
const calculatorsMenu = document.querySelector(".menu_type_calculators");
const bctMenu = document.querySelector(".menu_type_bct");
const trainningPlansMenu = document.querySelector("menu_type_trainning-plans")

// Buttons
const mainMenuButton = document.querySelector(".menu__button_type_main");
const bctMenuButton = document.querySelector(".menu__button_type_bct");
const calculatorsMenuButton = document.querySelector(".menu__button_type_calculators");
const trainningPlansMenuButton = document.querySelector(".menu__button_type_trainning-plans");

// Navigate between each menu.
const menusList = Array.from(document.querySelectorAll(".content"));
menusList.forEach((menu) => {
    const currentMenu = menu;
    const buttonsList = Array.from(menu.querySelectorAll(".content__menu__button"));
    buttonsList.forEach( (button) => {
        button.addEventListener("click", () => {
            currentMenu.classList.remove("content_visible");
            const newMenu = document.querySelector(`.content_type_${button.id}`);
            newMenu.classList.add("content_visible");
        })
    });
});

// Navigate between each sub-menu.
const pages = Array.from(document.querySelectorAll(".content"));
pages.forEach( (page) => {
    const currentPage = page;
    const subButtonsList = Array.from(page.querySelectorAll(".content__sub-menu__button"));
    subButtonsList.forEach( (subButton) => {
        subButton.addEventListener("click", () => {
            currentPage.classList.remove("content_visible");
            const newPage = document.querySelector(`.content_type_${subButton.id}`);
            newPage.classList.add("content_visible");
        })
    });
});

function round_number(value, decimals){
  var shifter = Math.pow(10,decimals);
  return Math.round(value * shifter) / shifter;
}

function hrTargets(){
  const age = document.querySelector('.content__calculator__input_age').value;
  const gender = document.querySelector('.content__calculator__input_gender').value;
  let hrMax = 0;
  if (gender === "female"){
    hrMax = 226 - age;
  }
  else if (gender === "male"){
    hrMax = 220 - age;
  }
  let hrRest = document.querySelector('.content__calculator__input_hrRest').value;
  hrRest = hrRest * 4;
  const percentages = [1, hrRest, 0.70, 0.8, 0.85, 0.90, 0.95, 1];
  const verbals = ["דופק מירבי", "דופק מנוחה", "אימון שחרור / התאוששות", "אימון אירובי קל", "אימון אירובי טמפו", "אימון אנאירובי", "אימון אנאירובי עצים"];
  const result = document.querySelector('.content__calculator__result');
  result.innerHTML = `${verbals[0]}: ${hrMax}.<br>${verbals[1]}: ${hrRest}.<br>`;
  for (i = 2; i < percentages.length-1; i++) {
    const hrTarget = round_number(((hrMax - hrRest)*percentages[i] + hrRest), 0);
    const nextHrTarget = round_number(((hrMax - hrRest)*percentages[i+1] + hrRest), 0);
    result.innerHTML += `${verbals[i]}: ${hrTarget} עד ${nextHrTarget} מדופק מירבי.<br>`;
  }
}

const calculator = document.querySelector(".content__calculator");
const submitButton = document.querySelector(".content__calculator__submit-button")
calculator.addEventListener("submit", (evt) => {
  evt.preventDefault();
  hrTargets();
});