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

eval("class Table {\r\n\tconstructor(table, url, renderPlaceId, columnBased, firstColumnTitle) {\r\n\t\tthis.id = renderPlaceId;\r\n\t\tthis.getData(url).then(data => {\r\n\t\t\tthis.tableData = data.result[table];\r\n\t\t\tthis.createTable(this.tableData, columnBased, firstColumnTitle);\r\n\t\t});\r\n\t}\r\n\tgetData(url) {\r\n\t\treturn new Promise((resolve, reject) => {\r\n\t\t\tconst xhr = new XMLHttpRequest();\r\n\r\n\t\t\txhr.open(\"GET\", url);\r\n\r\n\t\t\txhr.responseType = \"json\";\r\n\r\n\t\t\txhr.onload = function() {\r\n\t\t\t\tresolve(xhr.response);\r\n\t\t\t};\r\n\r\n\t\t\txhr.send();\r\n\t\t});\r\n\t}\r\n\tcreateTable(data, columnBased, firstColumnTitle) {\r\n\t\tconst tableHead = document.createElement(\"thead\");\r\n\r\n\t\tconst tableHeadRow = document.createElement(\"tr\");\r\n\t\tif (columnBased) {\r\n      const th = document.createElement(\"th\");\r\n      th.textContent = firstColumnTitle;\r\n      tableHeadRow.appendChild(th);\r\n    }\r\n    for (const columnTitle in data) {\r\n      const th = document.createElement(\"th\");\r\n      th.textContent = columnTitle;\r\n      tableHeadRow.appendChild(th);\r\n    }\r\n    tableHead.appendChild(tableHeadRow);\r\n    document.getElementById(this.id).appendChild(tableHead);\r\n\t}\r\n}\r\n\r\nclass App {\r\n\tstatic init() {\r\n\t\tthis.dashboard = new Table(\"activities\", \"assets/json/dashboard.json\", \"dashboard-table\", true, \"Activity\");\r\n\t}\r\n}\r\n\r\nApp.init();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcz8xMTEyIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRhYmxlIHtcclxuXHRjb25zdHJ1Y3Rvcih0YWJsZSwgdXJsLCByZW5kZXJQbGFjZUlkLCBjb2x1bW5CYXNlZCwgZmlyc3RDb2x1bW5UaXRsZSkge1xyXG5cdFx0dGhpcy5pZCA9IHJlbmRlclBsYWNlSWQ7XHJcblx0XHR0aGlzLmdldERhdGEodXJsKS50aGVuKGRhdGEgPT4ge1xyXG5cdFx0XHR0aGlzLnRhYmxlRGF0YSA9IGRhdGEucmVzdWx0W3RhYmxlXTtcclxuXHRcdFx0dGhpcy5jcmVhdGVUYWJsZSh0aGlzLnRhYmxlRGF0YSwgY29sdW1uQmFzZWQsIGZpcnN0Q29sdW1uVGl0bGUpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cdGdldERhdGEodXJsKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcblx0XHRcdHhoci5vcGVuKFwiR0VUXCIsIHVybCk7XHJcblxyXG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gXCJqc29uXCI7XHJcblxyXG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLnNlbmQoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRjcmVhdGVUYWJsZShkYXRhLCBjb2x1bW5CYXNlZCwgZmlyc3RDb2x1bW5UaXRsZSkge1xyXG5cdFx0Y29uc3QgdGFibGVIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoZWFkXCIpO1xyXG5cclxuXHRcdGNvbnN0IHRhYmxlSGVhZFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuXHRcdGlmIChjb2x1bW5CYXNlZCkge1xyXG4gICAgICBjb25zdCB0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcclxuICAgICAgdGgudGV4dENvbnRlbnQgPSBmaXJzdENvbHVtblRpdGxlO1xyXG4gICAgICB0YWJsZUhlYWRSb3cuYXBwZW5kQ2hpbGQodGgpO1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBjb2x1bW5UaXRsZSBpbiBkYXRhKSB7XHJcbiAgICAgIGNvbnN0IHRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xyXG4gICAgICB0aC50ZXh0Q29udGVudCA9IGNvbHVtblRpdGxlO1xyXG4gICAgICB0YWJsZUhlYWRSb3cuYXBwZW5kQ2hpbGQodGgpO1xyXG4gICAgfVxyXG4gICAgdGFibGVIZWFkLmFwcGVuZENoaWxkKHRhYmxlSGVhZFJvdyk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKS5hcHBlbmRDaGlsZCh0YWJsZUhlYWQpO1xyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgQXBwIHtcclxuXHRzdGF0aWMgaW5pdCgpIHtcclxuXHRcdHRoaXMuZGFzaGJvYXJkID0gbmV3IFRhYmxlKFwiYWN0aXZpdGllc1wiLCBcImFzc2V0cy9qc29uL2Rhc2hib2FyZC5qc29uXCIsIFwiZGFzaGJvYXJkLXRhYmxlXCIsIHRydWUsIFwiQWN0aXZpdHlcIik7XHJcblx0fVxyXG59XHJcblxyXG5BcHAuaW5pdCgpO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/app.js\n");

/***/ })

/******/ });