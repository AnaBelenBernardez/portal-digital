# 🧩 Portal de necesidades digitales
_Segundo proyecto para HACK A BOSS - 2023: API que permite gestionar una web donde personas que necesiten algún servicio digital puedan pedir ayuda a otros usuarios. Por ejemplo: traducir un texto, editar una foto, revisar un documento, etc. Solo necesidades que puedan realizarse mediante un fichero digital._

## 📋 Descripción
* Los usuarios anónimos pueden:
  - Ver lista de servicios requeridos.
  - Registrarse con un nickname, email y password.
  - Login con email y password.
* Los usuarios registrados pueden:
  - Crear un nuevo servicio requerido.
  - Escoger un servicio requerido por otro usuario.
  - Hacer comentarios en los servicios requeridos.
  - Subir un archivo con el servicio resuelto.
  - Marcar un servicio como ya resuelto.
  - Gestionar el perfil de usuario.
  - Borrar su usuario.
  - Borrar un comentario.

## ⚙ Inicialización
### Archivo .env
* El archivo .env no se mostrará ya que está incluido en el .gitignore.
* La información contenida no es sensible ya que se trata de un proyecto de ejemplo, pero por convención lo introducimos de esta forma.
* La información necesaria se puede encontrar en el archivo .env.example.
### NPM necesarios
* Debes instalar primero los módulos necesarios:
``
npm install
``
### Base de datos
* Es necesario tener previamente configurado el archivo .env.
* Para crear la base de datos con las tablas vacías:
``
node db/initDB
``
* Para crear la base de datos con 20 usuarios aleatorios:
``
node db/initDB --data
``
### Servidor
* Para iniciar el servidor:
``
npm start
``

## 👩‍💻 Autores
* [@BorjaLopz](https://github.com/BorjaLopz)
* [@AnaBelenBernardez](https://github.com/AnaBelenBernardez)
* [@moirivilla](https://github.com/moirivilla)
* [@FranciscoEsparraga](https://github.com/FranciscoEsparraga)

## 💻 Tech Stack
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![GIT](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![VSC](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
