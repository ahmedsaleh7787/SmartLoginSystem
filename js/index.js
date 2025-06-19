"use strict"

// Sign up section  =====================


const userName = document.querySelector("#SignupInputName");
const userEmail = document.querySelector("#SignupInputEmail1");
const userPassword = document.querySelector("#SignupInputPassword");
const existEmail = document.querySelector("#existEmail");

const LocalStorageKey = "userKey";
const LocalStorageKeyLogin = "loginKey";

let infoList = [];




if (JSON.parse(localStorage.getItem(LocalStorageKey))) {

    infoList = JSON.parse(localStorage.getItem(LocalStorageKey));

}


if (JSON.parse(localStorage.getItem(LocalStorageKeyLogin))) {

            window.location.href = "mainpage.html";

}


const register=document.querySelector("#btn-register");

if (register) {
register.addEventListener('click',function (e) {
    e.preventDefault();//no need here but i add it to learn
    addUser();
});
}

function addUser() {

    if (existEmailTest(userEmail)) {


        if (validation(userName) && validation(userEmail) && validation(userPassword)) {

            let infos = {
                newName: userName.value,
                newEmail: userEmail.value,
                newPassword: userPassword.value,
            }

            infoList.push(infos);

            addUserToLocalStorage();

            clearSignup();


            // refrance : https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
            window.location.href = "index.html";

        }

    } else {

        existEmail.classList.replace("d-none", "d-block");
    }
}


//no need this function but i leave it may be i will need it
//Clear Data in Sign Up
function clearSignup() {
    userName.value = "";
    userEmail.value = "";
    userPassword.value = "";

    userName.classList.remove("is-valid");
    userEmail.classList.remove("is-valid");
    userPassword.classList.remove("is-valid");

    existEmail.classList.add("d-none");


}


function addUserToLocalStorage() {
    localStorage.setItem(LocalStorageKey, JSON.stringify(infoList));
}


//validate of inputs
function validation(element) {

    const regex = {
        SignupInputName: /^[a-z0-9_-]{3,15}$/,
        SignupInputEmail1: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        SignupInputPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    }

    //in html i create id and named the variables in regex object same it
    //ex for what i want : /^\w{4,255}$/.test(asasas)
    const isValid = regex[element.id].test(element.value);


    //in html add valid or in-valid marks
    if (isValid) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.replace("d-block", "d-none")

    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.replace("d-none", "d-block")

    }


    return isValid;
}



function existEmailTest(element) {


    for (let i = 0; i < infoList.length; i++) {

        if (infoList[i].newEmail === element.value) {
            return false;
        }
    }

    return true;
}





//  login section ==============

const loginEmail = document.querySelector("#InputEmail1");
const loginPassword = document.querySelector("#InputPassword");


function existEmailLogin(element) {


    for (let i = 0; i < infoList.length; i++) {
        if (infoList[i].newEmail === element.value) {
            return i;
        }
    }

    return -1;
}


const enterTo = document.querySelector('#btn-enterToSite');

if (enterTo) {
enterTo.addEventListener('click',function (event) {
    event.preventDefault();//no need here but i add it to learn

    enterToSite()
});
}

let loginUser = [];

function enterToSite() {

    if (existEmailLogin(loginEmail) >= 0) {

        loginEmail.nextElementSibling.classList.replace("d-block", "d-none");

        if (infoList[existEmailLogin(loginEmail)].newPassword === loginPassword.value) {
            loginPassword.nextElementSibling.classList.replace("d-block", "d-none");

            loginUser.length=0;//no need
            loginUser.push(infoList[existEmailLogin(loginEmail)]);
            addLoginUserToLocalStorage();

            window.location.href = "mainpage.html";

        } else {
            loginPassword.nextElementSibling.classList.replace("d-none", "d-block");
        }


    } else {
        loginEmail.nextElementSibling.classList.replace("d-none", "d-block");
    }
}


function addLoginUserToLocalStorage() {
    localStorage.setItem(LocalStorageKeyLogin, JSON.stringify(loginUser));
}






