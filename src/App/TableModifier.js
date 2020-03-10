export class TableModifier {
	static tableSort() {
		const th = event.target.closest("span");
		const sortMethod = th.dataset.sortMethod;
    const columnIndex = Array.from(th.parentNode.children).indexOf(th);
    //because there are two different methods for sorting we need to find if its text or number
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
    /* here is created a new array from table row elements but now in sorted way, listener is created 
    on table body but in case rows are never changed because of reference and they are the same just sorted */
		const sorted = Array.from(unsortedRows).sort(TableModifier.compare(columnIndex, columnType, sortDirection));
		table.innerHTML = "";
		for (const row of sorted) {
			table.appendChild(row);
		}
	}

	static compare(ind, columnType, sortDirection) {
		return function innerSort(a, b) {
      // must remove , from numbers to calc them and text to uppercase
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
    // removing the element from table and from tabledata object which is bound to that table
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
}
