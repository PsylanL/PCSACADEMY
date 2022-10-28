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
                    notification("success","ACCOUNT CREATED", "Successfully registered");
                    setTimeout(function(){ window.location.href = 'login.html';}, 1000);
                    //id aplication azure: ea48d346-d56d-4bfc-8e0d-e62677de92ca
                    //client secret: 1ya8Q~ITFVeKif4qdeLUGmHZRgeIDbBsb4tK8bNC
                } else {
                    notification("error","ERROR","","");
                }
            }
        });
    } else {
        notification("error","ACCOUNT NOT CREATED", "please check that the passwords match");
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

// Notification
function notification(type,title,msg){

    toastr[type](msg, title);
}

// End Notification