function createUser() {
    let request = new XMLHttpRequest();
    let url = "http://localhost:8000";
    let user = document.querySelector("input#user").value;
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            returnResponse(this.responseText);
        }
    };
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({
        "user": user
    }));
}

function returnResponse(resp) {
    let response = JSON.parse(resp);
    let sucess = response["success"];

    let container = document.getElementById("container");
    let card_response = document.getElementById("card-header");

    container.setAttribute("class", "bg-info visible");

    if (sucess === true) {
        let user = response["response"]["user"];
        card_response.textContent = "Usuário criado com sucesso: " + user;
    } else {
        card_response.textContent = "Problema ao cadastrar usuário. Tente novamente!";
    }
}
