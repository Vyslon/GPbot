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
    var loadingIcon = document.createElement("IMG");
    loadingIcon.setAttribute("src", "https://www.freeiconspng.com/uploads/load-icon-png-8.png");
    loadingIcon.setAttribute("width", 30);
    loadingIcon.classList.add("rotate");
    var gp_form = $(".button_send")[0];
    gp_form.appendChild(loadingIcon);
    console.log("status = " + status);
    $(".btn-default").addClass("disabled");
    obj = JSON.parse(data);
    paragraphAnswer.textContent = h + ":" + m + " | GrandPy Bot : Voici tout ce que je peux te dire sur " + obj.parsedText + " : ";
    if (obj.formatted_name != 0) {
      paragraphAnswer.textContent += obj.parsedText + " ce situe " + obj.formatted_name + ". ";
    }
    paragraphAnswer.textContent += " " + obj.info;
    dialogBox.appendChild(paragraphAnswer);
    document.getElementsByClassName("gp_body")[0].scrollTop = document.getElementsByClassName("gp_body")[0].scrollHeight;
    questionContent.value = "";
    setTimeout(function () {
      $(".btn-default").removeClass("disabled");
      $(".rotate").remove();
    }, 2000);
  });
});
