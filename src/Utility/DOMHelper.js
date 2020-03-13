export class DOMHelper {
	static init() {
		/* all of the listeners for the dom oncluding filters and panel navigation to go through the app */
		const multiselectAllFilter = document.querySelector(".ms-select-all");
		multiselectAllFilter.addEventListener("click", this.multiselectFilterHandle);

		const singleFilter = document.querySelector(".sng-filter .dd-options");
		const portalsContentHolder = document.querySelectorAll(".portal-table");
		singleFilter.addEventListener("click", this.navigationHandler.bind(null, portalsContentHolder, "div", "div"));

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

		const mobileToggle = document.querySelector(".mobile-toggle");
		mobileToggle.addEventListener("click", () => {
			document.querySelector("body").classList.toggle("sidenav-active");
		});

		document.getElementById("sidebar").addEventListener(
			"click",
			() => {
				const menuButton = document.querySelector(".mobile-toggle");
				const menu = document.getElementById("sidebar-menu");

				if (event.target.closest(".mobile-toggle") !== menuButton && event.target.closest("#sidebar-menu") !== menu) {
					document.querySelector("body").classList.remove("sidenav-active");
				}
			},
			true
		);

		// document listener to close all opened filters
		document.addEventListener("click", this.closeFiltersHandler, true);

		const sidebarMenu = document.getElementById("sidebar-menu");
		const pagesContentHolder = document.querySelectorAll("#main-content .page");
		sidebarMenu.addEventListener("click", this.navigationHandler.bind(null, pagesContentHolder, "li", "a"));

		const panelNavs = document.querySelectorAll(".panel-nav");
		for (const panelNav of panelNavs) {
			const panelsContentHolder = panelNav.parentNode.querySelector(".panel-content-wrapper").children;
			panelNav.addEventListener("click", this.navigationHandler.bind(null, panelsContentHolder, "li", "a"));
		}
	}
	// search will go through the cells of the tables which are provided and temporary hiding the row
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
	// navigation can be used on places where multiple elemnts control the same named containers via data-href and id connection
	static navigationHandler(contentHolder, toggleItem, hrefItem) {
		event.preventDefault();
		const menuItemSelected = event.target.closest(toggleItem);
		const menuItemLink = event.target.closest(hrefItem) ? event.target.closest(hrefItem).dataset.href : false;

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
