function sendMessage() {
    let request = new XMLHttpRequest();
    let url = "http://localhost:8000";
    let sender = document.querySelector("input#sender").value;
    let receiver = document.querySelector("input#receiver").value;
    let subject = document.querySelector("input#subject").value;
    let body_message = document.querySelector("textarea#body-message").value;
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            returnResponse(this.responseText);
        }
    };
    request.open("POST", url + "/sendmail", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({
        "sender": sender,
        "receiver": receiver,
        "subject": subject,
        "body": body_message
    }));
}

function returnResponse(resp) {
    let response = JSON.parse(resp);
    let sucess = response["success"];

    let container = document.getElementById("container");
    let card_response = document.getElementById("card-header");

    container.setAttribute("class", "bg-info visible");

    if (sucess === true) {
        card_response.textContent = "Mensagem enviada com sucesso!";
    } else {
        card_response.textContent = "Problema ao enviar mensagem. Tente novamente!";
    }
}
