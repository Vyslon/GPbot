var dialogBox = document.getElementById("dialog");
var addQuestion = document.getElementById("ask");

$("#ask").click(function(e){
  e.preventDefault();
  var questionContent = document.getElementById("question");
  var paragraph = document.createElement("p");
  paragraph.textContent = "Vous : " + questionContent.value;
  questionContent.value = "";
  dialogBox.appendChild(paragraph);
  document.getElementsByClassName("gp_body")[0].scrollTop = document.getElementsByClassName("gp_body")[0].scrollHeight;
});

//USE BEAUTIFY
