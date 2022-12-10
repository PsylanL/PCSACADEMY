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