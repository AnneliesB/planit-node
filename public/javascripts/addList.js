let addListButton = document.querySelector(".lists__button--add--link");
let background = document.querySelector(".background");
let lists = document.querySelector(".lists");

addListButton.addEventListener("click", (e) => {
    background.style.display = "block";

    let div = `<div class="popup">
                    <h2 class="popup__title popup__title--addlist">Name your new list</h2>
                    <div class="popup__input--container">
                        <input type="text" data-user="${localStorage.getItem('user')}" class="popup__input">
                        <div class="popup__button--container">
                            <p class="popup__button popup__button--cancel-add">Cancel</p>
                            <p class="popup__button popup__button--save-add">Save</p>
                        </div>
                    </div>
                </div>`;

    lists.insertAdjacentHTML("beforeend", div);

    handlePopupEvent();
});




function handlePopupEvent() {
    let popup = document.querySelector(".popup");
    let popupCancel = document.querySelector(".popup__button--cancel-add");
    let popupSave = document.querySelector(".popup__button--save-add");
    let popupInput = document.querySelector(".popup__input");

    background.addEventListener("click", (e) => {
        popup.parentNode.removeChild(popup);
        background.style.display = "none";
    });

    popupCancel.addEventListener("click", (e) => {
        popup.parentNode.removeChild(popup);
        background.style.display = "none";
    });

    popupSave.addEventListener("click", (e) => {
        saveListData(popupInput, popup);
        /*  */
    });
}

function saveListData(popupInput, popup) {
    let listname = popupInput.value;
    let user = popupInput.dataset.user;

    fetch(url + "userLists", {
            method: "post",
            "headers": {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "listname": listname,
                "user": user,
                "status": "0",
                "removed": "0"
            })
        })
        .then(result => {
            return result.json();
        })
        .then(json => {
            if (json.status == "success") {
                popup.parentNode.removeChild(popup);
                background.style.display = "none";
                insertNewList(json);
            }
        })
        .catch(err => {
            console.log(err);
        });
}

function insertNewList(json) {
    let listOverview = document.querySelector(".lists__overview");

    let list = `<div class="lists__list" data-id="${json.data.list._id}">
                    <div class="list__title--container">
                        <h2 class="list__todo--title">${json.data.list.listname}</h2>
                        <ion-icon name="close" class="list__delete" data-id="${json.data.list._id}" data-listname="${json.data.list.listname}"></ion-icon>
                    </div>
                    <div class="list__todo--container">
                    </div>
                    <div class="list__todo--add">
                        <ion-icon name="radio-button-off" class="list__todo--check list__todo--check--unchecked md hydrated" role="img" aria-label="radio button off"></ion-icon>
                        <input type="text" class="list__todo--input" data-id="${json.data.list._id}" data-user="${localStorage.getItem('user')}">
                    </div>
                </div>`;

    listOverview.insertAdjacentHTML("afterbegin", list);
}