"use strict"


if (localStorage.getItem("loginKey")) {


    //  mainpage section  ===============

    //search how i can get const LocalStorageKeyLogin = "loginKey";
    //from another js file to here

    document.querySelector("#welcomeUser").innerText = `Welcome, ${JSON.parse(localStorage.getItem("loginKey"))[0][0]}`;

    const logout = document.querySelector("#btn-logOut");
    logout.addEventListener('click', logOut);

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


            //Cards Numbers
            const response = await fetch(
                'https://script.google.com/macros/s/AKfycbwz8xGw9re-ErYew4NwwyzMY3JrEiXSQB6R4wp5Q9GY6rm8ddPmpudyzPQv-OAEU0SDeA/exec',
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
                document.getElementById("btn-print").classList.replace("d-none","d-flex")

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



} else {
    window.location.href = "index.html";

}






//====================================
// infos




const remainingCards = document.getElementById("remainingCards");


async function getremainingCards() {
    document.getElementById("loader").classList.replace('d-none', 'd-flex');

    try {
        //remaining-cards-code
        const response = await fetch(
            'https://script.google.com/macros/s/AKfycbyMVrAqKP8XWZkZtx3Wr3lad-BKOP6OlQjLQ9D-GeHGD-e4T5laal1Yk5cEpDsycNg_TQ/exec',
            {
                method: "GET"
            }
        );

        const data = await response.json();
        console.log(data);

        if (data.value) {
            remainingCards.innerHTML = data.value;
        } else {
            remainingCards.innerHTML = "لم يتم العثور على بيانات.";
        }

    } catch (error) {
        console.log(error);
        alert("حدث خطأ أثناء الاتصال بالخادم.")
    } finally {
        document.getElementById("loader").classList.replace('d-flex', 'd-none');
    }
}

document.getElementById("button-re").addEventListener("click", getremainingCards);




//==================================
//print


document.getElementById("btn-print").addEventListener("click",function () {
window.print()
})




//====================================
//search



    async function search() {
            document.getElementById("loader").classList.replace('d-none', 'd-flex');

      const email = document.getElementById('emailnew').value;
      const startTime = document.getElementById('startTime').value;
      const endTime = document.getElementById('endTime').value;
      const resultDiv = document.getElementById('result-new');

      if (!email || !startTime || !endTime) {
        resultDiv.textContent = "⚠️ من فضلك أدخل كل البيانات.";
        return;
      }

      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("startTime", startTime);
      formData.append("endTime", endTime);

      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbwd-9hut-0y8fu1WxNd3cypybopkg5F9q23W_RvaX9Bk-lc4dTcaSyE7q62RzeFD3av/exec", {
          method: "POST",
          body: formData
        });
        const data = await response.json();
        resultDiv.textContent = `✅ عدد الـ "used" بهذا الإيميل: ${data.count}`;
      } catch (err) {
        console.error(err);
        resultDiv.textContent = "❌ حدث خطأ أثناء الاتصال بالسيرفر.";
      }finally{
                document.getElementById("loader").classList.replace('d-flex', 'd-none');

      }
    }

