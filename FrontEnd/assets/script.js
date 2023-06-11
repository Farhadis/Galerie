

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

// const titre = document.querySelector("#titre");
// const categorie = document.querySelector("#categorie");





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
      image.style.width = "60px";
     

      const figcaption = document.createElement("figcaption");
      figcaption.textContent = "éditer";

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
            supprimerWork(work.id) 
            return modal1(event)
            
        }
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
            return location.reload(none)
        }
    }
    catch (error) {
        console.error(error);
    }
   
}
// modal1()




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
                'Authorization': `Bearer ${token}`
            },
            body: objetFormData()
        });
         if (reponse.ok) {
                      
            document.querySelector("#error-txt-valider").innerHTML = "Ajouté !" ;
                       
        } else {
            document.querySelector("#error-txt-valider").innerHTML = "Veuillez  ajouter une Photo" ;
            supprimerMessage();
            
           
        }
   
    } catch (error) {
        console.error(error);
        alert("Veuillez  remplir bien le formulaire")


    }
   
}

 
// Function pour valider un ajout 

function projetForm() {
    const inputImage = document.querySelector('#file');
    const btnValider = document.querySelector("#btn-valider");
    btnValider.addEventListener("click", async (e) => {
        e.preventDefault();
        
            if ((titre.value !== "") && (categorie.value !== "0") && (inputImage.file !== "")) {
            
             
            const formData = objetFormData();
            const reponse = await addProjet(formData);
            console.log(reponse);
            supprimerMessage()
            
            
           
        } else{ 
            document.querySelector("#error-txt-valider").innerHTML = "Veuillez  remplir bien le formulaire" ;
            supprimerMessage()
            
           
                 
        }   
       
    });  
    
}

projetForm(); 



function imageInput() {
    const btnAddImg = document.querySelector('#btn-add');
    const inputImage = document.querySelector('#file');
  
    btnAddImg.addEventListener('click', (e) => {
        e.preventDefault();
        masquerElements();
        inputImage.click();        
    });

    inputImage.addEventListener('change', (e) => {
        const maxSize = 1024 * 1024;
       
        for (const file of e.target.files) {
            if (file.size > maxSize ){
            document.querySelector("#error-txt-valider").innerHTML =`La taille du fichier : ${file.name}  est  ${file.size} bytes et il dépasse la limite maximale du 4mo.\n`
            supprimerMessage()
             
           
            return showElements()
            // } else if (e.target.files.length > 0) {
            //     document.querySelector("#error-txt-valider").innerHTML = "Veuillez choisir un fichier"
            } else {
            preview(e);  
                
        }
    }});   
    
}

imageInput();




// 
function supprimerMessage(){
    const image = document.getElementById("file")
    const supMessage = document.querySelector("#error-txt-valider");   
    const titre = document.getElementById("titre");
    const categorie = document.getElementById("categorie");
    titre.addEventListener("click", function(){
        supMessage.style.display = "none";
    } )
    categorie.onchange = function(){
        supMessage.style.display = "none";
    }
    image.onchange = function(){
        supMessage.style.display = "none";
    }
};


function preview(e) {

    const input = document.querySelector(".img-modal2");
    const imgPreview = input.querySelector("#file");

    if (imgPreview) {
        imgPreview.src = URL.createObjectURL(e.target.files[0]);
    } else {
        const preview = document.createElement("img");
        input.appendChild(preview);
        preview.style.height = "150px";       
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



// pour revenir vers Modal 2

function showElements() {
    const inputElements = document.querySelectorAll('.img-modal2 > *:not(img)');
    inputElements.forEach((element) => {
        if (element.tagName !== "P")
        element.style.display = 'flex';        
    });
}

function showModal(){
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}


//   Pour Entrer l image et la prévisualisation




  
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


function validateForm() {
    let x = document.forms["myForm"]["fname"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
  }



// .....   SELECT   ..................................................

var x, j, l, ll, selElmnt, a, b, c;
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {

    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {

        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {

  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

document.addEventListener("click", closeAllSelect);