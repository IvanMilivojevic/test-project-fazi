/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets/scripts/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class TableModifier {\r\n\tstatic tableSort(tableObject, th) {\r\n\t\tconst sortMethod = th.dataset.sortMethod;\r\n\t\tconst textBasedMethods = [\"gameName\", \"currency\", \"time\", \"playerId\", \"portalName\"];\r\n\t\tconst columnType = textBasedMethods.includes(sortMethod) ? \"text\" : \"number\";\r\n\t\tlet sortDirection;\r\n\r\n\t\tif (th.classList.contains(\"asc\")) {\r\n\t\t\tth.classList.remove(\"asc\");\r\n\t\t\tth.classList.add(\"desc\");\r\n\t\t\tsortDirection = \"desc\";\r\n\t\t} else if (th.classList.contains(\"desc\")) {\r\n\t\t\tth.classList.remove(\"desc\");\r\n\t\t\tth.classList.add(\"asc\");\r\n\t\t\tsortDirection = \"asc\";\r\n\t\t} else {\r\n\t\t\tfor (const thElement of th.parentNode.children) {\r\n\t\t\t\tif (thElement === th) {\r\n\t\t\t\t\tthElement.classList.add(\"asc\");\r\n\t\t\t\t\tsortDirection = \"asc\";\r\n\t\t\t\t} else {\r\n\t\t\t\t\tthElement.removeAttribute(\"class\");\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\ttableObject.sortState = sortMethod;\r\n\t\ttableObject.tableData.sort(TableModifier.compare(sortMethod, columnType, sortDirection));\r\n\t\tconst unsortedTable = document.getElementById(tableObject.id).querySelector(\"tbody\");\r\n\t\tconst sortedTable = TableCreator.tableBody(tableObject.tableData);\r\n\t\tunsortedTable.replaceWith(sortedTable);\r\n\t}\r\n\r\n\tstatic compare(sortMethod, columnType, sortDirection) {\r\n\t\treturn function innerSort(a, b) {\r\n\t\t\tconst valueA =\r\n\t\t\t\tcolumnType === \"number\" ? parseFloat(a[sortMethod].toString().replace(/,/g, \"\")) : a[sortMethod].toUpperCase();\r\n\t\t\tconst valueB =\r\n\t\t\t\tcolumnType === \"number\" ? parseFloat(b[sortMethod].toString().replace(/,/g, \"\")) : b[sortMethod].toUpperCase();\r\n\r\n\t\t\tlet comparison = 0;\r\n\t\t\tif (valueA > valueB) {\r\n\t\t\t\tcomparison = 1;\r\n\t\t\t} else if (valueA < valueB) {\r\n\t\t\t\tcomparison = -1;\r\n\t\t\t}\r\n\t\t\treturn sortDirection === \"desc\" ? comparison * -1 : comparison;\r\n\t\t};\r\n\t}\r\n}\r\n\r\nclass TableCreator {\r\n\tstatic tableHead(data, columnBased, firstColumnTitle, tableObject) {\r\n\t\tconst tableHead = document.createElement(\"thead\");\r\n\t\tconst tableHeadRow = document.createElement(\"tr\");\r\n\r\n\t\tif (columnBased) {\r\n\t\t\tconst thfirst = document.createElement(\"th\");\r\n\t\t\tthfirst.textContent = firstColumnTitle;\r\n\t\t\ttableHeadRow.appendChild(thfirst);\r\n\r\n\t\t\tfor (const columnTitle in data) {\r\n\t\t\t\tconst th = document.createElement(\"th\");\r\n\t\t\t\tth.textContent = columnTitle;\r\n\t\t\t\ttableHeadRow.appendChild(th);\r\n\t\t\t}\r\n\t\t} else {\r\n\t\t\tfor (const columnTitle in data[0]) {\r\n\t\t\t\tconst th = document.createElement(\"th\");\r\n\t\t\t\tth.textContent = columnTitle;\r\n\t\t\t\tth.setAttribute(\"data-sort-method\", columnTitle);\r\n\t\t\t\tth.addEventListener(\"click\", TableModifier.tableSort.bind(null, tableObject, th));\r\n\t\t\t\ttableHeadRow.appendChild(th);\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\ttableHead.appendChild(tableHeadRow);\r\n\r\n\t\treturn tableHead;\r\n\t}\r\n\r\n\tstatic tableBody(data, columnBased) {\r\n\t\tconst tableBody = document.createElement(\"tbody\");\r\n\r\n\t\tif (columnBased) {\r\n\t\t\tconst bodyRowNames = Object.keys(data[Object.keys(data)[0]]);\r\n\t\t\tconst bodyRowCount = bodyRowNames.length;\r\n\r\n\t\t\tfor (let i = 0; i < bodyRowCount; i++) {\r\n\t\t\t\tconst tr = document.createElement(\"tr\");\r\n\t\t\t\tconst tdname = document.createElement(\"td\");\r\n\t\t\t\ttdname.textContent = bodyRowNames[i];\r\n\t\t\t\ttr.appendChild(tdname);\r\n\r\n\t\t\t\tfor (const column in data) {\r\n\t\t\t\t\tconst td = document.createElement(\"td\");\r\n\t\t\t\t\ttd.textContent = Object.values(data[column])[i];\r\n\t\t\t\t\ttr.appendChild(td);\r\n\t\t\t\t}\r\n\r\n\t\t\t\ttableBody.appendChild(tr);\r\n\t\t\t}\r\n\t\t} else {\r\n\t\t\tfor (const row of data) {\r\n\t\t\t\tconst tr = document.createElement(\"tr\");\r\n\r\n\t\t\t\tfor (const key in row) {\r\n\t\t\t\t\tconst td = document.createElement(\"td\");\r\n\t\t\t\t\ttd.textContent = row[key];\r\n\t\t\t\t\ttr.appendChild(td);\r\n\t\t\t\t}\r\n\r\n\t\t\t\ttableBody.appendChild(tr);\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\treturn tableBody;\r\n\t}\r\n\r\n\tstatic tableFoot(dataSum) {\r\n\t\tconst tableFoot = document.createElement(\"tfoot\");\r\n\t\tconst tr = document.createElement(\"tr\");\r\n\r\n\t\tfor (const key in dataSum[0]) {\r\n\t\t\tconst td = document.createElement(\"td\");\r\n\t\t\ttd.textContent = dataSum[0][key];\r\n\t\t\ttr.appendChild(td);\r\n\t\t}\r\n\r\n\t\ttableFoot.appendChild(tr);\r\n\r\n\t\treturn tableFoot;\r\n\t}\r\n}\r\n\r\nclass Table {\r\n\tconstructor(tableLocation, url, renderPlaceId, columnBased, firstColumnTitle, tableLocationSum) {\r\n\t\tthis.id = renderPlaceId;\r\n\t\tthis.getData(url).then(data => {\r\n\t\t\tthis.tableData = this.getTableDepth(tableLocation, data);\r\n\t\t\tif (tableLocationSum) {\r\n\t\t\t\tthis.tableDataSum = [this.getTableDepth(tableLocationSum, data)];\r\n\t\t\t}\r\n\t\t\tthis.createTable(this.tableData, columnBased, firstColumnTitle, this.tableDataSum);\r\n\t\t});\r\n\t}\r\n\tgetData(url) {\r\n\t\treturn new Promise((resolve, reject) => {\r\n\t\t\tconst xhr = new XMLHttpRequest();\r\n\r\n\t\t\txhr.open(\"GET\", url);\r\n\r\n\t\t\txhr.responseType = \"json\";\r\n\r\n\t\t\txhr.onload = function() {\r\n\t\t\t\tresolve(xhr.response);\r\n\t\t\t};\r\n\r\n\t\t\txhr.send();\r\n\t\t});\r\n\t}\r\n\tgetTableDepth(tableLocation, data) {\r\n\t\tconst props = tableLocation.split(\"/\");\r\n\t\tconst propsLength = props.length;\r\n\t\tif (propsLength === 1) {\r\n\t\t\treturn data.result[props[0]];\r\n\t\t} else if (propsLength === 2) {\r\n\t\t\treturn data.result[props[0]][props[1]];\r\n\t\t} else if (propsLength === 3) {\r\n\t\t\treturn data.result[props[0]][props[1]][props[2]];\r\n\t\t} else if (propsLength === 4) {\r\n\t\t\treturn data.result[props[0]][props[1]][props[2]][props[3]];\r\n\t\t}\r\n\t}\r\n\tcreateTable(data, columnBased, firstColumnTitle, dataSum) {\r\n\t\tconst tableHead = TableCreator.tableHead(data, columnBased, firstColumnTitle, this);\r\n\t\tconst tableBody = TableCreator.tableBody(data, columnBased);\r\n\t\tconst table = document.createElement(\"table\");\r\n\t\ttable.classList.add(\"table\");\r\n\t\ttable.appendChild(tableHead);\r\n\t\ttable.appendChild(tableBody);\r\n\r\n\t\tif (dataSum) {\r\n\t\t\tconst tableFoot = TableCreator.tableFoot(dataSum);\r\n\t\t\ttable.appendChild(tableFoot);\r\n\t\t}\r\n\r\n\t\tdocument.getElementById(this.id).appendChild(table);\r\n\t}\r\n}\r\n\r\nclass App {\r\n\tstatic init() {\r\n\t\tconst dashboard = new Table(\"activities\", \"assets/json/dashboard.json\", \"dashboard-table\", true, \"Activity\");\r\n\t\tconst gamesSummary = new Table(\r\n\t\t\t\"gameStatisticsPerGame\",\r\n\t\t\t\"assets/json/statistic-games-summary.json\",\r\n\t\t\t\"games-summary-table\",\r\n\t\t\tfalse,\r\n\t\t\tfalse,\r\n\t\t\t\"gameStatisticsSum\"\r\n\t\t);\r\n\t\tconst jackpotsSilver = new Table(\r\n\t\t\t\"jackpots/Silver/dashboardJackpots\",\r\n\t\t\t\"assets/json/dashboard.json\",\r\n\t\t\t\"jackpots-silver-table\",\r\n\t\t\tfalse,\r\n\t\t\tfalse\r\n\t\t);\r\n\t\tconst jackpotsGold = new Table(\r\n\t\t\t\"jackpots/Gold/dashboardJackpots\",\r\n\t\t\t\"assets/json/dashboard.json\",\r\n\t\t\t\"jackpots-gold-table\",\r\n\t\t\tfalse,\r\n\t\t\tfalse\r\n\t\t);\r\n\t\tconst jackpotsPlatinum = new Table(\r\n\t\t\t\"jackpots/Platinum/dashboardJackpots\",\r\n\t\t\t\"assets/json/dashboard.json\",\r\n\t\t\t\"jackpots-platinum-table\",\r\n\t\t\tfalse,\r\n\t\t\tfalse\r\n\t\t);\r\n\t\tconst jackpotsDiamond = new Table(\r\n\t\t\t\"jackpots/Diamond/dashboardJackpots\",\r\n\t\t\t\"assets/json/dashboard.json\",\r\n\t\t\t\"jackpots-diamond-table\",\r\n\t\t\tfalse,\r\n\t\t\tfalse\r\n\t\t);\r\n\t\tconst portalEur = new Table(\r\n\t\t\t\"portalsActivities/Portal-EUR/activities\",\r\n\t\t\t\"assets/json/dashboard.json\",\r\n\t\t\t\"dashboard-portal-eur-table\",\r\n\t\t\ttrue,\r\n\t\t\t\"Activity\"\r\n\t\t);\r\n\t\tconst portalUsd = new Table(\r\n\t\t\t\"portalsActivities/Portal-USD/activities\",\r\n\t\t\t\"assets/json/dashboard.json\",\r\n\t\t\t\"dashboard-portal-usd-table\",\r\n\t\t\ttrue,\r\n\t\t\t\"Activity\"\r\n\t\t);\r\n\t\tconst portalRsd = new Table(\r\n\t\t\t\"portalsActivities/Portal-RSD/activities\",\r\n\t\t\t\"assets/json/dashboard.json\",\r\n\t\t\t\"dashboard-portal-rsd-table\",\r\n\t\t\ttrue,\r\n\t\t\t\"Activity\"\r\n\t\t);\r\n\t\tconst slotAccounting = new Table(\r\n\t\t\t\"slotAccounting\",\r\n\t\t\t\"assets/json/accounting-reports.json\",\r\n\t\t\t\"slot-accounting-table\",\r\n\t\t\tfalse,\r\n\t\t\tfalse,\r\n\t\t\t\"slotAccountingSum\"\r\n\t\t);\r\n\t\tconst rouletteAccounting = new Table(\r\n\t\t\t\"rouletteAccounting\",\r\n\t\t\t\"assets/json/accounting-reports.json\",\r\n\t\t\t\"roulette-accounting-table\",\r\n\t\t\tfalse,\r\n\t\t\tfalse,\r\n\t\t\t\"rouletteAccountingSum\"\r\n\t\t);\r\n\t\tconst lerAccounting = new Table(\r\n\t\t\t\"liveEuropeanRouletteAccounting\",\r\n\t\t\t\"assets/json/accounting-reports.json\",\r\n\t\t\t\"ler-accounting-table\",\r\n\t\t\tfalse,\r\n\t\t\tfalse,\r\n\t\t\t\"liveEuropeanRouletteAccountingSum\"\r\n\t\t);\r\n\t\tconst tcrAccounting = new Table(\r\n\t\t\t\"tripleCrownRouletteAccounting\",\r\n\t\t\t\"assets/json/accounting-reports.json\",\r\n\t\t\t\"tcr-accounting-table\",\r\n\t\t\tfalse,\r\n\t\t\tfalse,\r\n\t\t\t\"tripleCrownRouletteAccountingSum\"\r\n\t\t);\r\n\t\tconst pokerAccounting = new Table(\r\n\t\t\t\"pokerAccounting\",\r\n\t\t\t\"assets/json/accounting-reports.json\",\r\n\t\t\t\"poker-accounting-table\",\r\n\t\t\tfalse,\r\n\t\t\tfalse,\r\n\t\t\t\"pokerAccountingSum\"\r\n\t\t);\r\n\r\n\t\tconst sidebarMenu = document.getElementById(\"sidebar-menu\");\r\n\t\tconst pagesContentHolder = document.querySelectorAll(\"#main-content .page\");\r\n\t\tsidebarMenu.addEventListener(\"click\", App.navigation.bind(null, pagesContentHolder));\r\n\r\n\t\tconst panelNavs = document.querySelectorAll(\".panel-nav\");\r\n\t\tfor (const panelNav of panelNavs) {\r\n\t\t\tconst panelsContentHolder = panelNav.parentNode.querySelector(\".panel-content-wrapper\").children;\r\n\t\t\tpanelNav.addEventListener(\"click\", App.navigation.bind(null, panelsContentHolder));\r\n\t\t}\r\n\t}\r\n\r\n\tstatic navigation(contentHolder) {\r\n\t\tevent.preventDefault();\r\n\t\tconst menuItemSelected = event.target.closest(\"li\");\r\n\t\tconst menuItemLink = event.target.closest(\"a\").dataset.href;\r\n\r\n\t\tif (!menuItemLink) {\r\n\t\t\treturn;\r\n\t\t}\r\n\r\n\t\tfor (const menuElement of menuItemSelected.parentNode.children) {\r\n\t\t\tif (menuElement === menuItemSelected) {\r\n\t\t\t\tmenuElement.classList.add(\"active\");\r\n\t\t\t} else {\r\n\t\t\t\tmenuElement.classList.remove(\"active\");\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\tfor (const page of contentHolder) {\r\n\t\t\tif (page.id === menuItemLink) {\r\n\t\t\t\tpage.classList.add(\"active\");\r\n\t\t\t} else {\r\n\t\t\t\tpage.classList.remove(\"active\");\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}\r\n\r\nApp.init();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcz8xMTEyIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRhYmxlTW9kaWZpZXIge1xyXG5cdHN0YXRpYyB0YWJsZVNvcnQodGFibGVPYmplY3QsIHRoKSB7XHJcblx0XHRjb25zdCBzb3J0TWV0aG9kID0gdGguZGF0YXNldC5zb3J0TWV0aG9kO1xyXG5cdFx0Y29uc3QgdGV4dEJhc2VkTWV0aG9kcyA9IFtcImdhbWVOYW1lXCIsIFwiY3VycmVuY3lcIiwgXCJ0aW1lXCIsIFwicGxheWVySWRcIiwgXCJwb3J0YWxOYW1lXCJdO1xyXG5cdFx0Y29uc3QgY29sdW1uVHlwZSA9IHRleHRCYXNlZE1ldGhvZHMuaW5jbHVkZXMoc29ydE1ldGhvZCkgPyBcInRleHRcIiA6IFwibnVtYmVyXCI7XHJcblx0XHRsZXQgc29ydERpcmVjdGlvbjtcclxuXHJcblx0XHRpZiAodGguY2xhc3NMaXN0LmNvbnRhaW5zKFwiYXNjXCIpKSB7XHJcblx0XHRcdHRoLmNsYXNzTGlzdC5yZW1vdmUoXCJhc2NcIik7XHJcblx0XHRcdHRoLmNsYXNzTGlzdC5hZGQoXCJkZXNjXCIpO1xyXG5cdFx0XHRzb3J0RGlyZWN0aW9uID0gXCJkZXNjXCI7XHJcblx0XHR9IGVsc2UgaWYgKHRoLmNsYXNzTGlzdC5jb250YWlucyhcImRlc2NcIikpIHtcclxuXHRcdFx0dGguY2xhc3NMaXN0LnJlbW92ZShcImRlc2NcIik7XHJcblx0XHRcdHRoLmNsYXNzTGlzdC5hZGQoXCJhc2NcIik7XHJcblx0XHRcdHNvcnREaXJlY3Rpb24gPSBcImFzY1wiO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Zm9yIChjb25zdCB0aEVsZW1lbnQgb2YgdGgucGFyZW50Tm9kZS5jaGlsZHJlbikge1xyXG5cdFx0XHRcdGlmICh0aEVsZW1lbnQgPT09IHRoKSB7XHJcblx0XHRcdFx0XHR0aEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFzY1wiKTtcclxuXHRcdFx0XHRcdHNvcnREaXJlY3Rpb24gPSBcImFzY1wiO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aEVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGFibGVPYmplY3Quc29ydFN0YXRlID0gc29ydE1ldGhvZDtcclxuXHRcdHRhYmxlT2JqZWN0LnRhYmxlRGF0YS5zb3J0KFRhYmxlTW9kaWZpZXIuY29tcGFyZShzb3J0TWV0aG9kLCBjb2x1bW5UeXBlLCBzb3J0RGlyZWN0aW9uKSk7XHJcblx0XHRjb25zdCB1bnNvcnRlZFRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFibGVPYmplY3QuaWQpLnF1ZXJ5U2VsZWN0b3IoXCJ0Ym9keVwiKTtcclxuXHRcdGNvbnN0IHNvcnRlZFRhYmxlID0gVGFibGVDcmVhdG9yLnRhYmxlQm9keSh0YWJsZU9iamVjdC50YWJsZURhdGEpO1xyXG5cdFx0dW5zb3J0ZWRUYWJsZS5yZXBsYWNlV2l0aChzb3J0ZWRUYWJsZSk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29tcGFyZShzb3J0TWV0aG9kLCBjb2x1bW5UeXBlLCBzb3J0RGlyZWN0aW9uKSB7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gaW5uZXJTb3J0KGEsIGIpIHtcclxuXHRcdFx0Y29uc3QgdmFsdWVBID1cclxuXHRcdFx0XHRjb2x1bW5UeXBlID09PSBcIm51bWJlclwiID8gcGFyc2VGbG9hdChhW3NvcnRNZXRob2RdLnRvU3RyaW5nKCkucmVwbGFjZSgvLC9nLCBcIlwiKSkgOiBhW3NvcnRNZXRob2RdLnRvVXBwZXJDYXNlKCk7XHJcblx0XHRcdGNvbnN0IHZhbHVlQiA9XHJcblx0XHRcdFx0Y29sdW1uVHlwZSA9PT0gXCJudW1iZXJcIiA/IHBhcnNlRmxvYXQoYltzb3J0TWV0aG9kXS50b1N0cmluZygpLnJlcGxhY2UoLywvZywgXCJcIikpIDogYltzb3J0TWV0aG9kXS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuXHRcdFx0bGV0IGNvbXBhcmlzb24gPSAwO1xyXG5cdFx0XHRpZiAodmFsdWVBID4gdmFsdWVCKSB7XHJcblx0XHRcdFx0Y29tcGFyaXNvbiA9IDE7XHJcblx0XHRcdH0gZWxzZSBpZiAodmFsdWVBIDwgdmFsdWVCKSB7XHJcblx0XHRcdFx0Y29tcGFyaXNvbiA9IC0xO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzb3J0RGlyZWN0aW9uID09PSBcImRlc2NcIiA/IGNvbXBhcmlzb24gKiAtMSA6IGNvbXBhcmlzb247XHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgVGFibGVDcmVhdG9yIHtcclxuXHRzdGF0aWMgdGFibGVIZWFkKGRhdGEsIGNvbHVtbkJhc2VkLCBmaXJzdENvbHVtblRpdGxlLCB0YWJsZU9iamVjdCkge1xyXG5cdFx0Y29uc3QgdGFibGVIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoZWFkXCIpO1xyXG5cdFx0Y29uc3QgdGFibGVIZWFkUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG5cclxuXHRcdGlmIChjb2x1bW5CYXNlZCkge1xyXG5cdFx0XHRjb25zdCB0aGZpcnN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xyXG5cdFx0XHR0aGZpcnN0LnRleHRDb250ZW50ID0gZmlyc3RDb2x1bW5UaXRsZTtcclxuXHRcdFx0dGFibGVIZWFkUm93LmFwcGVuZENoaWxkKHRoZmlyc3QpO1xyXG5cclxuXHRcdFx0Zm9yIChjb25zdCBjb2x1bW5UaXRsZSBpbiBkYXRhKSB7XHJcblx0XHRcdFx0Y29uc3QgdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XHJcblx0XHRcdFx0dGgudGV4dENvbnRlbnQgPSBjb2x1bW5UaXRsZTtcclxuXHRcdFx0XHR0YWJsZUhlYWRSb3cuYXBwZW5kQ2hpbGQodGgpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRmb3IgKGNvbnN0IGNvbHVtblRpdGxlIGluIGRhdGFbMF0pIHtcclxuXHRcdFx0XHRjb25zdCB0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcclxuXHRcdFx0XHR0aC50ZXh0Q29udGVudCA9IGNvbHVtblRpdGxlO1xyXG5cdFx0XHRcdHRoLnNldEF0dHJpYnV0ZShcImRhdGEtc29ydC1tZXRob2RcIiwgY29sdW1uVGl0bGUpO1xyXG5cdFx0XHRcdHRoLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBUYWJsZU1vZGlmaWVyLnRhYmxlU29ydC5iaW5kKG51bGwsIHRhYmxlT2JqZWN0LCB0aCkpO1xyXG5cdFx0XHRcdHRhYmxlSGVhZFJvdy5hcHBlbmRDaGlsZCh0aCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0YWJsZUhlYWQuYXBwZW5kQ2hpbGQodGFibGVIZWFkUm93KTtcclxuXHJcblx0XHRyZXR1cm4gdGFibGVIZWFkO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIHRhYmxlQm9keShkYXRhLCBjb2x1bW5CYXNlZCkge1xyXG5cdFx0Y29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpO1xyXG5cclxuXHRcdGlmIChjb2x1bW5CYXNlZCkge1xyXG5cdFx0XHRjb25zdCBib2R5Um93TmFtZXMgPSBPYmplY3Qua2V5cyhkYXRhW09iamVjdC5rZXlzKGRhdGEpWzBdXSk7XHJcblx0XHRcdGNvbnN0IGJvZHlSb3dDb3VudCA9IGJvZHlSb3dOYW1lcy5sZW5ndGg7XHJcblxyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGJvZHlSb3dDb3VudDsgaSsrKSB7XHJcblx0XHRcdFx0Y29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcblx0XHRcdFx0Y29uc3QgdGRuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG5cdFx0XHRcdHRkbmFtZS50ZXh0Q29udGVudCA9IGJvZHlSb3dOYW1lc1tpXTtcclxuXHRcdFx0XHR0ci5hcHBlbmRDaGlsZCh0ZG5hbWUpO1xyXG5cclxuXHRcdFx0XHRmb3IgKGNvbnN0IGNvbHVtbiBpbiBkYXRhKSB7XHJcblx0XHRcdFx0XHRjb25zdCB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuXHRcdFx0XHRcdHRkLnRleHRDb250ZW50ID0gT2JqZWN0LnZhbHVlcyhkYXRhW2NvbHVtbl0pW2ldO1xyXG5cdFx0XHRcdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGFibGVCb2R5LmFwcGVuZENoaWxkKHRyKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Zm9yIChjb25zdCByb3cgb2YgZGF0YSkge1xyXG5cdFx0XHRcdGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG5cclxuXHRcdFx0XHRmb3IgKGNvbnN0IGtleSBpbiByb3cpIHtcclxuXHRcdFx0XHRcdGNvbnN0IHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG5cdFx0XHRcdFx0dGQudGV4dENvbnRlbnQgPSByb3dba2V5XTtcclxuXHRcdFx0XHRcdHRyLmFwcGVuZENoaWxkKHRkKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRhYmxlQm9keS5hcHBlbmRDaGlsZCh0cik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGFibGVCb2R5O1xyXG5cdH1cclxuXHJcblx0c3RhdGljIHRhYmxlRm9vdChkYXRhU3VtKSB7XHJcblx0XHRjb25zdCB0YWJsZUZvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGZvb3RcIik7XHJcblx0XHRjb25zdCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBkYXRhU3VtWzBdKSB7XHJcblx0XHRcdGNvbnN0IHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG5cdFx0XHR0ZC50ZXh0Q29udGVudCA9IGRhdGFTdW1bMF1ba2V5XTtcclxuXHRcdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRhYmxlRm9vdC5hcHBlbmRDaGlsZCh0cik7XHJcblxyXG5cdFx0cmV0dXJuIHRhYmxlRm9vdDtcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFRhYmxlIHtcclxuXHRjb25zdHJ1Y3Rvcih0YWJsZUxvY2F0aW9uLCB1cmwsIHJlbmRlclBsYWNlSWQsIGNvbHVtbkJhc2VkLCBmaXJzdENvbHVtblRpdGxlLCB0YWJsZUxvY2F0aW9uU3VtKSB7XHJcblx0XHR0aGlzLmlkID0gcmVuZGVyUGxhY2VJZDtcclxuXHRcdHRoaXMuZ2V0RGF0YSh1cmwpLnRoZW4oZGF0YSA9PiB7XHJcblx0XHRcdHRoaXMudGFibGVEYXRhID0gdGhpcy5nZXRUYWJsZURlcHRoKHRhYmxlTG9jYXRpb24sIGRhdGEpO1xyXG5cdFx0XHRpZiAodGFibGVMb2NhdGlvblN1bSkge1xyXG5cdFx0XHRcdHRoaXMudGFibGVEYXRhU3VtID0gW3RoaXMuZ2V0VGFibGVEZXB0aCh0YWJsZUxvY2F0aW9uU3VtLCBkYXRhKV07XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5jcmVhdGVUYWJsZSh0aGlzLnRhYmxlRGF0YSwgY29sdW1uQmFzZWQsIGZpcnN0Q29sdW1uVGl0bGUsIHRoaXMudGFibGVEYXRhU3VtKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRnZXREYXRhKHVybCkge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG5cdFx0XHR4aHIub3BlbihcIkdFVFwiLCB1cmwpO1xyXG5cclxuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IFwianNvblwiO1xyXG5cclxuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5zZW5kKCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0Z2V0VGFibGVEZXB0aCh0YWJsZUxvY2F0aW9uLCBkYXRhKSB7XHJcblx0XHRjb25zdCBwcm9wcyA9IHRhYmxlTG9jYXRpb24uc3BsaXQoXCIvXCIpO1xyXG5cdFx0Y29uc3QgcHJvcHNMZW5ndGggPSBwcm9wcy5sZW5ndGg7XHJcblx0XHRpZiAocHJvcHNMZW5ndGggPT09IDEpIHtcclxuXHRcdFx0cmV0dXJuIGRhdGEucmVzdWx0W3Byb3BzWzBdXTtcclxuXHRcdH0gZWxzZSBpZiAocHJvcHNMZW5ndGggPT09IDIpIHtcclxuXHRcdFx0cmV0dXJuIGRhdGEucmVzdWx0W3Byb3BzWzBdXVtwcm9wc1sxXV07XHJcblx0XHR9IGVsc2UgaWYgKHByb3BzTGVuZ3RoID09PSAzKSB7XHJcblx0XHRcdHJldHVybiBkYXRhLnJlc3VsdFtwcm9wc1swXV1bcHJvcHNbMV1dW3Byb3BzWzJdXTtcclxuXHRcdH0gZWxzZSBpZiAocHJvcHNMZW5ndGggPT09IDQpIHtcclxuXHRcdFx0cmV0dXJuIGRhdGEucmVzdWx0W3Byb3BzWzBdXVtwcm9wc1sxXV1bcHJvcHNbMl1dW3Byb3BzWzNdXTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y3JlYXRlVGFibGUoZGF0YSwgY29sdW1uQmFzZWQsIGZpcnN0Q29sdW1uVGl0bGUsIGRhdGFTdW0pIHtcclxuXHRcdGNvbnN0IHRhYmxlSGVhZCA9IFRhYmxlQ3JlYXRvci50YWJsZUhlYWQoZGF0YSwgY29sdW1uQmFzZWQsIGZpcnN0Q29sdW1uVGl0bGUsIHRoaXMpO1xyXG5cdFx0Y29uc3QgdGFibGVCb2R5ID0gVGFibGVDcmVhdG9yLnRhYmxlQm9keShkYXRhLCBjb2x1bW5CYXNlZCk7XHJcblx0XHRjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcclxuXHRcdHRhYmxlLmNsYXNzTGlzdC5hZGQoXCJ0YWJsZVwiKTtcclxuXHRcdHRhYmxlLmFwcGVuZENoaWxkKHRhYmxlSGVhZCk7XHJcblx0XHR0YWJsZS5hcHBlbmRDaGlsZCh0YWJsZUJvZHkpO1xyXG5cclxuXHRcdGlmIChkYXRhU3VtKSB7XHJcblx0XHRcdGNvbnN0IHRhYmxlRm9vdCA9IFRhYmxlQ3JlYXRvci50YWJsZUZvb3QoZGF0YVN1bSk7XHJcblx0XHRcdHRhYmxlLmFwcGVuZENoaWxkKHRhYmxlRm9vdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZCkuYXBwZW5kQ2hpbGQodGFibGUpO1xyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgQXBwIHtcclxuXHRzdGF0aWMgaW5pdCgpIHtcclxuXHRcdGNvbnN0IGRhc2hib2FyZCA9IG5ldyBUYWJsZShcImFjdGl2aXRpZXNcIiwgXCJhc3NldHMvanNvbi9kYXNoYm9hcmQuanNvblwiLCBcImRhc2hib2FyZC10YWJsZVwiLCB0cnVlLCBcIkFjdGl2aXR5XCIpO1xyXG5cdFx0Y29uc3QgZ2FtZXNTdW1tYXJ5ID0gbmV3IFRhYmxlKFxyXG5cdFx0XHRcImdhbWVTdGF0aXN0aWNzUGVyR2FtZVwiLFxyXG5cdFx0XHRcImFzc2V0cy9qc29uL3N0YXRpc3RpYy1nYW1lcy1zdW1tYXJ5Lmpzb25cIixcclxuXHRcdFx0XCJnYW1lcy1zdW1tYXJ5LXRhYmxlXCIsXHJcblx0XHRcdGZhbHNlLFxyXG5cdFx0XHRmYWxzZSxcclxuXHRcdFx0XCJnYW1lU3RhdGlzdGljc1N1bVwiXHJcblx0XHQpO1xyXG5cdFx0Y29uc3QgamFja3BvdHNTaWx2ZXIgPSBuZXcgVGFibGUoXHJcblx0XHRcdFwiamFja3BvdHMvU2lsdmVyL2Rhc2hib2FyZEphY2twb3RzXCIsXHJcblx0XHRcdFwiYXNzZXRzL2pzb24vZGFzaGJvYXJkLmpzb25cIixcclxuXHRcdFx0XCJqYWNrcG90cy1zaWx2ZXItdGFibGVcIixcclxuXHRcdFx0ZmFsc2UsXHJcblx0XHRcdGZhbHNlXHJcblx0XHQpO1xyXG5cdFx0Y29uc3QgamFja3BvdHNHb2xkID0gbmV3IFRhYmxlKFxyXG5cdFx0XHRcImphY2twb3RzL0dvbGQvZGFzaGJvYXJkSmFja3BvdHNcIixcclxuXHRcdFx0XCJhc3NldHMvanNvbi9kYXNoYm9hcmQuanNvblwiLFxyXG5cdFx0XHRcImphY2twb3RzLWdvbGQtdGFibGVcIixcclxuXHRcdFx0ZmFsc2UsXHJcblx0XHRcdGZhbHNlXHJcblx0XHQpO1xyXG5cdFx0Y29uc3QgamFja3BvdHNQbGF0aW51bSA9IG5ldyBUYWJsZShcclxuXHRcdFx0XCJqYWNrcG90cy9QbGF0aW51bS9kYXNoYm9hcmRKYWNrcG90c1wiLFxyXG5cdFx0XHRcImFzc2V0cy9qc29uL2Rhc2hib2FyZC5qc29uXCIsXHJcblx0XHRcdFwiamFja3BvdHMtcGxhdGludW0tdGFibGVcIixcclxuXHRcdFx0ZmFsc2UsXHJcblx0XHRcdGZhbHNlXHJcblx0XHQpO1xyXG5cdFx0Y29uc3QgamFja3BvdHNEaWFtb25kID0gbmV3IFRhYmxlKFxyXG5cdFx0XHRcImphY2twb3RzL0RpYW1vbmQvZGFzaGJvYXJkSmFja3BvdHNcIixcclxuXHRcdFx0XCJhc3NldHMvanNvbi9kYXNoYm9hcmQuanNvblwiLFxyXG5cdFx0XHRcImphY2twb3RzLWRpYW1vbmQtdGFibGVcIixcclxuXHRcdFx0ZmFsc2UsXHJcblx0XHRcdGZhbHNlXHJcblx0XHQpO1xyXG5cdFx0Y29uc3QgcG9ydGFsRXVyID0gbmV3IFRhYmxlKFxyXG5cdFx0XHRcInBvcnRhbHNBY3Rpdml0aWVzL1BvcnRhbC1FVVIvYWN0aXZpdGllc1wiLFxyXG5cdFx0XHRcImFzc2V0cy9qc29uL2Rhc2hib2FyZC5qc29uXCIsXHJcblx0XHRcdFwiZGFzaGJvYXJkLXBvcnRhbC1ldXItdGFibGVcIixcclxuXHRcdFx0dHJ1ZSxcclxuXHRcdFx0XCJBY3Rpdml0eVwiXHJcblx0XHQpO1xyXG5cdFx0Y29uc3QgcG9ydGFsVXNkID0gbmV3IFRhYmxlKFxyXG5cdFx0XHRcInBvcnRhbHNBY3Rpdml0aWVzL1BvcnRhbC1VU0QvYWN0aXZpdGllc1wiLFxyXG5cdFx0XHRcImFzc2V0cy9qc29uL2Rhc2hib2FyZC5qc29uXCIsXHJcblx0XHRcdFwiZGFzaGJvYXJkLXBvcnRhbC11c2QtdGFibGVcIixcclxuXHRcdFx0dHJ1ZSxcclxuXHRcdFx0XCJBY3Rpdml0eVwiXHJcblx0XHQpO1xyXG5cdFx0Y29uc3QgcG9ydGFsUnNkID0gbmV3IFRhYmxlKFxyXG5cdFx0XHRcInBvcnRhbHNBY3Rpdml0aWVzL1BvcnRhbC1SU0QvYWN0aXZpdGllc1wiLFxyXG5cdFx0XHRcImFzc2V0cy9qc29uL2Rhc2hib2FyZC5qc29uXCIsXHJcblx0XHRcdFwiZGFzaGJvYXJkLXBvcnRhbC1yc2QtdGFibGVcIixcclxuXHRcdFx0dHJ1ZSxcclxuXHRcdFx0XCJBY3Rpdml0eVwiXHJcblx0XHQpO1xyXG5cdFx0Y29uc3Qgc2xvdEFjY291bnRpbmcgPSBuZXcgVGFibGUoXHJcblx0XHRcdFwic2xvdEFjY291bnRpbmdcIixcclxuXHRcdFx0XCJhc3NldHMvanNvbi9hY2NvdW50aW5nLXJlcG9ydHMuanNvblwiLFxyXG5cdFx0XHRcInNsb3QtYWNjb3VudGluZy10YWJsZVwiLFxyXG5cdFx0XHRmYWxzZSxcclxuXHRcdFx0ZmFsc2UsXHJcblx0XHRcdFwic2xvdEFjY291bnRpbmdTdW1cIlxyXG5cdFx0KTtcclxuXHRcdGNvbnN0IHJvdWxldHRlQWNjb3VudGluZyA9IG5ldyBUYWJsZShcclxuXHRcdFx0XCJyb3VsZXR0ZUFjY291bnRpbmdcIixcclxuXHRcdFx0XCJhc3NldHMvanNvbi9hY2NvdW50aW5nLXJlcG9ydHMuanNvblwiLFxyXG5cdFx0XHRcInJvdWxldHRlLWFjY291bnRpbmctdGFibGVcIixcclxuXHRcdFx0ZmFsc2UsXHJcblx0XHRcdGZhbHNlLFxyXG5cdFx0XHRcInJvdWxldHRlQWNjb3VudGluZ1N1bVwiXHJcblx0XHQpO1xyXG5cdFx0Y29uc3QgbGVyQWNjb3VudGluZyA9IG5ldyBUYWJsZShcclxuXHRcdFx0XCJsaXZlRXVyb3BlYW5Sb3VsZXR0ZUFjY291bnRpbmdcIixcclxuXHRcdFx0XCJhc3NldHMvanNvbi9hY2NvdW50aW5nLXJlcG9ydHMuanNvblwiLFxyXG5cdFx0XHRcImxlci1hY2NvdW50aW5nLXRhYmxlXCIsXHJcblx0XHRcdGZhbHNlLFxyXG5cdFx0XHRmYWxzZSxcclxuXHRcdFx0XCJsaXZlRXVyb3BlYW5Sb3VsZXR0ZUFjY291bnRpbmdTdW1cIlxyXG5cdFx0KTtcclxuXHRcdGNvbnN0IHRjckFjY291bnRpbmcgPSBuZXcgVGFibGUoXHJcblx0XHRcdFwidHJpcGxlQ3Jvd25Sb3VsZXR0ZUFjY291bnRpbmdcIixcclxuXHRcdFx0XCJhc3NldHMvanNvbi9hY2NvdW50aW5nLXJlcG9ydHMuanNvblwiLFxyXG5cdFx0XHRcInRjci1hY2NvdW50aW5nLXRhYmxlXCIsXHJcblx0XHRcdGZhbHNlLFxyXG5cdFx0XHRmYWxzZSxcclxuXHRcdFx0XCJ0cmlwbGVDcm93blJvdWxldHRlQWNjb3VudGluZ1N1bVwiXHJcblx0XHQpO1xyXG5cdFx0Y29uc3QgcG9rZXJBY2NvdW50aW5nID0gbmV3IFRhYmxlKFxyXG5cdFx0XHRcInBva2VyQWNjb3VudGluZ1wiLFxyXG5cdFx0XHRcImFzc2V0cy9qc29uL2FjY291bnRpbmctcmVwb3J0cy5qc29uXCIsXHJcblx0XHRcdFwicG9rZXItYWNjb3VudGluZy10YWJsZVwiLFxyXG5cdFx0XHRmYWxzZSxcclxuXHRcdFx0ZmFsc2UsXHJcblx0XHRcdFwicG9rZXJBY2NvdW50aW5nU3VtXCJcclxuXHRcdCk7XHJcblxyXG5cdFx0Y29uc3Qgc2lkZWJhck1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZGViYXItbWVudVwiKTtcclxuXHRcdGNvbnN0IHBhZ2VzQ29udGVudEhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjbWFpbi1jb250ZW50IC5wYWdlXCIpO1xyXG5cdFx0c2lkZWJhck1lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIEFwcC5uYXZpZ2F0aW9uLmJpbmQobnVsbCwgcGFnZXNDb250ZW50SG9sZGVyKSk7XHJcblxyXG5cdFx0Y29uc3QgcGFuZWxOYXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wYW5lbC1uYXZcIik7XHJcblx0XHRmb3IgKGNvbnN0IHBhbmVsTmF2IG9mIHBhbmVsTmF2cykge1xyXG5cdFx0XHRjb25zdCBwYW5lbHNDb250ZW50SG9sZGVyID0gcGFuZWxOYXYucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwiLnBhbmVsLWNvbnRlbnQtd3JhcHBlclwiKS5jaGlsZHJlbjtcclxuXHRcdFx0cGFuZWxOYXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIEFwcC5uYXZpZ2F0aW9uLmJpbmQobnVsbCwgcGFuZWxzQ29udGVudEhvbGRlcikpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIG5hdmlnYXRpb24oY29udGVudEhvbGRlcikge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGNvbnN0IG1lbnVJdGVtU2VsZWN0ZWQgPSBldmVudC50YXJnZXQuY2xvc2VzdChcImxpXCIpO1xyXG5cdFx0Y29uc3QgbWVudUl0ZW1MaW5rID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCJhXCIpLmRhdGFzZXQuaHJlZjtcclxuXHJcblx0XHRpZiAoIW1lbnVJdGVtTGluaykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChjb25zdCBtZW51RWxlbWVudCBvZiBtZW51SXRlbVNlbGVjdGVkLnBhcmVudE5vZGUuY2hpbGRyZW4pIHtcclxuXHRcdFx0aWYgKG1lbnVFbGVtZW50ID09PSBtZW51SXRlbVNlbGVjdGVkKSB7XHJcblx0XHRcdFx0bWVudUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRtZW51RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChjb25zdCBwYWdlIG9mIGNvbnRlbnRIb2xkZXIpIHtcclxuXHRcdFx0aWYgKHBhZ2UuaWQgPT09IG1lbnVJdGVtTGluaykge1xyXG5cdFx0XHRcdHBhZ2UuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRwYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbkFwcC5pbml0KCk7XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/app.js\n");

/***/ })

/******/ });