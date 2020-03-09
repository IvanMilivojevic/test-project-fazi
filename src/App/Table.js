import { getData, getTableDepth } from "../Utility/TableHelper.js";
import { TableCreator } from "./TableCreator.js";

export class Table {
	constructor(tableLocation, url, renderPlaceId, columnBased, firstColumnTitle, tableLocationSum) {
		this.id = renderPlaceId;
		getData(url)
			.then(data => {
				this.tableData = getTableDepth(tableLocation, data);
				if (tableLocationSum) {
					this.tableDataSum = [getTableDepth(tableLocationSum, data)];
				}
				this.createTable(this.tableData, columnBased, firstColumnTitle, this.tableDataSum);
				this.conectFilter();
			})
			.catch(data => {
				document.getElementById(this.id).textContent = "Error displaying table.";
      });
  }
  
	createTable(data, columnBased, firstColumnTitle, dataSum) {
		const tableHead = TableCreator.tableHead(data, columnBased, firstColumnTitle);
		const tableBody = TableCreator.tableBody(data, columnBased);

		const table = document.createElement("div");
		table.classList.add("table");
		table.appendChild(tableHead);
		table.appendChild(tableBody);

		if (dataSum) {
			const tableFoot = TableCreator.tableFoot(dataSum);
			table.appendChild(tableFoot);
		}

		document.getElementById(this.id).appendChild(table);
  }
  
	conectFilter() {
		const tableContainer = document.getElementById(this.id);

		if (!tableContainer.classList.contains("filterable")) {
			return;
		}

		const labelFilter = document.querySelector(`.filter-item .label[data-href=${this.id}]`);
		labelFilter.classList.add("active");
		labelFilter.addEventListener("click", this.attachFilter);

		if (tableContainer.classList.contains("active")) {
			labelFilter.classList.add("checked");
		}
  }
  
	attachFilter() {
		const filterName = this.dataset.href;
		this.classList.toggle("checked");
		document.getElementById(filterName).classList.toggle("active");
		this.closest(".filter-item")
			.querySelector(".ms-select-all")
			.classList.remove("checked");
	}
}
