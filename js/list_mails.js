function listMessages() {
  let request = new XMLHttpRequest();
  let url = "http://localhost:8000";
  let user = document.querySelector("input#user").value;
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      returnResponse(this.responseText);
    }
  };
  request.open("GET", url + "/listmails?user=" + user, true);
  request.send();
}

function returnResponse(resp) {
  let response = JSON.parse(resp);
  let sucess = response["success"];
  let received = response["response"]["received"];
  let sent = response["response"]["sent"];
  let container = document.getElementById("container");
  let card_response = document.getElementById("card-response");
  let text_received = document.createElement("h5");
  let text_sent = document.createElement("h5");
}
