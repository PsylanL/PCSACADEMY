var teacher = {};

getTeacher(localStorage.id);

async function getTeacher(id) {
    const getTeacher = "http://localhost:8080/api/teacher/search/" + id;
    let request = await fetch(getTeacher);
    let response = await request.json();
    this.teacher = response[0];
    printName(teacher);
}

function printName (user) {
    document.getElementById('simpleDropdown').innerHTML = user.name;
}

function signOut () {
    localStorage.id = null;
    localStorage.token = null;
    window.location.replace('index.html');
}