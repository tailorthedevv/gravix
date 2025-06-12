document.addEventListener("DOMContentLoaded", function() {
    const codeEditor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
        mode: "htmlmixed",
        lineNumbers: true,
        theme: "monokai"
    });

    const outputFrame = document.getElementById("output");
    const themeSelector = document.getElementById("theme-selector");

    function updateOutput() {
        try {
            const code = codeEditor.getValue();
            outputFrame.contentDocument.body.innerHTML = code;
        } catch (error) {
            console.error("Error in code execution:", error);
        }
    }

    codeEditor.on("change", updateOutput);

    themeSelector.addEventListener("change", function() {
        codeEditor.setOption("theme", this.value);
    });

    function createFile() {
        const fileList = document.getElementById("file-list");
        const fileItem = document.createElement("li");
        fileItem.textContent = "NewFile.html";
        fileList.appendChild(fileItem);
    }
});
function createFile() {
    const fileList = document.getElementById("file-list");
    const fileItem = document.createElement("li");
    fileItem.textContent = "NewFile.html";
    fileList.appendChild(fileItem);
}
