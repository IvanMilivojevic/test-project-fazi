export function getData(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "json";

    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function() {
      reject(xhr.response);
    };
    xhr.send();
  });
}

export function getTableDepth(tableLocation, data) {
  const props = tableLocation.split("/");
  const propsLength = props.length;

  if (propsLength === 1) {
    return data.result[props[0]];
  } else if (propsLength === 2) {
    return data.result[props[0]][props[1]];
  } else if (propsLength === 3) {
    return data.result[props[0]][props[1]][props[2]];
  } else if (propsLength === 4) {
    return data.result[props[0]][props[1]][props[2]][props[3]];
  }
}

export function nameFormater(name) {
  let formatedName;

  if (name === "ggr" || name === "vat" || name === "ngr") {
    formatedName = name.toUpperCase();
  } else {
    formatedName = name.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());
  }

  return formatedName;
}
