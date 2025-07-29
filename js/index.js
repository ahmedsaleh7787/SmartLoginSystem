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

}//need-edit


if (JSON.parse(localStorage.getItem(LocalStorageKeyLogin))) {

    window.location.href = "mainpage.html";

}


const register = document.querySelector("#btn-register");


if (register) {
    register.addEventListener('click', function (e) {
        e.preventDefault();//no need here but i add it to learn
        addUser();
    });
}

function addUser() {

    if (validation(userName)) {


        if (existEmailTest(userEmail)) {

            existEmail.classList.replace("d-block", "d-none");
            userEmail.classList.add("is-valid");
            userEmail.classList.remove("is-invalid");



            if (validation(userEmail) && validation(userPassword)) {

                const infos = {
                    newName: userName.value,
                    newEmail: userEmail.value,
                    newPassword: userPassword.value,
                }

                infoList.push(infos);

                addUserToCloudStorage();

                clearSignup();


                // refrance : https://www.w3schools.com/howto/howto_js_redirect_webpage.asp

            }

        } else {

            existEmail.classList.replace("d-none", "d-block");
            userEmail.classList.add("is-invalid");
            userEmail.classList.remove("is-valid");
            userEmail.nextElementSibling.classList.replace("d-block", "d-none");

        }

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

async function addUserToCloudStorage() {
    const name = document.getElementById("SignupInputName").value;
    const email = document.getElementById("SignupInputEmail1").value;
    const pass = document.getElementById("SignupInputPassword").value;
    const loader = document.getElementById("loader");

    // إظهار اللودر
    loader.classList.remove('d-none');
    loader.classList.add('d-flex');

    //signup-data
    const url = "https://script.google.com/macros/s/AKfycby_fA_V6tlsScJLRAaYed1bygdbF0zBbRZEzh3BWlJ1Yov0EM2suCpzs-NVbgijnUg2/exec";

    try {
        await fetch(url, {
            method: "POST",
            mode: "no-cors", // لا يمكن قراءة الرد
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&pass=${encodeURIComponent(pass)}`
        });

        alert("✅ تم التسجيل بنجاح");
        window.location.href = "index.html";

    } catch (error) {
        console.error("❌ خطأ:", error);
        alert("internet connection problem");
    } finally {
        // إخفاء اللودر في جميع الحالات
        loader.classList.remove('d-flex');
        loader.classList.add('d-none');
    }
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


// function existEmailLogin(element) {


//     for (let i = 0; i < infoList.length; i++) {
//         if (infoList[i].newEmail === element.value) {
//             return i;
//         }
//     }

//     return -1;
// }


// const enterTo = document.querySelector('#btn-enterToSite');

// if (enterTo) {
//     enterTo.addEventListener('click', function (event) {
//         event.preventDefault();//no need here but i add it to learn

//         enterToSite()
//     });
// }

// const loginUser = [];

// function enterToSite() {

//     if (existEmailLogin(loginEmail) >= 0) {

//         loginEmail.nextElementSibling.classList.replace("d-block", "d-none");

//         if (infoList[existEmailLogin(loginEmail)].newPassword === loginPassword.value) {
//             loginPassword.nextElementSibling.classList.replace("d-block", "d-none");

//             loginUser.length = 0;//no need
//             loginUser.push(infoList[existEmailLogin(loginEmail)]);
//             addLoginUserToLocalStorage();

//             window.location.href = "mainpage.html";

//         } else {
//             loginPassword.nextElementSibling.classList.replace("d-none", "d-block");
//         }


//     } else {
//         loginEmail.nextElementSibling.classList.replace("d-none", "d-block");
//     }
// }












async function login(email, password) {
    const loader = document.getElementById("loader");

    //   const email = document.getElementById('email').value;
    //   const password = document.getElementById('password').value;
    //validate sign in code
    const url = 'https://script.google.com/macros/s/AKfycbwiWMvLS8N4RBiwUyFqokixkhCNHLJc4x9vAnbdjbWG_pUcS-cx2v8ZH5eo8yj7LdYAog/exec';

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    // إظهار اللودر
    loader.classList.remove('d-none');
    loader.classList.add('d-flex');

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        const result = await response.text();
        return result
        // document.getElementById('result').textContent = result === 'true' ? '✅ Login successful' : '❌ Invalid credentials';
    } catch (error) {
        return '⚠️ Error connecting to server'
        // document.getElementById('result').textContent = '⚠️ Error connecting to server';
    } finally {
        // إخفاء اللودر في جميع الحالات
        loader.classList.remove('d-flex');
        loader.classList.add('d-none');
    }
}




const loginUser = [];

const enterTo = document.querySelector('#btn-enterToSite');

if (enterTo) {
    enterTo.addEventListener('click', async function (event) {
        event.preventDefault();//no need here but i add it to learn




        const result = await login(loginEmail.value, loginPassword.value);

        if (result.trim() === "true") {
            alert("✅ تم تسجيل الدخول بنجاح");

            loginUser.length = 0;//no need
            loginUser.push([loginEmail.value, loginPassword.value]);
            localStorage.setItem(LocalStorageKeyLogin, JSON.stringify(loginUser));

            window.location.href = "mainpage.html";
        } else if (result.trim() === "false") {
            alert("❌ بيانات الدخول غير صحيحة");
        } else {
            alert("⚠️ حدث خطأ في الاتصال بالسيرفر");
        }


    });
}





