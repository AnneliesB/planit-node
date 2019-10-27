getDeleteInfo();

function getDeleteInfo() {
    let ld = document.querySelector(".lists__overview--container");

    ld.addEventListener("click", (e) => {

        if (e.target.matches(".list__todo--delete")) {
            let target = e.target;
            let id = target.dataset.id;
            let status = target.dataset.status;
            let removed = "1";
            let option = "remove";
            putListItemStatus(id, status, target, removed, option);
        }

    });
}
