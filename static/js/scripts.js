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

            if (data.error) {
                const errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.textContent = data.error;
                resultsDiv.appendChild(errorElement);
            } else {
                for (const path in data) {
                    const result = data[path];
                    const resultElement = document.createElement('div');
                    resultElement.innerHTML = `<h3>${path}</h3><pre>${JSON.stringify(result, null, 2)}</pre>`;
                    resultsDiv.appendChild(resultElement);
                }

                const successElement = document.createElement('div');
                successElement.className = 'success-message';
                successElement.textContent = 'Successfully checked .well-known paths';
                resultsDiv.appendChild(successElement);
            }
        })
        .catch(error => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = `Error: ${error.message}`;
            resultsDiv.appendChild(errorElement);
        });
});
