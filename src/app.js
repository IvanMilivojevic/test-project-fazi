class TableModifier {
	static tableSort(tableObject, th) {
		const sortMethod = th.dataset.sortMethod;
		const textBasedMethods = ["gameName", "currency", "time", "playerId", "portalName"];
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

		tableObject.sortState = sortMethod;
		tableObject.tableData.sort(TableModifier.compare(sortMethod, columnType, sortDirection));
		const unsortedTable = document.getElementById(tableObject.id).querySelector("tbody");
		const sortedTable = TableCreator.tableBody(tableObject.tableData);
		unsortedTable.replaceWith(sortedTable);
	}

	static compare(sortMethod, columnType, sortDirection) {
		return function innerSort(a, b) {
			const valueA =
				columnType === "number" ? parseFloat(a[sortMethod].toString().replace(/,/g, "")) : a[sortMethod].toUpperCase();
			const valueB =
				columnType === "number" ? parseFloat(b[sortMethod].toString().replace(/,/g, "")) : b[sortMethod].toUpperCase();

			let comparison = 0;
			if (valueA > valueB) {
				comparison = 1;
			} else if (valueA < valueB) {
				comparison = -1;
			}
			return sortDirection === "desc" ? comparison * -1 : comparison;
		};
	}
}

class TableCreator {
	static tableHead(data, columnBased, firstColumnTitle, tableObject) {
		const tableHead = document.createElement("thead");
		const tableHeadRow = document.createElement("tr");

		if (columnBased) {
			const thfirst = document.createElement("th");
			thfirst.textContent = firstColumnTitle;
			tableHeadRow.appendChild(thfirst);

			for (const columnTitle in data) {
				const th = document.createElement("th");
				th.textContent = columnTitle;
				tableHeadRow.appendChild(th);
			}
		} else {
			for (const columnTitle in data[0]) {
				const th = document.createElement("th");
				th.textContent = columnTitle;
				th.setAttribute("data-sort-method", columnTitle);
				th.addEventListener("click", TableModifier.tableSort.bind(null, tableObject, th));
				tableHeadRow.appendChild(th);
			}
		}

		tableHead.appendChild(tableHeadRow);

		return tableHead;
	}

	static tableBody(data, columnBased) {
		const tableBody = document.createElement("tbody");

		if (columnBased) {
			const bodyRowNames = Object.keys(data[Object.keys(data)[0]]);
			const bodyRowCount = bodyRowNames.length;

			for (let i = 0; i < bodyRowCount; i++) {
				const tr = document.createElement("tr");
				const tdname = document.createElement("td");
				tdname.textContent = bodyRowNames[i];
				tr.appendChild(tdname);

				for (const column in data) {
					const td = document.createElement("td");
					td.textContent = Object.values(data[column])[i];
					tr.appendChild(td);
				}

				tableBody.appendChild(tr);
			}
		} else {
			for (const row of data) {
				const tr = document.createElement("tr");

				for (const key in row) {
					const td = document.createElement("td");
					td.textContent = row[key];
					tr.appendChild(td);
				}

				tableBody.appendChild(tr);
			}
		}

		return tableBody;
	}

	static tableFoot(dataSum) {
		const tableFoot = document.createElement("tfoot");
		const tr = document.createElement("tr");

		for (const key in dataSum[0]) {
			const td = document.createElement("td");
			td.textContent = dataSum[0][key];
			tr.appendChild(td);
		}

		tableFoot.appendChild(tr);

		return tableFoot;
	}
}

class Table {
	constructor(tableLocation, url, renderPlaceId, columnBased, firstColumnTitle, tableLocationSum) {
		this.id = renderPlaceId;
		this.getData(url).then(data => {
			this.tableData = this.getTableDepth(tableLocation, data);
			if (tableLocationSum) {
				this.tableDataSum = [this.getTableDepth(tableLocationSum, data)];
			}
			this.createTable(this.tableData, columnBased, firstColumnTitle, this.tableDataSum);
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
		const tableHead = TableCreator.tableHead(data, columnBased, firstColumnTitle, this);
		const tableBody = TableCreator.tableBody(data, columnBased);
		const table = document.createElement("table");
		table.classList.add("table");
		table.appendChild(tableHead);
		table.appendChild(tableBody);

		if (dataSum) {
			const tableFoot = TableCreator.tableFoot(dataSum);
			table.appendChild(tableFoot);
		}

		document.getElementById(this.id).appendChild(table);
	}
}

class App {
	static init() {
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

		const sidebarMenu = document.getElementById("sidebar-menu");
		const pagesContentHolder = document.querySelectorAll("#main-content .page");
		sidebarMenu.addEventListener("click", App.navigation.bind(null, pagesContentHolder));

		const panelNavs = document.querySelectorAll(".panel-nav");
		for (const panelNav of panelNavs) {
			const panelsContentHolder = panelNav.parentNode.querySelector(".panel-content-wrapper").children;
			panelNav.addEventListener("click", App.navigation.bind(null, panelsContentHolder));
		}
	}

	static navigation(contentHolder) {
		event.preventDefault();
		const menuItemSelected = event.target.closest("li");
		const menuItemLink = event.target.closest("a").dataset.href;

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
