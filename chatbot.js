document.getElementById("openChat").addEventListener("click", function() {
    document.getElementById("chatContainer").style.display = "block";
  });
  
  document.getElementById("sendMessage").addEventListener("click", function() {
    const userInput = document.getElementById("userInput").value;
  
    // Call Dialogflow API with userInput and receive bot response
    const projectId = 'convocare-gg9d'; 
    const sessionId = '12345'; // Use a unique session ID for each user
    const query = userInput; // Use the user's message
  
    // You cannot use require() in the browser, so you need to use <script> to load the Dialogflow library
  
    // Construct the session path
    const sessionPath = `projects/${projectId}/agent/sessions/${sessionId}`;
  
    // Construct the request
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: 'en-US', // Replace with your desired language code
        },
      },
    };
  
    // Send the request and process the response
    async function detectIntent() {
      const response = await fetch('/dialogflow-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
  
      const responseData = await response.json();
      console.log('Bot response:', responseData.fulfillmentText);
  
      // Update chatLog with user input and bot response
      const chatLog = document.getElementById('chatLog');
      const userMessageElement = document.createElement('div');
      userMessageElement.textContent = `You: ${userInput}`;
      const botMessageElement = document.createElement('div');
      botMessageElement.textContent = `Bot: ${responseData.fulfillmentText}`;
      chatLog.appendChild(userMessageElement);
      chatLog.appendChild(botMessageElement);
    }
  
    detectIntent();
  });
  