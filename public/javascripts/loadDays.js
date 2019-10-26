let weekContainer = document.querySelector(".planner__week");

let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

loadDays(days);
showCurrentWeek();
showPreviousWeek();
showFollowingWeek();


const loadTodos = () => {
    fetch(url, {
            "headers": {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
        .then(result => {
            return result.json();
        })
        .then(json => {
            let todos = json.data.todos;
            let todosArray = [];

            for (let i = 0; i < todos.length; i++) {
                if (todos[i].user == localStorage.getItem('user') && todos[i].removed != true) {
                    todosArray.push(todos[i]);
                }
            }
            showTodos(todosArray);
        })
        .catch(err => {
            console.log(err);
        });
}

loadTodos();


function showTodos(todosArray) {
    let d = document.querySelectorAll(".planner__day");

    forEach(d, (index, value) => {
        let dataDate = value.dataset.date;
        for (let i = 0; i < todosArray.length; i++) {
            let status;
            let todoClass;
            let opacity;
            if (todosArray[i].completed == 0) {
                status = "radio-button-off";
                todoClass = "planner__todo--unchecked";
                opacity = `style="opacity:1"`;
            } else {
                status = "checkmark-circle";
                todoClass = "planner__todo--checked";
                opacity = `style="opacity:0.5"`;
            }

            if (todosArray[i].date == dataDate) {
                let todo = `<div class="planner__todo" ${opacity}>
                                <ion-icon name="${status}" class="planner__todo--check ${todoClass}" data-id="${todosArray[i]._id}" data-status="${todosArray[i].completed}"></ion-icon>
                                <ion-icon name="close" class="planner__todo--delete" data-id="${todosArray[i]._id}" data-status="${todosArray[i].completed}"></ion-icon>
                                <p class="planner__todo--description">${sanitizeHTML(todosArray[i].text)}</p>
                            </div>`;
                value.children[1].insertAdjacentHTML("beforeend", todo);
            }
        }
    });
}

function loadDays(days) {
    let date;

    weekContainer.innerHTML = "";

    for (let i = 0; i < days.length; i++) {
        date = addDays(getWeekDate(), i);

        let div = `<div class="planner__day" data-date="${formatDateYYYYMMDD(date)}">
                        <h2 class="planner__todo--title">${days[i]} (${formatDateDDMM(date)})</h2>
                        <div class="planner__todo--container">
                        </div>
                        <div class="planner__todo--add">
                            <ion-icon name="radio-button-off" class="planner__todo--check planner__todo--unchecked"></ion-icon>
                            <input type="text" class="planner__todo--input" data-date="${formatDateYYYYMMDD(date)}" data-user="${localStorage.getItem('user')}">
                        </div>
                    </div>`;

        weekContainer.insertAdjacentHTML("beforeend", div);
    }
}

function showPreviousWeek() {
    let previousWeek = document.querySelector(".planner__datepicker--arrowLeft");

    previousWeek.addEventListener("click", (e) => {
        let date = removeDays(getWeekDate(), 7);
        setLocalStorageDate(date);
        loadDays(days);
        loadTodos();
    });
}

function showCurrentWeek() {
    let thisWeek = document.querySelector(".planner__datepicker--currentDate");

    thisWeek.addEventListener("click", (e) => {
        localStorage.removeItem('planitdate');
        loadDays(days);
        loadTodos();
    });
}

function showFollowingWeek() {
    let followingWeek = document.querySelector(".planner__datepicker--arrowRight");

    followingWeek.addEventListener("click", (e) => {
        let date = addDays(getWeekDate(), 7);
        setLocalStorageDate(date);
        loadDays(days);
        loadTodos();
    });
}

function getWeekDate() {
    if (getLocalStorageDate() !== null) {
        return getMonday(new Date(getLocalStorageDate()));
    } else {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        monday = getMonday(new Date(date));
        return monday;
    }
}

function getLocalStorageDate() {
    return JSON.parse(localStorage.getItem('planitdate'));
}

function setLocalStorageDate(date) {
    localStorage.setItem('planitdate', JSON.stringify(formatDateYYYYMMDD(date)));
}

function getUrlParam(key) {
    let results = new RegExp('[\\?&]' + key + '=([^&#]*)').exec(window.location.href);
    return (results && results[1]) || undefined;
}

function getMonday(date) {
    let day = date.getDay() || 7;
    if (day !== 1) {
        date.setHours(-24 * (day - 1));
    }
    return date;
}

function removeDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
}

function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function formatDateYYYYMMDD(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function formatDateDDMM(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month].join('/');
}