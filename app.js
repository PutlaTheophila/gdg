import express from "express"
const app = express();
import codeRouter from "./routes/codeRouter.js";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";



app.use(express.json());
app.use(cors({
    origin:'https://gdg-frontend.onrender.com',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    allowedHeaders:['Authorization','Content-Type','Custom-Header']
}));



app.get('/', (req, res) => {
    res.send('hello');
});
app.use('/api/v1/code',codeRouter);

export default app;