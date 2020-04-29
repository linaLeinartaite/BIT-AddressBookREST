
function getPersons() {

    // fetch("http://localhost:8080/20200420_wstest/myList")
//            .then(data => data.json()) 
//                .then(data => {
//                    console.log(data);
//                });  
    //                
    fetch("http://localhost:8080/20200421_addressBookRest/rest/person")
            .then(data => {
                if (data.ok) {
                    return data.json();
                } else {
                    throw new Error(data.status);
                    console.log(Error.message);
                }
            })
            .then(data => {
                let tbody = document.querySelector("#tbody");
                tbody.innerHTML = "";
                data.forEach(item => {

                    let tr = document.createElement("tr");
                    tr.setAttribute("id", `row${item.id}`);
                  //  tr.setAttribute("class", `d-flex`);
                    tbody.appendChild(tr);

                    let row = document.getElementById(`row${item.id}`);

                    let td = document.createElement("td");
                    let t = document.createTextNode(item.id);
                 
                    td.appendChild(t);
                    row.appendChild(td);

                    td = document.createElement("td");
                    t = document.createTextNode(item.firstName);
                    td.setAttribute("class", "firstName");
                 
                    td.appendChild(t);
                    row.appendChild(td);

                    td = document.createElement("td");
                    t = document.createTextNode(item.lastName);
                    td.setAttribute("class", "lastName");
                    td.appendChild(t);
                    row.appendChild(td);

                    td = document.createElement("td");
                    if (item.birthDate === undefined) {
                        t = document.createTextNode("******");
                    } else {
                        t = document.createTextNode(item.birthDate);
                    }
                    td.appendChild(t);
                    row.appendChild(td);

                    td = document.createElement("td");
                    if (item.salary === undefined) {
                        t = document.createTextNode("******");
                    } else {
                        t = document.createTextNode(item.salary);
                    }
                    td.appendChild(t);
                    row.appendChild(td);

                    td = document.createElement("td");
                    //  td.innerHTML = `<a class="btn btn-link " href="addresses.html?id=${item.id}&fn=${item.firstName}&ln=${item.lastName}";">Addresses</a>`;
                    td.innerHTML = `<button class="btn btn-link " onclick="loadedA(${item.id});">Addresses</button>`;
                    row.appendChild(td);

                    td = document.createElement("td");
                    //  td.innerHTML = `<a class="btn btn-link " href="contacts.html?id=${item.id}&fn=${item.firstName}&ln=${item.lastName}">Contacts</a>`;
                    td.innerHTML = `<button class="btn btn-link " onclick="loadedC(${item.id});">Contacts</button>`;
                    row.appendChild(td);

                    td = document.createElement("td");
                    td.innerHTML = `<button class="btn btn-danger btn-sm delete" onclick="removePerson(${item.id});">Delete</button>`;
                    row.appendChild(td);

                    td = document.createElement("td");
                    td.innerHTML = `<td> <button class="btn btn-success  btn-sm pl-3 pr-3 edit" onclick="getForm(${item.id});">Edit</button> </td>`;
                    row.appendChild(td);
                });

            })
            .catch(err => {
                alert(err.message);
            })
            ;
}
function getPersonName(id) {   
    fetch("http://localhost:8080/20200421_addressBookRest/rest/person/" + id,
            {
                method: "GET",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json;charset=UTF-8",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
            .then(async data => {
                if (data.ok) {
                    try {
                        return await data.json();
                    } catch (err) {
                    }
                } else {
                    throw new Error(data.status);
                }
            })
            .then(data => {
                let name = document.querySelector(".name");
                name.innerHTML = `${data.firstName} ${data.lastName}`;                            
            }).catch(err => {
        alert(err.message);
    });

}

function getPerson(id) {

    let person = {};
    fetch("http://localhost:8080/20200421_addressBookRest/rest/person/" + id,
            {
                method: "GET",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json;charset=UTF-8",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
            .then(async data => {
                if (data.ok) {
                    try {
                        return await data.json(); //laukia kol promisas pasidarys resolved arba rejected
                        //tam kad galima butu naudotis situo daiktu funkcija turi buti async
                    } catch (err) {
//                        return {
//                            firstName: "",
//                            lastName: "",
//                            birthDate: "",
//                            salary: 0
//                        };
                    }
                } else {
                    throw new Error(data.status);
                }
            })
            .then(data => {
                const fnEl = document.getElementById("fn");
                const lnEl = document.getElementById("ln");
                const bdEl = document.getElementById("bd");
                const sEl = document.getElementById("s");
                fnEl.value = data.firstName;
                lnEl.value = data.lastName;
                bdEl.value = data.birthDate;
                sEl.value = data.salary;
//                person = {
//                    id: id,
//                    firstName: fnEl.value,
//                    lastName: lnEl.value,
//                    birthDate: bdEl.value,
//                    salary: parseFloat(sEl.value)
//                };
                person = {
                    id: id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    birthDate: data.birthDate,
                    salary: parseFloat(data.salary)
                };
            })

            .catch(err => {
                alert(err.message);
            });
    return person;
}

function removePerson(id) {
    let main = document.getElementById("container");
    main.innerHTML = "";
    const inputEl = document.getElementById("personId");
    fetch("http://localhost:8080/20200421_addressBookRest/rest/person/" + id, {
        method: "DELETE"
    })
            .then(data => {
                if (data.ok) {
                    console.log("Deleted");
                } else {
                    throw new Error(data.status);
                }
            })
            .catch(err => {
                alert(err.message);
            })
            .then(data => {
                loaded();
            })
            ;
}

function createPerson(person) {

    fetch("http://localhost:8080/20200421_addressBookRest/rest/person", {
        method: "POST",
        cache: "no-cache", // cia info narsyklei kad nekeshuotume,
        // nes norimgauti duomenis kurie yra tuo metu duomenu bazeje del to nekeshuojam
        credentials: "same-origin", //cia default'ine reiksme
        headers: {// t.y. kokio tipo mes tikimes ir koki tipa mes siunciam
            "Accept": "application/json;charset=UTF-8", // tai ko tikimes normaliai text.html
            "Content-Type": "application/json" //tai ka siunciam normaliai buna text.html
        },
        body: JSON.stringify(person)
    })
            .then(data => {
                if (data.ok) {
                    return data.json();
                } else {
                    throw new Error(data.status);
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                alert(err.message);
            })
            .then(data => {
                loaded();
            })
            ;
}

function updatePerson(person, id) {

    fetch("rest/person/" + id, {
        method: "PUT",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Accept": "application/json;charset=UTF-8",
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(person)
    })
            .then(data => {
                if (data.ok) {
                    return data.json();
                } else {
                    throw new Error(data.status);
                }
            })
            .then(data => {
                //   console.log(data);
                //   getPersons();
            })
            .catch(err => {
                //   alert(err.message); 
            })
            .then(data => {
                loaded();
            })
            ;
//    }
}

