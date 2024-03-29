const express = require("express");

const bodyParser = require("body-parser");

require("dotenv").config();

const fileUpload = require("express-fileupload");

const chalk = require("chalk");

const {
  loginController,
  newUserController,
  deleteUserController,
  editUserController,
  getAllFieldsExceptPasswordController,
} = require("./controllers/users");

const {
  newServiceController,
  getServiceByIDController,
  getAllServicesController,
  updateServiceStatusByIDController,
  commentsFileController,
  getServiceByTypeController,
  deleteCommentsController,
} = require("./controllers/services");

const { authUser, checkHeaders } = require("./middlewares/auth");

const { generalError, error404 } = require("./middlewares/handleErrors");

const app = new express();

//Parsear JSON y URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Leer archivos binarios
app.use(fileUpload());

//Directorios de los archivos
app.use("/uploads", express.static("./uploads"));
app.use("/requestfiles", express.static("./requestfiles"));
app.use(express.static("public"));

//#region USER

//Login del user (devulve token)
app.post("/user/login", loginController);

//Crear un user
app.post("/user/register", newUserController);

//Obtener todos los campos de un user excepto su ID
app.get("/user/:id", authUser, getAllFieldsExceptPasswordController);

//Modificar un user
app.put("/user/:id/edit", authUser, editUserController);

//Borrar un user
app.delete("/user/delete", authUser, deleteUserController);

//#endregion USER

//#region SERVICES

//Crear un servicio
app.post("/service/add", authUser, newServiceController);

//Obtener un servicio por ID
app.get("/service/:id", getServiceByIDController);

//Obtener todos los servicios
app.get("/service", checkHeaders, getAllServicesController);

//Modificar el estado de determinado servicio
app.patch("/service/:id/:status", updateServiceStatusByIDController);

//Obtener servicios en funcion de su tipo
app.get("/service/type/(:type)?", authUser, getServiceByTypeController);

//Añadir comentario fichero
app.post("/service/:id/comments", authUser, commentsFileController);

//Eliminar comentario
app.delete(
  "/service/:id_s/comments/:id_c/delete",
  authUser,
  deleteCommentsController
);

//#endregion SERVICES

//#region MIDDLEWARES

//Gestión de 404: Cuando accedemos a rutas que no están definidas
app.use(error404);

//Gestión de errores
app.use(generalError);

//#endregion MIDDLEWARES

//#region SERVER

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, async () => {
  console.log(
    chalk.green(`App listening on port ${PORT}\nDB: ${process.env.DB_DATABASE}`)
  );
});

//#endregion SERVER
