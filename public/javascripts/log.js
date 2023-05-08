var d = document.getElementById("login");
var n = document.getElementById("register");
var b = document.getElementById("btn");

let userName=document.querySelector('.user-name');
let passWord=document.querySelector('.pass-word')
let submitButton=document.querySelector('.submit-btn');
let registerButton=document.querySelector('.register-btn');


function register (){
    d.style.left = "-400px";
    n.style.leftm= "50px";
    b.style.left = "110px";
}
function login (){
    d.style.left = "50px";
    n.style.leftm= "450px";
    b.style.left = "0";
}

submitButton.addEventListener('click',(e)=>{
    
})