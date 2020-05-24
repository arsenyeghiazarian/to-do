let id = 0;
let data = {
    currentList: [],
    deletedList: [],
    doneList: [],
};  

getCurrentList();
getDoneList();
getDeletedList();

// change edit button state
function toggleEdit(id) {
    const el = document.getElementById(id);
    if (el.firstElementChild.getAttribute('contenteditable') === 'false') {
        el.firstElementChild.setAttribute('contenteditable', 'true')
        el.classList.add('active')
        el.firstElementChild.focus();
    } else {
        el.firstElementChild.setAttribute('contenteditable', 'false')
        el.classList.remove('active')
        for(let i = 0; i < data.currentList.length; i++) {
            if(data.currentList[i].id === id) {
                data.currentList[i].title = el.firstElementChild.innerHTML
                break;
            }
        }
    }
}

// submit input form 
function submit() {
    const inputValue = document.getElementById('new-task').value;
    const obj = {
        title: inputValue,
        id: id++
    }
    data.currentList.push(obj);
    getCurrentList();
    document.getElementById('submit').setAttribute('disabled', '');
    document.getElementById('new-task').value = '';
}

// delete, undo and done buttons functionality
function action(id, state) {
    if(state == 'done') {
        for(let i = 0; i < data.currentList.length; i++) {
            if(data.currentList[i].id === id) {
                data.doneList.push(data.currentList.splice(i, 1)[0])
                break;
            }
        }
    }
    if(state === 'delete') {
        for(let i = 0; i < data.currentList.length; i++) {
            if(data.currentList[i].id === id) {
                data.deletedList.push(data.currentList.splice(i, 1)[0])
                break;
            }
        }
    }
    if(state === 'undo') {
        for(let i = 0; i < data.doneList.length; i++) {
            if(data.doneList[i].id === id) {
                data.currentList.push(data.doneList.splice(i, 1)[0])
                break;
            }
        }
    }
    getCurrentList();
    getDoneList();
    getDeletedList()
}

function getCurrentList() {
    let list = document.getElementById('list-wrapper');
    let value = '';
    if (!data.currentList.length) {
        list.innerHTML = '<h4>There Is Nothing To Do</h4>'
    } else {
        list.removeChild(list.childNodes[0])
        data.currentList.sort((a, b) => a.id - b.id).forEach((el) => {
        value += `
                <li class="d-flex align-items-center list-row position-relative" id="${el.id}">
                    <p id="task" contenteditable="false">${el.title}</p>
                    <div class="btn-wrapper d-flex align-items-center">
                        <button id="edit-btn" class="edit d-flex align-items-center justify-content-center" onclick="toggleEdit(${el.id})">
                            <svg class="bi bi-pencil edit-icon" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>
                                <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                        <button class="edit d-flex align-items-center justify-content-center ml-2" onclick="action(${el.id}, 'done')">
                            <svg class="bi bi-check" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                        <button class="edit d-flex align-items-center justify-content-center ml-2" onclick="action(${el.id}, 'delete')">
                            <svg class="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                                <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                </li>
                `
        })
        list.innerHTML = value;
    }
}

function getDoneList() {
    let list = document.getElementById('done-list');
    let value = '';
    if (!data.doneList.length) {
        list.innerHTML = '<h4>There Is Nothing Done Yet</h4>'
    } else {
        list.removeChild(list.childNodes[0])
        data.doneList.forEach((el) => {
        value += `
                <li class="d-flex align-items-center list-row position-relative" id="${el.id}">
                    <p id="task" contenteditable="false">${el.title}</p>
                    <div class="btn-wrapper d-flex align-items-center">
                        <button class="edit d-flex align-items-center justify-content-center ml-2" onclick="action(${el.id}, 'undo')">
                            <svg class="bi bi-arrow-90deg-left" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M6.104 2.396a.5.5 0 010 .708L3.457 5.75l2.647 2.646a.5.5 0 11-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                            <path fill-rule="evenodd" d="M2.75 5.75a.5.5 0 01.5-.5h6.5a2.5 2.5 0 012.5 2.5v5.5a.5.5 0 01-1 0v-5.5a1.5 1.5 0 00-1.5-1.5h-6.5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>
                            </svg>    
                        </button>
                    </div>
                </li>
                `
        })
        list.innerHTML = value;
    }
}

function getDeletedList() {
    let list = document.getElementById('delete-list');
    let value = '';
    if (!data.deletedList.length) {
        list.innerHTML = '<h4>There Is Nothing Deleted</h4>'
    } else {
        list.removeChild(list.childNodes[0])
        data.deletedList.forEach((el) => {
        value += `
                <li class="d-flex align-items-center list-row position-relative" id="${el.id}">
                    <p id="task" contenteditable="false">${el.title}</p>
                </li>
                `
        })
        list.innerHTML = value;
    }
} 


// detect input change on keyboard key press 
document.getElementById('new-task').addEventListener('keyup', (event) => {
    if(event.keyCode === 13 && event.target.value.length !== 0) {
        submit()
    }
    if (event.target.value.length !== 0) {
        document.getElementById('submit').removeAttribute('disabled')
    } else {
        document.getElementById('submit').setAttribute('disabled', '')
    }
})