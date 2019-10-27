const loadLists = () => {
    fetch(url + "userLists", {
            "headers": {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
        .then(result => {
            return result.json();
        })
        .then(json => {
            let lists = json.data.lists;
            let listsArray = [];

            for (let i = 0; i < lists.length; i++) {
                if (lists[i].user == localStorage.getItem('user') && lists[i].removed != 1) {
                    listsArray.push(lists[i]);
                }
            }
            showUserLists(listsArray);
        })
        .catch(err => {
            console.log(err);
        });
}

loadLists();

function showUserLists(listsArray) {
    let listOverview = document.querySelector(".lists__overview");
    for (let i = 0; i < listsArray.length; i++) {

        let list = `<div class="lists__list" data-id="${listsArray[i]._id}">
                        <div class="list__title--container">
                            <h2 class="list__todo--title">${listsArray[i].listname}</h2>
                            <ion-icon name="close" class="list__delete" data-id="${listsArray[i]._id}" data-listname="${listsArray[i].listname}"></ion-icon>
                        </div>
                        <div class="list__todo--container">
                        </div>
                        <div class="list__todo--add">
                            <ion-icon name="radio-button-off" class="list__todo--check list__todo--check--unchecked md hydrated" role="img" aria-label="radio button off"></ion-icon>
                            <input type="text" class="list__todo--input" data-id="${listsArray[i]._id}" data-user="${localStorage.getItem('user')}">
                        </div>
                    </div>`;

        listOverview.insertAdjacentHTML("beforeend", list);
    }
    loadTodoItems();
}

function loadTodoItems() {
    fetch(url + "listItems", {
            "headers": {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
        .then(result => {
            return result.json();
        })
        .then(json => {
            let listitems = json.data.listitems;
            let listItemArray = [];

            for (let i = 0; i < listitems.length; i++) {
                if (listitems[i].user == localStorage.getItem('user') && listitems[i].removed != 1) {
                    listItemArray.push(listitems[i]);
                }
            }
            showTodoItems(listItemArray);

        })
        .catch(err => {
            console.log(err);
        });
}

function showTodoItems(listItemArray) {
    let ll = document.querySelectorAll(".lists__list");

    forEach(ll, (index, value) => {
        let id = value.dataset.id;
        for (let i = 0; i < listItemArray.length; i++) {
            let status;
            let listItemClass;
            let opacity;
            if (listItemArray[i].status == 0) {
                status = "radio-button-off";
                listItemClass = "list__todo--check--unchecked";
                opacity = `style="opacity:1"`;
            } else {
                status = "checkmark-circle";
                listItemClass = "list__todo--check--checked";
                opacity = `style="opacity:0.5"`;
            }

            if (listItemArray[i].id == id) {
                let listitem = `<div class="list__todo" ${opacity}>
                                <ion-icon name="${status}" class="list__todo--check ${listItemClass}" data-id="${listItemArray[i]._id}" data-status="${listItemArray[i].status}"></ion-icon>
                                <ion-icon name="close" class="list__todo--delete" data-id="${listItemArray[i]._id}" data-status="${listItemArray[i].status}"></ion-icon>
                                <p class="list__todo--description">${sanitizeHTML(listItemArray[i].description)}</p>
                            </div>`;
                value.children[1].insertAdjacentHTML("beforeend", listitem);
            }
        }
    });
}