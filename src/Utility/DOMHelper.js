export class DOMHelper {
	static init() {
		const multiselectAllFilter = document.querySelector(".ms-select-all");
		multiselectAllFilter.addEventListener("click", this.multiselectFilterHandle);

		const dropdownButons = document.querySelectorAll(".filter-item .dropdown-button");
		for (const button of dropdownButons) {
			button.addEventListener("click", this.dropdownHandler);
		}

		const searchButton = document.getElementById("search-button");
		searchButton.addEventListener("click", function() {
			this.parentNode.classList.toggle("search-active");
			this.nextElementSibling.focus();
		});

		const searchInput = document.getElementById("search-input");
		const searchTargetsSelector = "#accounting-reports .table-body span:first-child";
		searchInput.addEventListener("input", this.searchHandler.bind(searchInput, searchTargetsSelector));

		document.addEventListener("click", this.closeFiltersHandler, true);

		const sidebarMenu = document.getElementById("sidebar-menu");
		const pagesContentHolder = document.querySelectorAll("#main-content .page");
		sidebarMenu.addEventListener("click", this.navigationHandler.bind(null, pagesContentHolder));

		const panelNavs = document.querySelectorAll(".panel-nav");
		for (const panelNav of panelNavs) {
			const panelsContentHolder = panelNav.parentNode.querySelector(".panel-content-wrapper").children;
			panelNav.addEventListener("click", this.navigationHandler.bind(null, panelsContentHolder));
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
