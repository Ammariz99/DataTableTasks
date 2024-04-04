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
  