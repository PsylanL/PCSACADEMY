async function registerStudent() {
    let student = {};
    student.id = document.getElementById("id").value;
    student.name = document.getElementById("name").value;
    student.lastName = document.getElementById("lastname").value;
    student.years = document.getElementById("years").value;
    student.email = document.getElementById("email").value;
    student.phone = document.getElementById("phone").value;
    student.password = document.getElementById("password").value;
    if (student.password == document.getElementById('password2').value) {

        const request = await fetch('http://localhost:8080/api/student/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        }).then((response) => {
            if (response.status != 200){
                alert('error');
            } else {
                if (confirm(student.id)) {
                    alert('registrado satisfactoriamente');
                    window.location.href = 'login.html';
                } else {
                    alert('error');
                }
            }
        });
    } else {
        alert('porfavor verifique que las contrasenas coincidan');
    }
}

async function confirm(id) {
    fetch('http://localhost:8080/api/student/search/'+id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(
        async (response) => {
            let response2 = await response.json();
            if(response2[0].id == document.getElementById("id").value && response2[0].email == document.getElementById("email").value){
                return true;
            }
            return false;
        });
}