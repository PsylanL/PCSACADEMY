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
    if (window.location == 'http://127.0.0.1:5500/FrontEnd/view/asignaturesTeacher.html') {
        ListAsignaturesTeachers();
    } else if (window.location == 'http://127.0.0.1:5500/FrontEnd/view/asignaturesStudent.html') {
        ListAsignaturesStudents();
    }
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

    if (window.location == 'http://127.0.0.1:5500/FrontEnd/view/asignaturesTeacher.html') {
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

    } else if (window.location == 'http://127.0.0.1:5500/FrontEnd/view/asignaturesStudent.html') {
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

        if(selected == "Select"){
            console.log("entro")
            selectOptionsTeacher.innerHTML = '<option value="0">Select</option>'; 
            document.getElementById('selectedIdTeacher').value = "Empty"
        }
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
            setTimeout(function () { window.location.href = 'asignaturesTeacher.html'; }, 1000);
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

var studentsWithAsignatures = '';

async function ListAsignaturesStudents() {
    const getStudentsWithAsignatures = 'http://localhost:8080/api/enrollment/listStudentWithAsignatures';
    let request = await fetch(getStudentsWithAsignatures);
    let response = await request.json();

    this.studentsWithAsignatures = response;
    //console.log(studentsWithAsignatures);

    studentsWithAsignatures.sort();

    list(this.studentsWithAsignatures);



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

var listOfEnrollment = '';

async function registerEnrollAsigForStudents() {
    let flag = 0 ;
    let enroll = {};
    enroll.countSeen = 0;
    enroll.idStudent = document.getElementById("selectedIdStudent").value;
    enroll.idAsignature = document.getElementById("selectedIdAsignature").value;
    enroll.idClassGroup = document.getElementById("selectedIdClassgroup").value;

    console.log(enroll);

    const getEnrollment = "http://localhost:8080/api/enrollment/listAllEnrollment";
            let request = await fetch(getEnrollment);
            let response = await request.json();
            this.listOfEnrollment = response;
            console.log(listOfEnrollment);

    for(let option of listOfEnrollment){
        if(enroll.idStudent == option.idStudent){
            if(enroll.idAsignature == option.idAsignature){
                if(option.countSeen == 2){
                    flag = 1;
                    notification("error", "ERROR", "You have seen this course twice, you cannot register it.");
                } else if(option.countSeen == 1){
                    //console.log("entro");
                    enroll.countSeen = 1;
                }
            }
        }
    }     
    
    if(flag == 0){
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
                setTimeout(function () { window.location.href = 'asignaturesStudent.html'; }, 1100);
    
            }
    
        })

    }

}
 


}


//END STUDENTS