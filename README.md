# NodeJS Chatroom with Express and SQLite

Welcome to the NodeJS Chatroom project! This simple chat application is built using Node.js, Express, and SQLite for data storage. It provides a basic platform for users to join a chat room, send messages, and engage in real-time communication.

## Features

- **User Authentication**: Users can create accounts and log in to the chatroom.
- **Chat Rooms**: A chat room is available for users to join.
- **Real-time Messaging**: Messages are sent and received in real-time using WebSocket (via `socket.io`).
- **Persistent Storage**: Chat messages are stored in an SQLite database, ensuring data persistence.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/emanzie/chatroom.git
    cd chatroom
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up the SQLite database:

    navigate to `http://localhost:3000/init`

4. Start the application:

    ```bash
    npm start
    ```

The application will be running at `http://localhost:3000`.

5. Test the application using the following accounts: 
- username: `Hakan`     Password: `password`
- username: `cecile`    Password: `password`
- username: `user`      Password: `password`

## Folder Structure

- **`/public`**: Static files (CSS, client-side JavaScript).
- **`/src`**: Server-side code.
  - **`/routes`**: Express routes.
  - **`/models`**: SQLite database models.
  - **`/controlleres`**: HTML views.
  - **`/services`**: HTML views.
  - **`/helpers`**: HTML views.

## Database

The SQLite database is used to store user information and chat messages. You can find the database file at `db.sqlite`.

## Dependencies

- **Express**: Web application framework for Node.js.
- **SQLite3**: SQLite database library.
- **Socket.io**: Real-time bidirectional event-based communication.

README file generated using input from ChatGPT at https://chat.openai.com/share/7fd144e2-8ad5-4c19-939b-7b6efb59efcf

Happy chatting! 🚀