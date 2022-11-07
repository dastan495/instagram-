let KPI = "http://localhost:8000/products";

// ? вытаскивание для добавки студентов
let name = document.querySelector("#name");
let first = document.querySelector("#first");
let number = document.querySelector("#number");
let weekKPI = document.querySelector("#weekKPI");
let monthKPI = document.querySelector("#monthKPI");
let btnAdd = document.querySelector("#btn-add");

// ? место для карточек
let students = document.querySelector("#students-book");
let searchVal = "";

btnAdd.addEventListener("click", async function () {
  let obj = {
    name: name.value,
    first: first.value,
    number: number.value,
    weekKPI: weekKPI.value,
    monthKPI: monthKPI.value,
  };
  // render();

  if (
    !obj.name.trim() ||
    !obj.first.trim() ||
    !obj.number.trim() ||
    !obj.weekKPI.trim() ||
    !obj.monthKPI.trim()
  ) {
    alert("заполните данные студента");
    return;
  }

  await fetch(API, {
    method: "POST",
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
});

async function render() {
  let products = await fetch(`${API}${searchVal}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  //   drawPaginationButtons();
  list.innerHTML = "";
  products.forEach((element) => {
    let newE = document.createElement("table");
    newE.id = element.id;

    newE.innerHTML = `
    <table class="table table-dark table-sm">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">LastName</th>
        <th scope="col">Number</th>
        <th scope="col">Weekly KPI</th>
        <th scope="col">Monthly KPI</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>${element.name}</td>
        <td>${element.first}</td>
        <td>${element.number}</td>
        <td>${element.}</td>
        <td>..</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
        <td>..</td>
        <td>..</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
        <td>..</td>
        <td>..</td>
      </tr>
    </tbody>
  </table>
        `;
  });
}
