
var data = '';
var  IdStudent = parseInt(localStorage.id);

async function listEnrollment(Id){
    const getSchedule = 'http://localhost:8080/api/enrollment/list/'+Id;
    let request = await fetch(getSchedule,{
        method: 'GET',
        headers: {
            'authorization': localStorage.token
        }
    });
    let response = await request.json();
    this.data = response;
    console.log(this.data);
    list(this.data);
}

window.onload = listEnrollment(IdStudent); 

async function list(elem) {

    let enrollmentTable = document.getElementById('enrollment');
    let tableBody = document.getElementById('tbody');

    for(element of elem) {
        let row = document.createElement('tr');
        let td = document.createElement('td');

        td = document.createElement('td');
        td.innerText = element[0];
        row.appendChild(td);

        td = document.createElement('td');
        td.innerText = element[1];
        row.appendChild(td);

        td = document.createElement('td');
        td.innerText = element[2];
        row.appendChild(td);

        td = document.createElement('td');
        td.innerText = element[3];
        row.appendChild(td);

        td = document.createElement('td');
        td.innerText = element[4];
        row.appendChild(td);

        tableBody.appendChild(row);
    }

    enrollmentTable.appendChild(tableBody);

    elem = '';

}

var myModal = '';

function openModal() {
    myModal = new bootstrap.Modal(document.getElementById("modal-register"), {
        keyboard: false
    })
    myModal.show();
}

function closeModal() {
    myModal.hide();
}

// Notification
function notification(type, title, msg) {

    toastr[type](msg, title);
}

// End Notification
