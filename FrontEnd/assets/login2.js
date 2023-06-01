

document.querySelector("#email").innerHTML = "";
document.querySelector("#password").innerHTML = "";

const email = document.querySelector("#email");
const password = document.querySelector("#password");




const envoyer = document.querySelector("#login-btn");


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
        document.location.href="./index.html";
        document.querySelector("#edite").style.display = "block";
    } else if (reponse.status == "404"){
        document.querySelector("#error-txt").innerHTML = "Addresse mail ou Mot  de  Passe   Incorrect !";
       
        
    } else if (reponse.status == "401"){
        document.querySelector("#error-txt").innerHTML = "Addresse mail ou Mot  de  Passe   Incorrect !";
        
    }

});

email.addEventListener("click", function(){
    document.querySelector("#error-txt").innerHTML = "";
    email.value = "";
});

password.addEventListener("click", function(){
    document.querySelector("#password").innerHTML = "";
    password.value = "";
});

