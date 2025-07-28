"use strict"


if(localStorage.getItem("loginKey")){


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






// card ==============





// async function getBusiness() {
//     document.getElementById("loader").classList.replace('d-none', 'd-flex')
//     document.getElementById("get").disabled = true;

//     try {
//         const response = await fetch(
//             'https://script.google.com/macros/s/AKfycby4B6a8BCHZZ0KyLef-RmWgT8Msu4zR7t_2ABzi2e7qhDO9GN4EzDpd8grmax1hupUiLg/exec'
//         );
//         const data = await response.json();
//         console.log(data);

//         if (data.number) {
//             document.getElementById("result").innerHTML = data.number;

//             document.getElementById("qrcode").setAttribute("src", data.qr_code_url);

//         } else {
//             document.getElementById("result").innerHTML = data.message;

//         }

//     } catch (error) {
//         console.log(error);
//     } finally {
//         document.getElementById("get").disabled = false;
//         document.getElementById("loader").classList.replace('d-flex', 'd-none')
//     }
// }

// document.getElementById("confirm").addEventListener("click", getBusiness);




async function getBusiness() {
    document.getElementById("loader").classList.replace('d-none', 'd-flex');
    document.getElementById("get").disabled = true;

    try {
        const email = JSON.parse(localStorage.getItem("loginKey"))[0][0];

        const formData = new FormData();
        formData.append("email", email);

        const response = await fetch(
            'https://script.google.com/macros/s/AKfycbxAiXAmByr6Hf1FNDPD3jaVhSSBDjsqFWU2kWLx_COONKB2pYe3TEGsZavdH2iWE6MBmA/exec',
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();
        console.log(data);

        if (data.number) {
            document.getElementById("result").innerHTML = data.number;
            document.getElementById("qrcode").setAttribute("src", data.qr_code_url);
        } else {
            document.getElementById("result").innerHTML = data.message;
        }

    } catch (error) {
        console.log(error);
    } finally {
        document.getElementById("get").disabled = false;
        document.getElementById("loader").classList.replace('d-flex', 'd-none');
    }
}

document.getElementById("confirm").addEventListener("click", getBusiness);



}else{
        window.location.href = "index.html";

}