const Category = require("../models/category");
const Item = require("../models/item");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.categories_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}).sort({ name: 1 }).exec();

  res.render("category_list", {
    title: "Categories",
    category_list: allCategories,
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name").exec(),
  ]);

  res.render("category_detail", {
    title: category.name,
    category: category,
    items: itemsInCategory,
  });
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render("category_form", {
    title: "Create category",
  });
});

exports.category_create_post = [
  body("name", "Category name must contain at least 3 characters.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description").trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      return res.render("category_form", {
        title: "Create category",
        category: category,
        errors: errors.array(),
      });
    }

    const categoryExists = await Category.findOne({ name: req.body.name })
      .collation({ locale: "en", strength: 2 })
      .exec();
    if (categoryExists) return res.redirect(categoryExists.url);

    await category.save();
    return res.redirect(category.url);
  }),
];

exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  if (!category) {
    const err = new Error("Category does not exist");
    err.status = 404;
    next(err);
  }

  res.render("category_form", {
    title: "Update category",
    category: category,
  });
});

exports.category_update_post = [
  body("name", "Category name must contain at least 3 characters.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description").trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      return res.render("category_form", {
        title: "Update category",
        category: category,
        errors: errors.array(),
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      category,
      {},
    );
    return res.redirect(updatedCategory.url);
  }),
];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);

  if (!category) res.redirect("/categories");

  res.render("category_delete", {
    title: "Delete category",
    category: category,
    items_in_category: itemsInCategory,
  });
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);

  if (itemsInCategory > 0)
    return res.render("category_delete", {
      title: "Delete category",
      category: category,
      items_in_category: itemsInCategory,
    });

  await Category.findByIdAndDelete(req.params.id);
  res.redirect("/categories");
});
