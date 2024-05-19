# Task Management API by Okorie-Chinedu-Sunday

Repository for Niyo group backend assessment of Okorie Chinedu Sunday

# Introduction

This project is about task management. users will be able to create account, login into their account. upon successful login, the user will be to view,create, update, and delete tasks

# Folder Structure

1. **controllers** : this contains the business logic for the application.
2. **models** : This contains models or structure of the application resources like User and Task
3. **routes** : This contains files that handles all the api routes.
4. **utils** : This contains utility logics like some of which are reused in some part of the applications.
5. **validation** : This contains files for validation logics.

## How to set up the application locally

1. Clone the repository using the command `git clone https://github.com/profchiso/niyo-task-mgt.git`
2. Change directory to the cloned app using the command `cd niyo-task-mgt`
3. Install all dependencies using the command `npm install`
4. Set the environment variables as found **[here](https://github.com/profchiso/niyo-task-mgt/blob/dev/.env.example.txt)**
5. Run the application using the command `npm start` or `npm run dev` to run the application using `nodemon`

# Other information

- The documentation on how to use the api is **[here](https://documenter.getpostman.com/view/7669287/2sA3QmCuJx)**

- **Features**: Users can Create, view, update and delete tasks. create user,view users, and user login. user cannot delete a task that does not belong to them

- **Technologies** Nodejs, express and MongoDB alongside with relevant NPM libraries
