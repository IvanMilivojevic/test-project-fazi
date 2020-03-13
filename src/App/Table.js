import { getData, getTableDepth } from "../Utility/TableHelper.js";
import { TableCreator } from "./TableCreator.js";

export class Table {
	constructor(tableLocation, url, renderPlaceId, columnBased, firstColumnTitle, tableLocationSum, sliderKey) {
    this.id = renderPlaceId;
    // Promise based helper function to fetch data from json
		getData(url)
			.then(data => {
        // Helper function that will find table in json file
        this.tableData = getTableDepth(tableLocation, data);
        // And in case there is table sum in footer
				if (tableLocationSum) {
					this.tableDataSum = [getTableDepth(tableLocationSum, data)];
				}
				this.createTable(this.tableData, columnBased, firstColumnTitle, this.tableDataSum);
				this.conectFilter();
				if (sliderKey) {
					this.connectSlider(sliderKey, this.tableData);
				}
			})
			.catch(data => {
				document.getElementById(this.id).textContent = "Error displaying table.";
			});
	}
  // Table creation is based on 2 must steps for head and body while footer is optional if has sum
	createTable(data, columnBased, firstColumnTitle, dataSum) {
    // Table head and body get those parameteres for differenet rendering
		const tableHead = TableCreator.tableHead(data, columnBased, firstColumnTitle);
		const tableBody = TableCreator.tableBody(data, columnBased);

		const tableWrapper = document.createElement("div");
		tableWrapper.classList.add("table-wrapper");
		const table = document.createElement("div");
		table.classList.add("table");
		table.appendChild(tableHead);
		table.appendChild(tableBody);

		if (dataSum) {
			const tableFoot = TableCreator.tableFoot(dataSum);
			table.appendChild(tableFoot);
		}

		tableWrapper.appendChild(table);
		document.getElementById(this.id).appendChild(tableWrapper);
	}

	conectFilter() {
		const tableContainer = document.getElementById(this.id);

    // This filter is for tables that are connected to multiselect while the other is for single
		if (tableContainer.classList.contains("filterable")) {
      /* this filter is created in html already but preferable was to create template
       and everytime filter is needed create one based on that dinamically */
			const labelFilter = document.querySelector(`.filter-item .label[data-href=${this.id}]`);
			labelFilter.classList.add("active");
			labelFilter.addEventListener("click", this.attachFilter);

			if (tableContainer.classList.contains("active")) {
				labelFilter.classList.add("checked");
			}
		} else if (tableContainer.classList.contains("switchable")) {
			const labelFilter = document.querySelector(`.filter-item [data-href=${this.id}]`);
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
  // This filter is example of programatically created filter which sets values based on key argument
	connectSlider(sliderKey, data) {
		const sliderTemplate = document.getElementById("slider-template");
		const slider = sliderTemplate.content.cloneNode(true);
		const filterPanel = document
			.getElementById(this.id)
			.closest(".page")
			.querySelector(".panel-filters");
		let sliderMin = 0;
		let sliderMax = 0;
		for (const item of data) {
			if (item[sliderKey] < sliderMin) {
				sliderMin = item[sliderKey];
			} else if (item[sliderKey] > sliderMax) {
				sliderMax = item[sliderKey];
			}
		}
		const sliderRange = slider.querySelector("input[type=range]");
		const sliderInput = slider.querySelector("input[type=number]");
		sliderRange.setAttribute("min", sliderMin);
		sliderRange.setAttribute("max", sliderMax);
		sliderInput.setAttribute("min", sliderMin);
		sliderInput.setAttribute("max", sliderMax);
		sliderRange.addEventListener("input", function() {
			sliderInput.value = this.value;
    });
    sliderInput.value = 0;
    sliderInput.addEventListener("input", function() {
			sliderRange.value = this.value;
		});
		filterPanel.appendChild(slider);
	}
}
