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
    document.getElementById(this.id).appendChild(tableHead);
	}
}

class App {
	static init() {
		this.dashboard = new Table("activities", "assets/json/dashboard.json", "dashboard-table", true, "Activity");
	}
}

App.init();
