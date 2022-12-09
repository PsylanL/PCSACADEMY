
var data = '';
var IdStudent = parseInt(localStorage.id);

async function listCourses() {
    const getCourse = 'http://localhost:8080/api/course/list/' + IdStudent;
    let request = await fetch(getCourse, {
        method: 'GET',
        headers: {
            'authorization': localStorage.token
        }
    });
    let response = await request.json();
    this.data = response;    
    list(this.data);

}
window.onload = listCourses();





//window.onload = listEnrollment(IdStudent);

async function list(elem) {

    let courseTable = document.getElementById('course');
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

        tableBody.appendChild(row);
    }

    courseTable.appendChild(tableBody);

    elem = '';

}
var optionS = '';

async function listCo() {
    const getCourse = 'http://localhost:8080/api/course/listcourse';
    let request = await fetch(getCourse);
    let response = await request.json();
    this.optionS = response;    

}
window.onload = listCo();

var myModal = '';

function openModal() {

    if (data.length == 0) {
        myModal = new bootstrap.Modal(document.getElementById("modal-register"), {
            keyboard: false
        })
        var selectOp = document.getElementById("idCourse");
        $('#idStudent').val(IdStudent);

        for (let i = 0; i < optionS.length; i++) {
            selectOp.options[i + 1] = new Option(optionS[i].id, 'value =' + i);
        }
        myModal.show();
    } else {
        notification("error", "ERROR", "You are already registered for a course ");
    }
}

var dataGroup = '';
async function selectChange() {

    var valSelect = document.getElementById('idCourse');
    var selected = valSelect.options[valSelect.selectedIndex].text;
    var ban = 0;
    for (let as of optionS) {
        if (selected == as.id) {
            $('#idCour').val(as.name);
            ban = 1;
        }
    }
    if (ban == 0) {
        $('#idCour').val('-');

    }
    
}


function closeModal() {
    myModal.hide();
}

// Notification
function notification(type, title, msg) {

    toastr[type](msg, title);
}

// End Notification

async function register(courseEnroll) {

    var msg = '';
    const request = await fetch('http://localhost:8080/api/course/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseEnroll)
            
        })
    notification("success", "REGISTERED COURSE", "Successfully registered");
    setTimeout(function () { window.location.href = 'enroll_course.html'; }, 1100);

}


async function registerCourseStudent() {
    let course = {};
    var valSelect = document.getElementById('idCourse');
    var selected = valSelect.options[valSelect.selectedIndex].text;
    course.idCourse= selected;
    course.idStudent = IdStudent;
    if(course.idCourse != 'Select'){
        register(course);
    }else{
        notification("error", "ERROR", "You must select a course ");

    }
}
