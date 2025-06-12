document.addEventListener("DOMContentLoaded", async () => {
  const e = CodeMirror.fromTextArea(document.getElementById("editor"), {
    mode: "htmlmixed", theme: "glitch-light", lineNumbers: true, lineWrapping: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-lint-markers"],
    lint: true, matchBrackets: true,
    highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
  });

  let f = "index.html";
  const d = {};

  const renderFileButtons = () => {
    const fileSection = document.getElementById("file-buttons");
    fileSection.innerHTML = "";

    Object.keys(d).forEach(name => {
      const btn = document.createElement("button");
      btn.className = "btn";
      btn.textContent = name;
      btn.onclick = () => s(name);
      fileSection.appendChild(btn);
    });
  };

  async function fetchFile(name) {
    try {
      const res = await fetch(`/files/${name}`);
      if (!res.ok) throw new Error(`Failed to load ${name}`);
      d[name] = await res.text();
    } catch {
      d[name] = "";
    }
  }

  await Promise.all(["index.html", "style.css", "script.js"].map(fetchFile));
  renderFileButtons();

  const m = n => n.endsWith(".css") ? "css" : n.endsWith(".js") ? "javascript" : "htmlmixed";
  const u = (md, ct) => { e.setOption("mode", md); e.setOption("lint", md !== "htmlmixed"); e.setValue(ct); };
  const v = document.getElementById("filename-display");
  const s = n => { f = n; v.value = n; u(m(n), d[n] || ""); };
  const p = () => {
    const b = new Blob([`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><style>${d["style.css"]||""}</style><script>${d["script.js"]||""}<\/script></head><body>${d["index.html"]||""}</body></html>`], { type: "text/html" });
    const u = URL.createObjectURL(b);
    const i = document.getElementById("preview");
    i.src = u;
    i.onload = () => URL.revokeObjectURL(u);
  };

  document.getElementById("openWindow").onclick = () => {
    const w = window.open("", "_blank");
    w.document.write(`<html><head><style>${d["style.css"]}</style></head><body>${d["index.html"]}<script>${d["script.js"]}<\/script></body></html>`);
  };

  document.getElementById("copyLink").onclick = () => {
    navigator.clipboard.writeText(document.getElementById("preview-url").value).then(() => alert("URL copied!"));
  };

  document.getElementById("createFile").onclick = () => {
    const name = prompt("File name (e.g., new.html):")?.trim();
    if (!name || d[name]) return alert("Invalid or duplicate file name.");
    d[name] = "";
    f = name;
    renderFileButtons();
    s(name);
  };

  e.on("change", () => {
    if (!f) return;
    d[f] = e.getValue();
    if (document.getElementById("autorefresh").checked) p();
  });

  document.getElementById("renameFile").onclick = () => {
    const n = prompt("Rename to:", f)?.trim();
    if (!n || n === f || d[n]) return alert("Invalid or duplicate.");
    d[n] = d[f]; delete d[f]; f = n;
    renderFileButtons();
    v.value = n;
    s(n);
  };

  document.getElementById("duplicateFile").onclick = () => {
    let b = f.replace(/(\.\w+)$/, ""), x = f.match(/\.\w+$/)?.[0] || "", i = 1, n = `${b}-copy${x}`;
    while (d[n]) n = `${b}-copy${++i}${x}`;
    d[n] = d[f];
    alert(`Duplicated: ${n}`);
    renderFileButtons();
  };

  document.getElementById("deleteFile").onclick = () => {
    if (confirm(`Delete ${f}?`)) {
      delete d[f];
      f = null;
      e.setValue("");
      v.value = "";
      alert("Deleted.");
      renderFileButtons();
    }
  };
  

  s("index.html");
  p();
});