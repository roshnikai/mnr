import express from "express";
//import cors from "cors";
import os from "node:os";
import {PORT, HOST, SERVER_URL} from "./config";
import apiRouter from "./api-router";
import serverRender from "./render";
const server = express();
server.use(express.static("dist"));
server.set("view engine", "ejs");
server.use("/api", apiRouter);
server.get(["/", "/contest/:contestId"], async (req, res) => {
    const { initialMarkup, initialData } = await serverRender(req);
    res.render("index", {initialMarkup, initialData,});
});
server.listen(Number(PORT), HOST, () => {
    console.info(`Express server is listening at ${SERVER_URL}`,
    `Free Mem: ${os.freemem() / 1024 / 1024}`,);
});