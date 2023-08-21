# Shopping List Web Application

This is a simple shopping list web application built with React, JavaScript, Node.js, and Express.js. Users can add items to their shopping list through the web interface.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Deployment](#deploymente)
## Video


https://github.com/JosefMamo12/ShoppingList/assets/73185009/d00ceb2a-3ad6-4eb9-8167-8787f1d794a6



## Features

- Add items to the shopping list.
- Simple and intuitive user interface.

## Getting Started

To get a copy of this project up and running on your local machine, follow these steps:

### Prerequisites

- Node.js installed on your computer.

## Step 1: Cloning the Repository
1. Open your terminal and navigate to the directory where you want to clone the repository:

  **`cd /path/to/your/directory`**

2. Clone the ShoppingList repository from GitHub:

```bash
git clone https://github.com/JosefMamo12/ShoppingList.git
```

## Step 2: Setup the Server

1. Navigate to the server directory:

``` bash
cd server
```

2. Install the required dependencies by running the following command:

``` bash
npm install
```

3. To use the application's database functionality, the client needs to create a database in their MySQL server with a specific name, let's call it 'list.' This 'list' database will be where the application stores and retrieves data.  

4. In the root folder of the server, create a .env file. This file will be used to configure the connection to your MySQL database, whether it's hosted on a cloud server or locally. <br/> Be sure to update the .env file with your MySQL database credentials."

   ![image](https://github.com/JosefMamo12/ShoppingList/assets/73185009/bd9861e2-269d-4ee5-a165-e3d4655f0fe4)

## Step 3: Starting the Server
1. Once the configuration is set, you can start the server using the following command:

    ```bash
    npm start
    ```
2. Once the server is configured there is a function thats running and intialize all the required tables for this project.
  
3. The server will start running on the specified port (default is 8080). You can access it using your web browser or tools like Postman.

## Step 4: Setup the Client
1. Navigate to the client directory from the project root directory:

``` bash
cd client
```

2. Install the required dependencies by running the following command:

``` bash
npm install --legacy-peers-deps
```
3. configure .env.local file in the client root like this (depends on which client you would like to retrive data or add):
![image](https://github.com/JosefMamo12/ShoppingList/assets/73185009/d411e2a2-bd73-49d4-a627-6ad167e92f32)

## Step 5: Starting the Server
1. Once the configuration is set, you can start the client using the following command:

    ```bash
    npm start
    ```
2. The client will run on localhost:3000 (default react app port) if the port not used.


## Deployment

This web application is deployed and can be accessed online. Here's how you can access it:

- **Live Demo**: [Link to the Live Demo](https://shop-list223.netlify.app/)
  - You can visit the live demo by clicking the link above.

### Notes

- Make sure you have an internet connection to access the live demo.
- The application may be continuously updated with new features and improvements.

