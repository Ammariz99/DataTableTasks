// DataTable Sorting Functionality//
// =================================================================//

class DataTable {
    constructor(selector) {
      this.dataTable = document.querySelector(selector);
      if (this.dataTable) {
        this.dataTable.addEventListener(
          "click",
          this.handleTableClick.bind(this)
        );
        this.sortingOrder = {}; // To track sorting order for each column
      }
    }
    handleTableClick(event) {
      const headerCell = event.target.closest("th");
      const isDropdown = event.target.tagName === "SELECT";
  
      if (!headerCell || isDropdown) return; // Ignore clicks on dropdowns
  
      const tableElement = headerCell.closest("table");
      const headerIndex = Array.from(headerCell.parentElement.children).indexOf(
        headerCell
      );
  
      // Toggle sorting order for the clicked column
      this.sortingOrder[headerIndex] =
        this.sortingOrder[headerIndex] === "asc" ? "desc" : "asc";
  
      // Update table sorting based on the clicked column
      this.sortTableByColumn(
        tableElement,
        headerIndex,
        this.sortingOrder[headerIndex]
      );
    }
  
    sortTableByColumn(table, columnIndex, sortingOrder) {
      const rows = Array.from(table.querySelectorAll("tbody tr"));
  
      rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();
  
        if (sortingOrder === "asc") {
          return this.ascSort(aValue, bValue);
        } else {
          return this.descSort(aValue, bValue);
        }
      });
  
      table.querySelector("tbody").innerHTML = "";
      rows.forEach((row) => table.querySelector("tbody").appendChild(row));
  
      // Remove sorting classes from all headers
      table.querySelectorAll("th").forEach((th) => {
        th.classList.remove("th-sort-asc", "th-sort-desc");
      });
  
      // Add sorting class to the clicked header
      const headerCell = table.querySelector(`th:nth-child(${columnIndex + 1})`);
      headerCell.classList.add(`th-sort-${sortingOrder}`);
    }
  
    ascSort(a, b) {
      return a.localeCompare(b, undefined, { sensitivity: "base" });
    }
  
    descSort(a, b) {
      return b.localeCompare(a, undefined, { sensitivity: "base" });
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const dataTableInstance = new DataTable(".dataTable");
  });
  
  //=============================================================================//
  