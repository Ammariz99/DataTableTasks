// DataTable Add Column Button Functionality
//====================================================//

class ColumnSelector {
    constructor(tableId, modalId, formId) {
      this.table = document.getElementById(tableId);
      this.modal = document.getElementById(modalId);
      this.form = document.getElementById(formId);
      this.selectedColumns = [];
  
      this.setupEventListeners();
      this.setupColumnCheckboxes();
    }
  
    setupEventListeners() {
      document.getElementById("addColumn").addEventListener("click", () => {
        this.modal.style.display = "block";
      });
  
      this.modal.querySelector(".btnSelect2").addEventListener("click", () => {
        this.modal.style.display = "none";
        this.selectColumns();
      });
    }
  
    setupColumnCheckboxes() {
      const headers = this.table.querySelectorAll("thead th");
  
      headers.forEach((header, index) => {
        const headerText = header.textContent.trim();
        const includedHeaders = ['Shipping Rates', 'Refill Limit', 'Product Location'];
        if (includedHeaders.includes(headerText)) {
          const checkbox = document.createElement("input");
          checkbox.setAttribute("type", "checkbox");
          checkbox.setAttribute("value", index);
          checkbox.setAttribute("id", "column" + index);
          checkbox.classList.add("custom-checkbox");
    
          const label = document.createElement("label");
          label.setAttribute("for", "column" + index);
          label.textContent = headerText;
          label.classList.add("custom-label");
    
          const div = document.createElement("div");
          div.classList.add("form-check","custom-checkbox-container");
          div.appendChild(checkbox);
          div.appendChild(label);
    
          this.form.appendChild(div);
        }
      });
    }
  
  
    selectColumns() {
      this.selectedColumns = [];
      const checkboxes = this.form.querySelectorAll("input:checked");
  
      checkboxes.forEach((checkbox) => {
        this.selectedColumns.push(parseInt(checkbox.value));
      });
  
      const tableRows = this.table.querySelectorAll("tbody tr");
  
      tableRows.forEach((row) => {
        const cells = row.querySelectorAll("td");
  
        cells.forEach((cell, index) => {
          if (this.selectedColumns.includes(index)) {
            cell.style.display = "";
          } else {
            cell.style.display = "none";
          }
        });
      });
  
      if (this.selectedColumns.length === 0) {
        tableRows.forEach((row) => {
          const cells = row.querySelectorAll("td");
          cells.forEach((cell) => {
            cell.style.display = "";
          });
        });
      }
  
      const tableHeaderCells = this.table.querySelectorAll("thead th");
  
      tableHeaderCells.forEach((header, index) => {
        if (!this.selectedColumns.includes(index)) {
          header.style.display = "none";
  
          tableRows.forEach((row) => {
            row.querySelectorAll("td")[index].style.display = "none";
          });
        } else {
          header.style.display = "";
  
          tableRows.forEach((row) => {
            row.querySelectorAll("td")[index].style.display = "";
          });
        }
      });
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const columnSelector = new ColumnSelector(
      "dataTable",
      "addColumnModal",
      "columnSelectionForm"
    );
  });
  
  //=========================================================//
  
  