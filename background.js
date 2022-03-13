chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.data.text[0]);
    const key = '9a624158ef2949fcb5a695f60ea0823a'
    const endpoint = 'https://api.cognitive.microsofttranslator.com/'
    const location = 'koreacentral'
    const from = request.data.from
    const to = request.data.to

    const options = {
        method: "POST",
        headers: {
            'Ocp-Apim-Subscription-Key': key,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': crypto.randomUUID()
        },
        body: JSON.stringify({
            text: request.data.text[0]
        })
    }
    const api = endpoint + "translate?api-version=3.0" + "&from=" + from + "&to=" + to

    fetch(api, options)
        .then((response) => { console.log(response); })


    sendResponse({ result: "result: 你好" })
})