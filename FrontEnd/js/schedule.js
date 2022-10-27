
var data = '';
var  IdStudent = parseInt(localStorage.id);
console.log(IdStudent)

async function schedule(Id){
    const getSchedule = 'http://localhost:8080/api/enrollment/schedule/'+Id;
    let request = await fetch(getSchedule,{
        method: 'GET',
        headers: {
            'authorization': localStorage.token
        }
    });
    let response = await request.json();
    this.data = response;
    console.log(data);
    list(this.data);
}

window.onload = schedule(IdStudent); 

async function list(elem) {

    let scheduleTable = document.getElementById('schedule_table');
    let tableBody = document.getElementById('tbody');

    if(elem != this.data){
        tableBody.innerHTML = "";
        //console.log('hola')
    }

    for(element of elem) {
        let row = document.createElement('tr');
        let td = document.createElement('td');

        td = document.createElement('td');
        td.innerText = element.day;
        row.appendChild(td);

        td = document.createElement('td');
        td.innerText = element.name;
        row.appendChild(td);

        td = document.createElement('td');
        td.innerText = element.cellPhone;
        row.appendChild(td);

        td = document.createElement('td');
        td.innerText = element.mail;
        row.appendChild(td);

        tableBody.appendChild(row);
    }

    scheduleTable.appendChild(tableBody);

    elem = '';

}




$(document).ready(function () {
    
  $('#btn-schedule').click(function(){
      
    $('#schedule_table').printThis();

});
});
