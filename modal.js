/* for dropdown Functionality and Filter Tables  */
//==================================================//

class DropdownGenerator {
  constructor(index) {
    this.index = index;
  }

  generateDropdown() {
    let columnData = [];
    let rows = document.querySelectorAll("tr");
    rows.forEach((row, i) => {
      if (i == 0) {
        columnData.push("");
        return;
      }
      let cells = row.getElementsByTagName("td");
      columnData.push(cells[this.index].innerText);
    });

    let uniqColumnData = [...new Set(columnData)]; //it stores unique values
    let select = document.createElement("select");

    uniqColumnData.forEach((data) => {
      let option = document.createElement("option");
      option.value = data;
      option.textContent = data;
      select.appendChild(option);
    });

    select.id = this.index;
    select.addEventListener("change", () => {
      this.filterTable(select.value);
      this.clearSelect(select.id);
    });
    return select;
  }

  clearSelect(id) {
    let selects = document.querySelectorAll("select");
    selects.forEach((select) => {
      if (select.id != id) {
        select.value = "";
      }
    });
  }

  filterTable(filter) {
    console.log(filter);
    const table = document.querySelector(".dataTable");
    const rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      let found = false;

      for (let j = 0; j < cells.length; j++) {
        const cellText = cells[j].textContent || cells[j].innerText;
        if (cellText == filter || cellText.includes(filter)) {
          found = true;
          break;
        }
      }
      rows[i].style.display = found ? "" : "none";
    }
  }
}
//=======================================================================//



/* Modal Control Functionality to add, update,delete products */
//===============================================================//

class FormHandler {
    constructor(
      formSelector,
      inputSelector,
      addButtonSelector,
      modalSelector,
      closeIconSelector
    ) {
      this.form = document.querySelector(formSelector);
      this.allInput = this.form.querySelectorAll(inputSelector);
      this.addButton = document.querySelector(addButtonSelector);
      this.modal = document.querySelector(modalSelector);
      this.closeIcon = document.querySelector(closeIconSelector);
  
      this.setupEventListeners();
    }
  
    setupEventListeners() {
      this.addButton.addEventListener("click", () => {
        this.openModal();
        this.resetFormAndButtons();
      });
  
      this.closeIcon.addEventListener("click", () => {
        this.closeModal();
        this.resetFormAndButtons();
      });
    }
  
    resetFormAndButtons() {
      this.form.reset();
      this.allInput.forEach(function (input) {
        input.classList.remove("error");
      });
      this.addButton.disabled = false;
      // Assuming there's an update button with ID "updateBtn"
      if (document.getElementById("updateBtn")) {
        document.getElementById("updateBtn").disabled = true;
      }
    }
  
    openModal() {
      this.modal.classList.add("active");
    }
  
    closeModal() {
      this.modal.classList.remove("active");
    }
  }
  
  // Usage
  document.addEventListener("DOMContentLoaded", () => {
    const formHandler = new FormHandler(
      "#register-form",
      "input",
      "#addProductBtn",
      ".modal",
      ".close-icon"
    );
  });

  /* start of global variables */
//==================================//
class ProductManager {
    constructor() {
      this.userData = [];
      this.id = document.getElementById("id");
      this.pName = document.getElementById("pName");
      this.pTitle = document.getElementById("pTitle");
      this.pDescription = document.getElementById("pDescription");
      this.pVendor = document.getElementById("pVendor");
      this.inStock = document.getElementById("inStock");
      this.bPrice = document.getElementById("bPrice");
      this.sPrice = document.getElementById("sPrice");
      this.pQuantity = document.getElementById("pQuantity");
      this.pType = document.getElementById("pType");
      this.sRates = document.getElementById("sRates");
      this.rLimit = document.getElementById("rLimit");
      this.pLocation = document.getElementById("pLocation");
      this.registerForm = document.querySelector("#register-form");
      this.registerBtn = document.querySelector("#register-btn");
      this.updateBtn = document.querySelector("#update-btn");
  
      this.setupEventListeners();
      this.getDataFromLocalStorage();
      this.setupDropdowns();
    }
    setupDropdowns() {
      const colHeaders = document.querySelectorAll(".tblColText");
      colHeaders.forEach((colHeader, index) => {
        const dropdownGenerator = new DropdownGenerator(index);
        colHeader.appendChild(dropdownGenerator.generateDropdown());
      });
    }
    setupEventListeners() {
      this.registerBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.registrationData();
        this.getDataFromLocalStorage();
        this.registerBtn.disabled = false;
        this.updateBtn.disabled = true;
        this.registerForm.reset();
        closeIcon.click(); // Close the modal
      });
  
      this.updateBtn.addEventListener("click", (e) => {
        this.updateData();
      });
  
      this.setupDeleteButton(); // Setup delete button listeners after registering products
    }
  
    getDataFromLocalStorage() {
      if (localStorage.getItem("userData") != null) {
        this.userData = JSON.parse(localStorage.getItem("userData"));
      }
      this.showDataOnPage();
    }
  
    registrationData() {
      if (
        this.id.value.trim() === "" ||
        this.pName.value.trim() === "" ||
        this.pTitle.value.trim() === "" ||
        this.pDescription.value.trim() === "" ||
        this.pVendor.value.trim() === "" ||
        this.inStock.value.trim() === "" ||
        this.bPrice.value.trim() === "" ||
        this.sPrice.value.trim() === "" ||
        this.pQuantity.value.trim() === "" ||
        this.pType.value.trim() === "" ||
        this.sRates.value.trim() === "" ||
        this.rLimit.value.trim() === "" ||
        this.pLocation.value.trim() === ""
      ) {
        alert("Please fill in all required fields.");
        return;
      }
      if (!Array.isArray(this.userData)) {
        this.userData = [];
      }
  
      this.userData.push({
        id: this.id.value,
        pName: this.pName.value,
        pTitle: this.pTitle.value,
        pDescription: this.pDescription.value,
        pVendor: this.pVendor.value,
        inStock: this.inStock.value,
        bPrice: this.bPrice.value,
        sPrice: this.sPrice.value,
        pQuantity: this.pQuantity.value,
        pType: this.pType.value,
        sRates: this.sRates.value,
        rLimit: this.rLimit.value,
        pLocation: this.pLocation.value,
      });
      var userString = JSON.stringify(this.userData);
      localStorage.setItem("userData", userString);
      this.showDataOnPage();
    }
  
    showDataOnPage() {
      var tableData = document.querySelector("#table-data");
      tableData.innerHTML = "";
      this.userData.forEach((data, index) => {
        tableData.innerHTML += `
          <tr data-index="${index}">
            <td class="sticky-select"><input type="checkbox" ></td>
            <td>${index + 1}</td>
            <td>${data.pName}</td>
            <td>${data.pTitle}</td>
            <td>${data.pDescription}</td>
            <td>${data.pVendor}</td>
            <td>${data.inStock}</td>
            <td>${data.bPrice}</td>
            <td>${data.sPrice}</td>
            <td>${data.pQuantity}</td>
            <td>${data.pType}</td>
            <td>${data.sRates}</td>
            <td>${data.rLimit}</td>
            <td>${data.pLocation}</td>
            <td><button class="btn-edit"><i class="fa-regular fa-eye"></i></button></td>
            <td><button class="del-btn"><i class="fa-solid fa-trash"></i></button></td>
          </tr>`;
      });
  
      this.setupDeleteButton(); // Re-setup delete button listeners after showing data
      this.setupUpdateButton();
    }
  
    setupDeleteButton() {
      var allDelBtn = document.querySelectorAll(".del-btn");
      allDelBtn.forEach((btn) => {
        btn.onclick = () => {
          var tr = btn.parentElement.parentElement;
          var index = tr.getAttribute("data-index");
          this.userData.splice(index, 1);
          localStorage.setItem("userData", JSON.stringify(this.userData));
          this.showDataOnPage();
        };
      });
    }
  
    setupUpdateButton() {
      var allEdit = document.querySelectorAll(".btn-edit");
      allEdit.forEach((editBtn, index) => {
        editBtn.onclick = () => {
          var tr = editBtn.parentElement.parentElement;
          var td = tr.getElementsByTagName("td");
          addProductBtn.click();
          this.registerBtn.disabled = true;
          this.updateBtn.disabled = false;
  
          this.id.value = td[1].innerHTML;
          this.pName.value = td[2].innerHTML;
          this.pTitle.value = td[3].innerHTML;
          this.pDescription.value = td[4].innerHTML;
          this.pVendor.value = td[5].innerHTML;
          this.inStock.value = td[6].innerHTML;
          this.bPrice.value = td[7].innerHTML;
          this.sPrice.value = td[8].innerHTML;
          this.pQuantity.value = td[9].innerHTML;
          this.pType.value = td[10].innerHTML;
          this.sRates.value = td[11].innerHTML;
          this.rLimit.value = td[12].innerHTML;
          this.pLocation.value = td[13].innerHTML;
  
          this.updateBtn.onclick = () => {
            this.userData[index] = {
              id: this.id.value,
              pName: this.pName.value,
              pTitle: this.pTitle.value,
              pDescription: this.pDescription.value,
              pVendor: this.pVendor.value,
              inStock: this.inStock.value,
              bPrice: this.bPrice.value,
              sPrice: this.sPrice.value,
              pQuantity: this.pQuantity.value,
              pType: this.pType.value,
              sRates: this.sRates.value,
              rLimit: this.rLimit.value,
              pLocation: this.pLocation.value,
            };
            localStorage.setItem("userData", JSON.stringify(this.userData));
            this.showDataOnPage();
          };
        };
      });
    }
  
    updateData() {
      // This method is handled inside the setupUpdateButton method to ensure correct functionality.
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const productManager = new ProductManager();
  });
  
  //=====================================================================//
  
  