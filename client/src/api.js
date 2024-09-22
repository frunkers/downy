import { io } from "socket.io-client";

const PORT = 3003;
let baseURL = "";

if (process.env.NODE_ENV === "development") {
	baseURL = `http://localhost:${PORT}`;
}

// if (process.env.NODE_ENV === "production") {
//    baseURL = `https://airmonitor.servermc.ru:${PORT}`;
// }

const socket = io(baseURL);

socket.on("connect", () => {
	console.log("Client connected");
});

export const API = {
	// sendCurrentTimeTrigger: () => {
	//    socket.emit("current-time-trigger:send");
	// },

	// requestCurrentTime: (callback) => {
	//    socket.on("current-time:request", (currentTime) => {
	//       callback(currentTime);
	//    });
	// },
};
