
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

function cal_HR_target(){
    var age = document.querySelector('#hrTargetsAGE').value;
    var gender = document.querySelector('#gender_hrTargets input:checked').value;
    console.log(gender);
    if (gender === "female"){
      var HR_max = 226 - age;
    }
    else if (gender === "male"){
      var HR_max = 220 - age;
    }
    var HR_rest = document.querySelector('#hrTargetsREST').value;
    HR_rest = HR_rest * 4;
    var percentages = [0.70, 0.8, 0.85, 0.90, 0.95, 1];
    var verbals = ["אימון שחרור / התאוששות", "אימון אירובי קל", "אימון אירובי טמפו", "אימון אנאירובי ", "אימון אנאירובי עצים"];
    var HR_target = 0;
    var result = document.querySelector('#hrTargetsRESULT');
    result.innerHTML = "דופק מירבי מחושב: " + HR_max + " פעימות לדקה." + "<br> דופק מנוחה: " + HR_rest + " פעימות לדקה.<br>";
    for(i = 0; i < percentages.length-1; i = i + 1){
      var HR_target = (HR_max - HR_rest)*percentages[i] + HR_rest
      var nextHRTarget = (HR_max - HR_rest)*percentages[i+1] + HR_rest
      result.innerHTML += "<br>טווח " + (i+1) + ": " + verbals[i] + "<br>" + percentages[i]*100 + "% מדופק מירבי " + ((Math.round(nextHRTarget))-1) + " - " + Math.round(HR_target) + "<br>";
    }
  }
