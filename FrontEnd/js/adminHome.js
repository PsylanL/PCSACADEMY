getAdmin(localStorage.id);

var admin = '';

async function getAdmin(id) {
    const getAdmin = "http://localhost:8080/api/admin/search/" + id;
    let request = await fetch(getAdmin);
    let response = await request.json();
    this.admin = response[0];
    printName(admin);

}

function signOut() {
    localStorage.id = null;
    localStorage.token = null;
    window.location.replace('index.html');
}

function printName(user) {
    document.getElementById('simpleDropdown').innerHTML = user.name;
}

function notification(type,title,msg){

    toastr[type](msg, title);
}

var data = '';
async function listTeacher() {

    const getTeacher = 'http://localhost:8080/api/teacher/list/' ;
    let request = await fetch(getTeacher);
    let response = await request.json();
    this.data = response;    
    list(this.data);
    console.log(this.data)

}
window.onload = listTeacher();

//window.onload = listEnrollment(IdStudent);

async function list(elem) {

    let teacherTable = document.getElementById('teacher');
    let tableBody = document.getElementById('tbody');

    for (element of elem) {
        let row = document.createElement('tr');
        let td = document.createElement('td');

        td = document.createElement('td');
        td.innerText = element[0];
        row.appendChild(td);

        td = document.createElement('td');
        td.innerText = element[3];
        row.appendChild(td);

        td = document.createElement('td');
        td.innerText = element[2];
        row.appendChild(td);

        td = document.createElement('td');
        td.innerText = element[1];
        row.appendChild(td);

        td = document.createElement('td');
        td.innerText = element[4];
        row.appendChild(td);

        td = document.createElement('td');
        td.innerText = element[5];
        row.appendChild(td);


        tableBody.appendChild(row);
    }

    teacherTable.appendChild(tableBody);

    elem = '';

}

/*EXPRESIONES*/

const expresiones = {
    id: /^\d{3,14}$/, // 3 a 14 numeros.
	nombre: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
};

/*FIN EXPRESIONES*/


/*FIN NOTIFICATIONS */

async function register(teacher){
    

        const request = await fetch('http://localhost:8080/api/teacher/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teacher)
            
        }).then((response) => {
                if(response.status!= 200){
                    if(response.status == 208){
                        notification("error", "Email already exists");
                    } else {
                        notification("error", "Error creating Teacher");
                    }
                }
                else {
                    notification("success", "ACCOUNT CREATED", "Successfully registered");
                    location.reload();
                    fetch('http://localhost:8080/api/teacher/confirm', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json' 
                        },
                        body: JSON.stringify(teacher)
                    });
                }
                    //id aplication azure: ea48d346-d56d-4bfc-8e0d-e62677de92ca
                    //client secret: 1ya8Q~ITFVeKif4qdeLUGmHZRgeIDbBsb4tK8bNC
                
        });
    } 


async function registerTeacher() {
    let teacher = {};
    teacher.id = document.getElementById("id").value;
    teacher.name = document.getElementById("name").value;
    teacher.lastName = document.getElementById("lastname").value;
    teacher.years = document.getElementById("years").value;
    teacher.email = document.getElementById("email").value;
    teacher.phone = document.getElementById("phone").value;
    teacher.password = document.getElementById("password").value; 

    let check = 0;      
    for(let i=0; i < this.data.length; i++){ 
        if(teacher.id == data[i].id){
            check = 1;         
            }
    }
    switch (check){
        case 0:{
            if( teacher.id != '' && teacher.name != '' && teacher.lastName  != '' && teacher.years != '' && teacher.email != '' &&   teacher.phone != '' &&   teacher.password != '' ){

                if(expresiones.id.test(teacher.id)){

                    if(expresiones.nombre.test(teacher.name)){

                         if(expresiones.nombre.test(teacher.lastName)){

                            if(expresiones.correo.test(teacher.email )){

                                if(expresiones.telefono.test(teacher.phone )){

                                    if (teacher.password == document.getElementById('password2').value) {
                                    
                                     register(teacher);

                                    }else {
                                        notification("error", "ACCOUNT NOT CREATED", "please check that the passwords match");
                                    }

                               }else{
                                    notification("error", "Enter a valid phone", "Please verify from 7-14 digits ")
                                }

                               }else{
                                    notification("error", "Enter a valid Email", "Please verify ")
                                }
                        }else{
                            notification("error", "Enter a valid Last Name", " Last Name from 4 to 40 letter name")
                        }
                    }else{
                        notification("error", "Enter a valid Name", " Name from 4 to 40 letter name")
                    }
                }else{
                    notification("error", "Enter a valid Id", " Enter only numbers, with range (3-14 digits)")
                }                 
            }else {
                notification("error", "INCOMPLETE FIELDS", "Please verify")
            }
            break;
        }

        case 1:{
            notification("error", "ID ALREADY EXISTS", "Incomplete Registration");
            break;
        }
    } 
}