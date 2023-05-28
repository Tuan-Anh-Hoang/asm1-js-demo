"use strict";

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
let dataPet;
const petArr = [];

//Lấy dữ liệu từ các Input Form
const data1 = {
  idInput: "P001",
  nameInput: "Tom",
  ageInput: 3,
  typeInput: "Cat",
  weightInput: 5,
  lengthInput: 50,
  colorInput: "#F00",
  breedInput: "Tabby",
  vaccinatedInput: true,
  dewormedInput: true,
  sterilizedInput: true,
  bmi: "?",
  date: new Date(),
};

console.log(data1);

const data2 = {
  idInput: "P002",
  nameInput: "Tyke",
  ageInput: 5,
  typeInput: "Dog",
  weightInput: 3,
  lengthInput: 40,
  colorInput: "#080",
  breedInput: "Mixed Breed",
  vaccinatedInput: false,
  dewormedInput: false,
  sterilizedInput: false,
  bmi: "?",
  date: new Date(),
};

//Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function (e) {
  dataPet = {
    idInput: idInput.value,
    nameInput: nameInput.value,
    ageInput: parseInt(ageInput.value),
    typeInput: typeInput.value,
    weightInput: parseInt(weightInput.value),
    lengthInput: parseInt(lengthInput.value),
    colorInput: colorInput.value,
    breedInput: breedInput.value,
    vaccinatedInput: vaccinatedInput.checked,
    dewormedInput: dewormedInput.checked,
    sterilizedInput: sterilizedInput.checked,
    bmi: "?",
    date: new Date(),
  };

  console.log(dataPet);

  //Thêm thú cưng vào danh sách
  //Validate dữ liệu hợp lệ(thông báo cho người dùng nhập đủ thông tin)
  function validateData(dataPet) {
    for (let i = 0; i < petArr.length; i++) {
      if (dataPet.idInput === petArr[i].idInput) {
        alert("ID must be unique!");
        return false;
      }
    }
    if (
      dataPet.idInput.trim() === "" ||
      dataPet.nameInput.trim() === "" ||
      isNaN(dataPet.ageInput) ||
      isNaN(dataPet.weightInput) ||
      isNaN(dataPet.lengthInput) ||
      dataPet.type === "Select Type" ||
      dataPet.breed === "Select Breed"
    ) {
      alert("Please fill the blank!");
      return false;
    } else if (dataPet.ageInput < 1 || dataPet.ageInput > 15) {
      alert("Age must be between 1 and 15!");
      return false;
    } else if (dataPet.weightInput < 1 || dataPet.weightInput > 15) {
      alert("Weight must be between 1 and 15!");
      return false;
    } else if (dataPet.lengthInput < 1 || dataPet.lengthInput > 100) {
      alert("Length must be between 1 and 100!");
      return false;
    } else if (dataPet.typeInput === "Select Type") {
      alert("Please select Type!");
      return false;
    } else if (dataPet.breedInput === "Select Bype") {
      alert("Please select Breed!");
      return false;
    } else {
      return true;
    }
  }
  const validate = validateData(dataPet);

  if (validate) {
    petArr.push(dataPet);
    clearInput();
    renderTableData(petArr);
  }
});

// thêm dữ liệu vào petArr
petArr.push(data1);
petArr.push(data2);

// Hiển thị danh sách thú cưng

function renderTableData(petArr) {
  let tableData = document.getElementById("tbody");

  tableData.innerHTML = "";

  for (let k = 0; k < petArr.length; k++) {
    let row = document.createElement("tr");

    let currentDate = new Date();
    let days = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let years = currentDate.getFullYear();

    let addedDate = `${days}/${month}/${years}`;

    row.innerHTML = `
    <th scope="row">${petArr[k].idInput}</th>
    <td>${petArr[k].nameInput}</td>
    <td>${petArr[k].ageInput}</td>
    <td>${petArr[k].typeInput}</td>
    <td>${petArr[k].weightInput}kg</td>
    <td>${petArr[k].lengthInput}cm</td>
    <td>${petArr[k].breedInput}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[k].colorInput}"></i>
    </td>
    <td><i class=${
      petArr[k].vaccinatedInput === true
        ? `"bi bi-check-circle-fill"`
        : `"bi bi-x-circle-fill"`
    }></i></td>
    <td><i class=${
      petArr[k].dewormedInput === true
        ? `"bi bi-check-circle-fill"`
        : `"bi bi-x-circle-fill"`
    }></i></td>
    <td><i class=${
      petArr[k].sterilizedInput === true
        ? `"bi bi-check-circle-fill"`
        : `"bi bi-x-circle-fill"`
    }></i></td>
    <td>${petArr[k].bmi}</td>
    <td>${addedDate}</td>
    <td>
      <button onclick="deletePet('${
        petArr[k].idInput
      }')" type="button" class="btn btn-danger">Delete</button>
    </td>`;

    tableData.appendChild(row);
  }
}
renderTableData(petArr);

// Xóa dữ liệu vừa nhập trên Form
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// xóa thú cưng (Delete Pet)
function deletePet(x) {
  let confirmDelete = confirm("Do you really want to delete this pet?");
  if (confirmDelete) {
    for (let l = 0; l < petArr.length; l++) {
      if (x === petArr[l].idInput) {
        petArr.splice(l, 1);
        renderTableData(petArr);
      }
    }
  }
}

// Hiển thị các thú cưng khỏe mạnh (showhealthy, show all pet)
let healthyCheck = false;
const showHealthyBtn = document.getElementById("healthy-btn");

showHealthyBtn.addEventListener("click", function () {
  healthyCheck = !healthyCheck;
  showHealthyBtn.textContent = healthyCheck
    ? "Show All Pet"
    : "Show Healthy Pet";
  const filterPet = petArr.filter(
    (pet) => pet.vaccinatedInput && pet.dewormedInput && pet.sterilizedInput
  );
  renderTableData(healthyCheck ? filterPet : petArr);
});

//  (Nâng cao) Tính chỉ số BMI
const calculateBMIBtn = document.getElementById("bmi-btn");
calculateBMIBtn.onclick = function () {
  for (let u = 0; u < petArr.length; u++) {
    petArr[u].bmi =
      petArr[u].typeInput === "Dog"
        ? ((petArr[u].weightInput * 703) / petArr[u].lengthInput ** 2).toFixed(
            2
          )
        : ((petArr[u].weightInput * 886) / petArr[u].lengthInput ** 2).toFixed(
            2
          );
  }

  renderTableData(petArr);
};
