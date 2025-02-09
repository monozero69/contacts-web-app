# Contacts Web App
A simple contacts web application that stores information such as name, address, and telephone numbers for contacts. 

## Setup local development environment

### Prerequisites
The following **prerequisites** are needed before you can setup local development environment:
- Git
- Docker
- Visual Studio Code (or any IDE that supports [Dev Container](https://containers.dev/supporting))
- Dev Containers extension for VS Code

Instructions for installing **prerequisites**
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Docker](https://docs.docker.com/desktop/)
- [Visual Studio Code](https://code.visualstudio.com/docs/setup/setup-overview) (VS Code)
- [Dev Containers extension for VS Code](https://code.visualstudio.com/docs/devcontainers/tutorial)

### Clone the project from GitHub
```
git clone git@github.com:monozero69/contacts-web-app.git
```

### Enable Visual Studio Code to use the pre configured Dev Container environment
```
cd contacts-web-app
code .
```
When Visual Studio Code opens the project it will detect that the project has `.devcontainer/devcontainer.json` and will offer to `Reopen folder to develop in a container`:

![VS Code reopen the project in container popup](./doc/images/vscode_reopen_project_in_container.png)

Click `Reopen in Container`.

The first time you reopen the project in container it needs to build custom image on your machine with config coming from `.devcontainer/devcontainer.json` therefore it might take `few minutes` but next time you open the project in the container it will be `lot faster` as building the image step is not needed unless you make a changes to anything in the folder `.devcontainer/`. 

Once the container is running and you're connected, you should see your remote context change in the bottom left of the Status bar:

![Project opened in dev container](./doc/images/project_opened_in_dev_container.png)

Now you have everything you need to develop, run the app and run the automated tests locally. This is the same same setup `I` have when working on this project.

The technologies stack for the project are Java, Spring Boot for the API layer and JavaScript, React for the frontend.

You will have following development tools installed in the container:
* Git*
* Docker*
* Java 21
* Maven
* NodeJS 22
* NPM

note *: The Git and Docker installed in the container are independent from ones on the outside the container. 

### Install dependencies for the API layer & frontend
The dependencies for the `API layer` & `frontend` should be automatically installed when the dev container image was created on your machine.

If you ever change dependencies in the following two files then you will need to manual install the dependencies or [rebuild dev container](https://docs.github.com/en/codespaces/developing-in-a-codespace/rebuilding-the-container-in-a-codespace#rebuilding-the-dev-container-in-the-vs-code-web-client-or-desktop-application) in VS Code to get the new dependencies installed:
* api/pom.xml (API layer)
* web/package.json (frontend layer)
#### Manual install API layer dependencies
```
cd api
mvn package
```

#### Manual install frontend layer dependencies
```
cd web
npm install
```

### Run the app locally
To run the app locally you will first need to start the `API layer` up by issuing the following commands in VS Code `terminal`:
```
cd api
mvn spring-boot:run 
```
`API layer` starts up on port `8080`


Then in another VS Code `terminal` issue the following commands to start the `frontend`:
```
cd web
npm run dev
```

The `frontend` is avaibale at http://localhost:5173/

### Run the automated tests locally
To run the `API layer` tests:
```
cd api
mvn test
```

To run the `frontend` tests:
```
cd web
npm test
``` 