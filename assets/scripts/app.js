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

eval("class TableCreator {\r\n\tstatic tableHead(data, columnBased, firstColumnTitle) {\r\n\t\tconst tableHead = document.createElement(\"thead\");\r\n\t\tconst tableHeadRow = document.createElement(\"tr\");\r\n\r\n\t\tif (columnBased) {\r\n\t\t\tconst th = document.createElement(\"th\");\r\n\t\t\tth.textContent = firstColumnTitle;\r\n\t\t\ttableHeadRow.appendChild(th);\r\n\t\t}\r\n\t\tfor (const columnTitle in data) {\r\n\t\t\tconst th = document.createElement(\"th\");\r\n\t\t\tth.textContent = columnTitle;\r\n\t\t\ttableHeadRow.appendChild(th);\r\n\t\t}\r\n\t\ttableHead.appendChild(tableHeadRow);\r\n\r\n\t\treturn tableHead;\r\n\t}\r\n\t\r\n\tstatic tableBody(data, columnBased) {\r\n\t\tconst tableBody = document.createElement(\"tbody\");\r\n\t\tconst bodyRowNames = Object.keys(data[Object.keys(data)[0]]);\r\n\t\tconst bodyRowCount = bodyRowNames.length;\r\n\r\n\t\tfor (let i = 0; i < bodyRowCount; i++) {\r\n\t\t\tconst tr = document.createElement(\"tr\");\r\n\t\t\tconst tdname = document.createElement(\"td\");\r\n\t\t\ttdname.textContent = bodyRowNames[i];\r\n\t\t\ttr.appendChild(tdname);\r\n\r\n\t\t\tfor (const column in data) {\r\n\t\t\t\tconst td = document.createElement(\"td\");\r\n\t\t\t\ttd.textContent = Object.values(data[column])[i];\r\n\t\t\t\ttr.appendChild(td);\r\n\t\t\t}\r\n\r\n\t\t\ttableBody.appendChild(tr);\r\n\t\t}\r\n\t\t\r\n\t\treturn tableBody;\r\n\t}\r\n}\r\n\r\nclass Table {\r\n\tconstructor(table, url, renderPlaceId, columnBased, firstColumnTitle) {\r\n\t\tthis.id = renderPlaceId;\r\n\t\tthis.getData(url).then(data => {\r\n\t\t\tthis.tableData = data.result[table];\r\n\t\t\tthis.createTable(this.tableData, columnBased, firstColumnTitle);\r\n\t\t});\r\n\t}\r\n\tgetData(url) {\r\n\t\treturn new Promise((resolve, reject) => {\r\n\t\t\tconst xhr = new XMLHttpRequest();\r\n\r\n\t\t\txhr.open(\"GET\", url);\r\n\r\n\t\t\txhr.responseType = \"json\";\r\n\r\n\t\t\txhr.onload = function() {\r\n\t\t\t\tresolve(xhr.response);\r\n\t\t\t};\r\n\r\n\t\t\txhr.send();\r\n\t\t});\r\n\t}\r\n\tcreateTable(data, columnBased, firstColumnTitle) {\r\n\t\tconst tableHead = TableCreator.tableHead(data, columnBased, firstColumnTitle);\r\n\t\tconst tableBody = TableCreator.tableBody(data, columnBased);\r\n\r\n\t\tdocument.getElementById(this.id).appendChild(tableHead);\r\n\t\tdocument.getElementById(this.id).appendChild(tableBody);\r\n\t}\r\n}\r\n\r\nclass App {\r\n\tstatic init() {\r\n\t\tthis.dashboard = new Table(\"activities\", \"assets/json/dashboard.json\", \"dashboard-table\", true, \"Activity\");\r\n\t}\r\n}\r\n\r\nApp.init();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcz8xMTEyIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRhYmxlQ3JlYXRvciB7XHJcblx0c3RhdGljIHRhYmxlSGVhZChkYXRhLCBjb2x1bW5CYXNlZCwgZmlyc3RDb2x1bW5UaXRsZSkge1xyXG5cdFx0Y29uc3QgdGFibGVIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoZWFkXCIpO1xyXG5cdFx0Y29uc3QgdGFibGVIZWFkUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG5cclxuXHRcdGlmIChjb2x1bW5CYXNlZCkge1xyXG5cdFx0XHRjb25zdCB0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcclxuXHRcdFx0dGgudGV4dENvbnRlbnQgPSBmaXJzdENvbHVtblRpdGxlO1xyXG5cdFx0XHR0YWJsZUhlYWRSb3cuYXBwZW5kQ2hpbGQodGgpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yIChjb25zdCBjb2x1bW5UaXRsZSBpbiBkYXRhKSB7XHJcblx0XHRcdGNvbnN0IHRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xyXG5cdFx0XHR0aC50ZXh0Q29udGVudCA9IGNvbHVtblRpdGxlO1xyXG5cdFx0XHR0YWJsZUhlYWRSb3cuYXBwZW5kQ2hpbGQodGgpO1xyXG5cdFx0fVxyXG5cdFx0dGFibGVIZWFkLmFwcGVuZENoaWxkKHRhYmxlSGVhZFJvdyk7XHJcblxyXG5cdFx0cmV0dXJuIHRhYmxlSGVhZDtcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIHRhYmxlQm9keShkYXRhLCBjb2x1bW5CYXNlZCkge1xyXG5cdFx0Y29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpO1xyXG5cdFx0Y29uc3QgYm9keVJvd05hbWVzID0gT2JqZWN0LmtleXMoZGF0YVtPYmplY3Qua2V5cyhkYXRhKVswXV0pO1xyXG5cdFx0Y29uc3QgYm9keVJvd0NvdW50ID0gYm9keVJvd05hbWVzLmxlbmd0aDtcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGJvZHlSb3dDb3VudDsgaSsrKSB7XHJcblx0XHRcdGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG5cdFx0XHRjb25zdCB0ZG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcblx0XHRcdHRkbmFtZS50ZXh0Q29udGVudCA9IGJvZHlSb3dOYW1lc1tpXTtcclxuXHRcdFx0dHIuYXBwZW5kQ2hpbGQodGRuYW1lKTtcclxuXHJcblx0XHRcdGZvciAoY29uc3QgY29sdW1uIGluIGRhdGEpIHtcclxuXHRcdFx0XHRjb25zdCB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuXHRcdFx0XHR0ZC50ZXh0Q29udGVudCA9IE9iamVjdC52YWx1ZXMoZGF0YVtjb2x1bW5dKVtpXTtcclxuXHRcdFx0XHR0ci5hcHBlbmRDaGlsZCh0ZCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRhYmxlQm9keS5hcHBlbmRDaGlsZCh0cik7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiB0YWJsZUJvZHk7XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBUYWJsZSB7XHJcblx0Y29uc3RydWN0b3IodGFibGUsIHVybCwgcmVuZGVyUGxhY2VJZCwgY29sdW1uQmFzZWQsIGZpcnN0Q29sdW1uVGl0bGUpIHtcclxuXHRcdHRoaXMuaWQgPSByZW5kZXJQbGFjZUlkO1xyXG5cdFx0dGhpcy5nZXREYXRhKHVybCkudGhlbihkYXRhID0+IHtcclxuXHRcdFx0dGhpcy50YWJsZURhdGEgPSBkYXRhLnJlc3VsdFt0YWJsZV07XHJcblx0XHRcdHRoaXMuY3JlYXRlVGFibGUodGhpcy50YWJsZURhdGEsIGNvbHVtbkJhc2VkLCBmaXJzdENvbHVtblRpdGxlKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRnZXREYXRhKHVybCkge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG5cdFx0XHR4aHIub3BlbihcIkdFVFwiLCB1cmwpO1xyXG5cclxuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IFwianNvblwiO1xyXG5cclxuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHhoci5zZW5kKCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0Y3JlYXRlVGFibGUoZGF0YSwgY29sdW1uQmFzZWQsIGZpcnN0Q29sdW1uVGl0bGUpIHtcclxuXHRcdGNvbnN0IHRhYmxlSGVhZCA9IFRhYmxlQ3JlYXRvci50YWJsZUhlYWQoZGF0YSwgY29sdW1uQmFzZWQsIGZpcnN0Q29sdW1uVGl0bGUpO1xyXG5cdFx0Y29uc3QgdGFibGVCb2R5ID0gVGFibGVDcmVhdG9yLnRhYmxlQm9keShkYXRhLCBjb2x1bW5CYXNlZCk7XHJcblxyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZCkuYXBwZW5kQ2hpbGQodGFibGVIZWFkKTtcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpLmFwcGVuZENoaWxkKHRhYmxlQm9keSk7XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBBcHAge1xyXG5cdHN0YXRpYyBpbml0KCkge1xyXG5cdFx0dGhpcy5kYXNoYm9hcmQgPSBuZXcgVGFibGUoXCJhY3Rpdml0aWVzXCIsIFwiYXNzZXRzL2pzb24vZGFzaGJvYXJkLmpzb25cIiwgXCJkYXNoYm9hcmQtdGFibGVcIiwgdHJ1ZSwgXCJBY3Rpdml0eVwiKTtcclxuXHR9XHJcbn1cclxuXHJcbkFwcC5pbml0KCk7XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/app.js\n");

/***/ })

/******/ });