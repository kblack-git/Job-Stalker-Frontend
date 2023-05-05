let nameBox=document.querySelector(".input-name");

let methodBox=document.querySelector(".input-method");

let contentBox=document.querySelector(".textarea-field");

let dateBox=document.querySelector(".input-date");

let submitButton=document.querySelector(".submit-log");

let messageJSON=localStorage.getItem('messageItem');
let messageItem=JSON.parse(messageJSON);

messageItem?null:messageItem=[];

submitButton.addEventListener('click',(e)=>{
    console.log('added entry')
    messageItem.push({
        name:nameBox.value,
        method:methodBox.value,
        message:contentBox.value,
        date:dateBox.value
    })
    messageJSON=JSON.stringify(messageItem);
    localStorage.setItem('messageItem',messageJSON);
})