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

eval("class TableCreator {\r\n\tstatic tableUpdate() {\r\n\t\tconsole.log(this, event.target);\r\n\t}\r\n\tstatic tableHead(data, columnBased, firstColumnTitle, tableObject) {\r\n\t\tconst tableHead = document.createElement(\"thead\");\r\n\t\tconst tableHeadRow = document.createElement(\"tr\");\r\n\r\n\t\tif (columnBased) {\r\n\t\t\tconst thfirst = document.createElement(\"th\");\r\n\t\t\tthfirst.textContent = firstColumnTitle;\r\n\t\t\ttableHeadRow.appendChild(thfirst);\r\n\r\n\t\t\tfor (const columnTitle in data) {\r\n\t\t\t\tconst th = document.createElement(\"th\");\r\n\t\t\t\tth.textContent = columnTitle;\r\n\t\t\t\ttableHeadRow.appendChild(th);\r\n\t\t\t}\r\n\t\t} else {\r\n\t\t\tfor (const columnTitle in data[0]) {\r\n\t\t\t\tconst th = document.createElement(\"th\");\r\n\t\t\t\tth.textContent = columnTitle;\r\n\t\t\t\tth.classList.add(columnTitle);\r\n\t\t\t\tth.addEventListener(\"click\", TableCreator.tableUpdate.bind(tableObject));\r\n\t\t\t\ttableHeadRow.appendChild(th);\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\ttableHead.appendChild(tableHeadRow);\r\n\r\n\t\treturn tableHead;\r\n\t}\r\n\r\n\tstatic tableBody(data, columnBased) {\r\n\t\tconst tableBody = document.createElement(\"tbody\");\r\n\r\n\t\tif (columnBased) {\r\n\t\t\tconst bodyRowNames = Object.keys(data[Object.keys(data)[0]]);\r\n\t\t\tconst bodyRowCount = bodyRowNames.length;\r\n\r\n\t\t\tfor (let i = 0; i < bodyRowCount; i++) {\r\n\t\t\t\tconst tr = document.createElement(\"tr\");\r\n\t\t\t\tconst tdname = document.createElement(\"td\");\r\n\t\t\t\ttdname.textContent = bodyRowNames[i];\r\n\t\t\t\ttr.appendChild(tdname);\r\n\r\n\t\t\t\tfor (const column in data) {\r\n\t\t\t\t\tconst td = document.createElement(\"td\");\r\n\t\t\t\t\ttd.textContent = Object.values(data[column])[i];\r\n\t\t\t\t\ttr.appendChild(td);\r\n\t\t\t\t}\r\n\r\n\t\t\t\ttableBody.appendChild(tr);\r\n\t\t\t}\r\n\t\t} else {\r\n\t\t\tfor (const row of data) {\r\n\t\t\t\tconst tr = document.createElement(\"tr\");\r\n\r\n\t\t\t\tfor (const key in row) {\r\n\t\t\t\t\tconst td = document.createElement(\"td\");\r\n\t\t\t\t\ttd.textContent = row[key];\r\n\t\t\t\t\ttr.appendChild(td);\r\n\t\t\t\t}\r\n\r\n\t\t\t\ttableBody.appendChild(tr);\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\treturn tableBody;\r\n\t}\r\n}\r\n\r\nclass Table {\r\n\tconstructor(table, url, renderPlaceId, columnBased, firstColumnTitle) {\r\n\t\tthis.id = renderPlaceId;\r\n\t\tthis.getData(url).then(data => {\r\n\t\t\tthis.tableData = data.result[table];\r\n\t\t\tthis.createTable(this.tableData, columnBased, firstColumnTitle);\r\n\t\t});\r\n\t}\r\n\tgetData(url) {\r\n\t\treturn new Promise((resolve, reject) => {\r\n\t\t\tconst xhr = new XMLHttpRequest();\r\n\r\n\t\t\txhr.open(\"GET\", url);\r\n\r\n\t\t\txhr.responseType = \"json\";\r\n\r\n\t\t\txhr.onload = function() {\r\n\t\t\t\tresolve(xhr.response);\r\n\t\t\t};\r\n\r\n\t\t\txhr.send();\r\n\t\t});\r\n\t}\r\n\tcreateTable(data, columnBased, firstColumnTitle) {\r\n\t\tconst tableHead = TableCreator.tableHead(data, columnBased, firstColumnTitle, this);\r\n\t\tconst tableBody = TableCreator.tableBody(data, columnBased);\r\n\r\n\t\tconst table = document.createElement(\"table\");\r\n\t\ttable.classList.add(\"table\");\r\n\t\ttable.appendChild(tableHead);\r\n\t\ttable.appendChild(tableBody);\r\n\t\tdocument.getElementById(this.id).appendChild(table);\r\n\t}\r\n}\r\n\r\nclass App {\r\n\tstatic init() {\r\n\t\tthis.dashboard = new Table(\"activities\", \"assets/json/dashboard.json\", \"dashboard-table\", true, \"Activity\");\r\n\t\tthis.gamesSummary = new Table(\r\n\t\t\t\"gameStatisticsPerGame\",\r\n\t\t\t\"assets/json/statistic-games-summary.json\",\r\n\t\t\t\"games-summary-table\",\r\n\t\t\tfalse,\r\n\t\t\tfalse\r\n\t\t);\r\n\t}\r\n}\r\n\r\nApp.init();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcz8xMTEyIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRhYmxlQ3JlYXRvciB7XHJcblx0c3RhdGljIHRhYmxlVXBkYXRlKCkge1xyXG5cdFx0Y29uc29sZS5sb2codGhpcywgZXZlbnQudGFyZ2V0KTtcclxuXHR9XHJcblx0c3RhdGljIHRhYmxlSGVhZChkYXRhLCBjb2x1bW5CYXNlZCwgZmlyc3RDb2x1bW5UaXRsZSwgdGFibGVPYmplY3QpIHtcclxuXHRcdGNvbnN0IHRhYmxlSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aGVhZFwiKTtcclxuXHRcdGNvbnN0IHRhYmxlSGVhZFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuXHJcblx0XHRpZiAoY29sdW1uQmFzZWQpIHtcclxuXHRcdFx0Y29uc3QgdGhmaXJzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcclxuXHRcdFx0dGhmaXJzdC50ZXh0Q29udGVudCA9IGZpcnN0Q29sdW1uVGl0bGU7XHJcblx0XHRcdHRhYmxlSGVhZFJvdy5hcHBlbmRDaGlsZCh0aGZpcnN0KTtcclxuXHJcblx0XHRcdGZvciAoY29uc3QgY29sdW1uVGl0bGUgaW4gZGF0YSkge1xyXG5cdFx0XHRcdGNvbnN0IHRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xyXG5cdFx0XHRcdHRoLnRleHRDb250ZW50ID0gY29sdW1uVGl0bGU7XHJcblx0XHRcdFx0dGFibGVIZWFkUm93LmFwcGVuZENoaWxkKHRoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Zm9yIChjb25zdCBjb2x1bW5UaXRsZSBpbiBkYXRhWzBdKSB7XHJcblx0XHRcdFx0Y29uc3QgdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XHJcblx0XHRcdFx0dGgudGV4dENvbnRlbnQgPSBjb2x1bW5UaXRsZTtcclxuXHRcdFx0XHR0aC5jbGFzc0xpc3QuYWRkKGNvbHVtblRpdGxlKTtcclxuXHRcdFx0XHR0aC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgVGFibGVDcmVhdG9yLnRhYmxlVXBkYXRlLmJpbmQodGFibGVPYmplY3QpKTtcclxuXHRcdFx0XHR0YWJsZUhlYWRSb3cuYXBwZW5kQ2hpbGQodGgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGFibGVIZWFkLmFwcGVuZENoaWxkKHRhYmxlSGVhZFJvdyk7XHJcblxyXG5cdFx0cmV0dXJuIHRhYmxlSGVhZDtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyB0YWJsZUJvZHkoZGF0YSwgY29sdW1uQmFzZWQpIHtcclxuXHRcdGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiKTtcclxuXHJcblx0XHRpZiAoY29sdW1uQmFzZWQpIHtcclxuXHRcdFx0Y29uc3QgYm9keVJvd05hbWVzID0gT2JqZWN0LmtleXMoZGF0YVtPYmplY3Qua2V5cyhkYXRhKVswXV0pO1xyXG5cdFx0XHRjb25zdCBib2R5Um93Q291bnQgPSBib2R5Um93TmFtZXMubGVuZ3RoO1xyXG5cclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBib2R5Um93Q291bnQ7IGkrKykge1xyXG5cdFx0XHRcdGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG5cdFx0XHRcdGNvbnN0IHRkbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuXHRcdFx0XHR0ZG5hbWUudGV4dENvbnRlbnQgPSBib2R5Um93TmFtZXNbaV07XHJcblx0XHRcdFx0dHIuYXBwZW5kQ2hpbGQodGRuYW1lKTtcclxuXHJcblx0XHRcdFx0Zm9yIChjb25zdCBjb2x1bW4gaW4gZGF0YSkge1xyXG5cdFx0XHRcdFx0Y29uc3QgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcblx0XHRcdFx0XHR0ZC50ZXh0Q29udGVudCA9IE9iamVjdC52YWx1ZXMoZGF0YVtjb2x1bW5dKVtpXTtcclxuXHRcdFx0XHRcdHRyLmFwcGVuZENoaWxkKHRkKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRhYmxlQm9keS5hcHBlbmRDaGlsZCh0cik7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGZvciAoY29uc3Qgcm93IG9mIGRhdGEpIHtcclxuXHRcdFx0XHRjb25zdCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuXHJcblx0XHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gcm93KSB7XHJcblx0XHRcdFx0XHRjb25zdCB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuXHRcdFx0XHRcdHRkLnRleHRDb250ZW50ID0gcm93W2tleV07XHJcblx0XHRcdFx0XHR0ci5hcHBlbmRDaGlsZCh0ZCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0YWJsZUJvZHkuYXBwZW5kQ2hpbGQodHIpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRhYmxlQm9keTtcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFRhYmxlIHtcclxuXHRjb25zdHJ1Y3Rvcih0YWJsZSwgdXJsLCByZW5kZXJQbGFjZUlkLCBjb2x1bW5CYXNlZCwgZmlyc3RDb2x1bW5UaXRsZSkge1xyXG5cdFx0dGhpcy5pZCA9IHJlbmRlclBsYWNlSWQ7XHJcblx0XHR0aGlzLmdldERhdGEodXJsKS50aGVuKGRhdGEgPT4ge1xyXG5cdFx0XHR0aGlzLnRhYmxlRGF0YSA9IGRhdGEucmVzdWx0W3RhYmxlXTtcclxuXHRcdFx0dGhpcy5jcmVhdGVUYWJsZSh0aGlzLnRhYmxlRGF0YSwgY29sdW1uQmFzZWQsIGZpcnN0Q29sdW1uVGl0bGUpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cdGdldERhdGEodXJsKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcblx0XHRcdHhoci5vcGVuKFwiR0VUXCIsIHVybCk7XHJcblxyXG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gXCJqc29uXCI7XHJcblxyXG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0eGhyLnNlbmQoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRjcmVhdGVUYWJsZShkYXRhLCBjb2x1bW5CYXNlZCwgZmlyc3RDb2x1bW5UaXRsZSkge1xyXG5cdFx0Y29uc3QgdGFibGVIZWFkID0gVGFibGVDcmVhdG9yLnRhYmxlSGVhZChkYXRhLCBjb2x1bW5CYXNlZCwgZmlyc3RDb2x1bW5UaXRsZSwgdGhpcyk7XHJcblx0XHRjb25zdCB0YWJsZUJvZHkgPSBUYWJsZUNyZWF0b3IudGFibGVCb2R5KGRhdGEsIGNvbHVtbkJhc2VkKTtcclxuXHJcblx0XHRjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcclxuXHRcdHRhYmxlLmNsYXNzTGlzdC5hZGQoXCJ0YWJsZVwiKTtcclxuXHRcdHRhYmxlLmFwcGVuZENoaWxkKHRhYmxlSGVhZCk7XHJcblx0XHR0YWJsZS5hcHBlbmRDaGlsZCh0YWJsZUJvZHkpO1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZCkuYXBwZW5kQ2hpbGQodGFibGUpO1xyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgQXBwIHtcclxuXHRzdGF0aWMgaW5pdCgpIHtcclxuXHRcdHRoaXMuZGFzaGJvYXJkID0gbmV3IFRhYmxlKFwiYWN0aXZpdGllc1wiLCBcImFzc2V0cy9qc29uL2Rhc2hib2FyZC5qc29uXCIsIFwiZGFzaGJvYXJkLXRhYmxlXCIsIHRydWUsIFwiQWN0aXZpdHlcIik7XHJcblx0XHR0aGlzLmdhbWVzU3VtbWFyeSA9IG5ldyBUYWJsZShcclxuXHRcdFx0XCJnYW1lU3RhdGlzdGljc1BlckdhbWVcIixcclxuXHRcdFx0XCJhc3NldHMvanNvbi9zdGF0aXN0aWMtZ2FtZXMtc3VtbWFyeS5qc29uXCIsXHJcblx0XHRcdFwiZ2FtZXMtc3VtbWFyeS10YWJsZVwiLFxyXG5cdFx0XHRmYWxzZSxcclxuXHRcdFx0ZmFsc2VcclxuXHRcdCk7XHJcblx0fVxyXG59XHJcblxyXG5BcHAuaW5pdCgpO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/app.js\n");

/***/ })

/******/ });