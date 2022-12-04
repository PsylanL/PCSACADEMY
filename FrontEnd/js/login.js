window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0)
});

async function loginStudent() {

    let user = {};

    user.email = document.getElementById("login-email").value;
    user.password = document.getElementById("login-pass").value;
    const request = await fetch('http://localhost:8080/api/auth/login/' + user.email + '/' + user.password, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const response = await request.text();
    console.log(response);

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
    }


    // if (option == 1){
    //     let student = {};
    //     student.email = document.getElementById("login-email").value;
    //     student.password = document.getElementById("login-pass").value;
    //     const request = await fetch('http://localhost:8080/api/auth/loginStudent', {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(student)
    //     });
    //     const response = await request.text();
    //     if (response != 'fail') {
    //         let credentials = response.split(',');
    //         localStorage.token = credentials[0];
    //         localStorage.id = credentials[1];
    //         window.location.href = "courses_home.html";
    //     }
    // }

    // else if (option == 2) {

    //     let teacher = {};
    //     teacher.email = document.getElementById("login-email").value;
    //     teacher.password = document.getElementById("login-pass").value;
    //     const request = await fetch('http://localhost:8080/api/auth/loginteacher', {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(teacher)
    //     });
    //     const response = await request.text();
    //     if (response != 'fail') {
    //         let credentials = response.split(',');
    //         localStorage.token = credentials[0];
    //         localStorage.id = credentials[1];
    //         window.location.href = "teacherHome.html";
    //     }
    // } else if(option == 3){
    //     let admin = {};
    //     admin.email = document.getElementById("login-email").value;
    //     admin.password = document.getElementById("login-pass").value;
    //     const request = await fetch('http://localhost:8080/api/auth/loginadmin', {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(admin)
    //     });
    //     const response = await request.text();
    //     if (response != 'fail') {
    //         let credentials = response.split(',');
    //         localStorage.token = credentials[0];
    //         localStorage.id = credentials[1];
    //         window.location.href = "adminHome.html";
    //     }
    // }

}


// Notification
function notification(type, title, msg) {

    toastr[type](msg, title);
}

// End Notification