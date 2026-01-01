const STORAGE_KEY = "user_interactions";

function getData() {
  if (typeof window === "undefined") return { clicks: {}, readTimes: {} };
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { clicks: {}, readTimes: {} };
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function trackClick(id) {
  const data = getData();
  data.clicks[id] = (data.clicks[id] || 0) + 1;
  save(data);
}

export function trackReadTime(id, seconds) {
  const data = getData();
  data.readTimes[id] = (data.readTimes[id] || 0) + seconds;
  save(data);
}

export function getUserHistory() {
  return getData();
}
