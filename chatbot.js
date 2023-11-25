const chatOutput = document.getElementById('chat-output');
const userInput = document.getElementById('user-input');
function removeRepetitions(text) {
    const words = text.split(' ');
    let nonRepetitiveText = '';
    let lastWord = '';

    for (let word of words) {
        if (word !== lastWord) {
            nonRepetitiveText += word + ' ';
        }
        lastWord = word;
    }

    return nonRepetitiveText.trim();
}

function sendMessage() {
    const message = userInput.value;
    chatOutput.innerHTML += `<div>User: ${message}</div>`;
    userInput.value = '';

    // Call OpenAI API
    fetch('https://api.openai.com/v1/engines/curie/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: message,
            max_tokens: 15,
            temperature: 0.2
        })
    })
    .then(response => response.json())
    .then(data => {
        let botResponse = data.choices[0].text.trim();
        botResponse = removeRepetitions(botResponse);
        chatOutput.innerHTML += `<div>Bot: ${botResponse}</div>`;
        chatOutput.scrollTop = chatOutput.scrollHeight;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
