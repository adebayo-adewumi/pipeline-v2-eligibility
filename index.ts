import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";

dotenv.config();

const app: Express = express();
const port :any = process.env.PORT;

const limiter: any = rateLimit({
  max: 300,
  windowMs: 24 * 60 * 60 * 1000,
  message: "Too many request from this IP"
});

app.use(limiter);

app.get("/howold", (req: Request, res: Response) => {
    let queryParams :any = req.query; 
    let regexWithSlash :any = /^([0-2]\d|(3)[0-1])(\/)(((0)\d)|((1)[0-2]))(\/)\d{4}$/g;
    let regexWithHyphen :any = /^([0-2]\d|(3)[0-1])(-)(((0)\d)|((1)[0-2]))(-)\d{4}$/g;

   
    if(!queryParams.hasOwnProperty("dob") ){
      res.status(400).json({
        status: "Bad Request",
        message: "dob parameter is required",
      });
    }

    if(!regexWithSlash.test(queryParams.dob) && !regexWithHyphen.test(queryParams.dob)){
      res.status(400).json({
        status: "Bad Request",
        message: "Error: Date of Birth must be in any of this formats [dd/mm/yyyy, dd-mm-yyyy]",
      });
    }

    let dateOfBirth :any = new Date(queryParams.dob);
    let age :any = new Date().getFullYear() - dateOfBirth.getFullYear();

    res.status(200).json({
      status: "success",
      message: `Hey! buddie, you are ${age} years old.`,
    });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});