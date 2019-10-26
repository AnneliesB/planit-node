getDeleteInfo();

function getDeleteInfo() {
    let t = document.querySelector(".planner__week--container");

    t.addEventListener("click", (e) => {

        if (e.target.matches(".planner__todo--delete")) {
            let target = e.target;
            let id = target.dataset.id;
            let status = target.dataset.status;
            let removed = true;
            let option = "remove";
            statusFetch(id, status, target, removed, option);
        }

    });
}

