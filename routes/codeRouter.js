import express from "express";
const codeRouter = express.Router();
import { getAllConnectors, getAllMarkers, getCode } from "../controllers/codeController.js";


codeRouter.route('/')
    .post(getCode)
    .get(getAllMarkers)
codeRouter.route('/connectors')
    .get(getAllConnectors)
    


export default codeRouter;
