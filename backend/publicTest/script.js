const socket = io();


const asd = document.querySelector('#asd');
const inputNome = document.getElementById('usernameInput')

document.querySelector('button').addEventListener("click", (event)=>{
  socket.emit('register', inputNome.value);
})

inputNome.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const username = event.target.value.trim();
    if (username) {
      document.getElementById('usernameInput').disabled = true;
      
    }
  }
});

document.getElementById('messageInput').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const message = event.target.value.trim();
    const sender = inputNome.value;
    const receiver = asd.value;
    if (message) {
      socket.emit('privateMessage', { sender, receiver, message });
      event.target.value = '';
    }
  }
});

socket.on('user_connected', (username) => {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML += `<p><strong>${username}</strong> has joined the chat.</p>`;
});

socket.on('user_disconnected', (username) => {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML += `<p><strong>${username}</strong> has left the chat.</p>`;
});

socket.on('receiveMessage', (message ) => {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML += `<p>${message}</p>`;
});
