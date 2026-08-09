const express = require("express");
const multer = require("multer");

const parseOpenAPI = require("../parsers/openapiParser");
const parseSQL = require("../parsers/sqlParser");
const generateGraph = require("../graph/graphGenerator");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post(
  "/",
  upload.fields([
    { name: "openapi", maxCount: 1 },
    { name: "sql", maxCount: 1 },
  ]),
  (req, res) => {
    console.log("========== Files Received ==========");
    console.log(req.files);

    // ============================
    // Parse OpenAPI
    // ============================
    const openApiFile = req.files.openapi[0].path;
    const endpoints = parseOpenAPI(openApiFile);

    console.log("\n========== Extracted Endpoints ==========");
    console.log(endpoints);

    // ============================
    // Parse SQL
    // ============================
    const sqlFile = req.files.sql[0].path;

    const sqlData = parseSQL(sqlFile);

    console.log("\n========== Extracted Tables ==========");
    console.log(sqlData.tables);

    console.log("\n========== Extracted Relationships ==========");
    console.log(sqlData.relationships);

    // ============================
    // Generate Graph
    // ============================
    const graph = generateGraph(
      endpoints,
      sqlData.tables,
      sqlData.relationships
    );

    console.log("\n========== Graph ==========");
    console.log(graph);

    // ============================
    // Send Response
    // ============================
    res.json({
      message: "Files uploaded successfully!",
      graph,
    });
  }
);

module.exports = router;