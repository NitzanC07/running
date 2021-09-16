
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

// ******************************
// ** Function for calculators **
// ******************************

function round_number(value, decimals){
  var shifter = Math.pow(10,decimals);
  return Math.round(value * shifter) / shifter;
}

function hrTargets(calculator){
  const age = calculator.querySelector('.content__calculator__input_age').value;
  const gender = calculator.querySelector('.content__calculator__input_gender').value;
  let hrMax = 0;
  if (gender === "female"){
    hrMax = 226 - age;
  }
  else if (gender === "male"){
    hrMax = 220 - age;
  }
  let hrRest = calculator.querySelector('.content__calculator__input_hrRest').value;
  hrRest = hrRest * 4;
  const percentages = [1, hrRest, 0.70, 0.8, 0.85, 0.90, 0.95, 1];
  const verbals = ["דופק מירבי", "דופק מנוחה", "אימון שחרור / התאוששות", "אימון אירובי קל", "אימון אירובי טמפו", "אימון אנאירובי", "אימון אנאירובי עצים"];
  const result = calculator.querySelector('.content__calculator__result');
  result.innerHTML = `${verbals[0]}: ${hrMax}.<br>${verbals[1]}: ${hrRest}.<br>`;
  for (i = 2; i < percentages.length-1; i++) {
    const hrTarget = round_number(((hrMax - hrRest)*percentages[i] + hrRest), 0);
    const nextHrTarget = round_number(((hrMax - hrRest)*percentages[i+1] + hrRest), 0);
    result.innerHTML += `${verbals[i]}: ${hrTarget} עד ${nextHrTarget} מדופק מירבי.<br>`;
  }
}


function vo2maxCooper(calculator){
  var weight = calculator.querySelector('.content__calculator__input_weight').value;
  var distance = calculator.querySelector('.content__calculator__input_distance').value;
  var vo2max = (distance-504.9)/44.73
  var vo2maxPersonal = round_number((vo2max * weight)/1000, 2)
  var result = calculator.querySelector('.content__calculator__result');
  result.innerHTML = '<b>צח"מ: ' + (round_number(vo2max,2) + ' מ"ל לדקה לק"ג גוף.</b><br>' + vo2maxPersonal + ' ליטר חמצן לדקה עבור גוף במשקל ' + weight + ' ק"ג.');
}


function vo2maxHr(calculator) {
  const age = calculator.querySelector('.content__calculator__input_age').value;
  const gender = calculator.querySelector('.content__calculator__input_gender').value;
  let hrMax = 0;
  if (gender === "female") {
    hrMax = 226 - age;
  }
  else if (gender === "male") {
    hrMax = 220 - age;
  }
  let hrRest = calculator.querySelector('.content__calculator__input_hrRest').value;
  hrRest = hrRest * 4
  const vo2max = (hrMax / hrRest) * 15.3;
  const result = calculator.querySelector('.content__calculator__result');
  result.innerHTML = "דופק מירבי מחושב: " + hrMax + " פעימות לדקה." + "<br> דופק מנוחה: " + hrRest + " פעימות לדקה.<br>";
  result.innerHTML += 'צח"מ: ' + (round_number(vo2max,2) + ' מ"ל לדקה לק"ג גוף');
}


function bmi(calculator){
  const weight = Number(calculator.querySelector('.content__calculator__input_weight').value);
  let height = Number(calculator.querySelector('.content__calculator__input_height').value);
  height = height / 100;
  const age = Number(calculator.querySelector('.content__calculator__input_age').value);
  const bmi = (weight / (height ** 2));
  const result = calculator.querySelector('.content__calculator__result');
  result.innerHTML = "תוצאה: " + round_number(bmi,2) + "<br>";
  if (age < 50){
    if (bmi <= 18.5){
      result.innerHTML += "לא תקין, תת-משקל.";
    }else if ((bmi > 18.5) && (bmi <= 25)){
      const p = "המשקל נמצא בטווח התקין.";
      result.innerHTML += p;
    }else if ((bmi > 25) && (bmi <= 30)){          
      const p = "לא תקין, עודף משקל."
      result.innerHTML += p;
    }else if((bmi > 30) && (bmi <= 40)){
      result.innerHTML += "לא תקין, השמנה."
    }else if ((bmi > 40)){
      result.innerHTML += "לא תקין, השמנת יתר חמורה."
    }
  }else if (age >= 50){
    if (bmi <= 18.5){
      result.innerHTML += "לא תקין, תת-משקל."
    }else if ((bmi > 18.5) && (bmi <= 27)){
      result.innerHTML += "המשקל נמצא בטווח התקין."
    }else if ((bmi > 27) && (bmi <= 30)){
      result.innerHTML += "לא תקין, עודף משקל."
    }else if((bmi > 30) && (bmi <= 40)){
      result.innerHTML += "לא תקין, השמנה."
    }else if ((bmi > 40)){
      result.innerHTML += "לא תקין, השמנת יתר חמורה."
    }
  }
}


function fatPercentageTestSkinfold(calculator) {
  const weight = Number(calculator.querySelector('.content__calculator__input_weight').value);
  const skinfoldWaist = Number(calculator.querySelector('.content__calculator__input_skinfoldWaist').value);
  const age = Number(calculator.querySelector('.content__calculator__input_age').value);
  const gender = calculator.querySelector('.content__calculator__input_gender').value;
  const fatPercentage_male = {
    agesGroup20: [2.0, 3.9, 6.2, 8.5, 10.5, 12.5, 14.3, 16.0, 17.5, 18.9, 20.2, 21.3, 22.3, 23.1, 23.8, 24.3, 24.9],
    agesGroup25: [2.5, 4.9, 7.3, 9.5, 11.6, 13.6, 15.4, 17.0, 18.6, 20.0, 21.2, 22.3, 23.3, 24.2, 24.9, 25.4, 25.8],
    agesGroup30: [3.5, 6.0, 8.4, 10.6, 12.7, 14.6, 16.4, 18.1, 19.6, 21.0, 22.3, 23.4, 24.4, 25.5, 25.9, 26.5, 26.9],
    agesGroup35: [4.5, 7.7, 9.4, 11.7, 13.7, 15.7, 17.5, 19.2, 20.7, 22.1, 23.4, 24.5, 25.5, 26.3, 27.0, 27.5, 28.0],
    agesGroup40: [5.6, 8.1, 10.5, 12.7, 14.8, 16.8, 18.6, 20.2, 21.8, 23.2, 24.4, 25.6, 26.5, 27.4, 28.1, 28.6, 29.0],
    agesGroup45: [6.7, 9.2, 11.5, 13.8, 15.9, 17.8, 19.6, 21.3, 22.8, 24.7, 25.5, 26.6, 27.6, 28.4, 29.1, 29.7, 30.1],
    agesGroup50: [7.7, 10.2, 12.6, 14.8, 16.9, 18.9, 20.7, 22.4, 23.9, 25.3, 26.6, 27.7, 28.7, 29.5, 30.2, 30.7, 31.2],
    agesGroup55: [8.8, 11.3, 13.7, 15.9, 18.0, 20.0, 21.8, 23.4, 25.0, 26.4, 27.6, 28.7, 29.7, 30.6, 31.2, 31.8, 32.2],
    agesGroup56: [9.9, 12.4, 14.7, 17.0, 19.1, 21.0, 22.8, 24.5, 26.0, 27.4, 28.7, 29.8, 30.8, 31.6, 32.3, 32.9, 33.3]
  };
  const fatPercentage_female = {
    agesGroup20: [11.3, 13.5, 15.7, 17.7, 19.7, 21.5, 23.2, 24.8, 26.3, 27.7, 29.0, 30.2, 31.3, 32.3, 33.1, 33.9, 34.6],
    agesGroup25: [11.9, 14.2, 16.3, 18.4, 20.3, 22.1, 23.8, 25.5, 27.0, 28.4, 29.6, 30.8, 31.9, 32.9, 33.8, 34.5, 35.2],
    agesGroup30: [12.5, 14.8, 16.9, 19.0, 20.9, 22.7, 24.5, 26.1, 27.6, 29.0, 30.3, 31.5, 32.5, 33.5, 34.4, 35.2, 35.8],
    agesGroup35: [13.2, 15.4, 17.6, 19.6, 21.5, 23.4, 25.1, 26.7, 28.2, 29.6, 30.9, 32.1, 33.2, 34.1, 35.0, 35.8, 36.4],
    agesGroup40: [13.8, 16.0, 18.2, 20.2, 22.2, 24.0, 25.7, 27.3, 28.8, 30.2, 31.5, 32.7, 33.8, 34.8, 35.6, 36.4, 37.0],
    agesGroup45: [14.4, 16.7, 18.8, 20.8, 22.8, 24.6, 26.3, 27.9, 29.4, 30.8, 32.1, 33.3, 34.4, 35.4, 36.3, 37.0, 37.7],
    agesGroup50: [15.0, 17.3, 19.4, 21.5, 23.4, 25.2, 26.9, 28.6, 30.1, 31.5, 32.8, 34.0, 35.0, 36.0, 36.9, 37.6, 38.3],
    agesGroup55: [15.6, 17.9, 20.0, 22.1, 24.0, 25.9, 27.6, 29.2, 30.7, 32.1, 33.4, 34.6, 35.6, 36.6, 37.5, 38.3, 38.9],
    agesGroup56: [16.3, 18.5, 20.7, 22.7, 24.6, 26.5, 28.2, 29.8, 31.3, 32.7, 34.0, 35.2, 36.3, 37.2, 38.1, 38.9, 39.5]
  };
  const skinfolds = [3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 36];
  let fp = 0;
  if (gender === "female"){
    if(age <= 20){
      for(i=0 ; i <= skinfolds.length; i=i+1){
        if(i == 16){
          fp = fatPercentage_female.agesGroup20[i];
          break;
        } 
        else if(skinfoldWaist <= skinfolds[i]){
          fp = fatPercentage_female.agesGroup20[i];
          break;
        }
      }
    }
    else if((age > 20) && (age <= 25)){
      for(i=0 ; i <= skinfolds.length; i=i+1){
        if(i == 16){
          fp = fatPercentage_female.agesGroup25[i];
          break;
        } 
        else if(skinfoldWaist <= skinfolds[i]){
          fp = fatPercentage_female.agesGroup25[i];
          break;
        }
      }
    }
    else if((age > 25) && (age <= 30)){
      for(i=0 ; i <= skinfolds.length; i=i+1){
        if(i == 16){
          fp = fatPercentage_female.agesGroup30[i];
          break;
        } 
        else if(skinfoldWaist <= skinfolds[i]){
          fp = fatPercentage_female.agesGroup30[i];
          break;
        }
      }
    }
    else if((age > 30) && (age <= 35)){
      for(i=0 ; i <= skinfolds.length; i=i+1){
        if(i == 16){
          fp = fatPercentage_female.agesGroup35[i];
          break;
        } 
        else if(skinfoldWaist <= skinfolds[i]){
          fp = fatPercentage_female.agesGroup35[i];
          break;
        }
      }
    }
    else if((age > 35) && (age <= 40)){
      for(i=0 ; i <= skinfolds.length; i=i+1){
        if(i == 16){
          fp = fatPercentage_female.agesGroup40[i];
          break;
        } 
        else if(skinfoldWaist <= skinfolds[i]){
          fp = fatPercentage_female.agesGroup40[i];
          break;
        }
      }
    }
    else if((age > 40) && (age <= 45)){
      for(i=0 ; i <= skinfolds.length; i=i+1){
        if(i == 16){
          fp = fatPercentage_female.agesGroup45[i];
          break;
        } 
        else if(skinfoldWaist <= skinfolds[i]){
          fp = fatPercentage_female.agesGroup45[i];
          break;
        }
      }
    }
    else if((age > 45) && (age <= 55)){
      for(i=0 ; i <= skinfolds.length; i=i+1){
        if(i == 16){
          fp = fatPercentage_female.agesGroup55[i];
          break;
        } 
        else if(skinfoldWaist <= skinfolds[i]){
          fp = fatPercentage_female.agesGroup55[i];
          break;
        }
      }
    }
    else if(age > 55){
      for(i=0 ; i <= skinfolds.length; i=i+1){
        if(i == 16){
          fp = fatPercentage_female.agesGroup56[i];
          break;
        } 
        else if(skinfoldWaist <= skinfolds[i]){
          fp = fatPercentage_female.agesGroup56[i];
          break;
        }
      }
    }
    // if ((fp >= 10) && (fp < 13)){
    //   var genTable1 = document.querySelector('#female_5');
    //   genTable1.style.backgroundColor = '#7bf55c';
    //   }
    //   else if ((fp >= 14) && (fp < 21)){
    //     var genTable1 = document.querySelector('#female_6');
    //     genTable1.style.backgroundColor = '#7bf55c';
    //   }
    //   else if ((fp >= 21) && (fp < 25)){
    //     var genTable1 = document.querySelector('#female_7');
    //     genTable1.style.backgroundColor = '#7bf55c';
    //   }
    //   else if ((fp >= 25) && (fp < 32)){
    //     var genTable1 = document.querySelector('#female_8');
    //     genTable1.style.backgroundColor = '#7bf55c';
    //   }
    //   else if (fp >= 32){
    //     var genTable1 = document.querySelector('#female_9');
    //     genTable1.style.backgroundColor = '#7bf55c';
    //   }
  }
  else if (gender === "male"){
    if(age <= 20){
      for(i=0 ; i <= skinfolds.length; i=i+1){
        if(i == 16){
          fp = fatPercentage_male.agesGroup20[i];
          break;
        } 
        else if(skinfoldWaist <= skinfolds[i]){
          fp = fatPercentage_male.agesGroup20[i];
          break;
        }
      }
    }
    else if((age > 20) && (age <= 25)){
      for(i=0 ; i <= skinfolds.length; i=i+1){
        if(i == 16){
          fp = fatPercentage_male.agesGroup25[i];
          break;
        } 
        else if(skinfoldWaist <= skinfolds[i]){
          fp = fatPercentage_male.agesGroup25[i];
          break;
        }
      }
    }
    else if((age > 25) && (age <= 30)){
      for(i=0 ; i <= skinfolds.length; i=i+1){
        if(i == 16){
          fp = fatPercentage_male.agesGroup30[i];
          break;
        } 
        else if(skinfoldWaist <= skinfolds[i]){
          fp = fatPercentage_male.agesGroup30[i];
          break;
        }
      }
    }
    else if((age > 30) && (age <= 35)){
      for(i=0 ; i <= skinfolds.length; i=i+1){
        if(i == 16){
          fp = fatPercentage_male.agesGroup35[i];
          break;
        } 
        else if(skinfoldWaist <= skinfolds[i]){
          fp = fatPercentage_male.agesGroup35[i];
          break;
        }
      }
    }
    else if((age > 35) && (age <= 40)){
      for(i=0 ; i <= skinfolds.length; i=i+1){
        if(i == 16){
          fp = fatPercentage_male.agesGroup40[i];
          break;
        } 
        else if(skinfoldWaist <= skinfolds[i]){
          fp = fatPercentage_male.agesGroup40[i];
          break;
        }
      }
    }
    else if((age > 40) && (age <= 45)){
      for(i=0 ; i <= skinfolds.length; i=i+1){
        if(i == 16){
          fp = fatPercentage_male.agesGroup45[i];
          break;
        } 
        else if(skinfoldWaist <= skinfolds[i]){
          fp = fatPercentage_male.agesGroup45[i];
          break;
        }
      }
    }
    else if((age > 45) && (age <= 50)){
      for(i=0 ; i <= skinfolds.length; i=i+1){
        if(i == 16){
          fp = fatPercentage_male.agesGroup50[i];
          break;
        } 
        else if(skinfoldWaist <= skinfolds[i]){
          fp = fatPercentage_male.agesGroup50[i];
          break;
        }
      }
    }
    else if((age > 50) && (age <= 55)){
      for(i=0 ; i <= skinfolds.length; i=i+1){
        if(i == 16){
          fp = fatPercentage_male.agesGroup55[i];
          break;
        } 
        else if(skinfoldWaist <= skinfolds[i]){
          fp = fatPercentage_male.agesGroup55[i];
          break;
        }
      }
    }
    else if(age > 55){
      for(i=0 ; i <= skinfolds.length; i=i+1){
        if(i == 16){
          fp = fatPercentage_male.agesGroup56[i];
          break;
        } 
        else if(skinfoldWaist <= skinfolds[i]){
          fp = fatPercentage_male.agesGroup56[i];
          break;
        }
      }
    }
    // if ((fp >= 2) && (fp < 6)){
    //   var genTable1 = document.querySelector('#male_5');
    //   genTable1.style.backgroundColor = '#7bf55c';
    //   }
    //   else if ((fp >= 6) && (fp < 14)){
    //     var genTable1 = document.querySelector('#male_6');
    //     genTable1.style.backgroundColor = '#7bf55c';
    //   }
    //   else if ((fp >= 14) && (fp < 18)){
    //     var genTable1 = document.querySelector('#male_7');
    //     genTable1.style.backgroundColor = '#7bf55c';
    //   }
    //   else if ((fp >= 18) && (fp < 25)){
    //     var genTable1 = document.querySelector('#male_8');
    //     genTable1.style.backgroundColor = '#7bf55c';
    //   }
    //   else if (fp >= 25){
    //     var genTable1 = document.querySelector('#male_9');
    //     genTable1.style.backgroundColor = '#7bf55c';
    //   }
  }
  const result = calculator.querySelector('.content__calculator__result');
  const fatMass =  round_number((weight*(fp/100)),2);
  const skinnyBodyMass = round_number((weight - fatMass),2);
  result.innerHTML = "תוצאה: " + fp + "% אחוז שומן.<br>" + "מסת שומן: " + fatMass + ' ק"ג <br>מסת הגוף הרזה: ' + skinnyBodyMass + ' ק"ג';
}


function fatPercentageTest(calculator){
  const waist = Number(calculator.querySelector('.content__calculator__input_waist').value);
  const waistInInches = waist / 2.54
  const weight = Number(calculator.querySelector('.content__calculator__input_weight').value);
  const weightInPounds = weight*2.2046
  const gender = calculator.querySelector('.content__calculator__input_gender').value;
  let fp = 0;
  if (gender === "female"){
    fp = (-76.76 + (4.15 * waistInInches) - (0.082 * weightInPounds))/weightInPounds;
  }
  else if (gender === "male"){
    fp = (-98.42 + (4.15 * waistInInches) - (0.082 * weightInPounds))/weightInPounds;
  }
  const result = calculator.querySelector('.content__calculator__result');
  const fatPer = round_number((fp*100),2);
  const fatMass =  round_number((weight*fp),2);
  const skinnyBodyMass = round_number((weight - weight*fp),2);
  result.innerHTML = "תוצאה: " + fatPer + "% אחוז שומן.<br>" + "מסת שומן: " + fatMass + ' ק"ג <br>מסת הגוף הרזה: ' + skinnyBodyMass + ' ק"ג';
}


const calculatorsList = Array.from(document.querySelectorAll(".content__calculator"));
calculatorsList.forEach((calculatorElement) => {
  calculatorElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const currentCalc = calculatorElement.id;
    if (currentCalc === "hrTargets") {
      hrTargets(calculatorElement);
    }
    if (currentCalc === "vo2maxCooper") {
      vo2maxCooper(calculatorElement);
    }
    if (currentCalc === "vo2maxHr") {
      vo2maxHr(calculatorElement);
    }
    if (currentCalc === "bmi") {
      bmi(calculatorElement);
    }
    if (currentCalc === "fatPercentageTestSkinfold") {
      fatPercentageTestSkinfold(calculatorElement);
    }
    if (currentCalc === "fatPercentageTest") {
      fatPercentageTest(calculatorElement);
    }
  });
})
