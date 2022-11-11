window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY>0)
});

async function loginStudent () {
    var option = document.getElementById('option').value;

    if (option == 1){
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
        if (response != 'fail') {
            let credentials = response.split(',');
            localStorage.token = credentials[0];
            localStorage.id = credentials[1];
            window.location.href = "courses_home.html";
        }
    }

    if (option == 2) {
        
        let teacher = {};
        teacher.email = document.getElementById("login-email").value;
        teacher.password = document.getElementById("login-pass").value;
        const request = await fetch('http://localhost:8080/api/auth/loginteacher', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(teacher)
        });
        const response = await request.text();
        if (response != 'fail') {
            let credentials = response.split(',');
            localStorage.token = credentials[0];
            localStorage.id = credentials[1];
            window.location.href = "teacherHome.html";
        }
    }
}


// Notification
function notification(type,title,msg){

    toastr[type](msg, title);
}

// End Notification