let signup = document.querySelector(".login__button--signup");
let signupPasswordField = document.querySelector(".signup__value--password");
let signupPasswordRepeatField = document.querySelector(".signup__value--repeatPassword");
let signupEmailField = document.querySelector(".signup__value--email");

signup.addEventListener("click", (e) => {
    doSignup();
});

signupPasswordField.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
        doSignup();
    }
});

signupPasswordRepeatField.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
        doSignup();
    }
});

signupEmailField.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
        doSignup();
    }
});

function doSignup() {
    let username = document.querySelector(".signup__value--email").value;
    let password = document.querySelector(".signup__value--password").value;
    let passwordRepeat = document.querySelector(".signup__value--repeatPassword").value;

    if (password === passwordRepeat) {
        fetch(url + "users/signup", {
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
                error.innerHTML = "This username is already in use.";
                error.classList.remove("signup-alert");
            }
        });

    } else {
        let error = document.querySelector(".alert");
        error.innerHTML = "Your passwords don't match.";
        error.classList.remove("signup-alert");
    }

}