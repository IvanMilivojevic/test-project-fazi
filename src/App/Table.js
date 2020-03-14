import { getData, getTableDepth } from "../Utility/TableHelper.js";
import { TableCreator } from "./TableCreator.js";
import datepicker from "js-datepicker";

export class Table {
	constructor(
		tableLocation,
		url,
		renderPlaceId,
		columnBased,
		firstColumnTitle,
		tableLocationSum,
		sliderKey,
		dateFilterTable
	) {
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
				if (dateFilterTable) {
					this.tableDataDate = getTableDepth(dateFilterTable, data);
					this.connectDateRange(this.tableDataDate);
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
	// Creation of filters for start date and end date and binding datepicker
	connectDateRange(dataDate) {
		const dateTemplate = document.getElementById("date-template");
		const dateFilterStart = dateTemplate.content.cloneNode(true);
		const dateFilterEnd = dateTemplate.content.cloneNode(true);
		const inputStart = dateFilterStart.querySelector("input");
		const pickerStart = datepicker(inputStart, {
			id: 1,
			onSelect: (instance, date) => {
				const dateRange = pickerStart.getRange();
				// only check for update data if both are defined
				if (dateRange.start && dateRange.end) {
					this.checkRange(dateRange, dataDate);
				}
			}
		});
		// Default date is set to April 1st because that was provided in JSON
		pickerStart.setDate(new Date("04/01/2019"), true);
		const inputEnd = dateFilterEnd.querySelector("input");
		const pickerEnd = datepicker(inputEnd, {
			id: 1,
			onSelect: (instance, date) => {
				const dateRange = pickerStart.getRange();

				if (dateRange.start && dateRange.end) {
					this.checkRange(dateRange, dataDate);
				}
			}
		});
		pickerEnd.setDate(new Date("04/01/2019"), true);
		const filterPanel = document
			.getElementById(this.id)
			.closest(".page")
			.querySelector(".panel-filters");
		filterPanel.innerHTML = "<span>Period:</span>";
		filterPanel.appendChild(dateFilterStart);
		filterPanel.appendChild(dateFilterEnd);
	}

	checkRange(dateRange, dataDate) {
		// take first game as example to check for periods because all games have them
		const gameResults = dataDate[Object.keys(dataDate)[0]];
		const startDate = dateRange.start;
		const endDate = dateRange.end;
		let startIndex;
		let endIndex;
		// go through all the periods available and check if they are between those in datepickers
		// if there are any then set start-end index for all other games
		let i = 0;
		for (const dateRes of gameResults) {
			const dateJson = dateRes.period.split(".");
			dateJson.unshift(...dateJson.splice(1, 1));
			const dateJsonFormat = new Date(dateJson.join("/"));
			if (dateJsonFormat >= startDate && dateJsonFormat <= endDate) {
				startIndex = startIndex !== undefined ? startIndex : i;
				endIndex = i;
			}
			i++;
		}
		// if there are no matches based on datepicker then exit with message
		if (startIndex === undefined && endIndex === undefined) {
			const oldTable = document.querySelector(`#${this.id} .table-body`);
			oldTable.textContent = "No data for this period !";
			return;
		}

		const dateTableNew = [];
		const objTemplate = {};
		// new object template is reseted object with no values on properties
		for (const key in gameResults[0]) {
			if (key === "period") {
				objTemplate.gameName = "";
			} else {
				objTemplate[key] = 0;
			}
		}

		for (const game in dataDate) {
			// create one copy of object for each game and fill with data on periods which are available
			const sumGame = { ...objTemplate };

			for (let index = startIndex; index <= endIndex; index++) {
				for (const key in dataDate[game][index]) {
					if (key !== "period") {
						sumGame[key] += dataDate[game][index][key];
					}
				}
			}
			sumGame.gameName = game;
			sumGame.currency = "EUR";
			dateTableNew.push(sumGame);
		}

		const newTableDate = TableCreator.tableBody(dateTableNew, false);
		const oldTable = document.querySelector(`#${this.id} .table-body`);
		oldTable.replaceWith(newTableDate);

		const activeHeadSort = document.querySelector(`#${this.id} .asc`) || document.querySelector(`#${this.id} .desc`);
		if (activeHeadSort) {
			activeHeadSort.removeAttribute("class");
		}
	}
}
