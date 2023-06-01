

async function fetchWorks(){
    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();

    generer(works);
}
fetchWorks();




async function fetchCat(){
    const reponseCat = await fetch("http://localhost:5678/api/categories");
    const cat = await reponseCat.json();

}
fetchCat();


let i = 0;
const token = localStorage.getItem("token");

function generer(works) {

    document.querySelector(".gallery").innerHTML = "";
    for (let i=0; i < works.length; i++){

        const work = works[i];
        const gallery = document.querySelector(".gallery");
        const figure = document.createElement("figure");

        const image = document.createElement("img");
        image.src = work.imageUrl;
        image.alt = work.title;

        const figcaption = document.createElement("figcaption");
        figcaption.textContent = work.title;

        gallery.appendChild(figure);
        figure.appendChild(image);
        figure.appendChild(figcaption);
    };
    
}

// PARTIE FILTERING .......................................;

const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();
console.log(works);

// FILTER TOUS ,,,,,,,,,,,,,,,,,,,,,,,,,,,

const btnTous = document.querySelector(".btn-tous");

btnTous.addEventListener("click", function(){
    const catTous = works;
    generer(works);
    console.log(catTous)
})



// filtre OBJET ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

const btnObjet = document.querySelector(".btn-objet");
btnObjet.addEventListener("click", function(){

    const catObjet = works.filter(function(work) {
        return work.category.name === "Objets";
    });

    document.querySelector(".gallery").innerHTML = "";
    generer(catObjet);
    console.log(catObjet);
});



//  FILTER APPART ,,,,,,,,,,,,,,,,,,,,,,,,

const btnAppart = document.querySelector("#btn-appart");
btnAppart.addEventListener("click", function() {
    const catAppart = works.filter(function (work) {
        return work.categoryId === 2;
    });

    document.querySelector(".gallery").innerHTML = "";
    generer(catAppart);
    console.log(catAppart);
});



// FILTER HOTELS ,,,,,,,,,,,,,,,,,,,,,,,,,,,,

const btnHotel = document.querySelector(".btn-hotel");
btnHotel.addEventListener("click", function(){
    const catHotel = works.filter(function(work){
        return work.categoryId === 3;
    });

    document.querySelector(".gallery").innerHTML = "";
    generer(catHotel);
    console.log(catHotel);
});



// ////////////   LOGIN    //////////////////..................

function login() {
    const btns = document.querySelector(".buttons");
    const edite = document.querySelectorAll('.edite');

    if(window.localStorage.getItem("token")){
        // btns.style.display = "none";
        // edite.style.display = "block";
    } else {
        btns.style.display = "flex";
        edite.style.display = "none";
    }
}
login();


function logout() {
    const btnLogout = document.querySelector("#logout");
    btnLogout.addEventListener("click", function () {
        localStorage.removeItem("token");
        login();
    });
};






//  MODAL /////////////////////////////////////////////

var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");
var btnEdite = document.getElementById("myBtn");
var btnClose = document.getElementsByClassName("close")[0];
var btnClose2 = document.getElementsByClassName("close2")[0];


btnEdite.onclick = async function() {
  modal.style.display = "block";
 
  const reponse = await fetch("http://localhost:5678/api/works");
  const works = await reponse.json();
  console.log(works);

  document.querySelector("#photo").innerHTML = "";
  for (let i=0; i < 11; i++){

      const work = works[i];
      const photo = document.querySelector("#photo");
      const figure = document.createElement("figure");
      const trash = document.createElement("i");
      const move = document.createElement("i");

      
      move.classList.add("fa-solid", "fa-up-down-left-right", "move");
      move.style.visibility ="collapse";
      trash.classList.add("fa-solid", "fa-trash-can", "supprimer");

      const image = document.createElement("img");
      image.src = work.imageUrl;
      image.alt = work.title;
      image.style.width = "60px";
     

      const figcaption = document.createElement("figcaption");
      figcaption.textContent = "éditer";

      photo.appendChild(figure);
      figure.appendChild(move);
      figure.appendChild(trash);
      figure.appendChild(image);
      figure.appendChild(figcaption);
      

      trash.addEventListener("click", (event) => {
        event.preventDefault();
        const token = window.localStorage.getItem("accessToken");
        supprimerWork(work.id);


    });

  };
}


const backToModal =document.querySelector(".cursorPointer");
backToModal.addEventListener("click", function() {
    modal2.style.display = "none";
    modal.style.display = "block";
})


//  supprimer une image............................

async function supprimerWork (workId) {
    try {
        const reponse = await fetch("http://localhost:5678/api/works/" + workId, {
            method: "DELETE",
            headers: {
                "accept": "*/*",
                "Authorization": `Bearer ${token}`
            },
        });
        if (reponse.ok) {
            document.getElementById(workId).remove();
            document.getElementById("project-work-" + workId).remove();
            // modal.style.display = "block";
        }
    }
    catch (error) {
        console.error(error);
    }
}




// Fermer le  modal ...........................................
btnClose.onclick = function() {
  modal.style.display = "none";
}



var modal = document.getElementById("myModal");
var modal2 = document.querySelector("#myModal2");

var ajoutPhoto = document.querySelector(".btn-modal");
var btn2 = document.getElementById("myBtn2");
var btnClose2 = document.getElementsByClassName("close2")[0];

ajoutPhoto.onclick = function(){
    modal.style.display = "none";
    modal2.style.display = "block";
    
}

btnClose2.onclick = function() {
    modal2.style.display = "none";
}



window.onclick = function(event) {
    if (event.target == modal2) {
      modal2.style.display = "none";
    }
    if (event.target == modal) {
        modal.style.display = "none";
    }
}




// ....AJOUTPHOTO   FORMDATA.................................................


// //   Creer un objet FormData
function objetFormData() {
  const image = document.querySelector("#file");
  const titre = document.querySelector("#titre");
  const categorie = document.querySelector("#categorie");
  
  const formData = new FormData();
  
  formData.append("title", titre.value);
  formData.append("category", categorie.value);
  formData.append("image", image.files[0]);


  return formData;
  
}



// //  Ajout d un nouveau projet
async function addProjet() {
    const token = localStorage.getItem("token");  
    console.log(token);
    console.log(objetFormData());

    try {
        const reponse = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type':'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            body: objetFormData()
        });
        if (reponse.ok) {
        alert("projet ajouté avec succès");
    } else {
        alert("envoi echoué");
    }
    } catch (error) {
        console.error(error);
        return null;

    }
  }
 
 
  //   Function pour valider un ajout 
function projetForm() {
    const btnValider = document.querySelector("#btn-valider");
  
    btnValider.addEventListener("click", async (e) => {
        e.preventDefault();

        const formData = objetFormData();
        const reponse = await addProjet(formData);
        console.log(reponse);
    });
}
projetForm(); 



// Function pour creer une prévisualisation
function preview(e) {
    const input = document.querySelector(".img-modal2");
    const imgPreview = input.querySelector("#file");

    if (imgPreview) {
        imgPreview.src = URL.createObjectURL(e.target.files[0]);
    } else {
        const preview = document.createElement("img");
        input.appendChild(preview);
        preview.style.height = "180px";
       
        preview.style.marginLeft = "30%";

        preview.src = URL.createObjectURL(e.target.files[0]);
     
    }
}



  //   Pour masquer
function masquerElements() {
    const inputElements = document.querySelectorAll('.img-modal2 > *:not(img)');
    inputElements.forEach((element) => {
        element.style.display = 'none';
    });
  }
  


  //   Pour Entrer d image et la prévisualisation
function imageInput() {
    const btnAddImg = document.querySelector('#btn-add');
    const inputImage = document.querySelector('#file');
  
    btnAddImg.addEventListener('click', (e) => {
        e.preventDefault();
        masquerElements();
        inputImage.click();
        
    });
  
    inputImage.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            preview(e);
        }
    });
}
imageInput();


