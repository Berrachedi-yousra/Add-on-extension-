const demoButton = document.getElementById("demo-button")
if (demoButton) {
    demoButton.onclick = function () {
        // Get from & to language
        const srcLanguageElement = document.getElementById("srclnguage")
        const dstLanguageElement = document.getElementById("dstlnguage")
        const srcLanguage = srcLanguageElement.options[srcLanguageElement.selectedIndex].value
        const dstLanguage = dstLanguageElement.options[dstLanguageElement.selectedIndex].value

        // fetch current tabs selected text, then send message to background
        chrome.tabs.executeScript({ code: "window.getSelection().toString()" }, function (selection) {
            const data = {
                "from": srcLanguage,
                "to": dstLanguage,
                "text": selection
            }

            // send translate data to background, and then receive response
            chrome.runtime.sendMessage({ data: data }, function (response) {
                // Code to execute after receiving response
                alert(response.result)
            })
        })
    }
}