import express, { Application, Request, Response } from "express";
const fs = require("fs");
const cors = require("cors");

const app: Application = express();

interface User {
  name: string;
  surname: string;
  tel: string;
  email: string;
  note: string;
}

app.use(express.json());
app.use(cors());

app.post("/post", (req: Request, res: Response) => {
  const user = {
    name: req.body.name,
    surname: req.body.surname,
    tel: req.body.tel,
    email: req.body.email,
    note: req.body.note,
  };

  fs.readFile("./user.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    } else {
      try {
        let lst: User[] = jsonString[0] === undefined ? [] : JSON.parse(jsonString);
        lst.push(user);
        const json = JSON.stringify(lst);
        fs.writeFile("./user.json", json, (err) => {
          if (err) {
            console.log("Error writing file", err);
            res.status(400).send("error");
          } else {
            console.log("Successfully wrote file");
            res.status(200).send("success");
          }
        });
      } catch (err) {
        console.log("Error parsing JSON string:", err);
      }
    }
  });
});

app.listen(3000, () => {
  console.log("Listening on port " + 3000);
});
