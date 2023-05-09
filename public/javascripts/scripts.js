
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

// searchButton.addEventListener('click', function (e) {
// 	if(window.innerWidth < 576) {
// 		e.preventDefault();
// 		searchForm.classList.toggle('show');
// 		if(searchForm.classList.contains('show')) {
// 			searchButtonIcon.classList.replace('bx-search', 'bx-x');
// 		} else {
// 			searchButtonIcon.classList.replace('bx-x', 'bx-search');
// 		}
// 	}
// })


// if(window.innerWidth < 768) {
// 	sidebar.classList.add('hide');
// } else if(window.innerWidth > 576) {
// 	searchButtonIcon.classList.replace('bx-x', 'bx-search');
// 	searchForm.classList.remove('show');
// }


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

let tokenData=localStorage.getItem('tokenItem');
let currentIdData=localStorage.getItem('currentId');

let logOut=document.querySelector('.logout');
logOut.addEventListener('click', e=>{
    localStorage.setItem('userItem',  null);
    localStorage.setItem('tokenItem', null);
    localStorage.setItem('currentId', null);
})

if(currentIdData){
    fetch(`https://job-stalker.onrender.com/messages/${currentIdData}`,{
        headers:{Authentication: tokenData.token}
    })
    .then(res=>res.json())
    .then(data=>{

        let messageBox=document.querySelector('.message-box');
        messageBox.innerHTML='';

        let followUpBox=document.querySelector('.todo-list')
        followUpBox.innerHTML=''

        let messageCount=document.querySelector('.message-count');
        messageCount.innerHTML=data.length?data.length:0

        let daysBetween=(start, end)=>{
            let difference=(Date.now())-Date.parse(start);
            let diffDays=difference/(86400000)
            return Math.floor(diffDays);
        }

        let addUnderScore=(str)=>{
            return str.replace(/ /g,"_");
        }

        let removeUnderScore=(str)=>{
            return str.replace(/_/g," ");
        }

        let shorten=(item, limit)=>{
            let shortenedItem=item.substring(0, limit?limit:40)
            shortenedItem==item?null:shortenedItem+='...'
            return shortenedItem
        }

        let expandContract=(element, limit)=>{
            if(element.innerHTML==shorten(element.title, limit?limit:null))
                element.innerHTML=element.title;
            else
                element.innerHTML=shorten(element.title, limit?limit:null)
        }

        let cancelledListJSON=localStorage.getItem('cancelledItem')
        cancelledItem=JSON.parse(cancelledListJSON);
        cancelledItem?null:cancelledItem=[];

        cancelledItem.forEach(item=>{
            uniqueContact.push(item);
        })

        //builds out the list
        let alerts=0;
        let msgIdNum=0;
        data.sort((a,b)=>{
            let da=new Date(a.date)
            let db=new Date(b.date)
            return da-db
        })
        let postThing=document.querySelector('.dynamic-post')
        console.log(data)
        data.forEach(element => {
            let convertDate=`${element.date}`;
            convertDate=convertDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
            console.log(element.note)

            let index=data.indexOf(element);
            if(!element.name)
                return;
            messageBox.innerHTML+=
            `
            <tr class="message-entry">
                <td>
                    <p>${element.name}</p>
                </td>
                <td title="${element.method}" class='mtd_item'>
                    ${shorten(element.method, 10)}
                </td>
                <td>
                    <span title="${element.note}" class= 'msg_item'>
                        ${shorten(element.note)}
                    </span>
                </td>
                <td><span class="Entry Date">${convertDate}</span></td>
            </tr>
            `;
            msgIdNum++;
            
            if(daysBetween(convertDate)<7)
                return;
            if(uniqueContact.includes(element.name))
                return;
            uniqueContact.push(element.name);
            alerts++;
            followUpBox.innerHTML+=
            `
            <li class="completed">
                <p>Contacted ${element.name} ${daysBetween(convertDate)} days ago</p>
                <button type="delete" class='bx delete-btn' value=${addUnderScore(element.name)}>
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </li>`;
        });

        if(msgIdNum>1)
                postThing.innerHTML+='s'

        alerts?notificationBell.innerHTML+=`<span class="num">${alerts}</span>`:null;

        let updateCancelledList=()=>{
            cancelledListJSON=JSON.stringify(cancelledItem);
            localStorage.setItem('cancelledItem',cancelledListJSON);
            window.location.reload();
        }

        //adds funcitonality to the follow up delete buttons
        let deleteButtons=document.querySelectorAll('.delete-btn');
        deleteButtons=Array.from(deleteButtons);
        deleteButtons.forEach(but=>{
            but.addEventListener('click', (e)=>{
                console.log('click')
                cancelledItem.push(removeUnderScore(but.value))
                updateCancelledList();
            })
        })

        let refreshButton=document.querySelector('.bx-plus');
        refreshButton.addEventListener('click', (e)=>{
            cancelledItem=[]
            updateCancelledList();
        })

        let messageAreas=document.querySelectorAll('.msg_item');
        messageAreas=Array.from(messageAreas);
        messageAreas.forEach(m=>{
            m.addEventListener('click', e=>{
                expandContract(m)
            })
        })

        let methodAreas=document.querySelectorAll('.mtd_item');
        methodAreas=Array.from(methodAreas);
        methodAreas.forEach(m=>{
            m.addEventListener('click', e=>{
                expandContract(m, 10)
            })
        })
        
        let loginArea=document.querySelector('.nav-link');
        let userData=localStorage.getItem('userItem');
        console.log(userData)
        userData?loginArea.innerHTML=userData:null;

    })

}
