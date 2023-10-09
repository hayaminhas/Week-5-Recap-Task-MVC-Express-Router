import * as catsModel from "../models/catsModel.js";


export async function getCats(req, res) {
    const cats = await catsModel.getCats();

    console.log(cats)

    res.status(200).json({ status: "success", data: cats });
  }

  export async function getCatsById(req, res) {
    const id = req.params.id;
    const cat = await catsModel.getCatById(id);
    // 404 status if not found
    if (!cat) {
        return res.status(404).json({status: "fail", data: {msg: "Cat not found"}});
    }
    res.status(200).json({status: "success", data: cat});
  
  }

  export async function createCat(req, res) {
    const cats = req.body;
    const cat = await catsModel.createCat(cats);
    res.status(201).json({status: "success", data: cat})
  }

  export async function updateCatById(req, res) {
    const id = req.params.id;
    const data = req.body;
    const cat = await catsModel.updateCatById(id, data);
    // Assume 404 status if the cat is not found
    if (!cat) {
      return res
        .status(404)
        .json({ status: "fail", data: { msg: "Cat not found" } });
    }
    res.status(200).json({ status: "success", data: cat });
  }

  export async function deleteCatById(req, res) {
    const id = req.params.id;
  const cat = await catsModel.deleteCatById(id);
  // Assume 404 status if the cats is not found
  if (!cat) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Cat not found" } });
  }
  res.status(200).json({ status: "success", data: cat });
}
  