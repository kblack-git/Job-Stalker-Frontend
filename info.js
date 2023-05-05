let nameBox=document.createElement("input");
nameBox.setAttribute("id", "name-box");

let recipientBox=document.createElement("input");
recipientBox.setAttribute("id", "recipient-box");

let contentBox=document.createElement("input");
contentBox.setAttribute("id", "content-box");

let dateBox=document.createElement("input");
dateBox.setAttribute("id", "date-box");

let submitButton=document.createElement("button");
submitButton.setAttribute("id", "submit-button");

let messageJSON=localStorage.getItem('messageItem');
let messageItem=JSON.parse(messageJSON);

messageItem?null:messageItem=[];

submitButton.addEventListener('click',(e)=>{
    messageItem.push({
        name:nameBox.value,
        recipient:recipientBox.value,
        message:contentBox.value,
        date:dateBox.value
    })
})