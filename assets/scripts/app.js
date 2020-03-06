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

eval("class TableModifier {\r\n\tstatic tableSort(tableObject, th) {\r\n\t\tconsole.time();\r\n\t\tconst sortMethod = th.dataset.sortMethod;\r\n\t\tconst sortType = sortMethod === \"gameName\" || sortMethod === \"currency\" ? \"text\" : \"number\";\r\n\t\tlet sortDirection;\r\n\t\ttableObject.sortState = sortMethod;\r\n\t\ttableObject.tableData.sort(TableModifier.compare(sortMethod, sortType));\r\n\t\tconst unsortedTable = document.getElementById(tableObject.id).querySelector(\"tbody\");\r\n\t\tconst sortedTable = TableCreator.tableBody(tableObject.tableData);\r\n\t\tunsortedTable.replaceWith(sortedTable);\r\n\t\tconsole.timeEnd();\r\n\t}\r\n\r\n\tstatic compare(sortMethod, sortType) {\r\n\t\treturn function innerSort(a, b) {\r\n\t\t\tconst valueA =\r\n\t\t\t\tsortType === \"number\" ? parseFloat(a[sortMethod].toString().replace(/,/g, \"\")) : a[sortMethod].toUpperCase();\r\n\t\t\tconst valueB =\r\n\t\t\t\tsortType === \"number\" ? parseFloat(b[sortMethod].toString().replace(/,/g, \"\")) : b[sortMethod].toUpperCase();\r\n\r\n\t\t\tlet comparison = 0;\r\n\t\t\tif (valueA > valueB) {\r\n\t\t\t\tcomparison = 1;\r\n\t\t\t} else if (valueA < valueB) {\r\n\t\t\t\tcomparison = -1;\r\n\t\t\t}\r\n\t\t\treturn comparison;\r\n\t\t};\r\n\t}\r\n}\r\n\r\nclass TableCreator {\r\n\tstatic tableHead(data, columnBased, firstColumnTitle, tableObject) {\r\n\t\tconst tableHead = document.createElement(\"thead\");\r\n\t\tconst tableHeadRow = document.createElement(\"tr\");\r\n\r\n\t\tif (columnBased) {\r\n\t\t\tconst thfirst = document.createElement(\"th\");\r\n\t\t\tthfirst.textContent = firstColumnTitle;\r\n\t\t\ttableHeadRow.appendChild(thfirst);\r\n\r\n\t\t\tfor (const columnTitle in data) {\r\n\t\t\t\tconst th = document.createElement(\"th\");\r\n\t\t\t\tth.textContent = columnTitle;\r\n\t\t\t\ttableHeadRow.appendChild(th);\r\n\t\t\t}\r\n\t\t} else {\r\n\t\t\tfor (const columnTitle in data[0]) {\r\n\t\t\t\tconst th = document.createElement(\"th\");\r\n\t\t\t\tth.textContent = columnTitle;\r\n\t\t\t\tth.setAttribute(\"data-sort-method\", columnTitle);\r\n\t\t\t\tth.addEventListener(\"click\", TableModifier.tableSort.bind(null, tableObject, th));\r\n\t\t\t\ttableHeadRow.appendChild(th);\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\ttableHead.appendChild(tableHeadRow);\r\n\r\n\t\treturn tableHead;\r\n\t}\r\n\r\n\tstatic tableBody(data, columnBased) {\r\n\t\tconst tableBody = document.createElement(\"tbody\");\r\n\r\n\t\tif (columnBased) {\r\n\t\t\tconst bodyRowNames = Object.keys(data[Object.keys(data)[0]]);\r\n\t\t\tconst bodyRowCount = bodyRowNames.length;\r\n\r\n\t\t\tfor (let i = 0; i < bodyRowCount; i++) {\r\n\t\t\t\tconst tr = document.createElement(\"tr\");\r\n\t\t\t\tconst tdname = document.createElement(\"td\");\r\n\t\t\t\ttdname.textContent = bodyRowNames[i];\r\n\t\t\t\ttr.appendChild(tdname);\r\n\r\n\t\t\t\tfor (const column in data) {\r\n\t\t\t\t\tconst td = document.createElement(\"td\");\r\n\t\t\t\t\ttd.textContent = Object.values(data[column])[i];\r\n\t\t\t\t\ttr.appendChild(td);\r\n\t\t\t\t}\r\n\r\n\t\t\t\ttableBody.appendChild(tr);\r\n\t\t\t}\r\n\t\t} else {\r\n\t\t\tfor (const row of data) {\r\n\t\t\t\tconst tr = document.createElement(\"tr\");\r\n\r\n\t\t\t\tfor (const key in row) {\r\n\t\t\t\t\tconst td = document.createElement(\"td\");\r\n\t\t\t\t\ttd.textContent = row[key];\r\n\t\t\t\t\ttr.appendChild(td);\r\n\t\t\t\t}\r\n\r\n\t\t\t\ttableBody.appendChild(tr);\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\treturn tableBody;\r\n\t}\r\n\r\n\tstatic tableFoot(dataSum) {\r\n\t\tconst tableFoot = document.createElement(\"tfoot\");\r\n\t\tconst tr = document.createElement(\"tr\");\r\n\r\n\t\tfor (const key in dataSum[0]) {\r\n\t\t\tconst td = document.createElement(\"td\");\r\n\t\t\ttd.textContent = dataSum[0][key];\r\n\t\t\ttr.appendChild(td);\r\n\t\t}\r\n\r\n\t\ttableFoot.appendChild(tr);\r\n\r\n\t\treturn tableFoot;\r\n\t}\r\n}\r\n\r\nclass Table {\r\n\tconstructor(table, url, renderPlaceId, columnBased, firstColumnTitle, tableSum) {\r\n\t\tthis.id = renderPlaceId;\r\n\t\tthis.getData(url).then(data => {\r\n\t\t\tthis.tableData = data.result[table];\r\n\t\t\tif (tableSum) {\r\n\t\t\t\tthis.tableDataSum = [data.result[tableSum]];\r\n\t\t\t}\r\n\t\t\tthis.createTable(this.tableData, columnBased, firstColumnTitle, this.tableDataSum);\r\n\t\t});\r\n\t}\r\n\tgetData(url) {\r\n\t\treturn new Promise((resolve, reject) => {\r\n\t\t\tconst xhr = new XMLHttpRequest();\r\n\r\n\t\t\txhr.open(\"GET\", url);\r\n\r\n\t\t\txhr.responseType = \"json\";\r\n\r\n\t\t\txhr.onload = function() {\r\n\t\t\t\tresolve(xhr.response);\r\n\t\t\t};\r\n\r\n\t\t\txhr.send();\r\n\t\t});\r\n\t}\r\n\tcreateTable(data, columnBased, firstColumnTitle, dataSum) {\r\n\t\tconst tableHead = TableCreator.tableHead(data, columnBased, firstColumnTitle, this);\r\n\t\tconst tableBody = TableCreator.tableBody(data, columnBased);\r\n\t\tconst table = document.createElement(\"table\");\r\n\t\ttable.classList.add(\"table\");\r\n\t\ttable.appendChild(tableHead);\r\n\t\ttable.appendChild(tableBody);\r\n\r\n\t\tif(dataSum) {\r\n\t\t\tconst tableFoot = TableCreator.tableFoot(dataSum);\r\n\t\t\ttable.appendChild(tableFoot);\r\n\t\t}\r\n\t\t\r\n\t\tdocument.getElementById(this.id).appendChild(table);\r\n\t}\r\n}\r\n\r\nclass App {\r\n\tstatic init() {\r\n\t\tconsole.time();\r\n\t\tthis.dashboard = new Table(\"activities\", \"assets/json/dashboard.json\", \"dashboard-table\", true, \"Activity\");\r\n\t\tconst gamesSummary = new Table(\r\n\t\t\t\"gameStatisticsPerGame\",\r\n\t\t\t\"assets/json/statistic-games-summary.json\",\r\n\t\t\t\"games-summary-table\",\r\n\t\t\tfalse,\r\n\t\t\tfalse,\r\n\t\t\t\"gameStatisticsSum\"\r\n\t\t);\r\n\t\tconsole.timeEnd();\r\n\t}\r\n}\r\n\r\nApp.init();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcz8xMTEyIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRhYmxlTW9kaWZpZXIge1xyXG5cdHN0YXRpYyB0YWJsZVNvcnQodGFibGVPYmplY3QsIHRoKSB7XHJcblx0XHRjb25zb2xlLnRpbWUoKTtcclxuXHRcdGNvbnN0IHNvcnRNZXRob2QgPSB0aC5kYXRhc2V0LnNvcnRNZXRob2Q7XHJcblx0XHRjb25zdCBzb3J0VHlwZSA9IHNvcnRNZXRob2QgPT09IFwiZ2FtZU5hbWVcIiB8fCBzb3J0TWV0aG9kID09PSBcImN1cnJlbmN5XCIgPyBcInRleHRcIiA6IFwibnVtYmVyXCI7XHJcblx0XHRsZXQgc29ydERpcmVjdGlvbjtcclxuXHRcdHRhYmxlT2JqZWN0LnNvcnRTdGF0ZSA9IHNvcnRNZXRob2Q7XHJcblx0XHR0YWJsZU9iamVjdC50YWJsZURhdGEuc29ydChUYWJsZU1vZGlmaWVyLmNvbXBhcmUoc29ydE1ldGhvZCwgc29ydFR5cGUpKTtcclxuXHRcdGNvbnN0IHVuc29ydGVkVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWJsZU9iamVjdC5pZCkucXVlcnlTZWxlY3RvcihcInRib2R5XCIpO1xyXG5cdFx0Y29uc3Qgc29ydGVkVGFibGUgPSBUYWJsZUNyZWF0b3IudGFibGVCb2R5KHRhYmxlT2JqZWN0LnRhYmxlRGF0YSk7XHJcblx0XHR1bnNvcnRlZFRhYmxlLnJlcGxhY2VXaXRoKHNvcnRlZFRhYmxlKTtcclxuXHRcdGNvbnNvbGUudGltZUVuZCgpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbXBhcmUoc29ydE1ldGhvZCwgc29ydFR5cGUpIHtcclxuXHRcdHJldHVybiBmdW5jdGlvbiBpbm5lclNvcnQoYSwgYikge1xyXG5cdFx0XHRjb25zdCB2YWx1ZUEgPVxyXG5cdFx0XHRcdHNvcnRUeXBlID09PSBcIm51bWJlclwiID8gcGFyc2VGbG9hdChhW3NvcnRNZXRob2RdLnRvU3RyaW5nKCkucmVwbGFjZSgvLC9nLCBcIlwiKSkgOiBhW3NvcnRNZXRob2RdLnRvVXBwZXJDYXNlKCk7XHJcblx0XHRcdGNvbnN0IHZhbHVlQiA9XHJcblx0XHRcdFx0c29ydFR5cGUgPT09IFwibnVtYmVyXCIgPyBwYXJzZUZsb2F0KGJbc29ydE1ldGhvZF0udG9TdHJpbmcoKS5yZXBsYWNlKC8sL2csIFwiXCIpKSA6IGJbc29ydE1ldGhvZF0udG9VcHBlckNhc2UoKTtcclxuXHJcblx0XHRcdGxldCBjb21wYXJpc29uID0gMDtcclxuXHRcdFx0aWYgKHZhbHVlQSA+IHZhbHVlQikge1xyXG5cdFx0XHRcdGNvbXBhcmlzb24gPSAxO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHZhbHVlQSA8IHZhbHVlQikge1xyXG5cdFx0XHRcdGNvbXBhcmlzb24gPSAtMTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gY29tcGFyaXNvbjtcclxuXHRcdH07XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBUYWJsZUNyZWF0b3Ige1xyXG5cdHN0YXRpYyB0YWJsZUhlYWQoZGF0YSwgY29sdW1uQmFzZWQsIGZpcnN0Q29sdW1uVGl0bGUsIHRhYmxlT2JqZWN0KSB7XHJcblx0XHRjb25zdCB0YWJsZUhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhlYWRcIik7XHJcblx0XHRjb25zdCB0YWJsZUhlYWRSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcblxyXG5cdFx0aWYgKGNvbHVtbkJhc2VkKSB7XHJcblx0XHRcdGNvbnN0IHRoZmlyc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XHJcblx0XHRcdHRoZmlyc3QudGV4dENvbnRlbnQgPSBmaXJzdENvbHVtblRpdGxlO1xyXG5cdFx0XHR0YWJsZUhlYWRSb3cuYXBwZW5kQ2hpbGQodGhmaXJzdCk7XHJcblxyXG5cdFx0XHRmb3IgKGNvbnN0IGNvbHVtblRpdGxlIGluIGRhdGEpIHtcclxuXHRcdFx0XHRjb25zdCB0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcclxuXHRcdFx0XHR0aC50ZXh0Q29udGVudCA9IGNvbHVtblRpdGxlO1xyXG5cdFx0XHRcdHRhYmxlSGVhZFJvdy5hcHBlbmRDaGlsZCh0aCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGZvciAoY29uc3QgY29sdW1uVGl0bGUgaW4gZGF0YVswXSkge1xyXG5cdFx0XHRcdGNvbnN0IHRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xyXG5cdFx0XHRcdHRoLnRleHRDb250ZW50ID0gY29sdW1uVGl0bGU7XHJcblx0XHRcdFx0dGguc2V0QXR0cmlidXRlKFwiZGF0YS1zb3J0LW1ldGhvZFwiLCBjb2x1bW5UaXRsZSk7XHJcblx0XHRcdFx0dGguYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIFRhYmxlTW9kaWZpZXIudGFibGVTb3J0LmJpbmQobnVsbCwgdGFibGVPYmplY3QsIHRoKSk7XHJcblx0XHRcdFx0dGFibGVIZWFkUm93LmFwcGVuZENoaWxkKHRoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRhYmxlSGVhZC5hcHBlbmRDaGlsZCh0YWJsZUhlYWRSb3cpO1xyXG5cclxuXHRcdHJldHVybiB0YWJsZUhlYWQ7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgdGFibGVCb2R5KGRhdGEsIGNvbHVtbkJhc2VkKSB7XHJcblx0XHRjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIik7XHJcblxyXG5cdFx0aWYgKGNvbHVtbkJhc2VkKSB7XHJcblx0XHRcdGNvbnN0IGJvZHlSb3dOYW1lcyA9IE9iamVjdC5rZXlzKGRhdGFbT2JqZWN0LmtleXMoZGF0YSlbMF1dKTtcclxuXHRcdFx0Y29uc3QgYm9keVJvd0NvdW50ID0gYm9keVJvd05hbWVzLmxlbmd0aDtcclxuXHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYm9keVJvd0NvdW50OyBpKyspIHtcclxuXHRcdFx0XHRjb25zdCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuXHRcdFx0XHRjb25zdCB0ZG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcblx0XHRcdFx0dGRuYW1lLnRleHRDb250ZW50ID0gYm9keVJvd05hbWVzW2ldO1xyXG5cdFx0XHRcdHRyLmFwcGVuZENoaWxkKHRkbmFtZSk7XHJcblxyXG5cdFx0XHRcdGZvciAoY29uc3QgY29sdW1uIGluIGRhdGEpIHtcclxuXHRcdFx0XHRcdGNvbnN0IHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG5cdFx0XHRcdFx0dGQudGV4dENvbnRlbnQgPSBPYmplY3QudmFsdWVzKGRhdGFbY29sdW1uXSlbaV07XHJcblx0XHRcdFx0XHR0ci5hcHBlbmRDaGlsZCh0ZCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0YWJsZUJvZHkuYXBwZW5kQ2hpbGQodHIpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRmb3IgKGNvbnN0IHJvdyBvZiBkYXRhKSB7XHJcblx0XHRcdFx0Y29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcblxyXG5cdFx0XHRcdGZvciAoY29uc3Qga2V5IGluIHJvdykge1xyXG5cdFx0XHRcdFx0Y29uc3QgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcblx0XHRcdFx0XHR0ZC50ZXh0Q29udGVudCA9IHJvd1trZXldO1xyXG5cdFx0XHRcdFx0dHIuYXBwZW5kQ2hpbGQodGQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGFibGVCb2R5LmFwcGVuZENoaWxkKHRyKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0YWJsZUJvZHk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgdGFibGVGb290KGRhdGFTdW0pIHtcclxuXHRcdGNvbnN0IHRhYmxlRm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0Zm9vdFwiKTtcclxuXHRcdGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG5cclxuXHRcdGZvciAoY29uc3Qga2V5IGluIGRhdGFTdW1bMF0pIHtcclxuXHRcdFx0Y29uc3QgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcblx0XHRcdHRkLnRleHRDb250ZW50ID0gZGF0YVN1bVswXVtrZXldO1xyXG5cdFx0XHR0ci5hcHBlbmRDaGlsZCh0ZCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGFibGVGb290LmFwcGVuZENoaWxkKHRyKTtcclxuXHJcblx0XHRyZXR1cm4gdGFibGVGb290O1xyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgVGFibGUge1xyXG5cdGNvbnN0cnVjdG9yKHRhYmxlLCB1cmwsIHJlbmRlclBsYWNlSWQsIGNvbHVtbkJhc2VkLCBmaXJzdENvbHVtblRpdGxlLCB0YWJsZVN1bSkge1xyXG5cdFx0dGhpcy5pZCA9IHJlbmRlclBsYWNlSWQ7XHJcblx0XHR0aGlzLmdldERhdGEodXJsKS50aGVuKGRhdGEgPT4ge1xyXG5cdFx0XHR0aGlzLnRhYmxlRGF0YSA9IGRhdGEucmVzdWx0W3RhYmxlXTtcclxuXHRcdFx0aWYgKHRhYmxlU3VtKSB7XHJcblx0XHRcdFx0dGhpcy50YWJsZURhdGFTdW0gPSBbZGF0YS5yZXN1bHRbdGFibGVTdW1dXTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmNyZWF0ZVRhYmxlKHRoaXMudGFibGVEYXRhLCBjb2x1bW5CYXNlZCwgZmlyc3RDb2x1bW5UaXRsZSwgdGhpcy50YWJsZURhdGFTdW0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cdGdldERhdGEodXJsKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcblx0XHRcdHhoci5vcGVuKFwiR0VUXCIsIHVybCk7XHJcblxyXG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gXCJqc29uXCI7XHJcblxyXG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLnNlbmQoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRjcmVhdGVUYWJsZShkYXRhLCBjb2x1bW5CYXNlZCwgZmlyc3RDb2x1bW5UaXRsZSwgZGF0YVN1bSkge1xyXG5cdFx0Y29uc3QgdGFibGVIZWFkID0gVGFibGVDcmVhdG9yLnRhYmxlSGVhZChkYXRhLCBjb2x1bW5CYXNlZCwgZmlyc3RDb2x1bW5UaXRsZSwgdGhpcyk7XHJcblx0XHRjb25zdCB0YWJsZUJvZHkgPSBUYWJsZUNyZWF0b3IudGFibGVCb2R5KGRhdGEsIGNvbHVtbkJhc2VkKTtcclxuXHRcdGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xyXG5cdFx0dGFibGUuY2xhc3NMaXN0LmFkZChcInRhYmxlXCIpO1xyXG5cdFx0dGFibGUuYXBwZW5kQ2hpbGQodGFibGVIZWFkKTtcclxuXHRcdHRhYmxlLmFwcGVuZENoaWxkKHRhYmxlQm9keSk7XHJcblxyXG5cdFx0aWYoZGF0YVN1bSkge1xyXG5cdFx0XHRjb25zdCB0YWJsZUZvb3QgPSBUYWJsZUNyZWF0b3IudGFibGVGb290KGRhdGFTdW0pO1xyXG5cdFx0XHR0YWJsZS5hcHBlbmRDaGlsZCh0YWJsZUZvb3QpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKS5hcHBlbmRDaGlsZCh0YWJsZSk7XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBBcHAge1xyXG5cdHN0YXRpYyBpbml0KCkge1xyXG5cdFx0Y29uc29sZS50aW1lKCk7XHJcblx0XHR0aGlzLmRhc2hib2FyZCA9IG5ldyBUYWJsZShcImFjdGl2aXRpZXNcIiwgXCJhc3NldHMvanNvbi9kYXNoYm9hcmQuanNvblwiLCBcImRhc2hib2FyZC10YWJsZVwiLCB0cnVlLCBcIkFjdGl2aXR5XCIpO1xyXG5cdFx0Y29uc3QgZ2FtZXNTdW1tYXJ5ID0gbmV3IFRhYmxlKFxyXG5cdFx0XHRcImdhbWVTdGF0aXN0aWNzUGVyR2FtZVwiLFxyXG5cdFx0XHRcImFzc2V0cy9qc29uL3N0YXRpc3RpYy1nYW1lcy1zdW1tYXJ5Lmpzb25cIixcclxuXHRcdFx0XCJnYW1lcy1zdW1tYXJ5LXRhYmxlXCIsXHJcblx0XHRcdGZhbHNlLFxyXG5cdFx0XHRmYWxzZSxcclxuXHRcdFx0XCJnYW1lU3RhdGlzdGljc1N1bVwiXHJcblx0XHQpO1xyXG5cdFx0Y29uc29sZS50aW1lRW5kKCk7XHJcblx0fVxyXG59XHJcblxyXG5BcHAuaW5pdCgpO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/app.js\n");

/***/ })

/******/ });