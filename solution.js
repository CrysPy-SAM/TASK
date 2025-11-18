function solution(D) {
  const orderShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const result = {
    Mon: null,
    Tue: null,
    Wed: null,
    Thu: null,
    Fri: null,
    Sat: null,
    Sun: null
  };

  const inputDays = new Set();

  function getWeekday(dateStr) {
    const [y, m, d] = dateStr.split("-").map(Number);
    const dayIndex = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
    return orderShort[dayIndex];
  }

  // FIX ★★★★★
  for (const [date, value] of Object.entries(D)) {
    const weekday = getWeekday(date);

    if (result[weekday] === null) {
      result[weekday] = value;
    } else {
      result[weekday] += value;   // <--- VERY IMPORTANT FIX
    }

    inputDays.add(weekday);
  }

  // If all 7 days exist → return as is
  if (inputDays.size === 7) return result;

  const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let first = week.findIndex(day => result[day] !== null);
  let last  = week.length - 1 - week.slice().reverse().findIndex(day => result[day] !== null);

  const firstVal = result[week[first]];
  const lastVal = result[week[last]];
  const diff = (lastVal - firstVal) / (last - first);

  for (let i = first; i <= last; i++) {
    if (result[week[i]] === null) {
      result[week[i]] = Math.round(firstVal + diff * (i - first));
      
    }
  }

  return result;
  
}

module.exports = solution;
