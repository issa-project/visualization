# ISSA Visualization Web Application

The [ISSA project](https://issa.cirad.fr/) focuses on the semantic indexing of scientific publications in an open archive.

This repository is a React-based web application meant to demonstrate the interest and use of such a semantic index for researchers and librarians.
It uses the web services offered by the [backend server](https://github.com/issa-project/backend-services/).


## Installation


Pre-requisite: yarn

Install the dependencies with:
```bash
yarn build
```


## Run

Run the application with:
```bash
yarn start
```

Note for Windows users: you may need to authorize the execution of scripts on Powershell (as admin): `set-executionpolicy unrestricted`

By default the application listens on port 3001. This can be changed in file [.env](.env).
Make sure the application is properly started by pointing your browser to:
```
http://localhost:3001/?uri=http://ns.inria.fr/issa/f74923b3ce82c984a7ae3e0c2754c9e33c60554f
```
(this is an example article URI that may no longer be valid at some point).


### Logging

Log traces are printed out on the browser's console. It can be deactivated in file [.env](.env) by setting property:
```
REACT_APP_LOG = off
```
