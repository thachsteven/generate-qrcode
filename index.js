const express = require("express");
const app = express();
const QRCode = require("qrcode");
const { createCanvas, loadImage } = require("canvas");
const bp = require("body-parser");

app.use(bp.json());

app.post("/qrcode", async (req, res) => {
  const url = req.body.url

  const canvas = createCanvas(200, 200);
  QRCode.toCanvas(canvas, url , {
    margin: 1,
    color: {
      dark: "#000",
      light: "#fff",
    },
    width: 200,
    height: 200
  });

  const context = canvas.getContext("2d");
  const img = await loadImage("./logo.png");
  const center = 84;
  context.drawImage(img, center, center, 30, 30);

  return res.send({
      qrImage: canvas.toDataURL("image/png")
  });
});

app.listen(3000, () => {
  console.log("App is running at port 3000");
});
