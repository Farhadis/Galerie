

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
const btns = document.querySelector(".buttons");
// const edite = document.getElementsByClassName("edite");
const editeTop = document.getElementsByClassName("edition-top");
const login2 = document.getElementById("login2");
const editor = document.getElementById("editor");
const editor2 = document.getElementById("editor2");
const editor3 = document.getElementById("editor3");
const btnLogout = document.querySelector("#logout");
const btnEdite = document.getElementById("myBtn");
console.log(token);

function login() {
    
    if(token !== "" && token !== null){
        btns.style.display = "none";
        editor.classList.remove("hidden");
        editor2.classList.remove("hidden");
        editor3.classList.remove("hidden");
        btnEdite.classList.remove("hidden");
        btnLogout.classList.remove("hidden");
        login2.style.display = "none";
       

    } else {
        btns.style.display = "flex";
        btnLogout.style.display = "none"; 
    }
    
}
login();


function logout() {
    btnLogout.addEventListener("click", function () {
        localStorage.removeItem("token")
         
    });    
};
logout();







//  MODAL /////////////////////////////////////////////

var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");
// var btnEdite = document.getElementById("myBtn");
var btnClose = document.getElementsByClassName("close")[0];
var btnClose2 = document.getElementsByClassName("close2")[0];

btnEdite.onclick = function(){modal1()}  ;

async function modal1(){
  modal.style.display = "block";
 
  const reponse = await fetch("http://localhost:5678/api/works");
  const works = await reponse.json();
  console.log(works);

  document.querySelector("#photo").innerHTML = "";
  for (let i=0; i < works.length; i++){

      const work = works[i];
      const photo = document.querySelector("#photo");
      const figure = document.createElement("figure");
      const trash = document.createElement("i");
      const move = document.createElement("i");
      
      move.classList.add("fa-solid", "fa-up-down-left-right", "move");
    //   move.style.visibility ="collapse";
      trash.classList.add("fa-solid", "fa-trash-can", "supprimer");

      const image = document.createElement("img");
      image.src = work.imageUrl;
      image.alt = work.title;
    //   image.style.width = "50px";
 //   figure.style.width = "50px";
      const figcaption = document.createElement("figcaption");
      figcaption.textContent = "éditer";
      figcaption.style.fontSize = "10px";

      photo.appendChild(figure);
      figure.appendChild(move);
      figure.appendChild(trash);
      figure.appendChild(image);
      figure.appendChild(figcaption);

     
	  if (i = i) {
            move.style.visibility = "collapse";
	    } 

      trash.addEventListener("click", (event) => {
        event.preventDefault();
            
        if (confirm("Voullez-vous supprimer ce fichier?") == true){
            supprimerWork(work.id);
        }        
    }); 
  };
}

// modal1() 



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
            modal1();
            fetchWorks()            
        }
    }
    catch (error) {
        console.log();
    }   
}





// Fermer la  modal ...........................................
btnClose.onclick = function() {
  modal.style.display = "none"; 
}


btnClose2.onclick = function() { 
    clearForm();
    // location.reload();
    modal.style.display = "none";
    modal2.style.display = "none";  
   
}

function clearForm(){
    const form = document.getElementById("formulaire");
    form.reset();

    const image = document.getElementById("previewImg");
    image.src = "";   
    
    const category = document.getElementById("categorie");
    category.selectedIndex = 0;
    

    document.querySelector("#error-txt-valider").innerHTML = "" ; 

    document.querySelector("#ok-txt-valider").innerHTML = "";

    showElements();
}

var modal = document.getElementById("myModal");
var modal2 = document.querySelector("#myModal2");
var ajoutPhoto = document.querySelector(".btn-modal");
var btn2 = document.getElementById("myBtn2");
var btnClose2 = document.getElementsByClassName("close2")[0];

ajoutPhoto.onclick = function(){
    clearForm();
    modal.style.display = "none";
    modal2.style.display = "block"; 
     
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

const image = document.querySelector("#file");
const titre = document.querySelector("#titre");
const categorie = document.querySelector("#categorie");



function objetFormData() {
  const formData = new FormData();  
  formData.append("title", titre.value);
  formData.append("category", categorie.value);
  formData.append("image", image.files[0]);

return formData; 
}

function validateForm2(){
    document.querySelector("#error-txt-valider").innerHTML = "" ;
    
    const image = document.querySelector('#file');
    const maxSize = 4*1024 * 1024;
    if((titre.value !== "") && (categorie.value !== "0") && (image.src !== "") && (file.size < maxSize) ) {
        
       return true
}};

categorie.onchange = function(){
    document.querySelector("#error-txt-valider").innerHTML = "" ;
    }

titre.onchange = function(){
    document.querySelector("#error-txt-valider").innerHTML = "" ;
    }


const btnValider = document.querySelector("#btn-valider");
btnValider.addEventListener("click",async function(){
    
    validateForm2()
    if (reponse !== true){
        document.querySelector("#error-txt-valider").innerHTML = "Veuillez remplir bien le formulaire" ;
    }
    try {
        const reponse = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                'Accept': 'application/json',           
                'Authorization': `Bearer ${token}`
            },
            body: objetFormData()
        });
        if (reponse.ok) {    
            document.querySelector("#error-txt-valider").innerHTML = "" ;
            document.querySelector("#ok-txt-valider").innerHTML =`Cette photo  est  bien ajoutée dans votre Galerie.\n` 
            console.log(categorie.value)
            
            setTimeout(function() {
                modal2.style.display = "none";
                modal.style.display = "block";
                modal1() 
            }, 1500);  
            fetchWorks()
        } 

    } catch (error) {
        console.error(error);
        
    }
    }
);



function imageInput() {
    const btnAddImg = document.querySelector('#btn-add');
    const image = document.querySelector('#file');
  
    btnAddImg.addEventListener('click', (e) => {
        e.preventDefault();
        // masquerElements();
        image.click();              
    });

    image.addEventListener('change', (e) => {
        e.preventDefault();
        const maxSize = 4*1024 * 1024;
       
        for (const file of e.target.files) {
            if (file.size > maxSize ){
            document.querySelector("#error-txt-valider").innerHTML =`La taille du fichier "${file.name}"  est  environ "${Math.round(file.size/1000000)}mo" et il dépasse la limite maximale du 4mo.\n`           

                
        } else{
            document.querySelector("#error-txt-valider").innerHTML =""
            // supprimerMessage()
            masquerElements();
            preview(e); 
        }
}})};
//    validateForm2();

imageInput();






// Function pour creer une prévisualisation
function preview(e) {

    const input = document.querySelector(".img-modal2");
    const imgPreview = input.querySelector("#file");

    if (imgPreview) {
        imgPreview.src = URL.createObjectURL(e.target.files[0]);
    } else {
        const preview = document.getElementById("previewImg");
        input.appendChild(preview);
        preview.style.height = "120px";       
        preview.style.marginLeft = "40%";
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

function showElements() {
    const inputElements = document.querySelectorAll('.img-modal2 > *:not(img)');
    inputElements.forEach((element) => {
        element.style.display = 'block';        
    });
}


function showModal(){
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    modal2.style.display = "none";
}

  
//........  SUPPRIMER  ?????????????????????????? ................

// Fonction supprimer la gallery

async function supprimerGalerie(){
    works.forEach(async (work) => {
        await fetch(`http://localhost:5678/api/works/${work.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    });
}


const gallery = document.querySelector(".gallery");
const supprimerTous = document.querySelector("#supprimer");
supprimerTous.addEventListener("click", function () {
    confirm("Voullez-vous supprimer la Galerie?")
    supprimerGalerie();
    works.length = 0;
    gallery.innerHTML = "";

});

  
