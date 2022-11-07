let API = "http://localhost:8000/products";

// ? вытаскивание для добавки студентов
let name = document.querySelector("#name");
let first = document.querySelector("#first");
let number = document.querySelector("#number");
let weekKPI = document.querySelector("#weekKPI");
let monthKPI = document.querySelector("#monthKPI");
let btnAdd = document.querySelector("#btn-add");

let list = document.querySelector("#products-list");
let tbody = document.querySelector("tbody");

//? переменные дял инпутов: редактирование товаров
let editName = document.querySelector("#edit-name");
let editFirst = document.querySelector("#edit-lastname");
let editNumber = document.querySelector("#edit-number");
let editWeek = document.querySelector("#edit-week");
let editMonth = document.querySelector("#edit-month");
let editSaveBtn = document.querySelector("#btn-save-edit");
let exampleModal = document.querySelector("#exampleModal");

let searchInp = document.querySelector("#search");
let searchVal = "";

btnAdd.addEventListener("click", async function () {
  // ? формируем объукт с данным из инпутов
  let obj = {
    name: name.value,
    first: first.value,
    number: number.value,
    weekKPI: weekKPI.value,
    monthKPI: monthKPI.value,
  };
  render();

  if (
    !obj.name.trim() ||
    !obj.first.trim() ||
    !obj.number.trim() ||
    !obj.weekKPI.trim() ||
    !obj.monthKPI.trim()
  ) {
    alert("заполните поля");
    return;
  }

  await fetch(API, {
    method: "POST", // указываем метод
    headers: {
      "Content-Type": "application/json; charset = utf-8",
    },
    body: JSON.stringify(obj),
  });

  name.value = "";
  first.value = "";
  number.value = "";
  weekKPI.value = "";
  monthKPI.value = "";

  render();
});

async function render() {
  let products = await fetch(`${API}?q=${searchVal}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  tbody.innerHTML = "";
  products.forEach((element) => {
    let newElem = document.createElement("tr");
    newElem.id = element.id;
    newElem.innerHTML = `
          <th scope="row">${element.id}</th>
          <td>${element.name}</td>
          <td>${element.first}</td>
          <td>${element.number}</td>
          <td>${element.weekKPI}</td>
          <td>${element.monthKPI}</td>
          <td>
          
          <a href="#" id=${element.id} data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn bg-primary btn-primary btn-edit">Edit</a>
          <a href="#" id=${element.id} onclick='deleteProduct(${element.id})' class="btn bg-danger btn-danger btn-delete">Delete</a>
          </td>
      `;

    tbody.append(newElem);
  });
}

render();

//! рекдактирование продукта
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-edit")) {
    let id = e.target.id;
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        editName.value = data.name;
        editFirst.value = data.first;
        editNumber.value = data.number;
        editWeek.value = data.weekKPI;
        editMonth.value = data.monthKPI;

        editSaveBtn.setAttribute("id", data.id);
      });
  }
});

//! сохранение изменений товара
editSaveBtn.addEventListener("click", function () {
  // console.log(this);
  let id = this.id;

  let name = editName.value;
  let first = editFirst.value;
  let number = editNumber.value;
  let weekKPI = editWeek.value;
  let monthKPI = editMonth.value;

  if (!name || !first || !number || !weekKPI || !monthKPI) return;

  let editedProduct = {
    name: name,
    first: first,
    number: number,
    weekKPI: weekKPI,
    monthKPI: monthKPI,
  };
  saveEdit(editedProduct, id);
});

function saveEdit(editedProduct, id) {
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(editedProduct),
  }).then(() => {
    render();
  });

  let modal = bootstrap.Modal.getInstance(exampleModal);
  modal.hide();
}

function deleteProduct(id) {
  fetch(`${API}/${id}`, {
    method: "DELETE",
  }).then(() => render());
}

searchInp.addEventListener("input", () => {
    searchVal = searchInp.value; // записывает знаение из посковика в переменную searchVal
    render();
  });
