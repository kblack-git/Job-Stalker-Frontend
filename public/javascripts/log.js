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


registerButton.addEventListener('click',async e=>{
    e.preventDefault();
    fetch(`https://job-stalker.onrender.com/auth/register`,
    {
        method:'POST',
        headers: {
            "Content-type": "application/json"
        },
        body:JSON.stringify({
            username:userName.value,
            password:passWord.value
        })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);     
    })
})

submitButton.addEventListener('click',async e=>{
    e.preventDefault();
    fetch(`https://job-stalker.onrender.com/auth/login`,
    {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body:JSON.stringify({
            username:userName.value,
            password:passWord.value
        })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(`logged in with id: ${data.myUser}`)
        localStorage.setItem('currentId',data.myUser);
        localStorage.setItem('tokenItem',data.token);
        window.location='https://job-stalker-rp0m.onrender.com/'
    })
})