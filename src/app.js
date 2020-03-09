class TableModifier {
	static tableSort() {
		const th = event.target.closest("span");
		const sortMethod = th.dataset.sortMethod;
		const columnIndex = Array.from(th.parentNode.children).indexOf(th);
		const textBasedMethods = ["gameName", "currency", "time", "playerId", "portalName", "activity"];
		const columnType = textBasedMethods.includes(sortMethod) ? "text" : "number";
		let sortDirection;

		if (th.classList.contains("asc")) {
			th.classList.remove("asc");
			th.classList.add("desc");
			sortDirection = "desc";
		} else if (th.classList.contains("desc")) {
			th.classList.remove("desc");
			th.classList.add("asc");
			sortDirection = "asc";
		} else {
			for (const thElement of th.parentNode.children) {
				if (thElement === th) {
					thElement.classList.add("asc");
					sortDirection = "asc";
				} else {
					thElement.removeAttribute("class");
				}
			}
		}

		const table = this.nextElementSibling;
		const unsortedRows = table.children;
		const sorted = Array.from(unsortedRows).sort(TableModifier.compare(columnIndex, columnType, sortDirection));
		table.innerHTML = "";
		for (const row of sorted) {
			table.appendChild(row);
		}
	}

	static compare(ind, columnType, sortDirection) {
		return function innerSort(a, b) {
			const valueA =
				columnType === "number"
					? parseFloat(a.children[ind].textContent.replace(/,/g, ""))
					: a.children[ind].textContent.toUpperCase();
			const valueB =
				columnType === "number"
					? parseFloat(b.children[ind].textContent.replace(/,/g, ""))
					: b.children[ind].textContent.toUpperCase();

			let comparison = 0;
			if (valueA > valueB) {
				comparison = 1;
			} else if (valueA < valueB) {
				comparison = -1;
			}
			return sortDirection === "desc" ? comparison * -1 : comparison;
		};
	}

	static eventRemove(tableData) {
		const eventDelete = confirm("Do you want to delete this event ?");

		if (!eventDelete) {
			return;
		}

		const eventRow = event.target.closest(".table-row");
		const eventId = +eventRow.id;

		for (let i = 0; i < tableData.length; i++) {
			if (tableData[i].id === eventId) {
				tableData.splice(i, 1);
				eventRow.remove();
				break;
			}
		}
	}

	static nameFormater(name) {
		let formatedName;

		if (name === "ggr" || name === "vat" || name === "ngr") {
			formatedName = name.toUpperCase();
		} else {
			formatedName = name.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());
		}

		return formatedName;
	}
}

class TableCreator {
	static tableHead(data, columnBased, firstColumnTitle) {
		const tableHead = document.createElement("div");
		tableHead.classList.add("table-head");
		const headRow = document.createElement("div");
		headRow.classList.add("table-row");

		if (columnBased) {
			const thfirst = document.createElement("span");
			thfirst.textContent = firstColumnTitle;
			thfirst.setAttribute("data-sort-method", firstColumnTitle.toLowerCase());
			headRow.appendChild(thfirst);

			for (const columnTitle in data) {
				const th = document.createElement("span");
				th.textContent = columnTitle;
				headRow.appendChild(th);
			}
		} else {
			for (const columnTitle in data[0]) {
				const th = document.createElement("span");
				th.textContent = TableModifier.nameFormater(columnTitle);
				th.setAttribute("data-sort-method", columnTitle);
				headRow.appendChild(th);
			}
		}

		tableHead.appendChild(headRow);

		return tableHead;
	}

	static tableBody(data, columnBased, eventsRemovable) {
		const tableBody = document.createElement("div");
		tableBody.classList.add("table-body");

		if (columnBased) {
			let bodyRowNames = Object.keys(data[Object.keys(data)[0]]);
			bodyRowNames = bodyRowNames.map(name => TableModifier.nameFormater(name));
			const bodyRowCount = bodyRowNames.length;

			for (let i = 0; i < bodyRowCount; i++) {
				const tr = document.createElement("div");
				tr.classList.add("table-row");
				const rowName = document.createElement("span");
				rowName.textContent = bodyRowNames[i];
				tr.appendChild(rowName);

				for (const column in data) {
					const td = document.createElement("span");
					td.textContent = Object.values(data[column])[i];
					tr.appendChild(td);
				}

				tableBody.appendChild(tr);
			}
		} else {
			for (const row of data) {
				const tr = document.createElement("div");
				tr.classList.add("table-row");

				for (const key in row) {
					const td = document.createElement("span");
					td.textContent = row[key];
					tr.appendChild(td);
				}

				if (eventsRemovable) {
					const eventId = Math.random();
					Object.defineProperty(row, "id", {
						value: eventId
					});
					tr.id = eventId;
				}

				tableBody.appendChild(tr);
			}
		}

		return tableBody;
	}

	static tableFoot(dataSum) {
		const tableFoot = document.createElement("div");
		tableFoot.classList.add("table-foot");
		const footRow = document.createElement("div");
		footRow.classList.add("table-row");

		for (const key in dataSum[0]) {
			const td = document.createElement("span");
			td.textContent = dataSum[0][key];
			footRow.appendChild(td);
		}

		tableFoot.appendChild(footRow);

		return tableFoot;
	}
}

class Table {
	constructor(tableLocation, url, renderPlaceId, columnBased, firstColumnTitle, tableLocationSum) {
		this.id = renderPlaceId;
		this.getData(url)
			.then(data => {
				this.tableData = this.getTableDepth(tableLocation, data);
				if (tableLocationSum) {
					this.tableDataSum = [this.getTableDepth(tableLocationSum, data)];
				}
				this.createTable(this.tableData, columnBased, firstColumnTitle, this.tableDataSum);
				this.conectFilter();
			})
			.catch(data => {
				document.getElementById(this.id).textContent = "Error displaying table.";
			});
	}
	getData(url) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open("GET", url);
			xhr.responseType = "json";

			xhr.onload = function() {
				resolve(xhr.response);
			};
			xhr.onerror = function() {
				reject(xhr.response);
			};
			xhr.send();
		});
	}
	getTableDepth(tableLocation, data) {
		const props = tableLocation.split("/");
		const propsLength = props.length;

		if (propsLength === 1) {
			return data.result[props[0]];
		} else if (propsLength === 2) {
			return data.result[props[0]][props[1]];
		} else if (propsLength === 3) {
			return data.result[props[0]][props[1]][props[2]];
		} else if (propsLength === 4) {
			return data.result[props[0]][props[1]][props[2]][props[3]];
		}
	}
	createTable(data, columnBased, firstColumnTitle, dataSum) {
		const tableHead = TableCreator.tableHead(data, columnBased, firstColumnTitle);
		tableHead.addEventListener("click", TableModifier.tableSort);

		const eventsRemovable = !columnBased;
		const tableBody = TableCreator.tableBody(data, columnBased, eventsRemovable);
		if (eventsRemovable) {
			tableBody.classList.add("removable");
			tableBody.addEventListener("click", TableModifier.eventRemove.bind(tableBody, data));
		}

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

class App {
	static init() {
		{
			const dashboard = new Table("activities", "assets/json/dashboard.json", "dashboard-table", true, "Activity");
			const gamesSummary = new Table(
				"gameStatisticsPerGame",
				"assets/json/statistic-games-summary.json",
				"games-summary-table",
				false,
				false,
				"gameStatisticsSum"
			);
			const jackpotsSilver = new Table(
				"jackpots/Silver/dashboardJackpots",
				"assets/json/dashboard.json",
				"jackpots-silver-table",
				false,
				false
			);
			const jackpotsGold = new Table(
				"jackpots/Gold/dashboardJackpots",
				"assets/json/dashboard.json",
				"jackpots-gold-table",
				false,
				false
			);
			const jackpotsPlatinum = new Table(
				"jackpots/Platinum/dashboardJackpots",
				"assets/json/dashboard.json",
				"jackpots-platinum-table",
				false,
				false
			);
			const jackpotsDiamond = new Table(
				"jackpots/Diamond/dashboardJackpots",
				"assets/json/dashboard.json",
				"jackpots-diamond-table",
				false,
				false
			);
			const portalEur = new Table(
				"portalsActivities/Portal-EUR/activities",
				"assets/json/dashboard.json",
				"dashboard-portal-eur-table",
				true,
				"Activity"
			);
			const portalUsd = new Table(
				"portalsActivities/Portal-USD/activities",
				"assets/json/dashboard.json",
				"dashboard-portal-usd-table",
				true,
				"Activity"
			);
			const portalRsd = new Table(
				"portalsActivities/Portal-RSD/activities",
				"assets/json/dashboard.json",
				"dashboard-portal-rsd-table",
				true,
				"Activity"
			);
			const slotAccounting = new Table(
				"slotAccounting",
				"assets/json/accounting-reports.json",
				"slot-accounting-table",
				false,
				false,
				"slotAccountingSum"
			);
			const rouletteAccounting = new Table(
				"rouletteAccounting",
				"assets/json/accounting-reports.json",
				"roulette-accounting-table",
				false,
				false,
				"rouletteAccountingSum"
			);
			const lerAccounting = new Table(
				"liveEuropeanRouletteAccounting",
				"assets/json/accounting-reports.json",
				"ler-accounting-table",
				false,
				false,
				"liveEuropeanRouletteAccountingSum"
			);
			const tcrAccounting = new Table(
				"tripleCrownRouletteAccounting",
				"assets/json/accounting-reports.json",
				"tcr-accounting-table",
				false,
				false,
				"tripleCrownRouletteAccountingSum"
			);
			const pokerAccounting = new Table(
				"pokerAccounting",
				"assets/json/accounting-reports.json",
				"poker-accounting-table",
				false,
				false,
				"pokerAccountingSum"
			);
		}

		const multiselectAllFilter = document.querySelector(".ms-select-all");
		multiselectAllFilter.addEventListener("click", App.multiselectFilterHandle);

		const dropdownButons = document.querySelectorAll(".filter-item .dropdown-button");
		for (const button of dropdownButons) {
			button.addEventListener("click", App.dropdownHandler);
		}

		const searchButton = document.getElementById("search-button");
		searchButton.addEventListener("click", function() {
			this.parentNode.classList.toggle("search-active");
			this.nextElementSibling.focus();
		});

		const searchInput = document.getElementById("search-input");
		const searchTargetsSelector = "#accounting-reports .table-body span:first-child";
		searchInput.addEventListener("input", App.searchHandler.bind(searchInput, searchTargetsSelector));

		document.addEventListener("click", App.closeFiltersHandler, true);

		const sidebarMenu = document.getElementById("sidebar-menu");
		const pagesContentHolder = document.querySelectorAll("#main-content .page");
		sidebarMenu.addEventListener("click", App.navigationHandler.bind(null, pagesContentHolder));

		const panelNavs = document.querySelectorAll(".panel-nav");
		for (const panelNav of panelNavs) {
			const panelsContentHolder = panelNav.parentNode.querySelector(".panel-content-wrapper").children;
			panelNav.addEventListener("click", App.navigationHandler.bind(null, panelsContentHolder));
		}
	}

	static searchHandler(searchTargetsSelector) {
		const searchValue = this.value.trim();
		const searchTargets = document.querySelectorAll(searchTargetsSelector);
		const regex = new RegExp(searchValue, "gi");

		for (const nameCell of searchTargets) {
			let name = nameCell.textContent;

			if (searchValue === "") {
				nameCell.innerHTML = name;
				nameCell.parentNode.classList.remove("hide");
			} else {
				const searchedName = name.replace(regex, "<strong class='highlight'>$&</strong>");
				nameCell.innerHTML = searchedName;

				if (searchedName !== name) {
					nameCell.parentNode.classList.remove("hide");
				} else {
					nameCell.parentNode.classList.add("hide");
				}
			}
		}
	}

	static dropdownHandler() {
		this.parentNode.classList.toggle("show");
	}

	static multiselectFilterHandle() {
		const filters = this.closest(".filter-item").querySelectorAll(".dd-options .active:not(.checked)");
		for (const filter of filters) {
			filter.click();
		}
		this.classList.add("checked");
	}

	static closeFiltersHandler() {
		const openedFilter = document.querySelector(".filter-item.show");
		if (openedFilter && event.target.closest(".filter-item") !== openedFilter) {
			openedFilter.classList.remove("show");
		}
	}

	static navigationHandler(contentHolder) {
		event.preventDefault();
		const menuItemSelected = event.target.closest("li");
		const menuItemLink = event.target.closest("a") ? event.target.closest("a").dataset.href : false;

		if (!menuItemLink) {
			return;
		}

		for (const menuElement of menuItemSelected.parentNode.children) {
			if (menuElement === menuItemSelected) {
				menuElement.classList.add("active");
			} else {
				menuElement.classList.remove("active");
			}
		}

		for (const page of contentHolder) {
			if (page.id === menuItemLink) {
				page.classList.add("active");
			} else {
				page.classList.remove("active");
			}
		}
	}
}

App.init();
