updateStatus();


function updateStatus() {
    let p = document.querySelector(".planner__week--container");

    p.addEventListener("click", (e) => {
        if (e.target.matches(".planner__todo--check")) {
            let icon = e.target;
            if (icon.hasAttribute('data-id')) {
                let id = icon.dataset.id;
                let status = icon.dataset.status;
                let newStatus;
                if (status === "false") {
                    newStatus = true;
                } else {
                    newStatus = false;
                }
                let removed = false;
                let option = "status";
                statusFetch(id, newStatus, icon, removed, option);
            }


        }
    });
}

function statusFetch(id, status, icon, removed, option) {
    fetch(url + "todos", {
            method: "put",
            "headers": {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "id": id,
                "completed": status,
                "removed": removed
            })
        })
        .then(result => {
            return result.json();
        })
        .then(json => {
            if (json.status == "success") {
                if (option == "status") {
                    if (json.todoStatus == 0) {
                        icon.setAttribute('name', 'radio-button-off');
                        icon.setAttribute('data-status', json.todoStatus);
                        icon.classList.remove("planner__todo--checked");
                        icon.classList.add("planner__todo--unchecked");
                        icon.parentElement.style.opacity="1";
                    } else {
                        icon.setAttribute('name', 'checkmark-circle');
                        icon.setAttribute('data-status', json.todoStatus);
                        icon.classList.remove("planner__todo--unchecked");
                        icon.classList.add("planner__todo--checked");
                        icon.parentElement.style.opacity="0.5";
                    }
                } else if (option == "remove"){
                    let target = icon.parentElement;
                    target.parentNode.removeChild(target);
                }

            }
        })
        .catch(err => {
            console.log(err);
        });
}