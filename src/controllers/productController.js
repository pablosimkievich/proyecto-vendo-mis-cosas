const db = require("../database/models/index");
const op = db.Sequelize.Op;
const { validationResult } = require("express-validator");

const productList = async (req, res) => {
  try {
    const getAllProducts = await db.Product.findAll({
      where: { status: "Disponible" },
      include: [
        {
          association: "users",
        },
      ],
      order: [["id", "DESC"]],
    });
    res.render("product/productList", { getAllProducts });
  } catch (error) {
    console.log(error);
  }
};

const getCategory = async (req, res) => {
  try {
    /* if(req.params.id > 16 || req.params.id < 1) {
            res.send(`No existe la categoría ${req.params.id}`)
        } */

    const id = req.params.id;

    const getCategory = await db.Category.findByPk(id);

    const getCategoryProducts = await db.Product.findAll({
      where: {
        category_id: req.params.id,
        status: "Disponible",
      },
      include: [
        {
          association: "categories",
        },
        {
          association: "users",
        },
      ],
    });

    res.render("product/productByCategory", {
      getCategoryProducts,
      getCategory,
      id,
    });
  } catch (error) {
    console.log(error);
  }
};

const productDetail = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await db.Product.findByPk(id, {
      include: [
        {
          association: "categories",
        },
        {
          association: "product_additional_images",
        },
        {
          association: "users",
        },
      ],
    });

    if (product && product.status === "Disponible") {
      const relatedProducts = await db.Product.findAll({
        where: {
          category_id: product.category_id,
        },
        limit: 4,
      });
      console.log(product);

      res.render("product/productDetail", { product, relatedProducts });
    } else {
      res.render("notFound404");
    }
  } catch (error) {
    console.log(error);
  }
};

const addProductForm = async (req, res) => {
  const categories = await db.Category.findAll();

  res.render("product/addProductForm", { categories });
};

const createProduct = async (req, res) => {
  console.log(req.body);

  const categories = await db.Category.findAll();

  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    console.log(resultValidation);

    res.render("product/addProductForm", {
      errors: resultValidation.mapped(),
      oldData: req.body,
      categories,
    });
  }

  // Si hay un error de Multer, regresa al formulario con el mensaje de error
  if (req.multerError) {
    return res.render("product/addProductForm", {
      errors: {
        main_image: {
          msg: req.multerError,
        },
      },
      oldData: req.body, // Para preservar los datos del formulario
      categories,
    });
  }

  console.log(req.files); // Debería mostrar un objeto con 'main_image' y 'additional_images'

  // Verifica si se subió una imagen principal
  if (!req.files || !req.files.main_image) {
    return res.render("product/addProductForm", {
      errors: { main_image: { msg: "Debes seleccionar una imagen principal" } },
      oldData: req.body,
      categories,
    });
  }

  const mainImage = req.files["main_image"]
    ? req.files["main_image"][0].filename
    : null;
  const additionalImages = req.files["additional_images"]
    ? req.files["additional_images"].map((file) => file.filename)
    : [];

  console.log(mainImage); // Debería mostrar el nombre del archivo principal
  console.log(additionalImages); // Debería mostrar un array con los nombres de los archivos adicionales

  // console.log('graba a la db')
  const status = "Disponible";

  const newProduct = {
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    product_price: req.body.product_price,
    category_id: req.body.category_id,
    user_fk_id: req.body.user_fk_id,
    main_image: mainImage,
    stock: req.body.stock,
    status: status,
  };

  console.log(newProduct);

  try {
    await db.Product.create(newProduct);

    const lastProduct = await db.Product.findOne({
      where: {
        product_name: {
          [op.like]: `%${req.body.product_name}`,
        },
      },
    });

    let arrayCheck = Array.isArray(additionalImages);

    if (arrayCheck == true) {
      let newImages = {
        product_fk_id: lastProduct.id,
        image_2: additionalImages[0],
        image_3: additionalImages[1],
        image_4: additionalImages[2],
      };

      await db.ProductAdditionalImage.create(newImages);

      res.redirect("/productos");
    } else {
      let newImages = {
        product_fk_id: lastProduct.id,
        image_2: additionalImages,
      };
  
      await db.ProductAdditionalImage.create(newImages);
  
      res.redirect("/productos");
    }


  } catch (error) {
    console.log(error);
  }
};

const updateProductForm = async (req, res) => {
  const categories = await db.Category.findAll();

  const id = parseInt(req.params.productId);

  const product = await db.Product.findByPk(id, {
    include: [
      {
        association: "product_additional_images",
      },
      {
        association: "users",
      },
    ],
  });

  if (product) {
    res.render("product/updateProductForm", { categories, product });
  } else {
    res.render("notFound404");
  }
};

const updateProduct = async (req, res) => {
  // console.log(req.body);

  const categories = await db.Category.findAll();
  const id = req.params.productId;

  const product = await db.Product.findByPk(id, {
    include: [
      {
        association: "users",
      },
      {
        association: "product_additional_images",
      },
    ],
  });

  const resultValidation = validationResult(req);

  if (resultValidation.errors.length > 0) {
    // console.log(resultValidation);

    res.render("product/updateProductForm", {
      errors: resultValidation.mapped(),
      oldData: req.body,
      categories: categories,
      product: product,
    });
  }

  console.log(req.files); // Debería mostrar un objeto con 'main_image' y 'additional_images'

  // Si hay un error de Multer, regresa al formulario con el mensaje de error
  if (req.multerError) {
    return res.render("product/addProductForm", {
      errors: {
        main_image: {
          msg: req.multerError,
        },
      },
      oldData: req.body, // Para preservar los datos del formulario
      categories,
      product,
    });
  }

  const mainImage = req.files["main_image"]
    ? req.files["main_image"][0].filename
    : null;
  const additionalImages = req.files["additional_images"]
    ? req.files["additional_images"].map((file) => file.filename)
    : [];

  console.log(mainImage); // Debería mostrar el nombre del archivo principal
  console.log(additionalImages); // Debería mostrar un array con los nombres de los archivos adicionales

  // console.log('graba a la db')
  const status = "Disponible";

  const updatedProduct = {
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    product_price: req.body.product_price,
    category_id: req.body.category_id,
    user_fk_id: req.body.user_fk_id,
    main_image: mainImage !== null ? mainImage : product.main_image,
    stock: req.body.stock,
    status: status,
  };

  // console.log(updatedProduct);

  try {
    await db.Product.update(updatedProduct, {
      where: {
        id: product.id,
      },
    });

    let arrayCheck = Array.isArray(additionalImages);

    if (arrayCheck == true) {
      let updatedImages = {
        product_fk_id: product.id,
        image_2: additionalImages[0],
        image_3: additionalImages[1],
        image_4: additionalImages[2],
      };
      console.log(updatedImages)

      await db.ProductAdditionalImage.update(updatedImages, {
        where: {
          product_fk_id: product.id,
        },
      });

      res.redirect("/productos");
    } else {
      let updatedImages = {
        product_fk_id: product.id,
        image_2: additionalImages,
      };
      console.log(updatedImages)

      await db.ProductAdditionalImage.update(updatedImages, {
        where: {
          product_fk_id: product.id,
        },
      });

      res.redirect("/productos");
    }
  } catch (error) {
    console.log(error);
  }
};

const destroyProduct = async (req, res) => {
  const productId = parseInt(req.params.productId);
  const userId = parseInt(req.params.userId);
  const product = await db.Product.findByPk(productId);

  // console.log(`Borrando producto: ${productId}`);

  if (product && parseInt(req.session.userLogged.id) === userId) {
    console.log("deleted");
    await db.Product.update(
      { status: "No disponible" },
      {
        where: {
          id: productId,
        },
      }
    );
    res.redirect(`/usuarios/${userId}`);
  } else {
    res.render("notFound404");
  }
};

module.exports = {
  productList,
  getCategory,
  productDetail,
  addProductForm,
  createProduct,
  updateProductForm,
  updateProduct,
  destroyProduct,
};
