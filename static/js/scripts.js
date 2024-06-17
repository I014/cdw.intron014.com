document.getElementById('check-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch('/check', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';
            for (const path in data) {
                const result = data[path];
                const resultElement = document.createElement('div');
                resultElement.innerHTML = `<h3>${path}</h3><pre>${JSON.stringify(result, null, 2)}</pre>`;
                resultsDiv.appendChild(resultElement);
            }
        });
});
