class TableCreator {
	static tableHead(data, columnBased, firstColumnTitle) {
		const tableHead = document.createElement("thead");
		const tableHeadRow = document.createElement("tr");

		if (columnBased) {
			const th = document.createElement("th");
			th.textContent = firstColumnTitle;
			tableHeadRow.appendChild(th);
		}
		for (const columnTitle in data) {
			const th = document.createElement("th");
			th.textContent = columnTitle;
			tableHeadRow.appendChild(th);
		}
		tableHead.appendChild(tableHeadRow);

		return tableHead;
	}
	
	static tableBody(data, columnBased) {
		const tableBody = document.createElement("tbody");
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
		const tableHead = TableCreator.tableHead(data, columnBased, firstColumnTitle);
		const tableBody = TableCreator.tableBody(data, columnBased);

		document.getElementById(this.id).appendChild(tableHead);
		document.getElementById(this.id).appendChild(tableBody);
	}
}

class App {
	static init() {
		this.dashboard = new Table("activities", "assets/json/dashboard.json", "dashboard-table", true, "Activity");
	}
}

App.init();
