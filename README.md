# HackMotion Test App
# Project Documentation:

## Description

This project is a web application that uses **.NET 8** for the backend and **Angular 15** for the frontend. Both components are containerized using Docker and orchestrated with **Docker Compose**.

---

## Table of Contents

1. [Requirements](#requirements)
2. [Installation and Setup](#installation-and-setup)
   - [Step 1: Clone the repository](#step-1-clone-the-repository)
   - [Step 2: Install Docker and Docker Compose](#step-2-install-docker-and-docker-compose)
   - [Step 3: Build and run containers](#step-3-build-and-run-containers)
4. [Retrieving Log Files from the Container](#step-4-retrieving-log-files-from-the-container)
5. [Additional Information](#additional-information)
   - [Viewing logs](#viewing-logs)
   - [Restarting Containers](#restarting-container)

---

## Requirements

To run the project on your machine, make sure you have the following tools installed:

1. **Docker**: For containerization and orchestration.
   - [Download Docker](https://www.docker.com/get-started)

2. **Docker Compose**: For managing multi-container Docker applications.
   - **Windows and macOS**: Docker Compose is already included in Docker Desktop.
   - **Linux**: To install Docker Compose separately, follow the instructions here: [Install Docker Compose](https://docs.docker.com/compose/install/).

---

## Installation and Setup

### Step 1: Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/sashakoval/HackMotion
cd HackMotion
```

This will create a local copy of the repository, and you can start working with it on your machine.

### Step 2: Install Docker and Docker Compose

Ensure that **Docker** and **Docker Compose** are installed on your machine.

1. **Check Docker version** to confirm Docker is installed:

```bash
docker --version
```

Check Docker Compose version:

```bash
docker-compose --version
```
If these commands do not return version information, install Docker and Docker Compose by following the official guides:

Install Docker
Install Docker Compose

If these commands do not return version information, install Docker and Docker Compose by following the official guides:

- [Install Docker](https://docs.docker.com/get-docker/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

Once Docker and Docker Compose are installed, proceed to the next step.

### Step 3: Build and Run Containers

After installing Docker and Docker Compose, follow these steps to build and run the containers for your application.

1. Navigate to the project directory where the `docker-compose.yml` file is located.

```bash
cd /path/to/HackMotion
```

Build and start the containers using Docker Compose by running the following command:

```bash
docker-compose up --build
```

This command will:

- Build the Docker images for both the backend (.NET 8) and frontend (Angular 15).
- Start the containers for both components.

If you want to run the containers in **detached mode** (background), use the `-d` flag:

```bash
docker-compose up --build -d
```

This will start the containers in the background and return the terminal to you.

Once the containers are up and running, the application will be accessible at the following URLs:
- **Backend (.NET 8 API)**: [http://localhost:7200](http://localhost:7200)
- **Frontend (Angular)**: [http://localhost](http://localhost)

Additionally, you can pass query strings to the frontend to display the results of a user's quiz. The query string defines the specific result category the user belongs to. For example:

- **Default**: `http://localhost` – This will show the default view.
- **Quiz result for break80**: `http://localhost/?quizResult=break80`
- **Quiz result for break90**: `http://localhost/?quizResult=break90`
- **Quiz result for break100**: `http://localhost/?quizResult=break100`
- **Quiz result for breakpar**: `http://localhost/?quizResult=breakpar`

By default, the frontend will display the result for `break80` if no query string is provided.

You can modify the query string to reflect the appropriate result based on the user's quiz outcome, such as `break80`, `break90`, or `break100`.

---

## Retrieving Log Files from the Container

By default, log files are saved inside the **API container** in the root directory. To access or download the log files from the container, follow these steps:

### 1. Get the Container ID or Name
First, you need to get the **ID** or **name** of the container that contains the log file you want to copy. To do this, run the following command:

```bash
docker ps -a
```

To access the backend container, use the following command:

```bash
docker exec -it container-id-or-name /bin/bash 
```
This will open a bash shell inside the backend container, allowing you to run commands and navigate the filesystem of the container. Once inside the container, you can perform various actions like inspecting files, installing dependencies, or checking logs.

### 2. Check the contents of a directory

```bash
ls
```

### 3. Navigate to a Specific Directory

To navigate to a specific directory inside the container, use the `cd` (change directory) command.

For example, to navigate to the `/app` directory:

```bash
cd /app
```

### 4. Identify the Path to the Log File Inside the Container
Next, you need to identify where the log file is located inside the container. If the log file is located in the default directory `/app`, as in your case, you will use this path in your `docker cp` command.

For example, the path to the log file may look like:

```bash
/container_id:/app/analytics_log.txt
```

If the log file is located in a different directory inside the container, you will need to adjust the path accordingly. For instance, if the file is located in `/logs`, the path would be:

```bash
/container_id:/logs/analytics_log.txt
```

### 4 .Exit the Container (if you're inside it)
Before running the command to copy the log file, make sure you **exit** the container, as the `docker cp` command should be executed from your **host machine**, not inside the container.

To exit the container, type:

```bash
exit
```
This will return you to your host machine's terminal.

### 5. Command to Copy the Log File to Your Desktop
If your container is named `hackmotionresourses-backend` and the log file is located at `/app/analytics_log.txt`, the command to copy the file to your desktop would be:

```bash
docker cp hackmotionresourses-backend:/app/analytics_log.txt C:/Users/YourUsername/Desktop/analytics_log.txt
```
Make sure to replace YourUsername with your actual Windows username. After running this command, the api.log file will be copied to your desktop.

---

## Additional Information

### Viewing Logs

To view logs from the running containers:

1. View logs for **all containers**:

```bash
docker-compose logs
```
2. View logs for the backend container:

```bash
docker-compose logs backend
```

3. View logs for the frontend container:

```bash
docker-compose logs frontend
```

### Restarting Containers
If you made changes to the project or need to restart the containers, you can use:

```bash
docker-compose restart
```
This will restart all the containers defined in the **docker-compose.yml** file. If you want to restart a specific container, specify the service name:

```bash
docker-compose restart backend
```
This will restart only the backend container.
