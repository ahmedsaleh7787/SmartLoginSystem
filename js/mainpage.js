"use strict"

//  mainpage section  ===============

//search how i can get const LocalStorageKeyLogin = "loginKey";
//from another js file to here

document.querySelector("#welcomeUser").innerText = `Welcome, ${JSON.parse(localStorage.getItem("loginKey"))[0][0]}`;

const logout = document.querySelector("#btn-logOut");
logout.addEventListener('click',logOut);

function logOut() {
    localStorage.removeItem("loginKey");
    window.location.href = "index.html";

}