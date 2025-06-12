const resizer = document.getElementById("resizer");
const leftPanel = document.getElementById("editor-container");
const container = document.getElementById("main");
const iframeOverlay = document.getElementById("iframe-overlay");

let isDragging = false;
let startX = 0;
let startWidth = 0;

resizer.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  startWidth = leftPanel.getBoundingClientRect().width;
  
  document.body.style.cursor = "col-resize";
  document.body.style.userSelect = "none";
  iframeOverlay.style.display = "block";
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const containerRect = container.getBoundingClientRect();

  // Calculate how far the mouse has moved since the start of dragging
  const deltaX = e.clientX - startX;
  let newWidth = startWidth + deltaX;

  // Clamp width to min and max
  const minWidth = 150;
  const maxWidth = containerRect.width - 150;
  newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));

  leftPanel.style.width = `${newWidth}px`;
  leftPanel.style.flex = "none";  // Disable flex-grow to respect width
});

window.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;

  document.body.style.cursor = "";
  document.body.style.userSelect = "";
  iframeOverlay.style.display = "none";
});