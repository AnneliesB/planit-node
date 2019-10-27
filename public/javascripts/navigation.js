toggleMenu();
logout();
showPlanner();
showLists();

function toggleMenu() {
    let clicked = false;
    let menu = document.querySelector(".planner__navigation--menu");
    let popup = document.querySelector(".planner__navigation--popup");
    menu.addEventListener("click", (e) => {
        if (clicked == false) {
            popup.style.display = "block";
            clicked = true;
        } else {
            popup.style.display = "none";
            clicked = false;
        }

    });
}

function showPlanner(){
    let plannerButton = document.querySelector(".planner__navigation--popup--planner");

    if (plannerButton != null) {
        plannerButton.addEventListener("click", (e) => {
            window.location.href = "/";
        });
    }
}

function showLists(){
    let listButton = document.querySelector(".planner__navigation--popup--lists");

    if (listButton != null) {
        listButton.addEventListener("click", (e) => {
            window.location.href = "/lists";
        });
    }
}

function logout() {
    let logoutButton = document.querySelector(".planner__navigation--popup--logout");

    if (logoutButton != null) {
        logoutButton.addEventListener("click", (e) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('planitdate');
            window.location.href = url+ "users/login";
        });
    }
}