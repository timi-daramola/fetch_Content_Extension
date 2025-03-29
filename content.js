chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractContent") {
        // Extract text content
        let textContent = document.body.innerText.trim();

        // Extract all links
        let links = Array.from(document.querySelectorAll("a"))
                         .map(a => a.href)
                         .filter(link => link.startsWith("http"))
                         .join("\n");

        // Extract all images
        let images = Array.from(document.querySelectorAll("img"))
                          .map(img => img.src)
                          .join("\n");

        let extractedContent = `TEXT CONTENT:\n${textContent}\n\nLINKS:\n${links}\n\nIMAGES:\n${images}`;

        sendResponse({ data: extractedContent });
    }
});
