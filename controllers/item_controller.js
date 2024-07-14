const Item = require("../models/item");
const Category = require("../models/category");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.item_list = asyncHandler(async (req, res, next) => {
  const items = await Item.find({}, "name").sort({ name: 1 }).exec();

  res.render("item_list", {
    title: "Items",
    items: items,
  });
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").exec();

  res.render("item_detail", {
    title: item.name,
    item: item,
  });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render("item_form", {
    title: "Create Item",
    all_categories: allCategories,
  });
});

exports.item_create_post = [
  body("name", "Name must be at least 2 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("category", "Must select a category")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description").trim().escape(),
  body("price", "Must specify an item price.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("stock", "Must specify a stock amount.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      const allCategories = await Category.find().sort({ name: 1 }).exec();

      return res.render("item_form", {
        title: "Create Item",
        all_categories: allCategories,
        item: item,
        errors: errors.array(),
      });
    }

    await item.save();
    res.redirect(item.url);
  }),
];

exports.item_update_get = asyncHandler(async (req, res, next) => {
  const [item, allCategories] = await Promise.all([
    Item.findById(req.params.id).populate("category").exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);

  if (!item) {
    const err = new Error("Item does not exist");
    err.status = 404;
    next(err);
  }

  res.render("item_form", {
    title: `Update item`,
    item: item,
    all_categories: allCategories,
  });
});

exports.item_update_post = [
  body("name", "Name must be at least 2 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("category", "Must select a category")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description").trim().escape(),
  body("price", "Must specify an item price.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("stock", "Must specify a stock amount.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const allCategories = await Category.find().sort({ name: 1 }).exec();

      return res.render("item_form", {
        title: "Create Item",
        all_categories: allCategories,
        item: item,
        errors: errors.array(),
      });
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {});
    res.redirect(updatedItem.url);
  }),
];

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete GET");
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete POST");
});
