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

function openMessage() {
    let id = event.srcElement.id;
    window.location.href = "open_mail.html?id=" + id;
}

function deleteMessage() {
    let request = new XMLHttpRequest();
    let url = "http://localhost:8000";
    let id = event.srcElement.id;
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
        }
    };
    request.open("DELETE", url + "/deletemail?id=" + id, true);
    request.send();
    alert("Mensagem apagada! Recarregue para atualizar a página!")
}

function returnResponse(resp) {
    let response = JSON.parse(resp);
    let success = response["success"];

    if (success === true) {
        let received = response["response"]["received"];
        let sent = response["response"]["sent"];

        let email_list = document.getElementById("email_list");
        let card_received = document.getElementById("received");
        let card_sent = document.getElementById("sent");

        if (received.length !== 0) {
            for (i = 0; i < received.length; i++) {
                let ul = document.createElement("ul");
                ul.setAttribute("class", "list-group list-group-horizontal");

                let li_sender = document.createElement("li");
                li_sender.setAttribute("class", "list-group-item flex-fill");
                li_sender.textContent = received[i].sender;

                ul.appendChild(li_sender);

                let li_subject = document.createElement("li");
                li_subject.setAttribute("class", "list-group-item flex-fill");
                li_subject.textContent = received[i].subject;

                ul.appendChild(li_subject);

                let li_open = document.createElement("li");
                li_open.setAttribute("class", "list-group-item");

                let open = document.createElement("i");
                open.setAttribute("class", "fa fa-envelope-open-o");
                open.setAttribute("id", received[i].id);
                open.setAttribute("onclick", "openMessage()");

                li_open.appendChild(open);
                ul.appendChild(li_open);

                let li_delete = document.createElement("li");
                li_delete.setAttribute("class", "list-group-item");

                let trash = document.createElement("i");
                trash.setAttribute("class", "fa fa-trash-o");
                trash.setAttribute("id", received[i].id);
                trash.setAttribute("onclick", "deleteMessage()");

                li_delete.appendChild(trash);
                ul.appendChild(li_delete);
                card_received.appendChild(ul);
            }
        }

        if (sent.length !== 0) {
            for (i = 0; i < sent.length; i++) {
                let ul = document.createElement("ul");
                ul.setAttribute("class", "list-group list-group-horizontal");

                let li_receiver = document.createElement("li");
                li_receiver.setAttribute("class", "list-group-item flex-fill");
                li_receiver.textContent = sent[i].receiver;

                ul.appendChild(li_receiver);

                let li_subject = document.createElement("li");
                li_subject.setAttribute("class", "list-group-item flex-fill");
                li_subject.textContent = sent[i].subject;

                ul.appendChild(li_subject);

                let li_open = document.createElement("li");
                li_open.setAttribute("class", "list-group-item");

                let open = document.createElement("i");
                open.setAttribute("class", "fa fa-envelope-open-o");
                open.setAttribute("id", sent[i].id);
                open.setAttribute("onclick", "openMessage()");

                li_open.appendChild(open);
                ul.appendChild(li_open);

                let li_delete = document.createElement("li");
                li_delete.setAttribute("class", "list-group-item");

                let trash = document.createElement("i");
                trash.setAttribute("class", "fa fa-trash-o");
                trash.setAttribute("id", sent[i].id);
                trash.setAttribute("onclick", "deleteMessage()");

                li_delete.appendChild(trash);
                ul.appendChild(li_delete);
                card_sent.appendChild(ul);
            }
        }
    }

    email_list.setAttribute("class", "container text-center visible");
}
