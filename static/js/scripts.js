document.getElementById('check-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch('/check', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            const messagesDiv = document.getElementById('messages');
            const resultsDiv = document.getElementById('results');
            messagesDiv.innerHTML = '';
            resultsDiv.innerHTML = '';

            if (data.error) {
                const errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.textContent = data.error;
                messagesDiv.appendChild(errorElement);
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
                messagesDiv.appendChild(successElement);
            }
        })
        .catch(error => {
            const messagesDiv = document.getElementById('messages');
            messagesDiv.innerHTML = '';
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = `Error: ${error.message}`;
            messagesDiv.appendChild(errorElement);
        });
});
