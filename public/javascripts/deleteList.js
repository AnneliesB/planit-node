getDeleteListInfo();

function getDeleteListInfo() {
    let l = document.querySelector(".lists__overview--container");

    l.addEventListener("click", (e) => {
        if (e.target.matches(".list__delete")) {
            let target = e.target;
            let list = target.parentElement.parentElement;
            let id = target.dataset.id;
            let listname = target.dataset.listname;
            let removed = "1";

            deleteListPopup(target, id, removed, listname, list);
        }
    });
}

function deleteListPopup(target, id, removed, listname, list) {
    background.style.display = "block";

    let div = `<div class="popup popup__delete--list">
                    <h2 class="popup__title popup__title--deletelist">Are you sure you want to delete: ${listname}?</h2>
                    <div class="popup__input--container">
                        <div class="popup__button--container">
                            <p class="popup__button popup__button--cancel-delete">Cancel</p>
                            <p class="popup__button popup__button--save-delete">Delete</p>
                        </div>
                    </div>
                </div>`;

    lists.insertAdjacentHTML("beforeend", div);
    handleListDeleteOption(target, id, removed, listname, list)
}

function handleListDeleteOption(target, id, removed, listname, list) {
    let popupDelete = document.querySelector(".popup__delete--list");
    let popupCancel = document.querySelector(".popup__button--cancel-delete");
    let popupSave = document.querySelector(".popup__button--save-delete");

    background.addEventListener("click", (e) => {
        popupDelete.parentNode.removeChild(popupDelete);
        background.style.display = "none";
    });

    popupCancel.addEventListener("click", (e) => {
        popupDelete.parentNode.removeChild(popupDelete);
        background.style.display = "none";
    });

    popupSave.addEventListener("click", (e) => {
        putListDeleted(target, id, removed, listname, popupDelete, list);
    });


}

function putListDeleted(target, id, removed, listname, popupDelete, list) {
    fetch(url + "userLists", {
            method: "put",
            "headers": {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "id": id,
                "removed": removed
            })
        })
        .then(result => {
            return result.json();
        })
        .then(json => {
            if (json.status == "success") {
                popupDelete.parentNode.removeChild(popupDelete);
                background.style.display = "none";
                list.parentNode.removeChild(list);
            }
        })
        .catch(err => {
            console.log(err);
        });
}