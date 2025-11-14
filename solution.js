function solution(D) {
  const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const result = {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0
  };

  for (const [date, value] of Object.entries(D)) {
    const weekday = new Date(date).toLocaleDateString("en-US", { weekday: "short" });
    result[weekday] += value;
  }

  for (let i = 0; i < order.length; i++) {
    const day = order[i];

    if (result[day] === 0) {
      let prev = null;
      for (let p = i - 1; p >= 0; p--) {
        if (result[order[p]] !== 0) {
          prev = result[order[p]];
          break;
        }
      }

      let next = null;
      for (let n = i + 1; n < order.length; n++) {
        if (result[order[n]] !== 0) {
          next = result[order[n]];
          break;
        }
      }

      if (prev !== null && next !== null) {
        result[day] = Math.round((prev + next) / 2);
      }
    }
  }

  return result;
}

module.exports = solution;
