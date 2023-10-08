//CRUD FUNCTIONALITY
// Import the required modules
import express from "express";
import morgan from "morgan";

// Import owner-related helper functions
import {
  getOwners,
  getOwnerById,
  createOwner,
  updateOwnerById,
  deleteOwnerById,
} from "./ownerModel.js";

// Import cat-related helper functions
import {
  getCats,
  getCatById,
  createCat,
  updateCatById,
  deleteCatById,
} from "./catModel.js";

// Initialize the express app
const app = express();
// Retrieve the port number from environment variables
const PORT = process.env.PORT;

// Middleware
app.use(morgan("dev")); // Morgan is used for logging HTTP requests to the console in a developer-friendly format
app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests



// Endpoint to retrieve all authors
app.get("/owners/", async function (req, res) {
    const owners = await getOwners();
    res.status(200).json({ status: "success", data: owners });
  });

// Endpoint to retrieve by id
app.get("/owners/:id", async function (req, res) {
    const id = req.params.id;
    const owner = await getOwnerById(id);
    // 404 status if not found
    if (!owner) {
        return res.status(404).json({status: "fail", data: {msg: "Owner not found"}});
    }
    res.status(200).json({status: "success", data: owner});
});
  

app.post("/owners/", async function (req,res){
  const owners = req.body;
  const owner = await createOwner(owners);
  res.status(201).json({status: "success", data: owner})
})


// Endpoint to update a specific author by id
app.patch("/owners/:id", async function (req, res) {
  const id = req.params.id;
  const data = req.body;
  const owner = await updateOwnerById(id, data);
  // Assume 404 status if the author is not found
  if (!owner) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Owner not found" } });
  }
  res.status(200).json({ status: "success", data: owner });
});

// ________________________________

app.delete("/owners/:id", async function (req, res) {
    const id = req.params.id;
    const owner = await deleteOwnerById(id);
    // Assume 404 status if the owner is not found
    if (!owner) {
      return res
        .status(404)
        .json({ status: "fail", data: { msg: "Owner not found" } });
    }
    res.status(200).json({ status: "success", data: owner });
  });
  

// ________________________________ CAT CRUD FUNCTIONALITY

// Endpoint to retrieve all cats
app.get("/cats/", async function (req, res) {
    const cats = await getCats();
    res.status(200).json({ status: "success", data: cats });
  });

// Endpoint to retrieve by id
app.get("/cats/:id", async function (req, res) {
    const id = req.params.id;
    const cat = await getCatById(id);
    // 404 status if not found
    if (!cat) {
        return res.status(404).json({status: "fail", data: {msg: "Cat not found"}});
    }
    res.status(200).json({status: "success", data: cat});
});
  


app.post("/cats/", async function (req,res){
    const cats = req.body;
    const cat = await createCat(cats);
    res.status(201).json({status: "success", data: cat})
  })


  // Endpoint to update a specific author by id
app.patch("/cats/:id", async function (req, res) {
    const id = req.params.id;
    const data = req.body;
    const cat = await updateCatById(id, data);
    // Assume 404 status if the cat is not found
    if (!cat) {
      return res
        .status(404)
        .json({ status: "fail", data: { msg: "Cat not found" } });
    }
    res.status(200).json({ status: "success", data: cat });
  });


// Endpoint to delete a specific cat by id
app.delete("/cats/:id", async function (req, res) {
  const id = req.params.id;
  const cat = await deleteCatById(id);
  // Assume 404 status if the cats is not found
  if (!cat) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Cat not found" } });
  }
  res.status(200).json({ status: "success", data: cat });
});


// Start the server and listen on the specified port
app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`);
  });
  
  //changes 