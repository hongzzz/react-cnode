// time
const SEC = 1000;
const MIN = SEC * 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;
const MONTH = DAY * 30;
const YEAR = 365 * DAY;

function addZero(value, length) {
  return (Array(length).join('0') + value).slice(-length);
}

export function dateDiff(timeStr) {
  const oldDate = new Date(timeStr);
  const newDate = new Date();
  const diff = newDate - oldDate; // 时间差

  const year = diff / YEAR;
  const month = diff / MONTH;
  const day = diff / DAY;
  const hour = diff / HOUR;
  const min = diff / MIN;
  const sec = diff / SEC;

  if (year >= 1) {
    return `${parseInt(year)}年前`;
  } else if (month >= 1) {
    return `${parseInt(month)}月前`;
  } else if (day >= 1) {
    return `${parseInt(day)}天前`;
  } else if (hour >= 1) {
    return `${parseInt(hour)}小时前`;
  } else if (min >= 1) {
    return `${parseInt(min)}分钟前`;
  } else if (sec >= 1) {
    return `${parseInt(sec)}秒前`;
  } else {
    return '刚刚';
  }
}
