const socket = io()
let token = null
let loggedInUsername = null

socket.on('new-message', () => {
    getMessages()
})

socket.on('user connected', (socketId) => {
    if (socketId !== socket.id && token !== null)
        alert('a new user connected')
})

socket.on('user disconnected', (socketId) => {
    if(socket.id !== socketId && token !== null)
        alert('a user disconnected')
})

async function register(){
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });
    const data = await response.json();
    alert(data.message);
}

async function login(){
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });
    const data = await response.json();
    
    if(data.code === 200){
        document.querySelector('.login').style.display = 'none';
        document.querySelector('.dashboard').style.display = 'block';

        token = data.token;
        loggedInUsername = data.username;
        socket.emit('user connected', socket.id)
        getMessages();
    }else{
        alert(data.message);
    }
}

async function getMessages(){

    const response = await fetch('http://localhost:3000/chat', {
        headers: {
            Authorization: "Bearer " + token
        }
    })

    const data = await response.json();
    
    document.querySelector('.messages').innerHTML = '';

    for(let i = 0; i < data.messages.length; i++){

        const message = data.messages[i];
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');

        const messageHead = document.createElement('div');
        messageHead.classList.add('message-head');

        const username = document.createElement('h3');
        if(message.username === loggedInUsername)
            username.innerText = 'Me';
        else
            username.innerText = message.username;

        const time = document.createElement('p');
        time.innerText = new Date(message.createdAt).toLocaleString();

        messageHead.appendChild(username);
        messageHead.appendChild(time);

        const messageBody = document.createElement('p');
        messageBody.classList.add('message-body');
        messageBody.innerText = message.message;

        messageElement.appendChild(messageHead);
        messageElement.appendChild(messageBody);

        document.querySelector('.messages').appendChild(messageElement);
    }
}

async function sendMessage(){
    const message = document.querySelector('input[name="message"]').value;

    const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        },
        body: JSON.stringify({message})
    });

    const data = await response.json();

    if(data.code === 200){
        document.querySelector('input[name="message"]').value = '';
        socket.emit('new-message', '')
    }else{
        alert(data.message);
    }
}

async function logout() {
    token = null;
    username = null;
    document.querySelector('.dashboard').style.display = 'none';
    document.querySelector('.login').style.display = 'block';
    socket.emit('user disconnected', socket.id)
}