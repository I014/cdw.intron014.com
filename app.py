from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

WELL_KNOWN_PATHS = [
    '.well-known/security.txt',
    '.well-known/openid-configuration',
    '.well-known/apple-app-site-association',
    '.well-known/assetlinks.json',
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/check', methods=['POST'])
def check_well_known():
    domain = request.form.get('domain')
    results = {}
    for path in WELL_KNOWN_PATHS:
        url = f'https://{domain}/{path}'
        try:
            response = requests.get(url)
            if response.status_code == 200:
                results[path] = response.json()
            else:
                results[path] = 'Not Found'
        except Exception as e:
            results[path] = str(e)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
