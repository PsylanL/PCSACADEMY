window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0)
});



async function loginStudent() {

    let user = {};
    user.email = document.getElementById("login-email").value;
    user.password = document.getElementById("login-pass").value;
    if(user.email != "" && user.password != ""){

        if(expresiones.correo.test(user.email)){
   
            const request = await fetch('http://localhost:8080/api/auth/login/' + user.email + '/' + user.password, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const response = await request.text();

            if (response != 'fail') {
                let credentials = response.split(',');
                localStorage.token = credentials[0];
                localStorage.id = credentials[1];
                if (credentials[2] == 'student') {
                    window.location.href = "courses_home.html";
                }
                if (credentials[2] == 'teacher') {
                    window.location.href = "teacherHome.html";
                }
                if (credentials[2] == 'admin') {
                    window.location.href = "adminHome.html";
                }
        }else{
            notification("error", "Incorrect email and/or password");
        }
    }else{
        notification("error", "Enter a valid email address ");
     }
    }else{
        notification("error", "Complete the fields");
    }
}


// Notification
function notification(type, title, msg) {

    toastr[type](msg, title);
}

// End Notification

