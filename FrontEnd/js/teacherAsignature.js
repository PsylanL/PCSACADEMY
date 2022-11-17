var data = '';

async function classgroup (id) {
    const getClassGroup = "http://localhost:8080/api/teacher/classgroup/" + id;
    let request = await fetch (getClassGroup);
    let respose = await request.json();
    this.data = respose;
    
    for (let i = 0; i < this.data.length; i++) {
        const getAsignature = "http://localhost:8080/api/classgroup/getasignature/" + this.data[i].id;
        let request = await fetch (getAsignature);
        let respose = await request.text();
        this.data[i].name = respose
    }

    cards(this.data);
}

window.onload = classgroup(localStorage.id);

function cards (list) {
    list.forEach(element => {

        let cardImg = document.createElement('div');
        cardImg.innerHTML =  '<img src="'+element.img+'" class="card-img-top" alt="...">' ;

        let cardHeader = document.createElement('div');
        cardHeader.className ="card-body";
        cardHeader.id="card-header";
        cardHeader.innerHTML =  '<h4 class="card-title">'+element.name+'</h4>'+
                                '<p class="card-text">'+element.description+'</p>';

        let cardList = document.createElement('ul');
        cardList.className ='list-group list-group-flush';
        cardList.id="card-list";
        cardList.innerHTML =    '<li class="list-group-item">' +
                                    '<h5>Schedule</h5>' +
                                    '<span>'+element.schedule+'</span>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                    '<button type="button" class="btn btn-primary btn-card" onclick="functionToList('+element.id+')" aria-expanded="false">Student list</button>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                    '<button type="button" class="btn btn-primary btn-card" onclick="updateDescription('+element.id+')" aria-expanded="false">modify description</button>' +
                                '</li>'

        const div = document.createElement('div');
        div.appendChild(cardImg);
        div.appendChild(cardHeader);
        div.appendChild(cardList);
        div.className = 'card';
        div.style="width: 18rem;";
        div.id="card-parent";
        
        let parent = document.getElementById('contenedor-cards');
        parent.appendChild(div);
    });
    
}

async function updateDescription(id) {
    console.log ('voy a modificar la descripcion de:' + id);
    
}

async function functionToList (id) {
    openModalList();
    console.log ('voy a listar a:' + id)
    var students = {};

    const getStudents = "http://localhost:8080/api/classgroup/getStudents/" + id;
    let request = await fetch (getStudents);
    let respose = await request.json();
    students = respose;
    console.log(students);

    let StudentsTable = document.getElementById('tableStudents');
    let tableBody = document.getElementById('tbody');

    for(element of students) {
        let row = document.createElement('tr');
        row.className = 'table-light'
        let td = document.createElement('td');

        td = document.createElement('td');
        td.innerText = element[0];
        row.appendChild(td);

        td = document.createElement('td');
        td.innerText = element[1];
        row.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = '<div class="size"><button class="fa-solid fa-paper-plane btn btn-outline-primary btn-sm" onclick="deleteClient(' + element.id +')" id="btnDelete"></button></div>';
        row.appendChild(td);

        tableBody.appendChild(row);
    }
    StudentsTable.appendChild(tableBody);
}

var ModalEnroll = '';
function openModalList() {
    ModalEnroll = new bootstrap.Modal(document.getElementById("modalList"), {
        keyboard: false
    })

    ModalEnroll.show();
}

function closeModalList() {
    tableBody = document.getElementById('tbody');
    tableBody.innerHTML = '';
    ModalEnroll.hide();
}