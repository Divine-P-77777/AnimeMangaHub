export function trackClick(blogId) {
  console.log("CLICK:", blogId);

  // later:
  // fetch(`/blog/${blogId}/click`, { method: "POST" });
}

export function trackReadTime(blogId, seconds) {
  console.log("READ TIME:", blogId, seconds);

  // later:
  // fetch(`/blog/${blogId}/read-time`, {
  //   method: "POST",
  //   body: JSON.stringify({ seconds }),
  // });
}
