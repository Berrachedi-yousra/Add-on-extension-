from flask import Flask, render_template, Response, request, redirect, url_for
app = Flask(__name__)

@app.route("/")
def index():
    return render_template('popup_v2.html')

def translate_azure(src, dst, text):

    import requests, uuid, json

    # Add your subscription key and endpoint
    subscription_key = "4dae4619a49342d9844abb2dfaff41d8"
    endpoint = "https://api.cognitive.microsofttranslator.com"

    # Add your location, also known as region. The default is global.
    # This is required if using a Cognitive Services resource.
    location = "northeurope"

    path = '/translate'
    constructed_url = endpoint + path

    params = {
        'api-version': '3.0',
        'from': src,
        'to': [dst]
    }
    constructed_url = endpoint + path

    headers = {
        'Ocp-Apim-Subscription-Key': subscription_key,
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        'X-ClientTraceId': str(uuid.uuid4())
    }

    # You can pass more than one object in body.
    body = [{
        'text': text
    }]

    request = requests.post(constructed_url, params=params, headers=headers, json=body)
    print(request)

    response = request.json()
    translated_text = response[0]['translations'][0]['text']

    print(translated_text)
    return translated_text
    


