
const socket = new WebSocket("ws://4e91-2401-4900-676c-2dc1-2499-174f-6e06-b972.ngrok-free.app");

socket.onmessage = (event) => {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p>Customer: ${event.data}</p>`;
};

function sendMessage() {
    const messageInput = document.getElementById("message");
    const message = messageInput.value;
    if (message) {
        socket.send(message);
        document.getElementById("chat-box").innerHTML += `<p>You: ${message}</p>`;
        messageInput.value = "";
    }
}
