var dialogBox = document.getElementById("dialog");
var addQuestion = document.getElementById("ask");

$("#ask").click(function(e){
  e.preventDefault();
  var questionContent = document.getElementById("question");
  var paragraph = document.createElement("p");
  var paragraphAnswer = document.createElement("p");
  var date = new Date();
  var h = date.getHours();
  if (h<10) {h = "0" + h}
  var m = date.getMinutes();
  if (m<10) {m = "0" + m}
  paragraph.textContent = h + ":" + m + " | Vous : " + questionContent.value;
  questionContent.value = "";
  dialogBox.appendChild(paragraph);
  document.getElementsByClassName("gp_body")[0].scrollTop = document.getElementsByClassName("gp_body")[0].scrollHeight;
  //Loading Icon
  paragraphAnswer.style.fontWeight = "500";
  paragraphAnswer.style.color = "white";
  h = date.getHours();
  if (h<10) {h = "0" + h}
  m = date.getMinutes();
  if (m<10) {m = "0" + m}
  paragraphAnswer.style.backgroundColor = "rgba(95, 99, 104, 0.7)";
  paragraphAnswer.textContent = h + ":" + m + " | GrandPy Bot : test __";
  dialogBox.appendChild(paragraphAnswer);
  document.getElementsByClassName("gp_body")[0].scrollTop = document.getElementsByClassName("gp_body")[0].scrollHeight;
});

//Flask "requests" here ?
//USE BEAUTIFY
