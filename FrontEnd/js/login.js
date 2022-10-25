window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY>0)
});


async function registerStudent (){
    let student = {};
    student.id = document.getElementById("id").value;
    student.name = document.getElementById("name").value;
    student.lastName = document.getElementById("lastname").value;
    student.years = document.getElementById("years").value;
    student.email = document.getElementById("email").value;
    student.phone = document.getElementById("phone").value;
    student.password = document.getElementById("password").value;
    if(student.password == document.getElementById('password2').value){
        alert('hola2');
        const request = await fetch('http://localhost:8080/api/student/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });
        alert('Registrado');
    } else {
        alert('porfavor verifique que las contrasenas coincidan');
    }
}

async function loginStudent () {
    let student = {};
    student.email = document.getElementById("login-email").value;
    student.password = document.getElementById("login-pass").value;
    const request = await fetch('http://localhost:8080/api/auth/loginStudent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
    });

    const response = await request.text();

    console.log(response);

}