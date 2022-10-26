
var data = '';
async function schedule(Id){
    const getSchedule = 'http://localhost:8080/api/enrollment/schedule'+Id;
    let request = await fetch(getSchedule);
    let response = await request.json();
    this.data = response;
    list(this.data);
}

window.onload = schedule(); 

$(document).ready(function () {
    
  $('#btn-schedule').click(function(){
      
    $('#schedule_table').printThis();

});
});
/*async function list(elem) {

    if(elem != this.data){
        tableBody.innerHTML = "";
        //console.log('hola')
    }

    for(element of elem) {
     

}*/
