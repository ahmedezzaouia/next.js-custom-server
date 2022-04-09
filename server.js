const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const port = 3000;
const host = "127.0.0.1";

const app = next({ dev });
const hundle = app.getRequestHandler();
app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/test", (req, res) => {
      res.status(200).json({
        name: "ahmed Ezzaouia",
        app:'Nextjs Custom server Endpoints testing'
      });
    });
    server.get('/auth',(req,res)=>{
        res.redirect('/');
    })
    server.get("*", (req, res) => {
      return hundle(req, res);
    });

    server.listen(port, () => console.log(`server running at https://${host}:${port}`));
  })
  .catch((err) => {
    console.log(err.stack);
    process.exit(1);
  });
