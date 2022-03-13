const demoButton = document.getElementById("demo-button")
if (demoButton) {
    demoButton.onclick = function () {
        const srcLanguageElement = document.getElementById("srclnguage")
        const dstLanguageElement = document.getElementById("dstlnguage")
        const srcLanguage = srcLanguageElement.options[srcLanguageElement.selectedIndex].value
        const dstLanguage = dstLanguageElement.options[dstLanguageElement.selectedIndex].value
        chrome.tabs.executeScript({ code: "window.getSelection().toString()" }, function (selection) {
            const data = {
                "from": srcLanguage,
                "to": dstLanguage,
                "text": selection
            }
            chrome.runtime.sendMessage({ data: data }, function (response) {
                alert(response.result)
            })
        })
    }
}