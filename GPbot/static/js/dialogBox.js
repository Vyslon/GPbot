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
  $.post("/parse",
  {
    text: questionContent.value
  },
  function(data, status) {
    if (status >= 200 && status < 400) {
      $(".btn-default").css("display", "none");
      obj = JSON.parse(data);
      console.log("test");
      paragraphAnswer.textContent = h + ":" + m + " | GrandPy Bot : " + obj.parsedText;
      dialogBox.appendChild(paragraphAnswer);
      document.getElementsByClassName("gp_body")[0].scrollTop = document.getElementsByClassName("gp_body")[0].scrollHeight;
      questionContent.value = "";
      $(".btn-default").css("display", "inline-block");
    } else {
      console.error("Status : " + status)
    }
  });
});

//Flask "requests" here ?
//USE BEAUTIFY
