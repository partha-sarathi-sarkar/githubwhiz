import { Request, Response } from "express";

export const getHome = (req: Request, res: Response) => {
  res.render("index", { title: "DevOps Tutorial" });
};