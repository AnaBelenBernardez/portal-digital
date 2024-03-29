const { getConnection } = require("../db/db");
const { generateError } = require("../helpers");
const chalk = require("chalk");

//Crear servicio en la BBDD
const createService = async (
  title,
  request_body,
  user_id,
  required_type,
  file_name = "",
  hide = false,
  done = false
) => {
  let connection;

  try {
    connection = await getConnection();

    console.log(title);
    console.log(request_body);
    console.log(user_id);
    console.log(required_type);

    const [newService] = await connection.query(
      `
    INSERT INTO requireds (title, request_body, user_id, file_name, required_type, done, hide) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, request_body, user_id, file_name, required_type, done, hide]
    );

    console.log(chalk.green("Servicio creado"));

    return newService.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const getServiceByID = async (id) => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT * FROM requireds WHERE id = ?`,
      [id]
    );

    if (result.length === 0) {
      throw generateError("No hay ningun servicio con ese ID", 400);
    }
    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const getAllServices = async (user_id = -1) => {
  let connection;
  console.log(chalk.green(user_id));

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT * FROM requireds WHERE user_id != ? AND done = ? ORDER BY creation_date ASC`,
      [user_id, 0]
    );
    if (result.length === 0) {
      throw generateError("No hay ningún servicio aún", 404);
    }

    return result;
  } finally {
    if (connection) connection.release();
  }
};

const updateServiceStatus = async (id, serviceValue) => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT * FROM requireds WHERE id = ?`,
      [id]
    );

    if (result.length === 0) {
      throw generateError("No hay ningún servicio con ese ID", 404);
    }

    const [update] = await connection.query(
      `UPDATE requireds SET done = ? WHERE id = ?`,
      [serviceValue, id]
    );

    return update;
  } finally {
    if (connection) connection.release();
  }
};

const getServiceByType = async (type) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `SELECT * FROM requireds WHERE required_type LIKE ? AND done = ?`,
      [`%${type}%`, 0]
    );

    if (result.length === 0) {
      throw generateError("No existe ningún servicio que contenga" + type, 400);
    }

    return result;
  } finally {
    if (connection) connection.release();
  }
};

const createComment = async (
  comment,
  service_file = "",
  user_id,
  service_id,
  hide = false,
  solution = false
) => {
  let connection;

  try {
    connection = await getConnection();

    const [newComment] = await connection.query(
      `
    INSERT INTO comments (user_id, requiredS_id, comment, serviceFile, hide) VALUES (?, ?, ?, ?, ?)`,
      [user_id, service_id, comment, service_file, hide]
    );

    console.log(chalk.green("Comentario creado"));

    return newComment.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const deleteComment = async (id_s, id_c) => {
  let connection;
  try {
    connection = await getConnection();

    const [getCommentByID_s] = await connection.query(
      `SELECT * FROM comments WHERE requireds_id = ?`,
      [id_s]
    );

    if (getCommentByID_s.length === 0) {
      throw generateError("No hay comentarios de este servicio", 404);
    }

    const [getCommentByID_c] = await connection.query(
      `SELECT * FROM comments WHERE id = ?`,
      [id_c]
    );

    if (getCommentByID_c.length === 0) {
      throw generateError("No hay comentarios con esta ID", 404);
    }

    const [deletedComment] = await connection.query(
      `DELETE FROM comments WHERE requireds_id = ? AND id = ?`,
      [id_s, id_c]
    );

    if (deletedComment.length === 0) {
      throw generateError("No hay nigun comentario", 400);
    }

    return deletedComment;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createService,
  getServiceByID,
  getAllServices,
  updateServiceStatus,
  getServiceByType,
  createComment,
  deleteComment,
};
