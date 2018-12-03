var dialogBox = document.getElementById("dialog");
var addQuestion = document.getElementById("ask");
map_dom = document.createElement("div");
map_dom.setAttribute("id", "map");
dialogBox.appendChild(map_dom);
var map;
var marker;
var nbRequests = 0;

function initMap(){
  map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 14
    });
  map.setCenter({lat: -34.397, lng: 150.644});
}

$("#map").hide();

$("#ask").click(function(e) {
  e.preventDefault();
  var questionContent = document.getElementById("question");
  var paragraph = document.createElement("p");
  var paragraphAnswer = document.createElement("p");
  paragraphAnswer.classList.add("answer");
  var date = new Date();
  var h = date.getHours();
  if (h < 10) {
    h = "0" + h
  }
  var m = date.getMinutes();
  if (m < 10) {
    m = "0" + m
  }
  paragraph.textContent = h + ":" + m + " | Vous : " + questionContent.value;
  dialogBox.appendChild(paragraph);
  document.getElementsByClassName("gp_body")[0].scrollTop = document.getElementsByClassName("gp_body")[0].scrollHeight;
  paragraphAnswer.style.fontWeight = "500";
  paragraphAnswer.style.color = "white";
  h = date.getHours();
  if (h < 10) {
    h = "0" + h
  }
  m = date.getMinutes();
  if (m < 10) {
    m = "0" + m
  }
  paragraphAnswer.style.backgroundColor = "rgba(95, 99, 104, 0.7)";
  $.post("/parse", {
      text: questionContent.value
    },
    function(data, status) {
      $(".rotate").remove();
      var loadingIcon = document.createElement("IMG");
      loadingIcon.setAttribute("src", "https://www.freeiconspng.com/uploads/load-icon-png-8.png");
      loadingIcon.setAttribute("width", 30);
      loadingIcon.classList.add("rotate");
      var gp_form = $(".button_send")[0];
      gp_form.appendChild(loadingIcon);
      console.log("status = " + status);
      $(".btn-default").addClass("disabled");
      obj = JSON.parse(data);
      if ((obj.parsedText.length <= 1) || (obj.formatted_name == 0)) {
        paragraphAnswer.textContent = h + ":" + m + " | GrandPy Bot : Je ne suis pas certains de comprendre ta question!";
        dialogBox.appendChild(paragraphAnswer);
      }
      else {
        paragraphAnswer.textContent = h + ":" + m + " | GrandPy Bot : Voici tout ce que je peux te dire sur " + obj.parsedText + " : ";
        if (obj.formatted_name != 0) {
          paragraphAnswer.textContent += obj.parsedText + " ce situe " + obj.formatted_name + ". ";
        }
        paragraphAnswer.textContent += " " + obj.info;
        dialogBox.appendChild(paragraphAnswer);
        if ((obj.latitude !== 0) || (obj.longitude !== 0)) {
          map.setCenter({lat: obj.latitude, lng: obj.longitude});
          if (marker) {
            marker.setPosition({lat: obj.latitude, lng: obj.longitude});
          }
          else {
            marker = new google.maps.Marker({
              position: {lat: obj.latitude, lng: obj.longitude},
              map: map
            });
          }
          $("#map").show();
          $("#map").insertAfter(document.getElementsByClassName("answer")[nbRequests]);
          nbRequests += 1;
        }
        $(".btn-default").removeClass("disabled");
      }
      document.getElementsByClassName("gp_body")[0].scrollTop = document.getElementsByClassName("gp_body")[0].scrollHeight;
      questionContent.value = "";
    });
});
