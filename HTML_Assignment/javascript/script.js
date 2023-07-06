var checkbox1 = document.getElementById('checkbox-1');
var checkbox2 = document.getElementById('checkbox-2');
var checkbox3 = document.getElementById('checkbox-3');
var male = document.getElementById('radiobtn1');
var female = document.getElementById('radiobtn2');
var enroll = document.getElementById('enroll');
var inputName = document.getElementById('name');
var inputEmail = document.getElementById('email');
var inputWebsite = document.getElementById('website');
var inputImageLink = document.getElementById('image_link');
var radiobtn1 = document.getElementById('radiobtn1');
var radiobtn2 = document.getElementById('radiobtn2');
var inputGender,skills;
var userData = [];
var card = document.getElementById('cards');
var heading = document.getElementById('heading');
var skill = "";

function clearAllInput(event){
    var allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => input.value = '');
    checkbox1.checked = false;
    checkbox2.checked = false;
    checkbox3.checked = false;
    male.checked = true;
    female.checked = false;
}

function getGender(){
    if(radiobtn1.checked == true){
        inputGender = "Male";
    }
    else{
        inputGender = "Female";
    }
}

function getSkills(){
    var inputSkills = [];
    skill = "";
    if(checkbox1.checked){
        inputSkills.push("HTML");
    }
    if(checkbox2.checked){
        inputSkills.push("CSS");
    }
    if(checkbox3.checked){
        inputSkills.push("Java");
    }
    inputSkills.forEach(myFunction);
    function myFunction(item){
        skill += item + " ";
    };
}

enroll.onclick = function(e){
    e.preventDefault();
    getGender();
    getSkills();
    enrollData();
    getDataFromLocal();
    clearAllInput();
    swal("Job Done!","Student Enrolled Successfully","success");
}

if(localStorage.getItem("userData") != null){
    userData = JSON.parse(localStorage.getItem("userData"));
}

function enrollData(){
    userData.push({
        name : inputName.value,
        email : inputEmail.value,
        website : inputWebsite.value,
        gender : inputGender,
        skills : skill,
        imageLink : inputImageLink.value == undefined ? "/images/profile.png":inputImageLink.value
    });
    var userString = JSON.stringify(userData);
    localStorage.setItem("userData",userString);
}

const getDataFromLocal = ()=>{
    card.innerHTML = "";
    userData.forEach((data,index)=>{
        heading.classList.remove('d-none');
        heading.classList.add('d-flex');
        card.classList.remove('d-none');
        card.classList.add('d-flex');
        card.innerHTML += `
        <div class="row g-0 h-100">
            <div class="col-8 card-body d-flex flex-column justify-content-end p-0 smallfont border-lg">
              <div>${data.name} </div>
              <div>${data.email} </div>
              <a href="${data.website}" target="_blank">${data.website}</a>
              <div>${data.gender} </div>
              <div>${data.skills} </div>
            </div>
            <div class="col-4 d-flex h-100 border-lg">
              <img src = "${data.imageLink}" class="img-fluid rounded-start w-100" alt="Error">
            </div>
        </div>
        `;
    });
}