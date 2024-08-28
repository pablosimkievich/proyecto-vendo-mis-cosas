const db = require("../database/models/index");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const userList = async (req, res) => {
  try {
    const allUsers = await db.User.findAll();
    res.render("user/userList", { allUsers });
  } catch (error) {
    console.log(error);
  }
};

const userProfile = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await db.User.findByPk(id, {
      include: [
        {
          association: "vendor_user_reviews",
        },
        {
          association: "buyer_user_reviews",
        },
        {
          association: "products",
        },
      ],
    });

    if (user) {
      res.render("user/userProfile", { user });
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

const updateUserForm = (req, res) => {
  res.render("user/updateUserForm");
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
  let passwordMatch = bcrypt.compareSync(password, userToLogin.password);

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

    req.body.remember = true
    if (req.body.remember) {
      res.cookie("userEmail", req.body.user_email, { maxAge: 1000 * 120 });
    }

    return res.redirect("/");
  }
};

const reviewUserForm = (req, res) => {
  res.render("user/reviewUserForm");
};

module.exports = {
  userList,
  userProfile,
  registerForm,
  registerProcess,
  updateUserForm,
  reviewUserForm,
  loginForm,
  loginProcess,
};
