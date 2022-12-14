var courses = '';
var data = '';
var IdStudent = parseInt(localStorage.id);

async function listEnrollment(Id) {
    if (courses.length != 0) {
        const getSchedule = 'http://localhost:8080/api/enrollment/list/' + Id;
        let request = await fetch(getSchedule, {
            method: 'GET',
            headers: {
                'authorization': localStorage.token
            }
        });
        let response = await request.json();
        this.data = response;
        list(this.data);
    } else {
        notification("error", "ERROR", "You are not enrolled in any course");
    }
}

//window.onload = listEnrollment(IdStudent);

async function list(elem) {

    let enrollmentTable = document.getElementById('enrollment');
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

        tableBody.appendChild(row);
    }

    enrollmentTable.appendChild(tableBody);

    elem = '';

}
var optionsS = '';
async function asig() {
    const getAsign = "http://localhost:8080/api/asignature/list";
    let request = await fetch(getAsign);
    let response = await request.json();
    this.optionsS = response;
}

window.onload = asig();

var myModal = '';
function openModal() {

    if (courses.length != 0) {
        myModal = new bootstrap.Modal(document.getElementById("modal-register"), {
            keyboard: false
        })
        var selectOp = document.getElementById("idAsignature");
        $('#idStudent').val(IdStudent);

        for (let i = 0; i < optionsS.length; i++) {
            selectOp.options[i + 1] = new Option(optionsS[i].name, 'value =' + i);
        }

        myModal.show();
    } else {
        notification("error", "ERROR", "You are not enrolled in any course");
    }
}



function closeModal() {
    myModal.hide();
}

var dataGroup = '';
async function selectChange() {
    $("#idGroup").empty();
    var valSelectGr = document.getElementById('idGroup');
    valSelectGr.options[0] =  new Option('Select', 'value =' + 0);
    $("#idGro").val("");
    var valSelect = document.getElementById('idAsignature');
    var selected = valSelect.options[valSelect.selectedIndex].text;
    var ban = 0;
    for (let as of optionsS) {
        if (selected == as.name) {
            $('#idAs').val(as.id);
            ban = 1;
        }
    }
    if (ban == 0) {
        $('#idAs').val('-');

    }
    if ($('#idAs').val() != '-' && $('#idAs').val() != '') {
        var idAsigna = $('#idAs').val();
        const getGroup = "http://localhost:8080/api/classgroup/list/" + idAsigna;
        let request = await fetch(getGroup);
        let response = await request.json();
        this.dataGroup = response;
        var selectGroup = document.getElementById("idGroup");
        if (dataGroup.length > 0) {

            for (let i = 0; i < dataGroup.length; i++) {
                selectGroup.options[i + 1] = new Option(dataGroup[i].schedule, 'value =' + i);
            }

        } else {
            $("#idGroup").empty();
            selectGroup.options[0] = new Option('Select', 'value =' + 0);

        }


    }


}

async function selectChangeGroup() {

    var valSelectGroup = document.getElementById('idGroup');
    var selectedGroup = valSelectGroup.options[valSelectGroup.selectedIndex].text;
    var ban = 0;
    for (let as of dataGroup) {
        if (selectedGroup == as.schedule) {
            $('#idGro').val(as.id);
            ban = 1;
        }
    }
    if (ban == 0) {
        $('#idGro').val('-');

    }


}



// Notification
function notification(type, title, msg) {

    toastr[type](msg, title);
}

// End Notification

/*REGISTER*/

async function register(enrollU) {

    var msg = '';
    const request = await fetch('http://localhost:8080/api/enrollment/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(enrollU)

    }).then((response) => {
        if (response.status != 200) {
            msg = 'ERROR 555';
            notification("error", msg, "You have seen this course twice, you cannot register it.");

        } else {
            msg = 'Correctly registered';
            notification("success", msg, "");

        }

    }

    );
    setTimeout(function () { window.location.href = 'courses_enroll.html'; }, 1100);
}

/*EXPRESIONES*/

const expresiones = {
    id: /^\d{3,14}$/, // 3 a 14 numeros.
    //count: /^\d{1,2}$/, //1 digito

};

/*FIN EXPRESIONES*/


async function registerEnroll() {
    let enroll = {};
    enroll.countSeen = 0;

    if($('#idAs').val() != ""){
        enroll.idAsignature = parseInt($('#idAs').val());
    }
    if($('#idGro').val() != ""){
        enroll.idGroup = parseInt($('#idGro').val());
    }
    
    console.log(enroll.idAsignature);
    enroll.idStudent = IdStudent;
    enroll.status = "In Progress";
    if($('#idAs').val() != "" && $('#idGro').val() != "" && enroll.idStudent != "" ){
        register(enroll);
    }else{
        notification("error", "ERROR", "Select the options");
    }
}



//pensum
var ModalPensum = '';
function openModalPensum(srcImgPensum) {
    ModalPensum = new bootstrap.Modal(document.getElementById("modal-pensum"), {
        keyboard: false
    })

    img = document.querySelector("#body-modal-pensum");
    img.innerHTML = srcImgPensum;

    ModalPensum.show();
}

function closeModalPensum() {
    ModalPensum.hide();
}

async function listCourses() {
    const getCourse = 'http://localhost:8080/api/course/list/' + IdStudent;
    let request = await fetch(getCourse, {
        method: 'GET',
        headers: {
            'authorization': localStorage.token
        }
    });
    let response = await request.json();
    courses = response;
    if (courses.length == 0) {
        notification("error", "ERROR", "You are not enrolled in any course");
    } else {
        listEnrollment(IdStudent);
    }
    //console.log(response)


}

window.onload = listCourses();

function showPensum() {
    if (courses.length != 0) {
        console.log(courses);
        let srcImgPensum = '';
        if (courses[0][1] == 1) {
            console.log("hola");
            srcImgPensum = '<img src="../img/pensum-motos-A2.jpg" alt="" id="img-pensum">';
            openModalPensum(srcImgPensum);
        } else if (courses[0][1] == 2) {
            srcImgPensum = '<img src="../img/pensum-automoviles-B1.jpg" alt="" id="img-pensum">';
            openModalPensum(srcImgPensum);
        }
    }
    else {
        notification("error", "ERROR", "You are not enrolled in any course");
    }
}

//fin pensum

async function validateStatus(IdStudent) {
        const getStatus ='http://localhost:8080/api/enrollment/status/' + IdStudent ;
        let request = await fetch (getStatus, {
            method: 'GET',
            headers: {
                'authorization': localStorage.token
            }
        });
        let response = await request.json();
        this.data = response;
        listEnrollment(IdStudent);
}