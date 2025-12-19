import 'dotenv/config';
import http, { Server } from "http"
import app from "./app.js"
import { config } from "./config/index.js";
import prisma from "./config/db.js";

let server: Server
async function connectToDB () {
    try{
        await prisma.$connect()
        console.log("** DB Connection Successfully🥰")
    }catch(error){
        console.log("** DB Connection Failed 😔" )
    }
}

const main = async() => {
    try {
        await connectToDB()
        server = http.createServer(app);
        server.listen(config.port, () => {
            console.log(`🚀 Server is running on port ${config.port}`)
        })
        handleProcessEvents()
    } catch (error) {
        console.error("❌ Error during server startup:", error);
        process.exit(1)
    }
}

async function gracefulShutdown(signal: string) {
    console.warn(`🔄 Received ${signal}, shutting down gracefully...`);

    if (server) {
        server.close(async () => {
            console.log("✅ HTTP server closed.");

            try {
                console.log("Server shutdown complete.");
            } catch (error) {
                console.error("❌ Error during shutdown:", error);
            }

            process.exit(0);
        });
    } else {
        process.exit(0);
    }
}


function handleProcessEvents() {
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    process.on("uncaughtException", (error) => {
        console.error("💥 Uncaught Exception:", error);
        gracefulShutdown("uncaughtException");
    });

    process.on("unhandledRejection", (reason) => {
        console.error("💥 Unhandled Rejection:", reason);
        gracefulShutdown("unhandledRejection");
    });
}

main()