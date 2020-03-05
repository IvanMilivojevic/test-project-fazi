class TableCreator {
	static tableUpdate() {
		console.log(this, event.target);
	}
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
				th.classList.add(columnTitle);
				th.addEventListener("click", TableCreator.tableUpdate.bind(tableObject));
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
}

class Table {
	constructor(table, url, renderPlaceId, columnBased, firstColumnTitle) {
		this.id = renderPlaceId;
		this.getData(url).then(data => {
			this.tableData = data.result[table];
			this.createTable(this.tableData, columnBased, firstColumnTitle);
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
	createTable(data, columnBased, firstColumnTitle) {
		const tableHead = TableCreator.tableHead(data, columnBased, firstColumnTitle, this);
		const tableBody = TableCreator.tableBody(data, columnBased);

		const table = document.createElement("table");
		table.classList.add("table");
		table.appendChild(tableHead);
		table.appendChild(tableBody);
		document.getElementById(this.id).appendChild(table);
	}
}

class App {
	static init() {
		this.dashboard = new Table("activities", "assets/json/dashboard.json", "dashboard-table", true, "Activity");
		this.gamesSummary = new Table(
			"gameStatisticsPerGame",
			"assets/json/statistic-games-summary.json",
			"games-summary-table",
			false,
			false
		);
	}
}

App.init();
