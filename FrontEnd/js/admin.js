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
    //console.log(teachersWithAsignatures);

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
    listTeachers();
    listAsignatures();
    document.getElementById("selected_name_teacher").value = "emty";
    document.getElementById("selected_asignature").value = "emty";
}

function closeModalEnroll() {
    ModalEnroll.hide();
}



//ENROLL ASIGNATURES TO TEACHERS

var teacherOptions = '';
var AsignaturesOptions = '';

async function listTeachers() {
    const getTeachers = "http://localhost:8080/api/teacher/list";
    let request = await fetch(getTeachers);
    let response = await request.json();
    this.teacherOptions = response;
    console.log(teacherOptions);

    var selectOp = document.getElementById("nameTeacher");

    for(let i = 0; i < teacherOptions.length; i++){
        selectOp.options[i+1] = new Option(teacherOptions[i].name + " " + 
        teacherOptions[i].lastName, "value = " + i);
    }

}

async function listAsignatures() {
    const getAsignatures = "http://localhost:8080/api/asignature/list";
    let request = await fetch(getAsignatures);
    let response = await request.json();
    this.AsignaturesOptions = response;
    console.log(AsignaturesOptions);

    var selectOp = document.getElementById("nameAsignature");

    for(let i = 0; i < AsignaturesOptions.length; i++){
        selectOp.options[i+1] = new Option(AsignaturesOptions[i].name, "value = " + i);
    }

}

async function selectChange() {

    

    var valSelect = document.getElementById('nameTeacher');
    var selected = valSelect.options[valSelect.selectedIndex].text;
    var ban = 0;

    for (let as of teacherOptions) {
        if (selected == as.name + " " + as.lastName) {
            console.log(as);
            document.getElementById("selected_name_teacher").value = as.id;
            ban = 1;
        }
    }
    if (ban == 0) {
        document.getElementById("selected_name_teacher").value = "empty";


    }
    


}

async function selectChangeAsignature() {

    var valSelect = document.getElementById('nameAsignature');
    var selected = valSelect.options[valSelect.selectedIndex].text;
    var ban = 0;

    for (let as of AsignaturesOptions) {
        if (selected == as.name) {
            console.log(as);
            if(as.course == 1){
                document.getElementById("selected_asignature").value = "Motorcycle course A2";
            } else if(course == 2){
                
            }
            
            ban = 1;
        }
    }
    if (ban == 0) {
        document.getElementById("selected_asignature").value = "empty";
        

    }
    


}