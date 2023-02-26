export default (string) => {
  const dateAndTime = string.split("T");
  let date = dateAndTime[0].split("-");
  date = [date[2], date[1], date[0]].join(".");
  const time = dateAndTime[1].substring(0, 5);
  return [date, time];
};
