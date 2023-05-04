

let messageBox=document.querySelector('.tasks-wrapper');

let messageJSON=localStorage.getItem('messageItem');
let messageItem=JSON.parse(messageJSON);

messageItem?null:messageItem=[];
    
messageItem.forEach(element => {
    messageBox.innerHTML+=`
    <div class="task">
            <input class="task-item" name="task" type="checkbox" id="item-1" checked />
            <label for="item-1">
                <span class="label-text">blah blah blah</span>
            </label>
        <span class="tag approved">Sent</span>
    </div>`;
});