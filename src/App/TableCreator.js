import { nameFormater } from "../Utility/TableHelper.js";
import { TableModifier } from "./TableModifier.js";

export class TableCreator {
	static tableHead(data, columnBased, firstColumnTitle) {
		const tableHead = document.createElement("div");
		tableHead.classList.add("table-head");
		const headRow = document.createElement("div");
		headRow.classList.add("table-row");

    /* column based tables are different in json than rowbased and harder parsed
     because of structure where keys are atcually row names while in 
     row based the keys are column titles */
		if (columnBased) {
			const thfirst = document.createElement("span");
      thfirst.textContent = firstColumnTitle;
      // sort method is the key by which the column will be sorted
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
				th.textContent = nameFormater(columnTitle);
				th.setAttribute("data-sort-method", columnTitle);
				headRow.appendChild(th);
			}
		}

		tableHead.appendChild(headRow);
		tableHead.addEventListener("click", TableModifier.tableSort);

		return tableHead;
	}

	static tableBody(data, columnBased) {
		const tableBody = document.createElement("div");
		tableBody.classList.add("table-body");

		if (columnBased) {
			let bodyRowNames = Object.keys(data[Object.keys(data)[0]]);
			bodyRowNames = bodyRowNames.map(name => nameFormater(name));
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
          // exception for Change column found only here where arrows exist based on value
					if (column === "Change") {
						const diff = td.textContent == 0 ? "same" : td.textContent > 0 ? "up" : "down";
            td.classList.add("change", diff);
            td.textContent += "%";
					}
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
        /* unique non removable ID that is created only for row based tables because they can be 
        removed from json file while column could be deleted only  visually from table
         and thats why those tables dont have the option for removing rows */
				const eventId = Math.random();
				Object.defineProperty(row, "id", {
					value: eventId
				});
				tr.id = eventId;

				tableBody.appendChild(tr);
			}

			tableBody.classList.add("removable");
			tableBody.addEventListener("click", TableModifier.eventRemove.bind(tableBody, data));
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
