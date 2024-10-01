import express from "express"
const app = express();
import codeRouter from "./routes/codeRouter.js";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";



app.use(express.json());
app.use(cors({
    origin:'https://gdg-maps-iitbhilai.netlify.app',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    allowedHeaders:['Authorization','Content-Type','Custom-Header']
}));


//hello
app.get('/', (req, res) => {
    res.send('hello');
});
app.use('/api/v1/code',codeRouter);

export default app;