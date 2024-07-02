#! /usr/bin/env node

console.log(
  'This script populates some test items, categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"',
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Item = require("./models/item");

const categories = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");

  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");

  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function catregoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, description, category, price, stock) {
  const itemDetail = {
    name: name,
    description: description,
    price: price,
    category: category,
    price: price,
    stock: stock,
  };

  const item = new Item(itemDetail);

  await item.save();

  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    catregoryCreate(0, "Cat 1"),
    catregoryCreate(1, "Cat 2"),
    catregoryCreate(2, "Cat 3"),
  ]);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(
      0,
      "Item 1",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque facilisis leo. Nunc orci ligula, feugiat at lacus in, tristique auctor massa. Duis pulvinar lobortis varius. Phasellus placerat, libero id lobortis hendrerit, elit lorem laoreet arcu, sed cursus odio turpis in lorem. Vivamus ultricies libero sit amet risus iaculis rutrum. Cras suscipit fermentum dui, ut semper sapien hendrerit feugiat. Nunc sagittis quam ac leo dapibus, quis mollis metus bibendum. Sed vitae lobortis neque, at hendrerit sem. Nunc semper sapien sed fermentum volutpat. Vestibulum eget purus non risus congue interdum. Ut vulputate ut libero id convallis. Vestibulum tristique nisi euismod eros sollicitudin, eu volutpat dolor porttitor. Nullam feugiat ipsum neque, vel cursus enim volutpat ut. Fusce porttitor tincidunt urna maximus porttitor. Suspendisse eget enim in nisi mattis ultrices.",
      categories[0],
      1,
      10,
    ),
    itemCreate(
      1,
      "Item 2",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque facilisis leo. Nunc orci ligula, feugiat at lacus in, tristique auctor massa. Duis pulvinar lobortis varius. Phasellus placerat, libero id lobortis hendrerit, elit lorem laoreet arcu, sed cursus odio turpis in lorem. Vivamus ultricies libero sit amet risus iaculis rutrum. Cras suscipit fermentum dui, ut semper sapien hendrerit feugiat. Nunc sagittis quam ac leo dapibus, quis mollis metus bibendum. Sed vitae lobortis neque, at hendrerit sem. Nunc semper sapien sed fermentum volutpat. Vestibulum eget purus non risus congue interdum. Ut vulputate ut libero id convallis. Vestibulum tristique nisi euismod eros sollicitudin, eu volutpat dolor porttitor. Nullam feugiat ipsum neque, vel cursus enim volutpat ut. Fusce porttitor tincidunt urna maximus porttitor. Suspendisse eget enim in nisi mattis ultrices.",
      categories[0],
      1,
      10,
    ),
    itemCreate(
      2,
      "Item 3",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque facilisis leo. Nunc orci ligula, feugiat at lacus in, tristique auctor massa. Duis pulvinar lobortis varius. Phasellus placerat, libero id lobortis hendrerit, elit lorem laoreet arcu, sed cursus odio turpis in lorem. Vivamus ultricies libero sit amet risus iaculis rutrum. Cras suscipit fermentum dui, ut semper sapien hendrerit feugiat. Nunc sagittis quam ac leo dapibus, quis mollis metus bibendum. Sed vitae lobortis neque, at hendrerit sem. Nunc semper sapien sed fermentum volutpat. Vestibulum eget purus non risus congue interdum. Ut vulputate ut libero id convallis. Vestibulum tristique nisi euismod eros sollicitudin, eu volutpat dolor porttitor. Nullam feugiat ipsum neque, vel cursus enim volutpat ut. Fusce porttitor tincidunt urna maximus porttitor. Suspendisse eget enim in nisi mattis ultrices.",
      categories[2],
      1,
      10,
    ),
    itemCreate(
      3,
      "Item 4",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque facilisis leo. Nunc orci ligula, feugiat at lacus in, tristique auctor massa. Duis pulvinar lobortis varius. Phasellus placerat, libero id lobortis hendrerit, elit lorem laoreet arcu, sed cursus odio turpis in lorem. Vivamus ultricies libero sit amet risus iaculis rutrum. Cras suscipit fermentum dui, ut semper sapien hendrerit feugiat. Nunc sagittis quam ac leo dapibus, quis mollis metus bibendum. Sed vitae lobortis neque, at hendrerit sem. Nunc semper sapien sed fermentum volutpat. Vestibulum eget purus non risus congue interdum. Ut vulputate ut libero id convallis. Vestibulum tristique nisi euismod eros sollicitudin, eu volutpat dolor porttitor. Nullam feugiat ipsum neque, vel cursus enim volutpat ut. Fusce porttitor tincidunt urna maximus porttitor. Suspendisse eget enim in nisi mattis ultrices.",
      categories[1],
      1,
      10,
    ),
    itemCreate(
      4,
      "Item 5",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque facilisis leo. Nunc orci ligula, feugiat at lacus in, tristique auctor massa. Duis pulvinar lobortis varius. Phasellus placerat, libero id lobortis hendrerit, elit lorem laoreet arcu, sed cursus odio turpis in lorem. Vivamus ultricies libero sit amet risus iaculis rutrum. Cras suscipit fermentum dui, ut semper sapien hendrerit feugiat. Nunc sagittis quam ac leo dapibus, quis mollis metus bibendum. Sed vitae lobortis neque, at hendrerit sem. Nunc semper sapien sed fermentum volutpat. Vestibulum eget purus non risus congue interdum. Ut vulputate ut libero id convallis. Vestibulum tristique nisi euismod eros sollicitudin, eu volutpat dolor porttitor. Nullam feugiat ipsum neque, vel cursus enim volutpat ut. Fusce porttitor tincidunt urna maximus porttitor. Suspendisse eget enim in nisi mattis ultrices.",
      categories[1],
      1,
      10,
    ),
    itemCreate(
      5,
      "Item 6",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque facilisis leo. Nunc orci ligula, feugiat at lacus in, tristique auctor massa. Duis pulvinar lobortis varius. Phasellus placerat, libero id lobortis hendrerit, elit lorem laoreet arcu, sed cursus odio turpis in lorem. Vivamus ultricies libero sit amet risus iaculis rutrum. Cras suscipit fermentum dui, ut semper sapien hendrerit feugiat. Nunc sagittis quam ac leo dapibus, quis mollis metus bibendum. Sed vitae lobortis neque, at hendrerit sem. Nunc semper sapien sed fermentum volutpat. Vestibulum eget purus non risus congue interdum. Ut vulputate ut libero id convallis. Vestibulum tristique nisi euismod eros sollicitudin, eu volutpat dolor porttitor. Nullam feugiat ipsum neque, vel cursus enim volutpat ut. Fusce porttitor tincidunt urna maximus porttitor. Suspendisse eget enim in nisi mattis ultrices.",
      categories[2],
      1,
      10,
    ),
    itemCreate(
      6,
      "Item 7",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque facilisis leo. Nunc orci ligula, feugiat at lacus in, tristique auctor massa. Duis pulvinar lobortis varius. Phasellus placerat, libero id lobortis hendrerit, elit lorem laoreet arcu, sed cursus odio turpis in lorem. Vivamus ultricies libero sit amet risus iaculis rutrum. Cras suscipit fermentum dui, ut semper sapien hendrerit feugiat. Nunc sagittis quam ac leo dapibus, quis mollis metus bibendum. Sed vitae lobortis neque, at hendrerit sem. Nunc semper sapien sed fermentum volutpat. Vestibulum eget purus non risus congue interdum. Ut vulputate ut libero id convallis. Vestibulum tristique nisi euismod eros sollicitudin, eu volutpat dolor porttitor. Nullam feugiat ipsum neque, vel cursus enim volutpat ut. Fusce porttitor tincidunt urna maximus porttitor. Suspendisse eget enim in nisi mattis ultrices.",
      categories[2],
      1,
      10,
    ),
    itemCreate(
      7,
      "Item 8",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque facilisis leo. Nunc orci ligula, feugiat at lacus in, tristique auctor massa. Duis pulvinar lobortis varius. Phasellus placerat, libero id lobortis hendrerit, elit lorem laoreet arcu, sed cursus odio turpis in lorem. Vivamus ultricies libero sit amet risus iaculis rutrum. Cras suscipit fermentum dui, ut semper sapien hendrerit feugiat. Nunc sagittis quam ac leo dapibus, quis mollis metus bibendum. Sed vitae lobortis neque, at hendrerit sem. Nunc semper sapien sed fermentum volutpat. Vestibulum eget purus non risus congue interdum. Ut vulputate ut libero id convallis. Vestibulum tristique nisi euismod eros sollicitudin, eu volutpat dolor porttitor. Nullam feugiat ipsum neque, vel cursus enim volutpat ut. Fusce porttitor tincidunt urna maximus porttitor. Suspendisse eget enim in nisi mattis ultrices.",
      categories[1],
      1,
      10,
    ),
  ]);
}
