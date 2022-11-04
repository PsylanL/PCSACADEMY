var student = {};

getStudent(localStorage.id);

async function getStudent(id) {
    const getStudent = "http://localhost:8080/api/student/search/" + id;
    let request = await fetch(getStudent);
    let response = await request.json();
    this.student = response[0];
    console.log(student);
    imprimirNombre(student);
}

function imprimirNombre (user) {
    console.log(user.name);
}