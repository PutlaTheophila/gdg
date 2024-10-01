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

app.use(session({
    secret: 'n3briu32394br3j2bri89bhv',
    saveUninitialized: false,
    resave: false, 
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://putlatheophila123:O3UJE3GOuBYnVzj5@cluster0.xy2080g.mongodb.net/cineflex?retryWrites=true&w=majority&appName=Cluster0`,
        collectionName: 'sessions', 
    }),
    cookie: {
        maxAge: 1000 * 1000,
    }
}));

app.get('/', (req, res) => {
    res.send('hello');
});
app.use('/api/v1/code',codeRouter);

export default app;