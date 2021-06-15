function getUser() {
    let request = new XMLHttpRequest();
    let url = "http://localhost:8000";
    let user = document.querySelector("input#user").value;
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            returnResponse(this.responseText);
        }
    };
    request.open("GET", url + "/?user=" + user, true);
    request.send();
}

function returnResponse(resp) {
    let response = JSON.parse(resp);
    let sucess = response["success"];

    let container = document.getElementById("container");
    let card_response = document.getElementById("card-header");

    container.setAttribute("class", "bg-info visible");

    if (sucess === true) {
        let user = response["response"]["user"];
        card_response.textContent = "Usuário encontrado: " + user;
    } else {
        card_response.textContent = "Usuário não existe!";
    }
}
