addTodoListener();

function addTodoListener() {
    let k = document.querySelector(".planner__week--container");

    k.addEventListener("keyup", (e) => {
        if (e.keyCode == 13) {
            if (e.target.matches(".planner__todo--input")) {
                if (e.target.value.length > 0) {
                    let target = e.target;
                    let targetParent = target.parentElement;
                    let todoContainer = targetParent.previousElementSibling;
                    let text = e.target.value;
                    let date = e.target.dataset.date;
                    let user = e.target.dataset.user;
                    addTodo(text, date, user, target, todoContainer);
                }
            }
        }
    });
}

function addTodo(text, date, user, target, todoContainer) {
    fetch(url + "todos", {
        method: "post",
            "headers": {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "user": user,
                "text": text,
                "date": date,
                "completed": false,
                "removed": false
            })
        })
        .then(result => {
            return result.json();
        })
        .then(json => {
            if (json.status == "success") {
                let todo = `<div class="planner__todo">
                                <ion-icon name="radio-button-off" class="planner__todo--check planner__todo--unchecked" data-id="${json.data.todo._id}" data-status="${json.data.todo.completed}"></ion-icon>
                                <ion-icon name="close" class="planner__todo--delete" data-id="${json.data.todo._id}" data-status="${json.data.todo.completed}"></ion-icon>
                                <p class="planner__todo--description">${sanitizeHTML(json.data.todo.text)}</p>
                            </div>`;
                todoContainer.insertAdjacentHTML("beforeend", todo);
                target.value = "";
            }
        })
        .catch(err => {
            console.log(err);
        });
}