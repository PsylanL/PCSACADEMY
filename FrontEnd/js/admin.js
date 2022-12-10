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




function list(elem) {
    // let classGruop = '';
    // let flag = true;

    let teachersTable = document.getElementById('tableData');
    let tableBody = document.getElementById('tbody');

    for (element of elem) {




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

        td = document.createElement('td');
        td.innerText = element[7];
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
    document.getElementById("selectedCourseAsignature").value = "emty";
    document.getElementById("selectedIdAsignature").value = "emty";
}

function closeModalEnroll() {
    ModalEnroll.hide();
}



//ENROLL ASIGNATURES TO TEACHERS

var teacherOptions = '';
var AsignaturesOptions = '';
var idTeacher = [];

async function ListAsignaturesTeachers() {
    const getTeachersWithAsignatures = 'http://localhost:8080/api/classgroup/listTeachersWithAsignatures';
    let request = await fetch(getTeachersWithAsignatures);
    let response = await request.json();

    this.teachersWithAsignatures = response;
    //console.log(teachersWithAsignatures);
    teachersWithAsignatures.sort();

    list(this.teachersWithAsignatures);



}




async function listTeachers() {
    const getTeachers = "http://localhost:8080/api/teacher/list";
    let request = await fetch(getTeachers);
    let response = await request.json();
    this.teacherOptions = response;
    //console.log(teacherOptions);

    var selectOp = document.getElementById("nameTeacher");

    for (let i = 0; i < teacherOptions.length; i++) {
        selectOp.options[i + 1] = new Option(teacherOptions[i].name + " " +
            teacherOptions[i].lastName, "value = " + i);
    }

}

async function listAsignatures() {
    const getAsignatures = "http://localhost:8080/api/asignature/list";
    let request = await fetch(getAsignatures);
    let response = await request.json();
    this.AsignaturesOptions = response;
    //console.log(AsignaturesOptions);

    var selectOp = document.getElementById("nameAsignature");

    for (let i = 0; i < AsignaturesOptions.length; i++) {
        selectOp.options[i + 1] = new Option(AsignaturesOptions[i].name, "value = " + i);
    }

}

async function selectChange() {
    var valSelect = document.getElementById('nameTeacher');
    var selected = valSelect.options[valSelect.selectedIndex].text;
    var ban = 0;

    for (let as of teacherOptions) {
        if (selected == as.name + " " + as.lastName) {
            //console.log(as);
            document.getElementById("selected_name_teacher").value = as.id;
            ban = 1;
        }
    }
    if (ban == 0) {
        document.getElementById("selected_name_teacher").value = "Empty";

    }

}

var teacherWithClassgroupOptions = '';

async function selectChangeAsignature() {

    var valSelect = document.getElementById('nameAsignature');
    var selected = valSelect.options[valSelect.selectedIndex].text;
    var ban = 0;

        for (let as of AsignaturesOptions) {
            if (selected == as.name) {
                //console.log(as);
                if (as.course == 1) {
                    document.getElementById("selectedCourseAsignature").value = "Motorcycle course A2";
                } else if (as.course == 2) {
                    document.getElementById("selectedCourseAsignature").value = "Automobiles course B1";

                }
                document.getElementById("selectedIdAsignature").value = as.id;
                ban = 1;
            }
        }
        if (ban == 0) {
            document.getElementById("selected_asignature").value = "Empty";
        }

    
}








async function registerEnroll() {
    let enroll = {};
    enroll.id = document.getElementById("selected_id_course").value;
    enroll.idAsignature = document.getElementById("selectedIdAsignature").value;
    enroll.idTeacher = document.getElementById("selected_name_teacher").value;
    enroll.schedule = document.getElementById("selected_asignature_schedule").value;
    enroll.description = document.getElementById("selected_description_course").value;



    if (enroll.id != '' && enroll.idAsignature != 'Empty' && enroll.idTeacher != 'Empty' &&
        enroll.schedule != '' && enroll.description != '') {
        console.log(enroll);
        const request = await fetch('http://localhost:8080/api/classgroup/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(enroll)
        });
        const response = await request.text();
        if (response != 'fail') {
            notification("success", "SUCCESSFUL", "Registration complete!!");
            setTimeout(function () { window.location.href = 'adminAsignaturesTeacher.html'; }, 1000);
        }

    } else {
        notification("error", "Error", "Please enter all fields!!");
    }


}

//END TEACHERS


// Notification
function notification(type, title, msg) {

    toastr[type](msg, title);
}

// End Notification
//
//
//



