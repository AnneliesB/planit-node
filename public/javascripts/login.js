let login = document.querySelector(".login__button--login");
let loginPasswordField = document.querySelector(".login__value--password");
let loginEmailField = document.querySelector(".login__value--email");

login.addEventListener("click", (e) => {
    doLogin();
});

loginPasswordField.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
        doLogin();
    }
});

loginEmailField.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
        doLogin();
    }
});

function doLogin() {

    let username = document.querySelector(".login__value--email").value;
    let password = document.querySelector(".login__value--password").value;
    fetch(url + "users/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    }).then(response => {

        return response.json();

    }).then(json => {
        if (json.status === "success") {
            let token = json.data.token;
            localStorage.setItem("token", token);
            localStorage.setItem("user", username);
            window.location.href = url;
        } else {
            let error = document.querySelector(".alert");
            error.innerHTML="Your username/password is incorrect.";
            error.classList.remove("login-alert");
        }
    }).catch((error) => {
        console.error(error)
    });
}