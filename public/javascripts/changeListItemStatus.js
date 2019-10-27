updateListItemStatus();

function updateListItemStatus() {

    let ls = document.querySelector(".lists__overview--container");

    ls.addEventListener("click", (e) => {
        if (e.target.matches(".list__todo--check")) {
            let icon = e.target;
            if (icon.hasAttribute('data-id')) {
                let id = icon.dataset.id;
                let status = icon.dataset.status;
                let newStatus;
                if (status == 0) {
                    newStatus = 1;
                } else {
                    newStatus = 0;
                }
                let removed = 0;
                let option = "status";
                putListItemStatus(id, newStatus, icon, removed, option);
            }
        }
    });

}

function putListItemStatus(id, newStatus, icon, removed, option) {
    fetch(url + "listItems", {
            method: "put",
            "headers": {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "id": id,
                "status": newStatus,
                "removed": removed
            })
        })
        .then(result => {
            return result.json();
        })
        .then(json => {
            if (json.status == "success") {
                console.log("test");
                if (option == "status") {
                    if (json.listitemStatus == 0) {
                        icon.setAttribute('name', 'radio-button-off');
                        icon.setAttribute('data-status', json.listitemStatus);
                        icon.classList.remove("list__todo--check--checked");
                        icon.classList.add("list__todo--check--unchecked");
                        icon.parentElement.style.opacity = "1";
                    } else {
                        icon.setAttribute('name', 'checkmark-circle');
                        icon.setAttribute('data-status', json.listitemStatus);
                        icon.classList.remove("list__todo--check--unchecked");
                        icon.classList.add("list__todo--check--checked");
                        icon.parentElement.style.opacity = "0.5";
                    }
                } else if (option == "remove") {
                    let target = icon.parentElement;
                    target.parentNode.removeChild(target);
                }

            }
        })
        .catch(err => {
            console.log(err);
        });
}