# SleekFlow Todo Application

## Overview

This repository contains the code for the SleekFlow Todo Application. The backend is developed using C# ASP.NET Core, and the frontend is developed using React with TypeScript and Vite. PostgreSQL is used as the database.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [PostgreSQL](https://www.postgresql.org/download/)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/EugeneHohZhaoQuan/sleekflow-todo.git
   cd sleekflow-todo
   ```

## Backend Setup

Navigate to the backend directory:

```sh
cd Todo_Backend/TodoListApi
```

Restore the dependencies:

```sh
dotnet restore
```

Update the `appsettings.json` file with your PostgreSQL connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=todoDb;Username=your_db_user;Password=your_db_password"
  },
  ...
}
```

Run the migrations to set up the database schema:

```sh
dotnet ef database update
```

## Frontend Setup

1. Navigate to the frontend directory:

   ```sh
   cd Todo_Frontend/TodoListWeb
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

## Database Setup

1. Ensure PostgreSQL is running on your machine.
2. Create a new PostgreSQL database and user.
3. Update the connection string in `appsettings.json` as shown in the Backend Setup section.

## Running the Application

### Backend

1. In the `Todo_Backend/TodoListApi` directory, start the backend server:

   ```sh
   dotnet run
   ```

   The backend server will start on `https://localhost:5001`.

### Frontend

1. In the `Todo_Frontend` directory, start the frontend development server:

   ```sh
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`.

## Usage

- Open your browser and navigate to `http://localhost:3000`.
- You should see the SleekFlow Todo Application running.
- Use the interface to create, read, update, and delete todos.

If using docker

- Ensure your project structure matches the paths specified in the Dockerfiles.
- Create the Dockerfiles and docker-compose.yml file in the root of your project directory.
- Run the following command in the root directory of your project to build and start the containers:

```sh
docker-compose up --build
```

This setup will build and run your backend and frontend services, and set up a PostgreSQL database, all within Docker containers. Make sure to replace your_db_user and your_db_password with your actual database credentials.

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
