import productModel from "../models/productSchema.js";
import fs from "fs";
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderSchema.js";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// braintree token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// braintree payment
export const braintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaksi = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            seller: req.user._id,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const createProductController = async (req, res) => {
  try {
    const { name, slug, descriptions, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });
      case !descriptions:
        return res.status(500).send({ error: "descriptions is required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !quantity:
        return res.status(500).send({ error: "kuantiti is required" });
      case !photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is required and should be less than 1mb" });
    }
    const products = new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product created sucsessfully",
      products,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        error,
        message: "Error create product",
      });
  }
};

// GET ALL PRODUCT BY PENJUAL
// export const getProductByPenjual = async (req, res) => {
//   const idpenjual = req.query.tokopenjual;
//   try {
//     let getAllProductbyPenjual;
//     if (idpenjual) {
//       getAllProductbyPenjual = await productModel
//         .find({ idpenjual })
//         .populate("category")
//         .select("-photo")
//         .limit(12)
//         .sort({ createdAt: -1 });
//     }
//     res.status(200).send({
//       message: "Sukses Get your Product",
//       success: true,
//       getAllProductbyPenjual,
//       count: getAllProductbyPenjual.length,
//       tes: idpenjual,
//     });
//   } catch (error) {
//     console.log(error),
//       res.status(500).send({
//         success: false,
//         error: error.message,
//         message: "Error get product by penjual",
//       });
//   }
// };

export const getProductByPenjual = async (req, res) => {
  try {
    const getAllProductbyPenjual = await productModel
      .find({ idpenjual: req.user._id })
      // .populate("category")
      .populate("idpenjual")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      message: "Sukses Get your Product",
      success: true,
      getAllProductbyPenjual,
      count: getAllProductbyPenjual.length,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        error: error.message,
        message: "Error get product by penjual",
      });
  }
};

// GET PRODUCT
export const getProductController = async (req, res) => {
  try {
    const getAllProduct = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Products",
      getAllProduct,
      countTotal: getAllProduct.length,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        error: error.message,
        message: "Error get product",
      });
  }
};

// GET SINGLE PRODUCT
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        error: error.message,
        message: "Error get single product",
      });
  }
};

// poto product
export const getPhotoProduct = async (req, res) => {
  try {
    const photoProduct = await productModel
      .findById(req.params.pid)
      .select("photo");
    if (photoProduct.photo.data) {
      res.set("Content-type", photoProduct.photo.contentType);
      return res.status(200).send(photoProduct.photo.data);
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error get photo product",
    });
  }
};

// delete prduct
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        error: error.message,
        message: "Error get single product",
      });
  }
};

// update product
export const updateProductController = async (req, res) => {
  try {
    const {
      name,
      slug,
      descriptions,
      price,
      category,
      quantity,
      shipping,
      namatoko,
      idpenjual,
    } = req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });
      case !descriptions:
        return res.status(500).send({ error: "descriptions is required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !namatoko:
        return res.status(500).send({ error: "namatoko is required" });
      case !idpenjual:
        return res.status(500).send({ error: "idpenjual is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !quantity:
        return res.status(500).send({ error: "kuantiti is required" });
      case !photo && photo > 1000000:
        return res
          .status(500)
          .send({ error: "photo is required and should be less than 1mb" });
    }
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (category) {
      category.name;
    }
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product updated sucsessfully",
      products,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        error,
        message: "Error update product",
      });
  }
};

//filter products
export const getPoductFilter = async (req, res) => {
  try {
    const { check, radio } = req.body;
    let args = {};
    if (check.length > 0) args.category = check;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
      tes: check,
    });
  } catch (error) {
    console.log(error),
      res.status(400).send({
        success: false,
        error,
        message: "Error filter product",
      });
  }
};

// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error),
      res.status(400).send({
        success: false,
        error,
        message: "Error filter product count",
      });
  }
};

// product per pagge
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const product = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      product,
      pages: page,
    });
  } catch (error) {
    console.log(error),
      res.status(400).send({
        success: false,
        error,
        message: "Error  product per page",
      });
  }
};

//search
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { descriptions: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(result);
  } catch (error) {
    console.log(error),
      res.status(400).send({
        success: false,
        error,
        message: "Error search  product ",
      });
  }
};

export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const product = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error),
      res.status(400).send({
        success: false,
        error,
        message: "Error related  product ",
      });
  }
};

// get product by category
export const productCategoryController = async (req, res) => {
  try {
    // const categories = await categoryModel.find({ slug: req.params.slug });
    // const products = await productModel.find({ category }).populate("category");
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};
