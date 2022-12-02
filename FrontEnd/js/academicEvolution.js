var data = '';
var  IdStudent = parseInt(localStorage.id);

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

async function listEnrollment(Id) {
    if (courses.length != 0) {
        const getSchedule = 'http://localhost:8080/api/enrollment/listEvo/' + Id;
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

    let enrollmentTable = document.getElementById('evolution');
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

    enrollmentTable.appendChild(tableBody);

    elem = '';

}

// Notification
function notification(type, title, msg) {

    toastr[type](msg, title);
}

// End Notification