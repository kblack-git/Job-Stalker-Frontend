let nameBox=document.querySelector(".input-name");

let methodBox=document.querySelector(".input-method");

let contentBox=document.querySelector(".textarea-field");

let dateBox=document.querySelector(".input-date");

let submitButton=document.querySelector(".submit-log");

let messageJSON=localStorage.getItem('messageItem');
let messageItem=JSON.parse(messageJSON);

messageItem?null:messageItem=[];

let currentIdData=localStorage.getItem('currentId');
let tokenData=localStorage.getItem('tokenItem');
let now=new Date();

let addZero=(item)=>{
    let temp=item.toString();
    if(temp.length>1)
        return temp;
    return `0${temp}`
}

let nowFull=`${now.getFullYear()}${addZero(now.getMonth()+1)}${addZero(now.getDate())}`
console.log(nowFull)


submitButton.addEventListener('click',(e)=>{
    console.log('added entry')
    
    let convertDate=dateBox.value?dateBox.value.replace(/-/g,""):nowFull;
    fetch('https://job-stalker.onrender.com/messages',{
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            Authentication: tokenData.token          
        },
        body:JSON.stringify({ 
            name    :nameBox.value,
            method  :methodBox.value,
            date    :convertDate,
            note    :contentBox.value,
            user_id :currentIdData
        })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        window.location='https://job-stalker-rp0m.onrender.com/'
    });
})