const express = require("express");
const router = express.Router();

const SakeModel = require("../schema/Sake");
const Sake = SakeModel.Sake;

router.get("/find", (req, res, next) => {
  Sake.find({ brand: "醸し九平次" }, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
  res.send("test");
});

router.get("/find_type", (req, res, next) => {
  Sake.findOne({ brand: "醸し九平次" })
    .populate("type impressions.temperature")
    .exec((err, result) => {
      if (err) throw err;
      console.log(result);
      console.log(result.type);
      console.log(result.impressions[0].temperature);
    });
  res.send("test");
});

// DB登録
router.get("/kuheiji", function(req, res, next) {
  const kuheiji = new Sake({
    brand: "醸し九平次",
    type: 9,
    impressions: [
      { temperature: 7, impression: "めちゃうま" },
      { temperature: 10, impression: "激ウマ" }
    ]
  });

  kuheiji.save(err => {
    if (err) throw err;
  });
  console.log(kuheiji);

  res.json(kuheiji);
});

module.exports = router;
