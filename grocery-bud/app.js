const submitBtn = document.querySelector(".submit-btn");
const groceryList = document.querySelector(".grocery-list");
const container = document.querySelector(".grocery-container");
const grocery = document.getElementById("grocery");
const clearBtn = document.querySelector(".clear-btn");
const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");

let editFlag = false;
let editID = "";
let editElement;

window.addEventListener("DOMContentLoaded", setupItems);
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);

//------------
// Functions for creating and adding items
//-----------

function createItem(id, value) {
  const element = document.createElement("article");

  element.classList.add("grocery-item");

  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>

              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>`;

  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  groceryList.appendChild(element);
  groceryList.parentElement.classList.add("show-container");
  // eventlisteners
  const deleteBtn = element.querySelector(".delete-btn");
  const editBtn = element.querySelector(".edit-btn");
  deleteBtn.addEventListener("click", deleteItem);
  editBtn.addEventListener("click", editItem);
}

function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (!editFlag) {
    createItem(id, value);
    addAlert("item added", "success");
    addToLocalStorage(id, value);
  }

  if (editFlag) {
    editElement.textContent = value;

    addAlert("Change successful", "success");
    editLocalStorage(editID, value);
  }
  defaultState();
}

function setupItems(e) {
  let items = getLocalStorage();
  items = items.map((item) => {
    return createItem(item.id, item.value);
  });
}

//-----------
// Edit, delete, clear items
//-----------
function editItem(e) {
  const article = e.currentTarget.parentElement.parentElement;

  editFlag = true;

  submitBtn.textContent = "edit";
  editElement = e.currentTarget.parentElement.previousElementSibling;
  editID = article.dataset.id;
  grocery.value = editElement.textContent;
}

function deleteItem(e) {
  const article = e.currentTarget.parentElement.parentElement;
  groceryList.removeChild(article);
  if (groceryList.childElementCount <= 0) {
    container.classList.remove("show-container");
  }
  const id = article.dataset.id;
  deleteFromLocalStorage(id);
  addAlert("item deleted", "danger");
}

function clearItems(e) {
  const articles = document.querySelectorAll(".grocery-item");
  articles.forEach((article) => {
    groceryList.removeChild(article);
  });
  container.classList.remove("show-container");
  localStorage.removeItem("list");
  addAlert("items cleared", "danger");
  defaultState();
}
//--------
// Default state and alert
//--------
function defaultState() {
  editFlag = false;
  grocery.value = "";
  submitBtn.textContent = "submit";
}

function addAlert(msg, type) {
  alert.classList.add(`alert-${type}`);
  alert.textContent = msg;
  setInterval(() => {
    alert.classList.remove(`alert-${type}`);
    alert.textContent = "";
  }, 1000);
}
//-----------
// Functions for local storage
//-----------

function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function deleteFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter((item) => item.id !== id);

  if (items.length === 0) {
    localStorage.removeItem("list");
  } else {
    localStorage.setItem("list", JSON.stringify(items));
  }
}

function editLocalStorage(id, val) {
  let items = getLocalStorage();
  items = items.map((item) => {
    if (item.id === id) {
      item.value = val;
    }

    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
