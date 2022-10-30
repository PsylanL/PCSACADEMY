
var data = '';
var  IdStudent = parseInt(localStorage.id);

async function listEnrollment(Id){
    const getSchedule = 'http://localhost:8080/api/enrollment/list/'+Id;
    let request = await fetch(getSchedule,{
        method: 'GET',
        headers: {
            'authorization': localStorage.token
        }
    });
    let response = await request.json();
    this.data = response;
    list(this.data);
}

window.onload = listEnrollment(IdStudent); 

async function list(elem) {

    let enrollmentTable = document.getElementById('enrollment');
    let tableBody = document.getElementById('tbody');

    for(element of elem) {
        let row = document.createElement('tr');
        let td = document.createElement('td');

        td = document.createElement('td');
        td.innerText = element[0];
        row.appendChild(td);

        td = document.createElement('td');
        td.innerText = element[1];
        row.appendChild(td);

        td = document.createElement('td');
        td.innerText = element[2];
        row.appendChild(td);

        td = document.createElement('td');
        td.innerText = element[3];
        row.appendChild(td);

        td = document.createElement('td');
        td.innerText = element[4];
        row.appendChild(td);

        tableBody.appendChild(row);
    }

    enrollmentTable.appendChild(tableBody);

    elem = '';

}
var optionsS = '';
async function asig(){
    const getClients = "http://localhost:8080/api/asignature/list";
    let request = await fetch(getClients);
    let response = await request.json();
    this.optionsS = response;
    console.log(this.optionsS);
}

window.onload = asig(); 

var myModal = '';
function openModal() {
    console.log('Hola');

    myModal = new bootstrap.Modal(document.getElementById("modal-register"), {
        keyboard: false
    })
    console.log(optionsS.length);
    var selectOp = document.getElementById("idAsignature");
    $('#idStudent').val(IdStudent);

    for(let i =0; i<optionsS.length;i++){
        selectOp.options[i] = new Option(optionsS[i].name,'valor:' +i);
    }


    myModal.show();
}

function closeModal() {
    myModal.hide();
}


// Notification
function notification(type, title, msg) {

    toastr[type](msg, title);
}

// End Notification

/*REGISTER*/

async function register(enrollment){
    

    const request = await fetch('http://localhost:8080/api/enrollment/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(enrollment)
        
    });
    notification("success", "REGISTERED ENROLL ", "Successfully Registered");
    setTimeout(function(){ window.location.href = 'enrollment.html';}, 1000);
} 


async function registerEnroll() {
let enroll = {};


/*enroll.id = document.getElementById("id").value;
enroll.name = document.getElementById("name").value;
enroll.countseen = document.getElementById("lastname").value;
enroll.idasignature = document.getElementById("years").value;
enroll.idgroup = document.getElementById("email").value;
enroll.idstudent = document.getElementById("phone").value;

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
} */
}
