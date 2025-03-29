document.getElementById("fetchBtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "fetchContent" }, (response) => {
        if (response.error) {
            document.getElementById("output").innerText = "Error: " + response.error;
            document.getElementById("copyBtn").style.display = "none";
        } else {
            document.getElementById("output").innerText = response.data;
            document.getElementById("copyBtn").style.display = "block"; // Show Copy button
        }
    });
});

document.getElementById("copyBtn").addEventListener("click", () => {
    let text = document.getElementById("output").innerText;

    navigator.clipboard.writeText(text).then(() => {
        alert("Content copied to clipboard!");
    }).catch(err => {
        alert("Failed to copy: " + err);
    });
});
