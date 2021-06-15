function loadInfo() {
    id = location.search.split("id=")[1]
    let request = new XMLHttpRequest();
    let url = "http://localhost:8000";
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);

            let sender = document.querySelector("input#sender");
            let receiver = document.querySelector("input#receiver");
            let subject = document.querySelector("input#subject");
            let body_message = document.querySelector("textarea#body-message");
            let card = document.getElementById("card_body");

            sender.value = response["response"]["sender"];
            receiver.value = response["response"]["receiver"];
            subject.value = response["response"]["subject"];
            body_message.value = response["response"]["body"];

            replies = response["response"]["replies"];
            if (replies.length !== 0) {
                let title = document.createElement("h1");
                title.textContent = "Respostas";
                card.appendChild(title);
                for (i = 0; i < replies.length; i++) {
                    let ul = document.createElement("ul");
                    ul.setAttribute("class", "list-group list-group-horizontal");

                    let datetime = document.createElement("li");
                    datetime.setAttribute("class", "list-group-item flex-fill");
                    datetime.textContent = replies[i].datetime;

                    ul.appendChild(datetime);

                    let replied_by = document.createElement("li");
                    replied_by.setAttribute("class", "list-group-item flex-fill");
                    replied_by.textContent = replies[i].replied_by;

                    ul.appendChild(replied_by);

                    let reply = document.createElement("li");
                    reply.setAttribute("class", "list-group-item flex-fill");
                    reply.textContent = replies[i].reply;

                    ul.appendChild(reply);

                    card.appendChild(ul);
                }
            }
        }
    };
    request.open("GET", url + "/openmail?id=" + id, true);
    request.send();
}

function forwardMessage() {
    id = location.search.split("id=")[1]
    let request = new XMLHttpRequest();
    let url = "http://localhost:8000";

    let forward_to = document.querySelector("input#forward_to").value;
    let container = document.getElementById("container");
    let card_response = document.getElementById("card-header");

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            container.setAttribute("class", "bg-info visible");
            if (response["success"] === true) {
                card_response.textContent = "Mensagem encaminhada com sucesso!";
            } else {
                card_response.textContent = "Falha ao encaminhar mensagem!";
            }
        }
    }
    request.open("PUT", url + "/forwardmail", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({
        "id": id,
        "forward_to": forward_to
    }));
}

function replyMessage() {
    id = location.search.split("id=")[1]
    let request = new XMLHttpRequest();
    let url = "http://localhost:8000";

    let replied_by = document.querySelector("input#replied_by").value;
    let reply = document.querySelector("textarea#reply").value;
    let container = document.getElementById("container");
    let card_response = document.getElementById("card-header");

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            container.setAttribute("class", "bg-info visible");
            if (response["success"] === true) {
                card_response.textContent = "Resposta enviada com sucesso!";
            } else {
                card_response.textContent = "Falha ao responder mensagem!";
            }
        }
    }
    request.open("PUT", url + "/replymail", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({
        "id": id,
        "replied_by": replied_by,
        "reply": reply
    }));
}
