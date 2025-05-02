export function getCurrentTimeFormat() {
  const now = new Date();
  let result = `${now.getFullYear()}.${
    (now.getMonth() + 1) / 10 >= 1 ? now.getMonth() : "0" + (now.getMonth() + 1)
  }.${now.getDate() / 10 >= 1 ? now.getDate() : "0" + now.getDate()} ${
    now.getHours() / 10 >= 1 ? now.getHours() : "0" + now.getHours()
  }:${now.getMinutes() / 10 >= 1 ? now.getMinutes() : "0" + now.getMinutes()}:${
    now.getSeconds() / 10 >= 1 ? now.getSeconds() : "0" + now.getSeconds()
  }`;
  return result;
}
