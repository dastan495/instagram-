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


// let searchInp = document.querySelector("#search");
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
      `${API}${searchVal}`
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
      `;
  
      tbody.append(newElem);
    });
  }
  
  render();