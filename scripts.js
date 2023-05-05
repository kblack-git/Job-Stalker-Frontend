
const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');


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


let messageBox=document.querySelector('.message-box');
messageBox.innerHTML='';

let followUpBox=document.querySelector('.todo-list')
followUpBox.innerHTML=''

let messageJSON=localStorage.getItem('messageItem');
let messageItem=JSON.parse(messageJSON);

messageItem?null:messageItem=[];

let daysBetween=(start, end)=>{
    let difference=(end?end.getTime():Date.now())-start.getTime();
    let diffDays=difference/(86400000)
    return diffDays;
}

let cancelledListJSON=localStorage.getItem('cancelledItem')
cancelledItem=JSON.parse(cancelledListJSON);
cancelledItem?null:cancelledItem=[];

cancelledItem.forEach(item=>{
    uniqueContact.push(item);
})

//builds out the list
messageItem.forEach(element => {
    let index=messageItem.indexOf(element);
    messageBox.innerHTML+=`
    <div class="task">
    ${element.name}
    ${element.method}
    ${element.content}
    ${element.date}
    </div>`;
    
    if(daysBetween(element.date)<7)
        return;
    if(uniqueContact.includes(element.name))
        return;
    uniqueContact.push(element.name);

    followUpBox.innerHTML+=
    `
    <li class="completed">
        <p>Contacted ${element.name} ${daysBetween(element.date)} days ago</p>
        <i class='bx bx-dots-vertical-rounded' value='${element.name}'></i>
    </li>`;
});


//adds funcitonality to the follow up delete buttons
let deleteButtons=document.querySelectorAll('.bx-dots-vertical-rounded');
deleteButtons=Array.from(deleteButtons);
deleteButtons.forEach(but=>{
    but.addEventListener('click', (e)=>{
        console.log('clicked')
    })
})