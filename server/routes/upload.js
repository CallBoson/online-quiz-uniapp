const express = require("express");
const router = express.Router();
const multer = require("multer");
const OSS = require("ali-oss");
const fs = require("fs");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const mimeType = file.mimetype;
      if (mimeType.startsWith("image/")) {
        cb(null, "./uploads/images");
      } else {
        cb(null, "./uploads/files");
      }
    },
    filename: function (req, file, cb) {
      const changedName =
        new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname;
      cb(null, changedName);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 512 },
});

let client;

try {
  client = new OSS({
    region: process.env.OSS_REGION,
    accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
    bucket: process.env.OSS_BUCKET,
  });
} catch (e) {
  console.error("OSS配置错误", e);
}

router.post("/", async (req, res) => {
  if (!client) {
    return res.error("OSS配置错误");
  }

  upload.single("file")(req, res, async function (err) {
    if (err) {
      console.error(err);
      return res.error("上传失败");
    }

    const file = req.file;
    const result = await client.put(`online-quiz/${file.path}`, file.path);
    // 上传到阿里云OSS后删除本地文件
    fs.unlinkSync(file.path);
    res.ok({
      url: result.url,
    });
  });
});

module.exports = router;
