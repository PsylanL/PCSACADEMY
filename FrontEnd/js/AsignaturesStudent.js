var data = '';

async function classgroup(id) {
    const getClassGroup = "http://localhost:8080/api/student/classgroup/" + id;
    let request = await fetch(getClassGroup);
    let respose = await request.json();
    this.data = respose;

    for (let i = 0; i < this.data.length; i++) {
        const getAsignature = "http://localhost:8080/api/classgroup/getasignature/" + this.data[i].id;
        let request = await fetch(getAsignature);
        let respose = await request.text();
        this.data[i].name = respose
    }

    cards(this.data);
}

window.onload = classgroup(localStorage.id);

function cards(list) {
    list.forEach(element => {

        let cardImg = document.createElement('div');
        cardImg.innerHTML = '<img src="' + element.img + '" class="card-img-top" alt="...">';

        let cardHeader = document.createElement('div');
        cardHeader.className = "card-body";
        cardHeader.id = "card-header";
        cardHeader.innerHTML = '<h4 class="card-title">' + element.name + '</h4>' +
            '<p class="card-text">' + element.description + '</p>';

        let cardList = document.createElement('ul');
        cardList.className = 'list-group list-group-flush';
        cardList.id = "card-list";
        cardList.innerHTML = '<li class="list-group-item">' +
            '<h5>Schedule</h5>' +
            '<span>' + element.schedule + '</span>' +
            '</li>' 

        const div = document.createElement('div');
        div.appendChild(cardImg);
        div.appendChild(cardHeader);
        div.appendChild(cardList);
        div.className = 'card';
        div.style = "width: 18rem;";
        div.id = "card-parent";

        let parent = document.getElementById('contenedor-cards');
        parent.appendChild(div);
    });

}