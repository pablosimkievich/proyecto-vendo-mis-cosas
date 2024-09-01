const { body } = require("express-validator");

validateUpdateProduct = [
  body("product_name")
    .notEmpty()
    .withMessage("Debes completar el nobre del producto")
    .bail()
    .isLength({ min: 3, max: 99 })
    .withMessage("El nombre debe tener entre 3 y 99 caracteres")
    .escape(),
  body("product_description")
    .optional()
    .isString()
    .isLength({ min: 5, max: 1000 })
    .withMessage("El texto debe tener entre 5 y 1000 caracteres")
    .escape()
    .bail(),
  body("product_price").notEmpty()
    .withMessage("Debes completar el precio")
    .isFloat({ gt: 0 }) // Verifica que el precio sea un número flotante mayor a 0
    .withMessage("El precio debe ser un número mayor a 0")
    .custom((value) => {
      // Asegura que el número tiene máximo dos decimales
      const decimalPlaces = (value.split(".")[1] || []).length;
      if (decimalPlaces > 2) {
        throw new Error("El precio no puede tener más de dos decimales");
      }
      return true;
    })
    .bail(),
  body("category_id")
    .notEmpty()
    .withMessage("Este campo no puede estar vacio")
    .bail(),
  body("main_image")
    .custom((value, { req }) => {
      let stringfile = req.body.main_image;

      if (stringfile) {
        if (
          !stringfile.includes(".jpg") &&
          !stringfile.includes(".png") &&
          !stringfile.includes(".jpeg") &&
          !stringfile.includes(".gif") &&
          !stringfile.includes(".webp")
        ) {
          throw new Error(
            "Las extensiones de archivo permitidas son '.jpg', '.jpeg  '.png', '.webp' y '.gif' "
          );
        }
      }
      return true;
    })
    .withMessage(
      "Las extensiones de archivo permitidas son '.jpg', '.jpeg' , '.png', 'webp' y '.gif' "
    ),
  body("additional_images")
    .custom((value, { req }) => {
      let stringfile = req.body.additional_images;
      console.log(stringfile);

      if (stringfile) {
        let arrayCheck = Array.isArray(stringfile);

        if (arrayCheck == true) {
          stringfile.map((elem) => {
            if (
              !elem.includes(".jpg") &&
              !elem.includes(".png") &&
              !elem.includes(".jpeg") &&
              !elem.includes(".gif") &&
              !elem.includes(".webp")
            ) {
              throw new Error(
                "Las extensiones de archivo permitidas son '.jpg', '.jpeg', '.png', 'webp y '.gif' "
              );
            }
          });
        } else {
          if (
            !stringfile.includes(".jpg") &&
            !stringfile.includes(".png") &&
            !stringfile.includes(".jpeg") &&
            !stringfile.includes(".gif") &&
            !stringfile.includes(".webp")
          ) {
            throw new Error(
              "Las extensiones de archivo permitidas son '.jpg', '.jpeg', '.png', 'webp' y '.gif' "
            );
          }
        }
      }
      return true;
    })
    .withMessage(
      "Las extensiones de archivo permitidas son '.jpg', '.jpeg', '.png', 'webp' y '.gif' "
    ),
];

module.exports = validateUpdateProduct;
