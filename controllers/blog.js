const { Client } = require("@notionhq/client");
require("dotenv").config();

const Notion = new Client({ auth: process.env.NOTION_SECRET });

exports.getBlogs = async (req, res, next) => {
  console.log("notion secret", process.env.NOTION_SECRET);
  try {
    const databaseId = "d1b88882-f312-4756-949e-b9532b671180";
    const response = await Notion.databases.query({
      database_id: databaseId
    });

    res.status(201).json({ blogs: response.results });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
