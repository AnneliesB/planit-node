
checkSession();
let sanitizeHTML = (str) => {
    let temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
};

function forEach(array, callback, scope) {
    for (let i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
    }
};

function checkSession() {
    if (localStorage.getItem("token") === null) {
        window.location.href = url + "users/login";
    }
}