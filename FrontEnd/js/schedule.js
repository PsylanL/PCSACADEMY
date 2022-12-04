
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
    console.log(getSchedule)
    let response = await request.json();
    this.data = response;
    console.log(data);
    list(this.data);
}

window.onload = schedule(IdStudent); 

async function list(elem) {

    let scheduleTable = document.getElementById('schedule_table');
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

        tableBody.appendChild(row);
    }

    scheduleTable.appendChild(tableBody);

    elem = '';

}




$(document).ready(function () {
    
  $('#btn-schedule').click(function(){
      
    $.print('#schedule_table');

});
});
