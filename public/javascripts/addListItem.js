addTodoItemListener();

function addTodoItemListener() {
    let li = document.querySelector(".lists__overview--container");

    li.addEventListener("keyup", (e) => {
        if (e.keyCode == 13) {
            if (e.target.matches(".list__todo--input")) {
                if (e.target.value.length > 0) {
                    let target = e.target;
                    let targetParent = target.parentElement;
                    let todoContainer = targetParent.previousElementSibling;
                    let text = e.target.value;
                    let id = e.target.dataset.id;
                    let user = e.target.dataset.user;
                    addListItem(text, id, user, target, todoContainer); 

                }
            }
        }
    });
}

function addListItem(text, id, user, target, todoContainer) {
    fetch(url + "listItems", {
            method: "post",
            "headers": {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "user": user,
                "description": text,
                "id": id,
                "status": "0",
                "removed": "0"
            })
        })
        .then(result => {
            return result.json();
        })
        .then(json => {
            if (json.status == "success") {
                console.log("tester");
                let todo = `<div class="list__todo">
                            <ion-icon name="radio-button-off" class="list__todo--check list__todo--unchecked" data-id="${json.data.listitem._id}" data-status="${json.data.listitem.status}"></ion-icon>
                            <ion-icon name="close" class="list__todo--delete" data-id="${json.data.listitem._id}" data-status="${json.data.listitem.status}"></ion-icon>
                            <p class="list__todo--description">${sanitizeHTML(json.data.listitem.description)}</p>
                        </div>`;
                todoContainer.insertAdjacentHTML("beforeend", todo);
                target.value = "";
            }
        })
        .catch(err => {
            console.log(err);
        });
}