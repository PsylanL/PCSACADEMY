getAdmin(localStorage.id);

var admin = '';
var teachersWithAsignatures = '';
var asignatures = '';

async function getAdmin(id) {
    const getAdmin = "http://localhost:8080/api/admin/search/" + id;
    let request = await fetch(getAdmin);
    let response = await request.json();
    this.admin = response[0];
    printName(admin);
    ListAsignaturesTeachers();
}


function signOut() {
    localStorage.id = null;
    localStorage.token = null;
    window.location.replace('index.html');
}

function printName(user) {
    document.getElementById('simpleDropdown').innerHTML = user.name;
}


async function ListAsignaturesTeachers() {
    const getTeachersWithAsignatures = 'http://localhost:8080/api/classgroup/listTeachersWithAsignatures';
    let request = await fetch(getTeachersWithAsignatures);
    let response = await request.json();

    this.teachersWithAsignatures = response;
    console.log(teachersWithAsignatures);

    list(this.teachersWithAsignatures);



}


var idTeacher = [];

function list(elem) {
    // let classGruop = '';
    // let flag = true;

    let teachersTable = document.getElementById('teachers');
    let tableBody = document.getElementById('tbody');

    for (element of elem) {

        

        // for(element2 of idTeacher){
        //     console.log(element2);
        //     if(element2 == element[0]){
        //         flag = false;
        //         element[6] += e;
        //     }
        // }

        // idTeacher.push(element[0]);


        // console.log(idTeacher);
        // if (flag) {

        //     let row = document.createElement('tr');
        //     let td = document.createElement('td');



        //     td = document.createElement('td');
        //     td.innerText = element[0];
        //     row.appendChild(td);

        //     td = document.createElement('td');
        //     td.innerText = element[1];
        //     row.appendChild(td);

        //     td = document.createElement('td');
        //     td.innerText = element[2];
        //     row.appendChild(td);

        //     td = document.createElement('td');
        //     td.innerText = element[3];
        //     row.appendChild(td);

        //     td = document.createElement('td');
        //     td.innerText = element[4];
        //     row.appendChild(td);

        //     td = document.createElement('td');
        //     td.innerText = element[5] + " " + element[6] + " ";
        //     row.appendChild(td);



        //     tableBody.appendChild(row);

        //     teachersTable.appendChild(tableBody);

        //     elem = '';
        // } 

        // flag = true;

        
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

            td = document.createElement('td');
            td.innerText = element[5];
            row.appendChild(td);

            td = document.createElement('td');
            td.innerText = element[6];
            row.appendChild(td);



            tableBody.appendChild(row);

            teachersTable.appendChild(tableBody);

            elem = '';

    }

}

var ModalEnroll = '';
function openModalEnroll() {
    ModalEnroll = new bootstrap.Modal(document.getElementById("modal_enroll_asig_teachers"), {
        keyboard: false
    })

    ModalEnroll.show();
}

function closeModalEnroll() {
    ModalEnroll.hide();
}