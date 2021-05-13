/* 
    Práctica 1 - Anales de la Ciencia
    Javier Burgos Valés - bo0260
    IWT41 - TDW
*/
const defaultUsers = {
    1: { "username": "x", "password": "x" }, 
    2: { "username": "y", "password": "y" }, 
    3: { "username": "z", "password": "z" }
};

const defaultElements = {
    "products": {
        1: { "Name": "SGML", "Birth": "1986", "Death": "", "Wiki": "https://es.wikipedia.org/wiki/SGML", "People": [], "Entities": [], "Image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/SGML.svg/200px-SGML.svg.png" },
        2: { "Name": "XML", "Birth": "1999", "Death": "", "Wiki": "https://es.wikipedia.org/wiki/Extensible_Markup_Language", "People": [], "Entities": [], "Image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Extensible_Markup_Language_%28XML%29_logo.svg/250px-Extensible_Markup_Language_%28XML%29_logo.svg.png" },
        3: { "Name": "HTML", "Birth": "1993", "Death": "", "Wiki": "https://es.wikipedia.org/wiki/HTML", "People": [], "Entities": [], "Image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/230px-HTML5_logo_and_wordmark.svg.png" },
        4: { "Name": "HTTP", "Birth": "1991", "Death": "", "Wiki": "https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol", "People": [], "Entities": [], "Image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/HTTP_logo.svg/220px-HTTP_logo.svg.png" },
        5: { "Name": "CSS", "Birth": "1996", "Death": "", "Wiki": "https://en.wikipedia.org/wiki/CSS", "People": [], "Entities": [], "Image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/120px-CSS3_logo_and_wordmark.svg.png" },
        6: { "Name": "JavaScript", "Birth": "1995", "Death": "", "Wiki": "https://en.wikipedia.org/wiki/JavaScript", "People": [1, 2], "Entities": [3, 2], "Image": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F9%2F99%2FUnofficial_JavaScript_logo_2.svg%2F1200px-Unofficial_JavaScript_logo_2.svg.png&f=1&nofb=1" }
    },
    "people": {
        1: { "Name": "Vannervar Bush", "Birth": "11 de marzo de 1890", "Death": "28 de junio de 1974", "Wiki": "https://es.wikipedia.org/wiki/Vannevar_Bush", "Image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Vannevar_Bush_portrait.jpg/220px-Vannevar_Bush_portrait.jpg" },
        2: { "Name": "Tim Berners Lee", "Birth": "8 de junio de 1955", "Death": "", "Wiki": "https://es.wikipedia.org/wiki/Tim_Berners-Lee", "Image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sir_Tim_Berners-Lee_%28cropped%29.jpg/220px-Sir_Tim_Berners-Lee_%28cropped%29.jpg" },
    },
    "entities": {
        1: { "Name": "IBM", "Birth": "16 de junio de 1911", "Death": "", "Wiki": "https://es.wikipedia.org/wiki/IBM", "People": [], "Image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/245px-IBM_logo.svg.png" },
        2: { "Name": "CERN", "Birth": "29 de septiembre de 1954", "Death": "", "Wiki": "https://es.wikipedia.org/wiki/Organización_Europea_para_la_Investigación_Nuclear", "People": [], "Image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/CERN_%287825770258%29.jpg/245px-CERN_%287825770258%29.jpg" },
        3: { "Name": "W3C", "Birth": "1 de octubre de 1994", "Death": "", "Wiki": "https://es.wikipedia.org/wiki/World_Wide_Web_Consortium", "People": [], "Image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/W3C%C2%AE_Icon.svg/245px-W3C%C2%AE_Icon.svg.png" },
    }
}

let users = JSON.parse(localStorage.getItem("users"));
let currentUser = localStorage.getItem("currentUser");
let elements = JSON.parse(localStorage.getItem("elements"));

let formInputNames = ["name", "bdate", "ddate", "wiki", "rpeople", "rentities", "img"];

checkLocalData()
loadView(currentUser != null)

function checkLocalData() {
    if (users == null) {
        localStorage.setItem("users", JSON.stringify(defaultUsers));
        users = defaultUsers;
    }
    
    if (elements == null) { 
        localStorage.setItem("elements", JSON.stringify(defaultElements));
        elements = defaultElements;
    }
}
                        
function loadView(logged) {
    fillTables();

    let deleteButtons = document.getElementsByClassName("list-button");
    let buttonsState;

    if (logged) {
        document.getElementById("login").style.display = "none";
        document.getElementById("logout-button").style.display = "initial";
        buttonsState = "initial";
    } else {
        document.getElementById("login").style.display = "initial";
        document.getElementById("logout-button").style.display = "none";
        buttonsState = "hidden";
    }

    for (let buttonIndex = 0; buttonIndex < deleteButtons.length; buttonIndex++) {
        deleteButtons[buttonIndex].style.visibility = buttonsState;
    }

}

function fillTables() {
    let tables = Object.keys(elements);
    for (let category in tables) {
        let parent = document.getElementById(tables[category]);
        let catData = elements[tables[category]];
        let table = document.createElement("TABLE");

        let idList = Object.keys(catData)
        for (let index in idList) {
            let elementId = idList[index]
            let row = table.insertRow(index);
            
            row.insertCell(0).appendChild(fillElement(elementId, tables[category], catData[elementId]));
        }

        if (currentUser != null) {
            let createButton = document.createElement("button");
            createButton.setAttribute("class", "add-button");
            createButton.setAttribute("id", tables[category] + "-add")
            createButton.setAttribute("onclick", "newElement(this.id)");
            createButton.appendChild(document.createTextNode("Añadir"));
            let lastRow = table.insertRow(idList.length);
            lastRow.setAttribute("class", "row-center");
            lastRow.insertCell(0).appendChild(createButton);
        }
    
        parent.appendChild(table);
    }
}

function fillElement(id, type, data) {
    let container = document.createElement("div");
    let link = document.createElement("a");
    let button = document.createElement("button");
    let image = document.createElement("img");

    container.setAttribute("class", "element-container");
    container.setAttribute("id", type + '-' + id);

    image.setAttribute("src", data["Image"]);
    image.setAttribute("class", "mini-thumnail");

    link.appendChild(document.createTextNode(data["Name"]));
    link.setAttribute("onclick", "fillDetails(this.parentElement.id)");

    button.appendChild(document.createTextNode("X"));
    button.setAttribute("class", "list-button");
    button.setAttribute("onclick", `deleteElement(this.parentElement.id)`);

    container.appendChild(image);
    container.appendChild(link);
    container.appendChild(button);
    return container;
}

function deleteElement(element) {
    let splited = element.split("-");
    let type = splited[0];
    let id = splited[1];

    if (type == "people") {
        deleteReferences("People", "entities", id);
        deleteReferences("People", "products", id);
    } else if (type == "entities") {
        deleteReferences("Entities", "products", id);
    }

    delete elements[type][id];
    localStorage.setItem("elements", JSON.stringify(elements));
    location = location;
}

function deleteReferences(fieldTag ,typeUpdating, id) {
    let keyList = Object.keys(elements[typeUpdating]);

    for (index in keyList) {
        let eId = keyList[index];
        let refList = elements[typeUpdating][eId][fieldTag];
        
        let newRefList = refList.filter(function(ref){
            return ref != id;
        }); 
        
        elements[typeUpdating][eId][fieldTag] = newRefList;
    }
}

function fillDetails(element) {
    let splited = element.split("-");
    let type = splited[0];
    let id = splited[1];

    let detailBox = document.getElementById("detail-view");

    let targetedElement = document.getElementById("target");
    if (targetedElement != null) {
        targetedElement.remove();
    }

    document.getElementById("edit-view").style.display = "none";
    detailBox.style.display = "initial";
   
    let table = document.createElement("table");
    table.setAttribute("id", "target");

    let fields = Object.keys(elements[type][id]);
    for (fieldIndex in fields) {
        let field = fields[fieldIndex];
        let row = table.insertRow(fieldIndex);
        let fieldValue = elements[type][id][field];
        
        row.insertCell(0).innerHTML = field;
        switch (field) {
            case "Wiki":
                let wikiLink = document.createElement("a");

                wikiLink.setAttribute("href", fieldValue);
                wikiLink.innerHTML = fieldValue;
                row.insertCell(1).appendChild(wikiLink);
                break;

            case "Image":
                let image = document.createElement("img");
                image.setAttribute("src", fieldValue);
                image.setAttribute("class", "thumnail");
                row.insertCell(1).appendChild(image)
                break;

            case "People":
                row.insertCell(1).appendChild(fillReference("people", fieldValue));
                break;

            case "Entities":
                row.insertCell(1).appendChild(fillReference("entities", fieldValue));
                break;

            default:
                row.insertCell(1).innerHTML = fieldValue;
                break;
        } 
    }

    if (currentUser != null) {
        let editButton = document.createElement("button");
        editButton.setAttribute("id", type + "-" + id + "-" + "edit");
        editButton.setAttribute("onclick", "editElement(this.id)");
        editButton.appendChild(document.createTextNode("Editar"));
        editButton.setAttribute("class", "aside-button");

        table.appendChild(editButton);
    }
    detailBox.appendChild(table);
}

function fillReference(type, refList) {
    let referenceContainer = document.createElement("div");
    for (pIndex in refList) {
        let refId = type + "-" + refList[pIndex] + "-ref";
        let refLink = document.createElement("a");
        refLink.innerHTML = elements[type][refList[pIndex]]["Name"];
        refLink.setAttribute("id", refId);
        refLink.setAttribute("onclick", "fillDetails(this.id)");
        refLink.setAttribute("class", "ref-link");
        referenceContainer.appendChild(refLink);
    }
    return referenceContainer;
}

function editElement(element) {
    let splited = element.split("-");
    let type = splited[0];
    let id = splited[1];

    document.getElementById("detail-view").style.display = "none";
    document.getElementById("edit-view").style.display = "initial";
    clearRemovableButtons();

    for (formInputNamesIndex in formInputNames) {
        let inputField = document.getElementById("element-" + formInputNames[formInputNamesIndex]);
        inputField.value = "";
    }

    let elData = elements[type][id];

    document.getElementById("element-name").value = elData["Name"];
    document.getElementById("element-bdate").value = elData["Birth"];
    document.getElementById("element-ddate").value = elData["Death"];
    document.getElementById("element-wiki").value = elData["Wiki"];

    let peopleField = document.getElementById("element-rpeople");
    let entitiesField = document.getElementById("element-rentities");

    let peopleLabel = document.getElementById("label-people");
    let entitiesLabel = document.getElementById("label-entities");

    if (type == "products" || type == "entities") {
        let refPeopleList = elData["People"];

        peopleField.style.display = "block";
        peopleLabel.style.display = "block";

        loadReferences("people", refPeopleList, peopleField);

        if (type == "products") {
            let refEntitiesList = elData["Entities"];

            entitiesField.style.display = "block";
            entitiesLabel.style.display = "block";

            loadReferences("entities", refEntitiesList, entitiesField);
        } else {
            entitiesField.style.display = "none";
            entitiesLabel.style.display = "none";
        }
    } else {
        peopleField.style.display = "none";
        peopleLabel.style.display = "none";
        entitiesField.style.display = "none";
        entitiesLabel.style.display = "none";
    }

    document.getElementById("element-img").value = elData["Image"];

    if (currentUser != null) {
        let saveButton = document.createElement("button");
        saveButton.setAttribute("id", element + "-update");
        saveButton.setAttribute("class", "aside-button removable");
        saveButton.setAttribute("onclick", "saveForm(this.id)");
        saveButton.appendChild(document.createTextNode("Actualizar"));

        let editWindow = document.getElementById("edit-view");
        editWindow.appendChild(saveButton);
    }

}

function loadReferences(type, refList, target) {
    for (refIndex in refList) {
        let id = refList[refIndex];
        target.value = target.value + elements[type][id]["Name"] + ", ";
    }
}

function newElement(section) {
    let elementSection = section.split("-")[0];

    document.getElementById("detail-view").style.display = "none";
    document.getElementById("edit-view").style.display = "initial";
    clearRemovableButtons();

    for (formInputNamesIndex in formInputNames) {
        let fieldName = formInputNames[formInputNamesIndex];
        let inputField = document.getElementById("element-" + fieldName);
        inputField.value = "";

        if (fieldName == "rpeople") {
            if (elementSection == "products" || elementSection == "entities") {
                document.getElementById("label-people").style.display = "block";
                inputField.style.display = "block";
            } else {
                document.getElementById("label-people").style.display = "none";
                inputField.style.display = "none";
            }
        } else if (fieldName == "rentities") {
            if (elementSection == "products") {
                document.getElementById("label-entities").style.display = "block";
                inputField.style.display = "block";
            } else {
                document.getElementById("label-entities").style.display = "none";
                inputField.style.display = "none";
            }
        }
    }

    if (currentUser != null) {
        let saveButton = document.createElement("button");
        saveButton.setAttribute("id", elementSection + "-new");
        saveButton.setAttribute("class", "aside-button removable");
        saveButton.setAttribute("onclick", "saveForm(this.id)");
        saveButton.appendChild(document.createTextNode("Crear"));

        let editWindow = document.getElementById("edit-view");
        editWindow.appendChild(saveButton);
    }

}

function saveForm(elementId) {
    let splited = elementId.split("-");
    let type = splited[0];
    let id = splited[1];

    if (id == "new") {
        id = Object.keys(elements[type]).length + 1;
    } 

    let dataNames = ["Name", "Birth", "Death", "Wiki", "People", "Entities", "Image"];
    let elementObject = {};

    for (formInputNamesIndex in formInputNames) {
        let inputField = document.getElementById("element-" + formInputNames[formInputNamesIndex]);
        let inputFieldValue = inputField.value;
        let inputFieldName = dataNames[formInputNamesIndex];

        if (inputFieldName == "People" || inputFieldName == "Entities") {
            elementObject[inputFieldName] = getReferenceList(inputFieldName, inputFieldValue)
        } else {
            elementObject[inputFieldName] = inputFieldValue;        
        }
    }
    
    if (type == "people" || type == "entities") {

        delete elementObject["Entities"];
        if (type == "people") {
            delete elementObject["People"];
        }
    }

    console.log(elementObject);
    elements[type][id] = elementObject;

    localStorage.setItem("elements", JSON.stringify(elements));
    location = location;
    
}

function getReferenceList(fieldName, fieldValue) {
    let keySectionName = fieldName.toLowerCase();
    let splitedValue = fieldValue.split(", ");
    let refList = []
    let sectionKeys = Object.keys(elements[keySectionName]);

    for (let vIndex = 0; vIndex < splitedValue.length - 1; vIndex++) {
        let elementName = splitedValue[vIndex];
        let found = false;

        for (let idIndex = 0; idIndex < sectionKeys.length && !found; idIndex++) {
            let comparedElementId = sectionKeys[idIndex];
            let comparedElementName = elements[keySectionName][comparedElementId]["Name"];

            if (comparedElementName == elementName) {
                refList.push(parseInt(comparedElementId));
                found = true;
            }
                
        }
    }

    return refList; 
}

function clearRemovableButtons() {
    let buttons = document.getElementsByClassName("removable");
    for (let buttonIndex = 0; buttonIndex < buttons.length; buttonIndex++) {
        buttons[buttonIndex].remove();
    }
}

function logIn() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    for (let id in users) {
        if (username == users[id]["username"] && password == users[id]["password"]) {
            localStorage.setItem("currentUser", id.toString());
            location = location;
        }
    }
}

function logOut() {
    if (currentUser != null) {
        localStorage.removeItem("currentUser");
        location = location;
    }
}