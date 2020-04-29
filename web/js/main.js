//LOADING LIST:
//      i. of people
function loaded() {
    let HTML = ``;
    let main = document.getElementById("container");
    main.innerHTML = "";
    main.classList.add("p-4");
    main.classList.add("ml-5");
    main.classList.add("mr-5");
    HTML = ` <h1 class="mb-4">ADDRESS BOOK</h1>   
                    <button class="btn btn-outline-success mb-4" onclick="getPersons();">RELOAD</button>
                    <button class="btn btn-outline-info mb-4" onclick="getForm();">Create New Person</button>

    <table class="table table-striped">    
                            <thead>
                                <tr class="">
                                 <th class="">id</th>
                                 <th class="">First Name</th>
                                 <th class="">Last Name</th>
                                 <th class="">Birth Day</th>
                                <th class="">Salary</th>
                                <th class=""></th>
                                <th class=""></th>
                                <th class=""></th>
                                <th class=""></th>
                                </tr>
                              </thead>
                            <tbody id="tbody">
    </tbody></table>`;
    main.innerHTML = HTML;

    getPersons();
    ;
}
//      ii. of Addresses (A for Address)
function loadedA(id) {
    let HTML = '';
    let main = document.getElementById("container");
    main.innerHTML = "";
    
     // <button class="btn btn-outline-success mb-4" onclick="loadedA(${id});">RELOAD</button>
    HTML = ` <h2 class="mb-4">Addresses of <span class="name"></span></h2>             
                <button class="btn btn-outline-success mb-4" onclick="loaded();">Go Back</button>
                <button class="btn btn-outline-info mb-4" onclick="getFormA(${id});">Create New Address</button>
   <table class="table table-striped">    
                            <thead>
                                <tr>
                                 <th >id</th>
                                 <th >Address</th>
                                 <th >City</th>
                                 <th >Postal Code</th>                                
                                <th></th>
                                <th ></th>                                
                                </tr>
                              </thead>
                            <tbody id="tbody">
    </tbody></table>`;
    main.innerHTML = HTML;
    getPersonName(id);
    getAddresses(id);
}
//      iii. of Contacts (C for Contacts)
function loadedC(id) {
    let HTML = '';
    let main = document.getElementById("container");
    //<button class="btn btn-outline-success mb-4" onclick="loadedC(${id});">RELOAD</button>
    
    main.innerHTML = "";
    HTML = ` <h2 class="mb-4">Contacts of <span class="name"></span></h2>  
    <button class="btn btn-outline-success mb-4" onclick="loaded();">Go Back</button>
    <button class="btn btn-outline-info mb-4" onclick="getFormC(${id});">Create New Contact</button>
    <table class="table table-striped">    
    <thead>
    <tr>
    <th >id</th>
    <th >Contact Type</th>
    <th >Contact</th>                                                            
    <th></th>
    <th ></th>                                
    </tr>
    </thead>
    <tbody id="tbody">
    </tbody></table>`;
    main.innerHTML = HTML;
    
    getPersonName(id);
    getContacts(id);
}

//SAVING (created or updeted):
//      i. person 
function save(ids, event) {
    event.preventDefault();

    const pEl = document.getElementById("personId");
    const fnEl = document.getElementById("fn");
    const lnEl = document.getElementById("ln");
    const bdEl = document.getElementById("bd");
    const sEl = document.getElementById("s");

    if (fnEl.value.trim() === "" || lnEl.value.trim() === "") {
        alert("Please Fill Out All Required Fields!");
    } else {
        let fn = "";
        fnEl.value.split(" ").forEach(i => {
            if (i !== "") {
                fn += i.concat(" ");
            }
        });
        let ln = "";
        lnEl.value.split(" ").forEach(i => {
            if (i !== "") {
                ln += i.concat(" ");
            }
        });
        const person = {
            firstName: fn.trim(),
            lastName: ln.trim(),
            birthDate: bdEl.value,
            salary: parseFloat(sEl.value)
        };

        if (ids !== undefined) {
            const id = parseInt(ids);

            updatePerson(person, id);
        } else {
            createPerson(person);
        }
    }
}
//      ii. Address
function saveA(event, ids, idAs) {

    event.preventDefault();
    const id = parseInt(ids);

    const aEl = document.getElementById("a");
    const cEl = document.getElementById("c");
    const pcEl = document.getElementById("pc");

    if (aEl.value.trim() === "" || cEl.value.trim() === "" || pcEl.value.trim() === "") {
        alert("Please Fill Out All Required Fields!");

    } else {
        const address = {
            address: aEl.value.trim(),
            city: cEl.value.trim(),
            postCode: pcEl.value.trim()
        };

        if (idAs !== undefined) {
            const idA = parseInt(idAs);
            updateAddress(address, idA);
        } else {
            createAddress(address);
        }
    }
}
//      iii. Contact
function saveC(event, ids, idCs) {
    event.preventDefault();
    const id = parseInt(ids);

    const tEl = document.getElementById("t");
    const cEl = document.getElementById("c");

    if (tEl.value.trim() === "" || cEl.value.trim() === "") {
        alert("Please Fill Out All Required Fields!");
    } else {
        const contact = {
            type: tEl.value.trim(),
            contact: cEl.value.trim()
        };

        if (idCs !== undefined) {
            const idC = parseInt(idCs);
            updateContact(contact, idC);
        } else {
            createContact(contact);
        }
    }
}

//LOADING FORM for (edit or make new):
//      i. person       
function getForm(id) {
    let main = document.getElementById("container");
    main.innerHTML = "";
    let HTML = `
<form action="index.html" class="m-5 mb-0">
                <input  type="hidden" id="personId" value="${id}">
                <div class="form-group">    
                    <label class="form-group"> First Name <span class="text-danger">*</span> </label> <input type="text" class="form-group form-control" id="fn">              
                    <label class="form-group">   Last Name <span class="text-danger">*</span> </label> <input type="text" class="form-group form-control" id="ln">                
                    <label class="form-group">  Birth Date</label>  <input  class="form-group form-control"  type="date" id="bd">               
                    <label class="form-group">  Salary </label> <input  class="form-group form-control" id="s">
                          </div>
                <button class="btn btn-success pl-5 pr-5" onclick="save(${id}, event);"> Save </button> 
                <button class="btn btn-info pl-5 pr-5 m-1 ml-3"  onclick="loaded();">Cancel</button> 
     <div class="mt-3"><span class="text-danger">*</span> = required fields</div> 
 </form>
    
`;
    main.innerHTML = HTML;
    if (id === undefined) {
    } else {
        getPerson(id);
    }
}
//      ii. Address
function getFormA(id, idA) {
    let main = document.getElementById("container");
    main.innerHTML = "";
    let HTML = `
<form action="index.html" class="m-5 mb-0">
              <input type="hidden"  id="addressId" value="${idA}">
             <input type="hidden"  id="personId" value="${id}">
                <div class="form-group">    
                    <label class="form-group"> Address <span class="text-danger">*</span> </label> <input type="text" class="form-group form-control" id="a">              
                    <label class="form-group">   City <span class="text-danger">*</span> </label> <input type="text" class="form-group form-control" id="c">                
                    <label class="form-group">  Postal Code <span class="text-danger">*</span> </label> <input type="text" class="form-group form-control" id="pc"> 
                          </div>
                <button class="btn btn-success pl-5 pr-5" onclick="saveA(event, ${id}, ${idA});"> Save </button> 
                <button class="btn btn-info pl-5 pr-5 m-1 ml-3"  onclick="loadedA(${id});">Cancel</button>   
    <div class="mt-3"><span class="text-danger">*</span> = required fields</div>     
</form>
    
`;
    main.innerHTML = HTML;
    if (idA === undefined) {
    } else {
        getAddress();
    }
}
//      iii. Contact
function getFormC(id, idC) {
    let main = document.getElementById("container");
    main.innerHTML = "";
    let HTML = `
<form action="index.html" class="m-5 mb-0">
              <input type="hidden"  id="contactId" value="${idC}">
              <input type="hidden"  id="personId" value="${id}">
                <div class="form-group">    
                    <label class="form-group"> Contact Type <span class="text-danger">*</span> </label> <input type="text" class="form-group form-control" id="t">              
                    <label class="form-group">   Contact <span class="text-danger">*</span> </label> <input type="text" class="form-group form-control" id="c"> 
                          </div>
                <button class="btn btn-success pl-5 pr-5" onclick="saveC(event, ${id}, ${idC});"> Save </button> 
                <button class="btn btn-info pl-5 pr-5 m-1 ml-3"  onclick="loadedC(${id});">Cancel</button>   
            <div class="mt-3"><span class="text-danger">*</span> = required fields</div>  
 </form>
`;
    main.innerHTML = HTML;
    if (idC === undefined) {
    } else {
        getContact();
    }
}




