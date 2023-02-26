export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

export function getLocalStorage(key) {
  let json = false;
  if (JSON.parse(localStorage.getItem(key))) {
    json = JSON.parse(localStorage.getItem(key));
  }
  return json;
}
