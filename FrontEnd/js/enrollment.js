
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
    const getAsign = "http://localhost:8080/api/asignature/list";
    let request = await fetch(getAsign);
    let response = await request.json();
    this.optionsS = response;
}

window.onload = asig(); 

var myModal = '';
function openModal() {

    myModal = new bootstrap.Modal(document.getElementById("modal-register"), {
        keyboard: false
    })
    var selectOp = document.getElementById("idAsignature");
    $('#idStudent').val(IdStudent);

    for(let i =0; i<optionsS.length;i++){
        selectOp.options[i+1] = new Option(optionsS[i].name,'value =' +i);
    }

    myModal.show();
}

    
    
function closeModal() {
    myModal.hide();
}

var dataGroup = '';
async function selectChange(){
    
    var valSelect = document.getElementById('idAsignature');
    var selected = valSelect.options[valSelect.selectedIndex].text;
    var ban = 0;
    for(let as of optionsS){
        if(selected == as.name){
            $('#idAs').val(as.id);
            ban = 1;
        }
    }
    if(ban == 0){
        $('#idAs').val('-');

    }
    if( $('#idAs').val() !=  '-'  &&  $('#idAs').val() !=  ''){
        var idAsigna = $('#idAs').val();
        const getGroup= "http://localhost:8080/api/classgroup/list/"+idAsigna;
        let request = await fetch(getGroup);
        let response = await request.json();
        this.dataGroup = response;
        var selectGroup = document.getElementById("idGroup");
        if(dataGroup.length>0){

            for(let i =0; i<dataGroup.length;i++){
                selectGroup.options[i+1] = new Option(dataGroup[i].schedule,'value =' +i);
            }
            
        }else{
            $("#idGroup").empty();
            selectGroup.options[0] = new Option('Seleccione','value =' +0);

        }
       

    }
   
    
}

async function selectChangeGroup(){

    var valSelectGroup = document.getElementById('idGroup');
    var selectedGroup = valSelectGroup.options[valSelectGroup.selectedIndex].text;
    var ban = 0;
    for(let as of dataGroup){
        if(selectedGroup == as.schedule){
            $('#idGro').val(as.id);
            ban = 1;
        }
    }
    if(ban == 0){
        $('#idGro').val('-');

    }


}



// Notification
function notification(type, title, msg) {

    toastr[type](msg, title);
}

// End Notification

/*REGISTER*/

async function register(enrollU){
    
    var msg = '';
    const request = await fetch('http://localhost:8080/api/enrollment/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(enrollU)
        
    }).then((response )=> {
        if(response.status != 200){
            msg = 'ERROR 555';

        }else{
            msg = 'REGISTRADO CORRECTAMENTE';
            
        }
        console.log(msg);
    }

    );
    console.log(Request);

   
    //setTimeout(function(){ window.location.href = 'enrollment.html';}, 1000);
} 

/*EXPRESIONES*/

const expresiones = {
    id: /^\d{3,14}$/, // 3 a 14 numeros.
    //count: /^\d{1,2}$/, //1 digito
	
};

/*FIN EXPRESIONES*/


async function registerEnroll() {
    let enroll = {};
    enroll.countSeen = parseInt($('#countseen').val());
    enroll.idAsignature = parseInt($('#idAs').val());
    enroll.idGroup = parseInt($('#idGro').val());
    enroll.idStudent = IdStudent;

    console.log(enroll.countSeen);
    console.log(enroll.idAsignature);
    console.log(enroll.idGroup);
    console.log(enroll.idStudent);

                         register(enroll);
                        
                 
}


var ModalPensum = '';
//pensum
function openModalPensum(){
    ModalPensum = new bootstrap.Modal(document.getElementById("modal-pensum"), {
        keyboard: false
    })

    img = document.querySelector("#body-modal-pensum");
    img.innerHTML = '<img src="../img/pensum.jpg" alt="" id="img-pensum">';

    ModalPensum.show();
}

function closeModalPensum(){
    ModalPensum.hide();
}



//fin pensum