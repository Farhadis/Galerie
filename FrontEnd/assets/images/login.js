//  ......test..........................


    // const projet = document.querySelector("#projet-log");
    
    // projet.addEventListener("click", function(){
    //     document.location.href="index.html"; 
    //     alert("projet");
    // })
 
    // function editing(){

    //     const editeur = document.querySelector("#edite");
    //     editeur.style.display = "block";
    
    //     const editeTest = document.querySelector(".editor-modal");
    //     editeTest.style.display = "block";
    
    //     const btns = document.querySelector(".buttons")
    //     btns.style.display = "hidden";
    
    //     return;
    // }
    

// ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


// document.querySelector("#email").innerHTML = "";
// document.querySelector("#password").innerHTML = "";

const email = document.getElementById("#email");
const password = document.getElementById("#password");

const legal = getElementById("leg");
legal.addEventListener("click", function(){
    alert("legal");
})



const envoyer = document.getElementById("#login-btn");

const token = window.localStorage.getItem("token");


// envoyer.addEventListener("click", function(){
//     alert(test);
// })




envoyer.addEventListener("click", async function(event) {

    event.preventDefault();
 
    const reponse = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const connection = await reponse.json();
    if (reponse.ok) {
        window.localStorage.setItem("token", connection.token);

        document.location.href="index.html";

        

        // localStorage.setItem("token", dataUser.token)
        // localStorage.setItem("login", true)

        // editing();

    } else if (reponse.status == "404"){
        document.querySelector("#error-txt").innerHTML = "Adresse Mail ou Mot de Passe est Incorrect !";
       
        // localStorage.setItem("token", undefined)
        // localStorage.setItem("login", undefined)
        
    } else if (reponse.status == "401"){
        document.querySelector("#error-txt").innerHTML = "Adresse Mail ou Mot de Passe est Incorrect !";
        // document.querySelector("#error-txt").innerHTML = "";
        // localStorage.setItem("token", undefined)
        // localStorage.setItem("login", undefined)
    }

});





// ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

// email.addEventListener("click", function(){
//     document.querySelector("#email").innerHTML = "";
//     email.value = "";
// });

// password.addEventListener("click", function(){
//     document.querySelector("#password").innerHTML = "";
//     password.value = "";
// });

