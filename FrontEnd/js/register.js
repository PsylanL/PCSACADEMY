var data = '';

async function studentList(){
    const getStudent = "http://localhost:8080/api/student/list";
    let request = await fetch(getStudent);
    let response = await request.json();
    this.data = response;
}

window.onload = studentList(); 


/*NOTIFICATIONS */

function notification(type,title,msg){

    toastr[type](msg, title);
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

async function register(student){
    

        const request = await fetch('http://localhost:8080/api/student/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
            
        }).then((response) => {
            if (response.status != 200) {
                alert('error');
            } else {
                    notification("success", "ACCOUNT CREATED", "Successfully registered");
                    setTimeout(function () { closeModal() }, 1000);

                    fetch('http://localhost:8080/api/student/confirm', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(student)
                    });
                    //id aplication azure: ea48d346-d56d-4bfc-8e0d-e62677de92ca
                    //client secret: 1ya8Q~ITFVeKif4qdeLUGmHZRgeIDbBsb4tK8bNC
                
            }
        });
    } 


async function registerStudent() {
    let student = {};
    student.id = document.getElementById("id").value;
    student.name = document.getElementById("name").value;
    student.lastName = document.getElementById("lastname").value;
    student.years = document.getElementById("years").value;
    student.email = document.getElementById("email").value;
    student.phone = document.getElementById("phone").value;
    student.password = document.getElementById("password").value; 

    let check = 0;      
    for(let i=0; i < this.data.length; i++){ 
        if(student.id == data[i].id){
            check = 1;         
            }
    }
    switch (check){
        case 0:{
            if( student.id != '' && student.name != '' && student.lastName  != '' && student.years != '' && student.email != '' &&   student.phone != '' &&   student.password != '' ){

                if(expresiones.id.test(student.id)){

                    if(expresiones.nombre.test(student.name)){

                         if(expresiones.nombre.test(student.lastName)){

                            if(expresiones.correo.test(student.email )){

                                if(expresiones.telefono.test(student.phone )){

                                    if (student.password == document.getElementById('password2').value) {
                                    
                                     register(student);

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





var myModal = '';

function openModal() {
    myModal = new bootstrap.Modal(document.getElementById("modal-register"), {
        keyboard: false
    })
    myModal.show();
}

function closeModal() {
    myModal.hide();
}

