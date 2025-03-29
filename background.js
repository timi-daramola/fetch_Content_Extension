chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fetchContent") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript(
                {
                    target: { tabId: tabs[0].id },
                    function: extractContentFromPage
                },
                (results) => {
                    if (chrome.runtime.lastError) {
                        sendResponse({ error: chrome.runtime.lastError.message });
                        return;
                    }
                    sendResponse({ data: results[0].result });
                }
            );
        });
        return true; // Keep sendResponse active
    }
});

// Function to be injected into the webpage
function extractContentFromPage() {
    let textContent = document.body.innerText.trim();

    let links = Array.from(document.querySelectorAll("a"))
                     .map(a => a.href)
                     .filter(link => link.startsWith("http"))
                     .join("\n");

    let images = Array.from(document.querySelectorAll("img"))
                      .map(img => img.src)
                      .join("\n");

    return `TEXT CONTENT:\n${textContent}\n\nLINKS:\n${links}\n\nIMAGES:\n${images}`;
}
