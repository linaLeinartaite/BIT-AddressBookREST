function getContacts(id) {

    fetch("rest/person/" + id + "/contact", {
        method: "GET",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Accept": "application/json;charset=UTF-8",
            "Content-Type": "application/json;charset=UTF-8"
        }
    })
            .then(data => {
                if (data.ok) {
                    return data.json();
                } else {
                    throw new Error(data.status);
                }
            })
            .then(data => {

                let tbody = document.querySelector("#tbody");
                tbody.innerHTML = "";
                data.forEach(item => {

                    let tr = document.createElement("tr");
                    tr.setAttribute("id", `row${item.id}`);
                    tbody.appendChild(tr);
                    let row = document.getElementById(`row${item.id}`);
                    let td = document.createElement("td");
                    let t = document.createTextNode(item.id);
                    td.appendChild(t);
                    row.appendChild(td);
                    td = document.createElement("td");
                    t = document.createTextNode(item.type);
                    td.appendChild(t);
                    row.appendChild(td);
                    td = document.createElement("td");
                    t = document.createTextNode(item.contact);
                    td.appendChild(t);
                    row.appendChild(td);
                    td = document.createElement("td");
                    td.innerHTML = `<button class="btn btn-danger btn-sm delete" onclick="removeContact(${item.id}, ${id});">Delete</button>`;
                    row.appendChild(td);
                    td = document.createElement("td");
                    td.innerHTML = `<td> <button class="btn btn-success  btn-sm pl-3 pr-3 edit" onclick="getFormC(${id},${item.id});">Edit</button> </td>`;
                    row.appendChild(td);
                });
            })
            .catch(err => {
                alert(err.message);
            });
}

function getContact() {
    const pidEl = document.getElementById("personId");
    const cidEl = document.getElementById("contactId");
    fetch("rest/person/" + pidEl.value + "/contact/" + cidEl.value, {
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
                        return null;
                    }
                } else {
                    throw new Error(data.status);
                }
            })
            .then(data => {
                const cidEl = document.getElementById("contactId");
                const pidEl = document.getElementById("personId");
                const tEl = document.getElementById("t");
                const cEl = document.getElementById("c");
                tEl.value = data.type;
                cEl.value = data.contact;
               let contact = {
                    id: cidEl.value,
                    person_id: pidEl.value,
                    type: tEl.value,
                    contact: cEl.value
                };
            })
            .catch(err => {
                alert(err.message);
            });
}

function removeContact(contactId, id) {

    let main = document.getElementById("container");
    fetch("http://localhost:8080/20200421_addressBookRest/rest/person/" + id + "/contact/" + contactId, {
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
            .then(
                    () => {
                main.innerHTML = "";
                loadedC(id);
            })
            ;
}

function createContact(contact) {
    let pidEl = document.getElementById("personId");

    fetch("http://localhost:8080/20200421_addressBookRest/rest/person/" + pidEl.value + "/contact", {
        method: "POST",
        cache: "no-cache", // cia info narsyklei kad nekeshuotume,
        // nes norimgauti duomenis kurie yra tuo metu duomenu bazeje del to nekeshuojam
        credentials: "same-origin", //cia default'ine reiksme
        headers: {// t.y. kokio tipo mes tikimes ir koki tipa mes siunciam
            "Accept": "application/json;charset=UTF-8", // tai ko tikimes normaliai text.html
            "Content-Type": "application/json" //tai ka siunciam normaliai buna text.html
        },
        body: JSON.stringify(contact)
    })
            .then(data => {
                if (data.ok) {
                    return data.json();
                } else {
                    throw new Error(data.status);
                }
            })
            .then(data => {       
            })
            .catch(err => {
                alert(err.message);
            })
            .then(data => {
                loadedC(pidEl.value);
            })
            ;
}

function updateContact(contact, idC) {
    const pidEl = document.getElementById("personId");

    fetch("http://localhost:8080/20200421_addressBookRest/rest/person/" + pidEl.value + "/contact/" + idC, {
        method: "PUT",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Accept": "application/json;charset=UTF-8",
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(contact)
    })
            .then(data => {
                if (data.ok) {
                    console.log("OKKK");
                    return data.json();
                } else {
                    throw new Error(data.status);
                }
            })
            .then(data => {
            })
            .catch(err => {
                alert(err.message);
            })
            .then((data) => {

                loadedC(pidEl.value);
            })
            ;
}