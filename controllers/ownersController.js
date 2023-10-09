import * as ownersModel from "../models/ownersModel.js";


export async function getOwners(req, res) {
    const owners = await ownersModel.getOwners();
    res.status(200).json({ status: "success", data: owners });
  }

  export async function getOwnerById(req, res) {
    const id = req.params.id;
    const owner = await ownersModel.getOwnerById(id);
    // 404 status if not found
    if (!owner) {
        return res.status(404).json({status: "fail", data: {msg: "Owner not found"}});
    }
    res.status(200).json({status: "success", data: owner});
};

export async function createOwner(req,res){
    const owners = req.body;
    const owner = await ownersModel.createOwner(owners);
    res.status(201).json({status: "success", data: owner})
  }

  export async function updateOwnerById(req, res) {
    const id = req.params.id;
    const data = req.body;
    const owner = await ownersModel.updateOwnerById(id, data);
    // Assume 404 status if the author is not found
    if (!owner) {
      return res
        .status(404)
        .json({ status: "fail", data: { msg: "Owner not found" } });
    }
    res.status(200).json({ status: "success", data: owner });
  };
  
  export async function deleteOwnerById(req, res) {
    const id = req.params.id;
    const owner = await ownersModel.deleteOwnerById(id);
    // Assume 404 status if the owner is not found
    if (!owner) {
      return res
        .status(404)
        .json({ status: "fail", data: { msg: "Owner not found" } });
    }
    res.status(200).json({ status: "success", data: owner });
  };