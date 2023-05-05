
const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
let notificationBell=document.querySelector('.notification');


allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});


// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})


const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})


if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})


const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})


let uniqueContact=[];

let messageBox=document.querySelector('.message-box');
messageBox.innerHTML='';

let followUpBox=document.querySelector('.todo-list')
followUpBox.innerHTML=''

let messageJSON=localStorage.getItem('messageItem');
let messageItem=JSON.parse(messageJSON);

messageItem?null:messageItem=[];

let daysBetween=(start, end)=>{
    let difference=(Date.now())-Date.parse(start);
    let diffDays=difference/(86400000)
    return Math.floor(diffDays);
}

let cancelledListJSON=localStorage.getItem('cancelledItem')
cancelledItem=JSON.parse(cancelledListJSON);
cancelledItem?null:cancelledItem=[];

cancelledItem.forEach(item=>{
    uniqueContact.push(item);
})

let addUnderScore=(str)=>{
    return str.replace(/ /g,"_");
}

let removeUnderScore=(str)=>{
    return str.replace(/_/g," ");
}

//builds out the list
let alerts=0;
messageItem.forEach(element => {
    let index=messageItem.indexOf(element);
    if(!element.name)
        return;
    messageBox.innerHTML+=
    `
    <tr class="message-entry">
		<td>
            <p>${element.name}</p>
        </td>
        <td>${element.method}</td>
        <td>${element.message}</td>
        <td><span class="Entry Date">${element.date}</span></td>
    </tr>
    `;
    
    if(daysBetween(element.date)<7)
        return;
    if(uniqueContact.includes(element.name))
        return;
    uniqueContact.push(element.name);
    alerts++;
    followUpBox.innerHTML+=
    `
    <li class="completed">
        <p>Contacted ${element.name} ${daysBetween(element.date)} days ago</p>
        <button class='bx' value=${addUnderScore(element.name)}>Delete</button>
    </li>`;
});

alerts?notificationBell.innerHTML+=`<span class="num">${alerts}</span>`:null;

let updateCancelledList=()=>{
    cancelledListJSON=JSON.stringify(cancelledItem);
    localStorage.setItem('cancelledItem',cancelledListJSON);
    window.location.reload();
}

//adds funcitonality to the follow up delete buttons
let deleteButtons=document.querySelectorAll('.bx-dots-vertical-rounded');
deleteButtons=Array.from(deleteButtons);
deleteButtons.forEach(but=>{
    but.addEventListener('click', (e)=>{
        cancelledItem.push(removeUnderScore(but.value))
        updateCancelledList();
    })
})

let refreshButton=document.querySelector('.bx-plus');
refreshButton.addEventListener('click', (e)=>{
    cancelledItem=[]
    updateCancelledList();
})