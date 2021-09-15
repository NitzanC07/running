function round_number(value, decimals){
    var shifter = Math.pow(10,decimals);
    return Math.round(value * shifter) / shifter;
  }

  function fatPercentage(){
    var waist = Number(document.querySelector('#fatWaist').value);
    var waistInInches = waist / 2.54
    var weight = Number(document.querySelector('#fatWeight').value);
    var weightInPounds = weight*2.2046
    var gender = document.querySelector('#gender_fatp input:checked').value;
    console.log(gender);
    if (gender === "female"){
      var fp = (-76.76 + (4.15 * waistInInches) - (0.082 * weightInPounds))/weightInPounds;
    }
    else if (gender === "male"){
      var fp = (-98.42 + (4.15 * waistInInches) - (0.082 * weightInPounds))/weightInPounds;
    }
    var res = document.querySelector('#fatRESULT');
    var result = round_number((fp*100),2);
    var fatMass =  round_number((weight*fp),2);
    var skinnyBodyMass = round_number((weight - weight*fp),2);
    res.innerHTML = "תוצאה: " + result + "% אחוז שומן.<br>" + "מסת שומן: " + fatMass + ' ק"ג <br>מסת הגוף הרזה: ' + skinnyBodyMass + ' ק"ג';
  }

  function fatPercentageTest_skinfold(){
    var weight = Number(document.querySelector('#weightSkinfold').value);
    var skinfoldWaist = Number(document.querySelector('#skinfoldWaist').value);
    var age = Number(document.querySelector('#ageSkinfold').value);
    var gender = document.querySelector('#gender_skinfold input:checked').value;
    var fatPercentage_male = {
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
    var fatPercentage_female = {
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
    var skinfolds = [3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 36];
    console.log(gender);
    if (gender === "female"){
      if(age <= 20){
        for(i=0 ; i <= skinfolds.length; i=i+1){
          if(i == 16){
            var fp = fatPercentage_female.agesGroup20[i];
            break;
          } 
          else if(skinfoldWaist <= skinfolds[i]){
            var fp = fatPercentage_female.agesGroup20[i];
            break;
          }
        }
      }
      else if((age > 20) && (age <= 25)){
        for(i=0 ; i <= skinfolds.length; i=i+1){
          if(i == 16){
            var fp = fatPercentage_female.agesGroup25[i];
            break;
          } 
          else if(skinfoldWaist <= skinfolds[i]){
            var fp = fatPercentage_female.agesGroup25[i];
            break;
          }
        }
      }
      else if((age > 25) && (age <= 30)){
        for(i=0 ; i <= skinfolds.length; i=i+1){
          if(i == 16){
            var fp = fatPercentage_female.agesGroup30[i];
            break;
          } 
          else if(skinfoldWaist <= skinfolds[i]){
            var fp = fatPercentage_female.agesGroup30[i];
            break;
          }
        }
      }
      else if((age > 30) && (age <= 35)){
        for(i=0 ; i <= skinfolds.length; i=i+1){
          if(i == 16){
            var fp = fatPercentage_female.agesGroup35[i];
            break;
          } 
          else if(skinfoldWaist <= skinfolds[i]){
            var fp = fatPercentage_female.agesGroup35[i];
            break;
          }
        }
      }
      else if((age > 35) && (age <= 40)){
        for(i=0 ; i <= skinfolds.length; i=i+1){
          if(i == 16){
            var fp = fatPercentage_female.agesGroup40[i];
            break;
          } 
          else if(skinfoldWaist <= skinfolds[i]){
            var fp = fatPercentage_female.agesGroup40[i];
            break;
          }
        }
      }
      else if((age > 40) && (age <= 45)){
        for(i=0 ; i <= skinfolds.length; i=i+1){
          if(i == 16){
            var fp = fatPercentage_female.agesGroup45[i];
            break;
          } 
          else if(skinfoldWaist <= skinfolds[i]){
            var fp = fatPercentage_female.agesGroup45[i];
            break;
          }
        }
      }
      else if((age > 45) && (age <= 55)){
        for(i=0 ; i <= skinfolds.length; i=i+1){
          if(i == 16){
            var fp = fatPercentage_female.agesGroup55[i];
            break;
          } 
          else if(skinfoldWaist <= skinfolds[i]){
            var fp = fatPercentage_female.agesGroup55[i];
            break;
          }
        }
      }
      else if(age > 55){
        for(i=0 ; i <= skinfolds.length; i=i+1){
          if(i == 16){
            var fp = fatPercentage_female.agesGroup56[i];
            break;
          } 
          else if(skinfoldWaist <= skinfolds[i]){
            var fp = fatPercentage_female.agesGroup56[i];
            break;
          }
        }
      }
      if ((fp >= 10) && (fp < 13)){
        var genTable1 = document.querySelector('#female_5');
        genTable1.style.backgroundColor = '#7bf55c';
        }
        else if ((fp >= 14) && (fp < 21)){
          var genTable1 = document.querySelector('#female_6');
          genTable1.style.backgroundColor = '#7bf55c';
        }
        else if ((fp >= 21) && (fp < 25)){
          var genTable1 = document.querySelector('#female_7');
          genTable1.style.backgroundColor = '#7bf55c';
        }
        else if ((fp >= 25) && (fp < 32)){
          var genTable1 = document.querySelector('#female_8');
          genTable1.style.backgroundColor = '#7bf55c';
        }
        else if (fp >= 32){
          var genTable1 = document.querySelector('#female_9');
          genTable1.style.backgroundColor = '#7bf55c';
        }
    }
    else if (gender === "male"){
      if(age <= 20){
        for(i=0 ; i <= skinfolds.length; i=i+1){
          if(i == 16){
            var fp = fatPercentage_male.agesGroup20[i];
            break;
          } 
          else if(skinfoldWaist <= skinfolds[i]){
            var fp = fatPercentage_male.agesGroup20[i];
            break;
          }
        }
      }
      else if((age > 20) && (age <= 25)){
        for(i=0 ; i <= skinfolds.length; i=i+1){
          if(i == 16){
            var fp = fatPercentage_male.agesGroup25[i];
            break;
          } 
          else if(skinfoldWaist <= skinfolds[i]){
            var fp = fatPercentage_male.agesGroup25[i];
            break;
          }
        }
      }
      else if((age > 25) && (age <= 30)){
        for(i=0 ; i <= skinfolds.length; i=i+1){
          if(i == 16){
            var fp = fatPercentage_male.agesGroup30[i];
            break;
          } 
          else if(skinfoldWaist <= skinfolds[i]){
            var fp = fatPercentage_male.agesGroup30[i];
            break;
          }
        }
      }
      else if((age > 30) && (age <= 35)){
        for(i=0 ; i <= skinfolds.length; i=i+1){
          if(i == 16){
            var fp = fatPercentage_male.agesGroup35[i];
            break;
          } 
          else if(skinfoldWaist <= skinfolds[i]){
            var fp = fatPercentage_male.agesGroup35[i];
            break;
          }
        }
      }
      else if((age > 35) && (age <= 40)){
        for(i=0 ; i <= skinfolds.length; i=i+1){
          if(i == 16){
            var fp = fatPercentage_male.agesGroup40[i];
            break;
          } 
          else if(skinfoldWaist <= skinfolds[i]){
            var fp = fatPercentage_male.agesGroup40[i];
            break;
          }
        }
      }
      else if((age > 40) && (age <= 45)){
        for(i=0 ; i <= skinfolds.length; i=i+1){
          if(i == 16){
            var fp = fatPercentage_male.agesGroup45[i];
            break;
          } 
          else if(skinfoldWaist <= skinfolds[i]){
            var fp = fatPercentage_male.agesGroup45[i];
            break;
          }
        }
      }
      else if((age > 45) && (age <= 50)){
        for(i=0 ; i <= skinfolds.length; i=i+1){
          if(i == 16){
            var fp = fatPercentage_male.agesGroup50[i];
            break;
          } 
          else if(skinfoldWaist <= skinfolds[i]){
            var fp = fatPercentage_male.agesGroup50[i];
            break;
          }
        }
      }
      else if((age > 50) && (age <= 55)){
        for(i=0 ; i <= skinfolds.length; i=i+1){
          if(i == 16){
            var fp = fatPercentage_male.agesGroup55[i];
            break;
          } 
          else if(skinfoldWaist <= skinfolds[i]){
            var fp = fatPercentage_male.agesGroup55[i];
            break;
          }
        }
      }
      else if(age > 55){
        for(i=0 ; i <= skinfolds.length; i=i+1){
          if(i == 16){
            var fp = fatPercentage_male.agesGroup56[i];
            break;
          } 
          else if(skinfoldWaist <= skinfolds[i]){
            var fp = fatPercentage_male.agesGroup56[i];
            break;
          }
        }
      }
      if ((fp >= 2) && (fp < 6)){
        var genTable1 = document.querySelector('#male_5');
        genTable1.style.backgroundColor = '#7bf55c';
        }
        else if ((fp >= 6) && (fp < 14)){
          var genTable1 = document.querySelector('#male_6');
          genTable1.style.backgroundColor = '#7bf55c';
        }
        else if ((fp >= 14) && (fp < 18)){
          var genTable1 = document.querySelector('#male_7');
          genTable1.style.backgroundColor = '#7bf55c';
        }
        else if ((fp >= 18) && (fp < 25)){
          var genTable1 = document.querySelector('#male_8');
          genTable1.style.backgroundColor = '#7bf55c';
        }
        else if (fp >= 25){
          var genTable1 = document.querySelector('#male_9');
          genTable1.style.backgroundColor = '#7bf55c';
        }
    }
    var res = document.querySelector('#fat2RESULT');
    var fatMass =  round_number((weight*(fp/100)),2);
    var skinnyBodyMass = round_number((weight - fatMass),2);
    res.innerHTML = "תוצאה: " + fp + "% אחוז שומן.<br>" + "מסת שומן: " + fatMass + ' ק"ג <br>מסת הגוף הרזה: ' + skinnyBodyMass + ' ק"ג';
  }

  function BMI(){
    var weight = Number(document.querySelector('#bmiWeight').value);
    var height = Number(document.querySelector('#bmiHeight').value);
    height = height / 100;
    var age = Number(document.querySelector('#bmiAge').value);
    var bmi = (weight / (height ** 2));
    var result = document.querySelector('#bmiRESULT');
    result.innerHTML = "תוצאה: " + round_number(bmi,2) + "<br>";
    if (age < 50){
      if (bmi <= 18.5){
        result.innerHTML += "לא תקין, תת-משקל.";
      }else if ((bmi > 18.5) && (bmi <= 25)){
        var p = "המשקל נמצא בטווח התקין.";
        result.innerHTML += p;
      }else if ((bmi > 25) && (bmi <= 30)){          
        var p = "לא תקין, עודף משקל."
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
  
  function VO2max_ver1(){
    var age = document.querySelector('#vo2hrAGE').value;
    var gender = document.querySelector('#gender_vo2hr input:checked').value;
    //console.log(gender);
    if (gender === "female"){
      var HR_max = 226 - age;
    }
    else if (gender === "male"){
      var HR_max = 220 - age;
    }
    var HR_rest = document.querySelector('#vo2hrREST').value;
    HR_rest = HR_rest * 4
    var VO2max = (HR_max / HR_rest)*15.3
    var result = document.querySelector('#vo2hrRESULT');
    result.innerHTML = "דופק מירבי מחושב: " + HR_max + " פעימות לדקה." + "<br> דופק מנוחה: " + HR_rest + " פעימות לדקה.<br>";
    result.innerHTML += 'צח"מ: ' + (round_number(VO2max,2) + ' מ"ל לדקה לק"ג גוף');
  }

  function VO2max_ver2(){
    var weight = document.querySelector('#vo2cooperWEIGHT').value;
    var distance = document.querySelector('#vo2cooperDISTANCE').value;
    var VO2max = (distance-504.9)/44.73
    var VO2maxPersonal = round_number((VO2max * weight)/1000, 2)
    var result = document.querySelector('#vo2cooperRESULT');
    result.innerHTML = '<b>צח"מ: ' + (round_number(VO2max,2) + ' מ"ל לדקה לק"ג גוף.</b><br>' + VO2maxPersonal + ' ליטר חמצן לדקה עבור גוף במשקל ' + weight + ' ק"ג.');

    var gender = document.querySelector('#gender_vo2cooper input:checked').value;
    var age = document.querySelector('#vo2cooperAGE').value;
    var vo2max_male = {
      ages13: [24.0, 30.0, 34.0, 38.0, 41.0],
      ages20: [33.0, 36.4, 42.4, 46.4, 52.4],
      ages30: [31.5, 35.4, 40.9, 44.9, 49.9],
      ages40: [30.2, 33.5, 38.9, 43.7, 48.0],
      ages50: [26.1, 30.9, 35.7, 40.9, 45.3],
      ages60: [20.5, 26.0, 32.2, 36.4, 44.2]
    };
    var vo2max_female = {
      ages13: [25.0, 30.9, 34.9, 38.9, 41.9],
      ages20: [23.6, 28.9, 32.9, 36.9, 41.0],
      ages30: [22.8, 26.9, 31.4, 35.6, 40.0],
      ages40: [21.0, 24.4, 28.9, 32.8, 36.9],
      ages50: [20.2, 22.7, 26.9, 31.4, 35.7],
      ages60: [17.5, 20.1, 24.4, 30.2, 31.4]
    };
    
    var parameter = "#";
    if (gender === "female"){
      if ((VO2max >= 30) && (VO2max < 35)){
        var genTable1 = document.querySelector('#female_1');
        genTable1.style.backgroundColor = '#7bf55c';
      }
      else if ((VO2max >= 35) && (VO2max < 45)){
        var genTable1 = document.querySelector('#female_2');
        genTable1.style.backgroundColor = '#7bf55c';
        genTable1.style.shadow = '#444444';
      }
      else if ((VO2max >= 55) && (VO2max < 65)){
        var genTable1 = document.querySelector('#female_3');
        genTable1.style.backgroundColor = '#7bf55c';
        genTable1.style.shadow = '#444444';
      }
      else if ((VO2max >= 65) && (VO2max < 75)){
        var genTable1 = document.querySelector('#female_4');
        genTable1.style.backgroundColor = '#7bf55c';
        genTable1.style.shadow = '#444444';
      }
      parameter = parameter + "female_";
      if ((age >= 13) && (age <= 19)){
        parameter = parameter + "a";
        for(v = 0; v < vo2max_female.ages13.length+1; v = v + 1){ 
          if (v == 5){
            parameter = parameter + "5";
            break
          }
          else if (VO2max <= vo2max_female.ages13[v]){
            parameter = parameter + String(v);
            break
          }
        }
      }
      else if((age >= 20) && (age <= 29)){
        parameter = parameter + "b";
        for(v = 0; v < vo2max_female.ages20.length+1; v = v + 1){ 
          if (v == 5){
            parameter = parameter + "5";
            break
          }
          else if (VO2max <= vo2max_female.ages20[v]){
            parameter = parameter + String(v);
            break
          }
        }
      }
      else if((age >= 30) && (age <= 39)){
        parameter = parameter + "c";
        for(v = 0; v < vo2max_female.ages30.length+1; v = v + 1){ 
          if (v == 5){
            parameter = parameter + "5";
            break
          }
          else if (VO2max <= vo2max_female.ages30[v]){
            parameter = parameter + String(v);
            break
          }
        }
      }
      else if((age >= 40) && (age <= 49)){
        parameter = parameter + "d";
        for(v = 0; v < vo2max_female.ages40.length+1; v = v + 1){ 
          if (v == 5){
            parameter = parameter + "5";
            break
          }
          else if (VO2max <= vo2max_female.ages40[v]){
            parameter = parameter + String(v);
            break
          }
        }
      }
      else if((age >= 50) && (age <= 59)){
        parameter = parameter + "e";
        for(v = 0; v < vo2max_female.ages50.length+1; v = v + 1){ 
          if (v == 5){
            parameter = parameter + "5";
            break
          }
          else if (VO2max <= vo2max_female.ages50[v]){
            parameter = parameter + String(v);
            break
          }
        }
      }
      else if(age >= 60){
        parameter = parameter + "f";
        for(v = 0; v < vo2max_female.ages60.length+1; v = v + 1){ 
          if (v == 5){
            parameter = parameter + "5";
            break
          }
          else if (VO2max <= vo2max_female.ages60[v]){
            parameter = parameter + String(v);
            break
          }
        }
      }
    }
      else if (gender === "male"){
        if ((VO2max >= 40) && (VO2max < 45)){
        var genTable1 = document.querySelector('#male_1');
        genTable1.style.backgroundColor = '#7bf55c';
        genTable1.style.shadow = '#444444';
        }
        else if ((VO2max >= 45) && (VO2max < 55)){
          var genTable1 = document.querySelector('#male_2');
          genTable1.style.backgroundColor = '#7bf55c';
          genTable1.style.shadow = '#444444';
        }
        else if ((VO2max >= 65) && (VO2max < 75)){
          var genTable1 = document.querySelector('#male_3');
          genTable1.style.backgroundColor = '#7bf55c';
          genTable1.style.shadow = '#444444';
        }
        else if ((VO2max >= 75) && (VO2max < 85)){
          var genTable1 = document.querySelector('#male_4');
          genTable1.style.backgroundColor = '#7bf55c';
          genTable1.style.shadow = '#444444';
        }
        parameter = parameter + "male_";
        if ((age >= 13) && (age <= 19)){
        parameter = parameter + "a";
        for(v = 0; v < vo2max_male.ages13.length+1; v = v + 1){ 
          if (v == 5){
            parameter = parameter + "5";
            break
          }
          else if (VO2max <= vo2max_male.ages13[v]){
            parameter = parameter + String(v);
            break
          }
        }
      }
      else if((age >= 20) && (age <= 29)){
        parameter = parameter + "b";
        for(v = 0; v < vo2max_male.ages20.length+1; v = v + 1){ 
          if (v == 5){
            parameter = parameter + "5";
            break
          }
          else if (VO2max <= vo2max_male.ages20[v]){
            parameter = parameter + String(v);
            break
          }
        }
      }
      else if((age >= 30) && (age <= 39)){
        parameter = parameter + "c";
        for(v = 0; v < vo2max_male.ages30.length+1; v = v + 1){ 
          if (v == 5){
            parameter = parameter + "5";
            break
          }
          else if (VO2max <= vo2max_male.ages30[v]){
            parameter = parameter + String(v);
            break
          }
        }
      }
      else if((age >= 40) && (age <= 49)){
        parameter = parameter + "d";
        for(v = 0; v < vo2max_male.ages40.length+1; v = v + 1){ 
          if (v == 5){
            parameter = parameter + "5";
            break
          }
          else if (VO2max <= vo2max_male.ages40[v]){
            parameter = parameter + String(v);
            break
          }
        }
      }
      else if((age >= 50) && (age <= 59)){
        parameter = parameter + "e";
        for(v = 0; v < vo2max_male.ages50.length+1; v = v + 1){ 
          if (v == 5){
            parameter = parameter + "5";
            break
          }
          else if (VO2max <= vo2max_male.ages50[v]){
            parameter = parameter + String(v);
            break
          }
        }
      }
      else if(age >= 60){
        parameter = parameter + "f";
        for(v = 0; v < vo2max_male.ages60.length+1; v = v + 1){ 
          if (v == 5){
            parameter = parameter + "5";
            break
          }
          else if (VO2max <= vo2max_male.ages60[v]){
            parameter = parameter + String(v);
            break
          }
        }
      }
    }
    if (age >= 13){
      var genTable = document.querySelector(parameter);
      genTable.style.backgroundColor = '#7bf55c';
    }
  }

  function hrTargets(){
    const age = document.querySelector('.content__calculator__input_age').value;
    const gender = document.querySelector('.content__calculator__input_gender').value;
    console.log(gender);
    if (gender === "female"){
      const hrMax = 226 - age;
    }
    else if (gender === "male"){
      const hrMax = 220 - age;
    }
    let hrRest = document.querySelector('.content__calculator__input_hrRest').value;
    hrRest = hrRest * 4;
    const percentages = [0.70, 0.8, 0.85, 0.90, 0.95, 1];
    const verbals = ["אימון שחרור / התאוששות", "אימון אירובי קל", "אימון אירובי טמפו", "אימון אנאירובי ", "אימון אנאירובי עצים"];
    const result = document.querySelector('.content__calculator__result');
    result.innerHTML = "דופק מירבי מחושב: " + hrMmax + " פעימות לדקה." + "<br> דופק מנוחה: " + hrRest + " פעימות לדקה.<br>";
    for (i = 0; i < percentages.length-1; i = i + 1){
      const hrTarget = (hrMax - hrRest)*percentages[i] + hrRest;
      const nextHrTarget = (hrMax - hrRest)*percentages[i+1] + hrRest;
      result.innerHTML += "<br>טווח " + (i+1) + ": " + verbals[i] + "<br>" + percentages[i]*100 + "% מדופק מירבי " + ((Math.round(nextHrTarget))-1) + " - " + Math.round(hrTarget) + "<br>";
    }
  }