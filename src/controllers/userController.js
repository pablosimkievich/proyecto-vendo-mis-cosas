const db = require("../database/models/index");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { devNull } = require("os");




const userList = async (req, res) => {
  try {
    const allUsers = await db.User.findAll({
      where: {
        status: "Activo",
      },
    });
    res.render("user/userList", { allUsers });
  } catch (error) {
    console.log(error);
  }
};




const userProfile = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await db.User.findOne({
      where: {
        id: id,
        status: "Activo",
      },
      include: [
        {
          association: "vendor_user_reviews",
        },
        {
          association: "buyer_user_reviews",
        },
        {
          association: "products",
          where: { status: 'Disponible'}
        },
      ],
    });

    if (user) {
      res.render("user/userProfile", { user, id });
    } else {
      res.render("notFound404");
    }
  } catch (error) {
    console.log(error);
  }
};




const registerForm = (req, res) => {
  res.render("user/registerForm");
};




const registerProcess = async (req, res) => {
  try {
    const { user_avatar } = req.body;
    const resultValidation = validationResult(req);

    // Verificar si hay errores de validación
    if (resultValidation.errors.length > 0) {
      console.log("Errores de validación:", resultValidation.mapped());

      console.log("datos antiguos: ", req.body);
      return res.render("user/registerForm", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    const userInDB = await db.User.findOne({
      where: {
        user_email: req.body.user_email,
      },
    });

    // Verificar si el usuario ya existe
    if (userInDB) {
      return res.render("user/registerForm", {
        errors: {
          user_email: {
            msg: "El email ya se encuentra registrado",
          },
        },
        oldData: req.body,
      });
    }

    // Si no hay errores, proceder a guardar el avatar
    const base64Data = user_avatar.replace(/^data:image\/png;base64,/, "");
    const timestamp = Date.now();
    const fileName = `avatar_${timestamp}.png`;
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "img",
      "users",
      fileName
    );

    await fs.promises.writeFile(filePath, base64Data, "base64");

    // Crear el nuevo usuario
    const newUser = {
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      password: bcrypt.hashSync(req.body.password, 10),
      user_avatar: fileName,
      user_type_fk_id: 1,
      sales_description: req.body.sales_description,
      status: 'Activo'
    };

    await db.User.create(newUser);

    // Redireccionar al login
    return res.redirect("/login");
  } catch (error) {
    console.log("Error en el registro:", error);
    return res.status(500).render("user/registerForm", {
      errors: { general: { msg: "Ocurrió un error, intenta de nuevo." } },
      oldData: req.body,
    });
  }
};




const updateUserForm = async (req, res) => {
  const id = req.params.userId;
  const user = await db.User.findByPk(id);

  res.render("user/updateUserForm", { user });
};




const updateUserProcess = async (req, res) => {
  console.log(req.body);
  const resultValidation = validationResult(req);
  const userToUpdate = await db.User.findByPk(req.body.id);
  const userInDB = await db.User.findOne({
    where: {
      user_email: req.body.user_email,
    },
  });

  // Verificar si hay errores de validación
  if (resultValidation.errors.length > 0) {
    console.log(resultValidation);

    res.render("user/updateUserForm", {
      errors: resultValidation.mapped(),
      oldData: req.body,
      user: userToUpdate,
    });
  }

  // Verificar que el nuevo mail no está en la DB
  // O que ese D
  if (userInDB && userInDB.id != req.body.id) {
    res.render("user/updateUserForm", {
      errors: {
        user_email: {
          msg: "El email ya se encuentra registrado",
        },
      },
      oldData: req.body,
      user: userToUpdate,
    });
  }

  // Si no hay errores, proceder a guardar el avatar
  // Si no se ha cambiado el avatar, mantener el anterior
  let fileName = userToUpdate.user_avatar;

  if (req.body.user_avatar && req.body.user_avatar.value !== "") {
    // Procesar el nuevo avatar si se ha cambiado
    const user_avatar = req.body.user_avatar;
    const base64Data = user_avatar.replace(/^data:image\/png;base64,/, "");
    const timestamp = Date.now();
    fileName = `avatar_${timestamp}.png`;
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "img",
      "users",
      fileName
    );

    await fs.promises.writeFile(filePath, base64Data, "base64");

    // Eliminar la imagen anterior si es diferente
    if (userToUpdate.user_avatar && userToUpdate.user_avatar !== fileName) {
      const oldFilePath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "img",
        "users",
        userToUpdate.user_avatar
      );
      try {
        await fs.promises.unlink(oldFilePath);
      } catch (error) {
        console.log(`Error al eliminar la imagen anterior: ${error}`);
      }
    }
  } else {
    // Si no se subió una nueva imagen, mantenemos la anterior
    fileName = userToUpdate.user_avatar;
  }

  // usuario actualizado
  const salesDescription =
    req.body.sales_description === ""
      ? userToUpdate.sales_description
      : req.body.sales_description;

  let userUpdated = {
    id: req.body.id,
    user_type_fk_id: 1,
    user_name: req.body.user_name,
    user_email: req.body.user_email,
    user_avatar: fileName,
    password: userToUpdate.password,
    sales_description: salesDescription,
    status: 'Activo'
  };

  try {
    console.log(req.body);
    await db.User.update(userUpdated, {
      where: {
        id: userToUpdate.id,
      },
    });

    req.session.userLogged = req.body;
    res.locals.userLogged = req.session.userLogged;
    req.session.userLogged.user_avatar = fileName;
    res.locals.userLogged.user_avatar = fileName;
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};




const userDestroy = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await db.User.findByPk(id);
    console.log('deletion')

    if (!req.session.userLogged) {
      return res.render("notFound404");
    } else if (parseInt(req.session.userLogged.id) !== id) {
      return res.render("notFound404");
    }

    if (user && parseInt(req.session.userLogged.id) === id) {
      console.log('deleted')
      await db.User.update({ status: 'Inactivo' }, {
         where: { 
          id: id
         }
         });
      req.session.destroy();
      res.redirect('/')
    } else {
      res.render("notFound404");
    }
  } catch (error) {
    console.log(error);
  }
};




const loginForm = (req, res) => {
  res.render("user/loginForm");
};




const loginProcess = async (req, res) => {
  const resultValidation = validationResult(req);

  console.log(req.body);
  let errors = resultValidation.mapped();
  oldData = req.body;

  const userToLogin = await db.User.findOne({
    where: {
      user_email: req.body.user_email,
    },
  });

  console.log(userToLogin);

  if (errors.user_email || errors.password) {
    console.log(errors);

    res.render("user/loginForm", {
      errors: resultValidation.mapped(),
      oldData: req.body,
    });
  }

  if (!userToLogin) {
    res.render("user/loginForm", {
      errors: {
        user_email: {
          msg: "El email no se encuentra registrado",
        },
      },
    });
  }

  const password = req.body.password;
  let passwordMatch = true; /*bcrypt.compareSync(password, userToLogin.password);*/

  if (!passwordMatch) {
    res.render("user/loginForm", {
      errors: {
        password: {
          msg: "Las credenciales son invalidas",
        },
      },
    });
  } else {
    console.log("Es el password");
    delete userToLogin.password;
    req.session.userLogged = userToLogin;

    // req.body.remember = true
    if (req.body.remember) {
      res.cookie("userEmail", req.body.user_email, { maxAge: 1000 * 120 });
    }

    return res.redirect(`/usuarios/${req.session.userLogged.id}`);
  }
};




const reviewUserForm = (req, res) => {
  res.render("user/reviewUserForm");
};




const logout = (req, res) => {
  res.clearCookie("userEmail");
  req.session.destroy();
  return res.redirect("/");
};




module.exports = {
  userList,
  userProfile,
  registerForm,
  registerProcess,
  updateUserForm,
  updateUserProcess,
  userDestroy,
  reviewUserForm,
  loginForm,
  loginProcess,
  logout,
};
