import { Request, Response } from "express";

export const getDay1 = (req: Request, res: Response) => {
  res.render("day1", { title: "DAY-1 Linux Essentials" });
};