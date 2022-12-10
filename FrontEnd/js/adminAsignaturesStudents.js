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
    ListAsignaturesStudents();

}

function signOut() {
    localStorage.id = null;
    localStorage.token = null;
    window.location.replace('index.html');
}

function printName(user) {
    document.getElementById('simpleDropdown').innerHTML = user.name;
}

function list(elem, idTable, idTableBody) {
    // let classGruop = '';
    // let flag = true;

    let teachersTable = document.getElementById(idTable);
    let tableBody = document.getElementById(idTableBody);

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

var studentsWithAsignatures = '';
var studentsWithAsignaturesInProgress = [];
var studentsWithAsignaturesApproved = [];
var studentsWithAsignaturesDisapproved = [];

async function ListAsignaturesStudents() {
    const getStudentsWithAsignatures = 'http://localhost:8080/api/enrollment/listStudentWithAsignatures';
    let request = await fetch(getStudentsWithAsignatures);
    let response = await request.json();

    this.studentsWithAsignatures = response;
    //console.log(studentsWithAsignatures);

    studentsWithAsignatures.sort();

    for (s of studentsWithAsignatures) {
        if (s[7] == "In progress") {
            studentsWithAsignaturesInProgress.push(s);
        } else if (s[7] == "Approved") {
            studentsWithAsignaturesApproved.push(s);
        } else if (s[7] == "Disapproved") {
            studentsWithAsignaturesDisapproved.push(s);
        }
    }

    //console.log(studentsWithAsignaturesInProgress)
    //console.log(studentsWithAsignaturesApproved)
    //console.log(studentsWithAsignaturesDisapproved)
    list(this.studentsWithAsignaturesInProgress, "tableData", "tbody");



}

//STUDENTS
var ModalEnrollStudent = '';
function openModalEnrollStudent() {
    ModalEnrollStudent = new bootstrap.Modal(document.getElementById("modalEnrollAsignStudents"), {
        keyboard: false
    })

    ModalEnrollStudent.show();
    listStudent();
    listAsignatures();
}

function closeModalEnrollStudent() {
    ModalEnrollStudent.hide();
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


var studentOptions = '';

async function listStudent() {
    const getStudent = "http://localhost:8080/api/student/listStudentWithCourse";
    let request = await fetch(getStudent);
    let response = await request.json();
    this.studentOptions = response;
    console.log(studentOptions);

    var selectOp = document.getElementById("nameStudent");

    for (let i = 0; i < studentOptions.length; i++) {
        selectOp.options[i + 1] = new Option(studentOptions[i][3] + " " +
            studentOptions[i][2], "value = " + i);
    }
    //console.log(selectOp)

}

function selectChangeForStudent() {
    var valSelect = document.getElementById('nameStudent');
    var selected = valSelect.options[valSelect.selectedIndex].text;
    var ban = 0;
    console.log(AsignaturesOptions)
    for (let es of studentOptions) {
        if (selected == es[3] + " " + es[2]) {
            document.getElementById('selectedIdStudent').value = es[0];
            ban = 1;
        }
    }
    if (ban == 0) {
        document.getElementById("selectedIdStudent").value = "Empty";
    }



}

var classgroupsAvailables = '';

async function selectChangeTeacherForStudent() {
    var valSelect = document.getElementById('nameTeacher');
    var selected = valSelect.options[valSelect.selectedIndex].text;
    var ban = 0;

    for (let teacher of teacherWithClassgroupOptions) {
        if (selected == teacher[0] + " " + teacher[1]) {
            //console.log(as);
            document.getElementById("selectedIdTeacher").value = teacher[2];
            ban = 1;
        }
    }
    if (ban == 0) {
        document.getElementById("selectedIdTeacher").value = "Empty";
    }

    if (document.getElementById('nameTeacher').value != '' &&
        document.getElementById('selectedIdTeacher').value != '') {
        const getClassgroups = "http://localhost:8080/api/classgroup/classgroupsAvailables/" + document.getElementById('selectedIdTeacher').value;
        let request = await fetch(getClassgroups);
        let response = await request.json();
        this.classgroupsAvailables = response;
        console.log(classgroupsAvailables);

        var selectOptionsClassgroups = document.getElementById("scheduleClassgroup");

        for (let i = 0; i < classgroupsAvailables.length; i++) {
            selectOptionsClassgroups.options[i + 1] = new Option(classgroupsAvailables[i][0], "value = " + i);
        }
    }



}

function selectChangeClassgroupForStudent() {
    var valSelect = document.getElementById('scheduleClassgroup');
    var selected = valSelect.options[valSelect.selectedIndex].text;
    var ban = 0;
    for (let classgroup of classgroupsAvailables) {
        if (selected == classgroup[0]) {
            document.getElementById('selectedDescriptionClassgroup').value = classgroup[1];
            document.getElementById('selectedIdClassgroup').value = classgroup[2];
            ban = 1;
        }
    }
    if (ban == 0) {
        document.getElementById("selectedIdStudent").value = "Empty";
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
        document.getElementById("selectedCourseAsignature").value = "Empty";
        document.getElementById("selectedIdAsignature").value = "Empty";
    }
    if (document.getElementById('nameAsignature').value != '' &&
        document.getElementById('selectedCourseAsignature').value != '' &&
        document.getElementById('selectedIdAsignature').value != '') {
        const getTeachers = "http://localhost:8080/api/classgroup/listTeachersWithClassgroups/" + document.getElementById('selectedIdAsignature').value;
        let request = await fetch(getTeachers);
        let response = await request.json();
        this.teacherWithClassgroupOptions = response;
        console.log(teacherWithClassgroupOptions);

        var selectOptionsTeacher = document.getElementById("nameTeacher");

        for (let i = 0; i < teacherWithClassgroupOptions.length; i++) {
            selectOptionsTeacher.options[i + 1] = new Option(teacherWithClassgroupOptions[i][0] + " " + teacherWithClassgroupOptions[i][1], "value = " + i);
        }
    }

    if (selected == "Select") {
        console.log("entro")
        selectOptionsTeacher.innerHTML = '<option value="0">Select</option>';
        document.getElementById('selectedIdTeacher').value = "Empty"
    }
}



var listOfEnrollment = '';

async function registerEnrollAsigForStudents() {
    let flag = 0;
    let enroll = {};
    enroll.countSeen = 0;
    enroll.idStudent = document.getElementById("selectedIdStudent").value;
    enroll.idAsignature = document.getElementById("selectedIdAsignature").value;
    enroll.idClassGroup = document.getElementById("selectedIdClassgroup").value;
    enroll.status = "In progress";

    console.log(enroll);

    const getEnrollment = "http://localhost:8080/api/enrollment/listAllEnrollment";
    let request = await fetch(getEnrollment);
    let response = await request.json();
    this.listOfEnrollment = response;
    console.log(listOfEnrollment);

    for (let option of listOfEnrollment) {
        if (enroll.idStudent == option.idStudent) {
            if (enroll.idAsignature == option.idAsignature) {
                if (option.status == "Approved") {
                    flag = 1;
                    notification("error", "ERROR", "You have already completed this assignment.");
                } else if (option.status == "In progress") {
                    flag = 1;
                    notification("error", "ERROR", "You have already completed this assignment.");
                } else if (option.status != "Approved" || option.status != "In progress") {
                    if (option.countSeen == 2) {
                        flag = 1;
                        notification("error", "ERROR", "You have seen this course twice, you cannot register it.");
                    } else if (option.countSeen == 1) {
                        //console.log("entro");
                        enroll.countSeen = 1;
                    }
                }

            }
        }
    }

    if (flag == 0) {
        if (enroll.idStudent != 'Empty' && enroll.idAsignature != 'Empty' && enroll.idClassgroup != 'Empty') {
            console.log(enroll);
            const request = await fetch('http://localhost:8080/api/enrollment/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(enroll)
            }).then((response) => {
                if (response.status == 200) {
                    msg = 'REGISTRADO CORRECTAMENTE';
                    notification("success", msg, "");
                    setTimeout(function () { window.location.href = 'adminAsignaturesStudent.html'; }, 1100);

                }

            })

        }

    }



}
//END STUDENTS

//
//
//MODAL STUDENTS APPROVED
var ModalStudentWithAsignaturesApproved = '';
function openModalStudentsWithAsignaturesApproved() {
    ModalStudentWithAsignaturesApproved = new bootstrap.Modal(document.getElementById("modalStudentsWithAsignaturesApproved"), {
        keyboard: false
    })

    ModalStudentWithAsignaturesApproved.show();
    list(studentsWithAsignaturesApproved, "tableDataStudentsWithAsignaturesApproved", "tbodyStudentsWithAsignaturesApproved")

}

function closeModalStudentsWithAsignaturesApproved() {
    ModalStudentWithAsignaturesApproved.hide();
}

//
//END MODAL STUDENTS APPROVED

//MODAL STUDENTS DISAPPROVED
var ModalStudentWithAsignaturesDisapproved = '';
function openModalStudentsWithAsignaturesDisapproved() {
    ModalStudentWithAsignaturesDisapproved = new bootstrap.Modal(document.getElementById("modalStudentsWithAsignaturesDisapproved"), {
        keyboard: false
    })

    ModalStudentWithAsignaturesDisapproved.show();
    list(studentsWithAsignaturesDisapproved, "tableDataStudentsWithAsignaturesDisapproved", "tbodyStudentsWithAsignaturesDisapproved")

}

function closeModalStudentsWithAsignaturesDisapproved() {
    ModalStudentWithAsignaturesDisapproved.hide();
}

//
//END MODAL STUDENTS APPROBED

// Notification
function notification(type, title, msg) {

    toastr[type](msg, title);
}

// End Notification
//
//
//