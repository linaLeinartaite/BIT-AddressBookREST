function getAddresses(id) {

    fetch("rest/person/" + id + "/address", {
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
                    t = document.createTextNode(item.address);
                    td.appendChild(t);
                    row.appendChild(td);

                    td = document.createElement("td");
                    t = document.createTextNode(item.city);
                    td.appendChild(t);
                    row.appendChild(td);

                    td = document.createElement("td");
                    t = document.createTextNode(item.postCode);
                    td.appendChild(t);
                    row.appendChild(td);

                    td = document.createElement("td");
                    td.innerHTML = `<button class="btn btn-danger btn-sm delete" onclick="removeAddress(${item.id}, ${id});">Delete</button>`;
                    row.appendChild(td);

                    td = document.createElement("td");
                    td.innerHTML = `<td> <button class="btn btn-success  btn-sm pl-3 pr-3 edit" onclick="getFormA(${id},${item.id});">Edit</button> </td>`;
                    row.appendChild(td);


                });
            })
            .catch(err => {
                alert(err.message);
            });
}

function getAddress() {
    const pidEl = document.getElementById("personId");
    const aidEl = document.getElementById("addressId");
    fetch("rest/person/" + pidEl.value + "/address/" + aidEl.value, {
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
                const aidEl = document.getElementById("addressId");
                const pidEl = document.getElementById("personId");
                const aEl = document.getElementById("a");
                const cEl = document.getElementById("c");
                const pcEl = document.getElementById("pc");

                aEl.value = data.address;
                cEl.value = data.city;
                pcEl.value = data.postCode;

               let address = {
                    id: aidEl.value,
                    person_id: pidEl.value,
                    address: aEl.value,
                    city: cEl.value,
                    postal_code: pcEl.value
                };

            })
            .catch(err => {
                alert(err.message);
            });
}

function removeAddress(addressId, id) {

    let main = document.getElementById("container");

    fetch("http://localhost:8080/20200421_addressBookRest/rest/person/" + id + "/address/" + addressId, {
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
                    () =>
            {
                main.innerHTML = "";
                //getAddresses(id);
                loadedA(id);
            })
            ;
}

function createAddress(address) {
    const pidEl = document.getElementById("personId");

    fetch("http://localhost:8080/20200421_addressBookRest/rest/person/" + pidEl.value + "/address", {
        method: "POST",
        cache: "no-cache", // cia info narsyklei kad nekeshuotume,
        // nes norimgauti duomenis kurie yra tuo metu duomenu bazeje del to nekeshuojam
        credentials: "same-origin", //cia default'ine reiksme
        headers: {// t.y. kokio tipo mes tikimes ir koki tipa mes siunciam
            "Accept": "application/json;charset=UTF-8", // tai ko tikimes normaliai text.html
            "Content-Type": "application/json" //tai ka siunciam normaliai buna text.html
        },
        body: JSON.stringify(address)
    })
            .then(data => {
                if (data.ok) {
                    return data.json();
                    console.log("OKKKK");
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
                loadedA(pidEl.value);
            })
            ;
}

function updateAddress(address, idA) {
    // let aidEl = document.getElementById("addressId");
    let pidEl = document.getElementById("personId");

    fetch("http://localhost:8080/20200421_addressBookRest/rest/person/" + pidEl.value + "/address/" + idA, {
        method: "PUT",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Accept": "application/json;charset=UTF-8",
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(address)
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
            .then(data => {
                loadedA(pidEl.value);
            })
            ;
}





