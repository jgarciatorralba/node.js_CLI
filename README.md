# node.js Command Line Interface

_node.js, JS, CLI, third-party API, Backend_

## 📔 Description

In this project, we developed a CLI program using **node.js** which runs in a terminal application. The program connects to a third-party API to display the returned data, and is able to store it in and to load it from the local system.

### 📂 Content

The repository contains the files and folders detailed below:

- **_commands_**: folder in which we stored the different commands the CLI implements in separate files, including: `get-movie`, `get-movies`, `get-person` and `get-persons`.

- **_postman_**: a folder that includes a _postman_ collection in _.json_ format with all the endpoints used in the pill to connect to a third-party API.

- **_utils_**: utilities folder where to store auxiliary _.js_ files used either by the main application or the commands, including:

  - **_local.js_**: which contains a function to load data from a local folder.
  - **_prints.js_**: which contains different functions to display the required data on the command line.
  - **_save.js_**: with a function to store the data required via _https_ request in a local folder.

- **_.env-template_**: a file with the individual user environment variables needed to run this application. Basically only an **API key** is needed, which can be obtained for free by registering in [TMDb](https://www.themoviedb.org).

- **_.gitignore_**: used to indicate the files and folders to be ignored by the version control system _Git_.

- **_README.md_**: this file.

- **_moviedb.js_**: main entry point to the program, with calls (via `require`) to the _npm_ package **_commander_** to generate our command line interface application and to the different implemented commands.

- **_package-lock.json_**: automatically generated file used for any operations where the package manager _npm_ modifies either the _node_modules_ tree (not included in this repository) or the file _package.json_.

- **_package.json_**: contains information about the project (name, version, etc.) including the packages installed as dependencies.

---

## ✒️ Authors

- **Berón Gamboa Gavilanes** &#8594; [beron-gamboa](https://code.assemblerschool.com/beron-gamboa/)
- **Jorge García Torralba** &#8594; [jorge-garcia](https://code.assemblerschool.com/jorge-garcia/)
