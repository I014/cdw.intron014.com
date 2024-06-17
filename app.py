from flask import Flask, render_template, request, jsonify, redirect, url_for
import requests
import logging

app = Flask(__name__)

if __name__ != '__main__':
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)

# List of common .well-known paths
WELL_KNOWN_PATHS = [
    '.well-known/security.txt',
    '.well-known/openid-configuration',
    '.well-known/apple-app-site-association',
    '.well-known/assetlinks.json',
    # Add more paths as needed
]

@app.route('/')
def index():
    error = request.args.get('error')
    success = request.args.get('success')
    return render_template('index.html', error=error, success=success)

@app.route('/check', methods=['POST'])
def check_well_known():
    domain = request.form.get('domain')
    if not domain:
        return jsonify({'error': 'Domain cannot be empty'})

    results = {}
    for path in WELL_KNOWN_PATHS:
        url = f'https://{domain}/{path}'
        try:
            response = requests.get(url)
            if response.status_code == 200:
                try:
                    results[path] = response.json()
                except ValueError:
                    results[path] = response.text
            else:
                results[path] = 'Not Found'
        except requests.exceptions.ConnectionError:
            return jsonify({'error': f'Failed to resolve domain: {domain}'})
        except requests.exceptions.RequestException as e:
            return jsonify({'error': f'An error occurred: {str(e)}'})

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)

