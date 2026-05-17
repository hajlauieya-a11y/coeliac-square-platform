import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Recipe from "../models/Recipe.js";

dotenv.config();

const recipes = [
  {
    title: "Roasted Squash & Tahini Power Bowl",
    description:
      "A vibrant, nutrient-dense feast featuring caramelized seasonal squash, creamy avocado, and a zesty lemon-tahini dressing.",
    image: "",
    badge: "BEGINNER",
    imageBadge: "VEGAN",
    time: "25 min",
    level: "Beginner",
    servings: "2 Bowls",
    profile: "Gluten-Free",
    category: "Bowls",
    filters: ["Vegan", "Dairy-Free", "Nut-Free", "Under 30 Mins"],
    isFeatured: true,
    ingredients: [
      { name: "Butternut Squash", qty: "400g" },
      { name: "Cooked Quinoa", qty: "250g" },
      { name: "Avocado", qty: "1" },
      { name: "Tahini", qty: "3 tbsp" },
      { name: "Lemon Juice", qty: "2 tbsp" },
    ],
    steps: [
      {
        title: "Roast the Squash",
        text: "Cube the squash, season with olive oil and sea salt, then roast until caramelized and tender.",
      },
      {
        title: "Make the Dressing",
        text: "Whisk tahini, lemon juice, warm water, salt, and pepper until creamy.",
      },
      {
        title: "Assemble",
        text: "Layer quinoa, squash, avocado, and dressing in bowls. Serve warm.",
      },
    ],
    tip: "Add fresh herbs at the end for brightness.",
  },
  {
    title: "Velvet Vanilla Cupcakes",
    description: "Soft gluten-free vanilla cupcakes with a tender crumb and light frosting.",
    image: "",
    badge: "INTERMEDIATE",
    imageBadge: "VEGAN OPTION",
    time: "45 min",
    level: "Intermediate",
    servings: "12 Cupcakes",
    profile: "Gluten-Free",
    category: "Bakery",
    filters: ["Vegan", "Dairy-Free"],
    ingredients: [
      { name: "Gluten-Free Flour Blend", qty: "220g" },
      { name: "Sugar", qty: "160g" },
      { name: "Eggs", qty: "2" },
      { name: "Vanilla Extract", qty: "2 tsp" },
      { name: "Milk", qty: "180ml" },
    ],
    steps: [
      {
        title: "Prepare the Batter",
        text: "Whisk dry ingredients, then fold in wet ingredients until smooth.",
      },
      {
        title: "Bake",
        text: "Divide into cupcake cases and bake until the tops spring back.",
      },
    ],
    tip: "Let cupcakes cool fully before frosting.",
  },
  {
    title: "Sea Salt Choc Cookies",
    description: "Chewy chocolate cookies finished with flaky sea salt.",
    image: "",
    badge: "BEGINNER",
    time: "20 min",
    level: "Beginner",
    servings: "16 Cookies",
    profile: "Gluten-Free",
    category: "Cookies",
    filters: ["Under 30 Mins"],
    ingredients: [
      { name: "Gluten-Free Flour Blend", qty: "180g" },
      { name: "Cocoa Powder", qty: "35g" },
      { name: "Chocolate Chips", qty: "120g" },
      { name: "Butter", qty: "100g" },
      { name: "Sea Salt", qty: "1 tsp" },
    ],
    steps: [
      {
        title: "Mix",
        text: "Cream butter and sugar, then add dry ingredients and chocolate chips.",
      },
      {
        title: "Bake",
        text: "Bake until set at the edges and soft in the center.",
      },
    ],
  },
  {
    title: "Zesty Lemon & Berry Tart",
    description: "A crisp gluten-free tart filled with lemon cream and fresh berries.",
    image: "",
    badge: "INTERMEDIATE",
    time: "60 min",
    level: "Intermediate",
    servings: "8 Slices",
    profile: "Gluten-Free",
    category: "Tarts",
    filters: ["Nut-Free"],
    ingredients: [
      { name: "Gluten-Free Tart Shell", qty: "1" },
      { name: "Lemon Curd", qty: "250g" },
      { name: "Mixed Berries", qty: "200g" },
      { name: "Cream", qty: "120ml" },
    ],
    steps: [
      {
        title: "Fill the Shell",
        text: "Fold lemon curd with whipped cream and spoon into the tart shell.",
      },
      {
        title: "Decorate",
        text: "Top with berries and chill before slicing.",
      },
    ],
  },
];

const seedRecipes = async () => {
  try {
    await connectDB();
    await Recipe.deleteMany();
    await Recipe.insertMany(recipes);
    console.log("Recipes seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Recipe seed failed:", error.message);
    process.exit(1);
  }
};

seedRecipes();
