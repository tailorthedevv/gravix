const resizer = document.getElementById("resizer");
const leftPanel = document.getElementById("editor-container");
let isDragging = false;
let startX = 0;
let startWidth = 0;

resizer.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  startWidth = leftPanel.offsetWidth;
  document.body.style.cursor = "col-resize";
  e.preventDefault();
});

resizer.addEventListener("mouseleave", () => {
  // stop if mouse leaves the bar
  if (isDragging) {
    isDragging = false;
    document.body.style.cursor = "default";
  }
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    document.body.style.cursor = "default";
  }
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  // ONLY allow resizing if mouse is still over the resizer
  const target = document.elementFromPoint(e.clientX, e.clientY);
  if (target !== resizer) {
    isDragging = false;
    document.body.style.cursor = "default";
    return;
  }

  const delta = e.clientX - startX;
  const newWidth = Math.max(150, startWidth + delta);
  leftPanel.style.width = `${newWidth}px`;
  leftPanel.style.flex = "none";
});
