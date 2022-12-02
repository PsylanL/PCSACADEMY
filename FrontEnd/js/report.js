
var data = '';
var contInprogress = 0;
var contCompleted = 0;
var contFailed = 0;
var  IdStudent = parseInt(localStorage.id);
console.log(IdStudent)


async function consulta(Id) {
  const getStatus = 'http://localhost:8080/api/enrollment/status/'+Id;
  let request = await fetch(getStatus,{
    method: 'GET',
    headers: {
        'authorization': localStorage.token
    }
});
  
  let response = await request.json();
  this.data = response;
  //console.log(data)
  //console.log(request.status)
  if(request.status==404){
    location.href="error-404.html"
  }
    contador(this.data)
}


function contador(data){
  //console.log(data+" contador")
  data.forEach(element => {
    if(element== "In Progress"){
      this.contInprogress++
    }
    if(element=="Completed"){
      this.contCompleted++
    }
    if(element=="Failed"){
      this.contFailed++
    }
  });
    setter(contInprogress,contCompleted,contFailed)
    chart(contInprogress,contCompleted,contFailed)
  //console.log(contCompleted)
    return contInprogress;
}
consulta(IdStudent)

  function setter(contInprogress,contCompleted,contFailed){
  var currentProgress1 = contInprogress*10
  let progressBar = document.querySelector(".circular-progress");
  let valueContainer = document.querySelector(".value-container");
  let progressValue = 0;
  var progressEndValue = currentProgress1;
  let speed = 50;
  let progress = setInterval(() => {
    progressValue++;
    valueContainer.textContent = `${progressValue}%`;
    progressBar.style.background = `conic-gradient(
        #4d5bf9 ${progressValue * 3.6}deg,
        #cadcff ${progressValue * 3.6}deg
    )`;
    if (progressValue == progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
  
}


function chart(contInprogress,contCompleted,contFailed){
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['In Progress','Completed','Failed'],
      datasets: [{
        label: '# of courses',
        data: [contInprogress,contCompleted,contFailed,10],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}
//Column chart




