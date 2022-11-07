let API = "http://localhost:8000/products";

// ? вытаскивание для добавки студентов
let name = document.querySelector("#name");
let first = document.querySelector("#first");
let number = document.querySelector("#number");
let weekKPI = document.querySelector("#weekKPI");
let monthKPI = document.querySelector("#monthKPI");
let btnAdd = document.querySelector("#btn-add");

let list = document.querySelector("#products-list");
let tbody = document.querySelector("tbody")


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

 render()
});

async function render() {
    let products = await fetch(
        // console.log(products)
      `${API}?q=${searchVal}`
    ) 
      .then((res) => res.json()) 
      .catch((err) => console.log(err)); 
  
    // drawPaginationButtons();
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
          </tr>
      <a href="#" id = ${element.id} onclick = 'deleteProduct(${element.id})' class="btn  bg-danger btn-danger btn-delete">Delete</a>
      <a href="#" id = ${element.id}  data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn bg-primary btn-primary btn-edit">Edit</a>
      `;
  
      tbody.append(newElem);
    });
  }
  
  render();

  function deleteProduct(id) {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    }).then(() => render());
  }
  
//   ? search
searchInp.addEventListener("input", () => {
    searchVal = searchInp.value; // записывает знаение из посковика в переменную searchVal
    render();
  });
