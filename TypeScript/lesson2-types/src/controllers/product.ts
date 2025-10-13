import { Product } from "../models/product.ts";
import type { Request, Response } from 'express';


export const listProduct = async (req:Request, res:Response) => {
  try {
    const product = await Product.findAll();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const createProduct = async (req:Request, res:Response) => {
  try {
    const dataBody = {
      ...req.body,
    };
    const product = await Product.create(dataBody);
    res.status(201).json("Success");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
