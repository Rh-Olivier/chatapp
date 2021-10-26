import io from "socket.io-client";
import server from "../api/config";

export const socket = io.connect(server)