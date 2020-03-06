class TableModifier {
	static tableSort(tableObject, th) {
		const sortMethod = th.dataset.sortMethod;
		const columnType = sortMethod === "gameName" || sortMethod === "currency" ? "text" : "number";
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
				if (!(thElement === th)) {
					thElement.removeAttribute("class");
				}
			}
			th.classList.add("asc");
			sortDirection = "asc";
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
	constructor(table, url, renderPlaceId, columnBased, firstColumnTitle, tableSum) {
		this.id = renderPlaceId;
		this.getData(url).then(data => {
			this.tableData = data.result[table];
			if (tableSum) {
				this.tableDataSum = [data.result[tableSum]];
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
		console.time();
		// this.dashboard = new Table("activities", "assets/json/dashboard.json", "dashboard-table", true, "Activity");
		const gamesSummary = new Table(
			"gameStatisticsPerGame",
			"assets/json/statistic-games-summary.json",
			"games-summary-table",
			false,
			false,
			"gameStatisticsSum"
		);
		console.timeEnd();
	}
}

App.init();
