import express from 'express'
import http from "node:http"
import cors from 'cors';
import routes  from './routes';
import path from "node:path";
import {Server} from "socket.io"

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")))
app.use(express.json())
app.use(cors());
app.use(routes);


server.listen(3333);