function round_number(value, decimals){
    var shifter = Math.pow(10,decimals);
    return Math.round(value * shifter) / shifter;
  }

  function personalDetails(){
    var namePerson = document.querySelector("#namePerson").value;
    var nameData = document.querySelector("#namePerson1");
    nameData.innerHTML = "שם: " + namePerson;
    var genderPerson = document.querySelector("#genderPerson input:checked").value;
    var genderData = document.querySelector("#genderPerson1");
    genderData.innerHTML = "מין: " + genderPerson;
    var agePerson = document.querySelector("#agePerson").value;
    var ageData = document.querySelector("#agePerson1");
    ageData.innerHTML = "גיל: " + agePerson;
    var datePerson = document.querySelector("#datePerson").value;
    var dateData = document.querySelector("#datePerson1");
    dateData.innerHTML = "תאריך: " + datePerson;
    var timePerson = document.querySelector("#timePerson").value;
    var timeData = document.querySelector("#timePerson1");
    timeData.innerHTML = "שעה: " + timePerson;
  }
  var SUMMARYequilibrioum = 0;
  var SUMMARYsideToSide = 0;
  var SUMMARYoneLeg = 0;
  var SUMMARYpassOver = 0;

  function summaryALL(){
    var SUMMARY = SUMMARYequilibrioum + SUMMARYoneLeg + SUMMARYpassOver + SUMMARYsideToSide;
    var sum = document.querySelector("#summaryALL");
    sum.innerHTML = SUMMARY + " ציון משוקלל.";
  }

  function equilibriumTest1(){
    var equilibrium60 = Number(document.querySelector('#equilibrium60').value);
    var equilibrium45 = Number(document.querySelector('#equilibrium45').value);
    var equilibrium30 = Number(document.querySelector('#equilibrium30').value);
    
    SUMMARYequilibrioum = equilibrium60 + equilibrium45 + equilibrium30;

    var RESULT = document.querySelector('#equilibriumRESULT');
    var SUMMARY = document.querySelector("#equilibriumSUMMARY");
    var RESULT1 = document.querySelector('#equilibriumRESULT1');
    RESULT1.innerHTML = SUMMARYequilibrioum + " נקודות.<br>"
    RESULT1.innerHTML += "<br>ניקוד מפורט יותר של המבדק מופיע בתחתית העמוד.";
    RESULT.innerHTML = "קורה ראשונה: " + equilibrium60 + " צעדים תקינים.<br>";
    RESULT.innerHTML += "קורה שניה: " + equilibrium45 + " צעדים תקינים.<br>";
    RESULT.innerHTML += "קורה שלישית: " + equilibrium30 + " צעדים תקינים.<br>";
    SUMMARY.innerHTML = SUMMARYequilibrioum + " נקודות.<br>"
  }

  function jumpingSideToSide(){
    var firstSet = Number(document.querySelector("#firstSet").value);
    var secondSet = Number(document.querySelector("#SecondSet").value);
    SUMMARYsideToSide = firstSet + secondSet;
    var RESULT = document.querySelector("#jumpingSideToSideRESULT");
    var RESULT1 = document.querySelector("#jumpingSideToSideRESULT1");
    var SUMMARY = document.querySelector("#jumpingSideToSideSUMMARY");
    RESULT1.innerHTML = SUMMARYsideToSide + " נקודות.<br>";
    RESULT1.innerHTML += "<br>ניקוד מפורט יותר של המבדק מופיע בתחתית העמוד.";
    RESULT.innerHTML = "נסיון ראשון: " + firstSet + " ניתורים.<br>";
    RESULT.innerHTML += "נסיון שני: " + secondSet + " ניתורים.<br>";
    SUMMARY.innerHTML = SUMMARYsideToSide + " נקודות.<br>";
    var summaryALL = document.querySelector("#summaryALL");
    }

  function passOverTest(){
    var firstSet = Number(document.querySelector("#firstSetPass").value);
    var secondSet = Number(document.querySelector("#secondSetPass").value);
    SUMMARYpassOver = firstSet + secondSet;
    var RESULT = document.querySelector("#passOverRESULT");
    var RESULT1 = document.querySelector("#passOverRESULT1");
    var SUMMARY = document.querySelector("#passOverSUMMARY");
    RESULT1.innerHTML = SUMMARYpassOver + " נקודות.<br>";
    RESULT1.innerHTML += "<br>ניקוד מפורט יותר של המבדק מופיע בתחתית העמוד.";
    RESULT.innerHTML = "נסיון ראשון: " + firstSet + " מעברים תקינים.<br>";
    RESULT.innerHTML += "נסיון שני: " + secondSet + " מעברים תקינים.<br>";
    SUMMARY.innerHTML = SUMMARYpassOver + " נקודות.<br>";
    var summaryALL = document.querySelector("#summaryALL");
  }

  function jumpingOneLegTest2(){
    var stage = 0;
    var points = 0;
    var left = 0;
    var right = 0;
    for(s = 1; s <= 12; s = s + 1){
      stage = s;
      var id_stage = "#stage" + s + " input:checked";
      var currentPoints = Number(document.querySelector(id_stage).value);  
      points += currentPoints;
      if (currentPoints == 3){
        var id_legs = "#legs" + s + "1" + " input:checked";
        leg = document.querySelector(id_legs).value;
        if(leg == "right"){
            right = right + 1;
          }else if(leg == "left"){
            left = left + 1;
          }
      }else if(currentPoints == 2){
        for(i = 1; i < 3; i = i + 1){
          var id_legs = "#legs" + s + i + " input:checked";
          leg = document.querySelector(id_legs).value;
          if(leg == "right"){
            right = right + 1;
          }else if(leg == "left"){
            left = left + 1;
          }
        }
      }else if(currentPoints == 1){
        for(i = 1; i < 4; i = i + 1){
          var id_legs = "#legs" + s + i + " input:checked";
          leg = document.querySelector(id_legs).value;
          if(leg == "right"){
            right = right + 1;
          }else if(leg == "left"){
            left = left + 1;
          }
        }
      }else if(currentPoints == 0){
        for(i = 1; i < 4; i = i + 1){
          var id_legs = "#legs" + s + i + " input:checked";
          leg = document.querySelector(id_legs).value;
          if(leg == "right"){
            right = right + 1;
          }else if(leg == "left"){
            left = left + 1;
          }
        }
        break;
      }
    }
  var RESULT = document.querySelector("#jumpingOneLegRESULT");
  var SUMMARY = document.querySelector("#jumpingOneLegSUMMARY");
  var RESULT1 = document.querySelector("#jumpingOneLegRESULT1");
  RESULT1.innerHTML = points + " נקודות.<br>";
  RESULT1.innerHTML += "<br>ניקוד מפורט יותר של המבדק מופיע בתחתית העמוד.";
  RESULT.innerHTML = "שלב: " + stage + "<br>מס' נסיונות כולל: " + (right+left) + "<br>";
  RESULT.innerHTML += "נסיונות ברגל ימין: " + right + "<br>נסיונות ברגל שמאל: " + left + "<br>";
  SUMMARY.innerHTML = points + " נקודות.<br>"
  SUMMARYoneLeg = points;
  }
