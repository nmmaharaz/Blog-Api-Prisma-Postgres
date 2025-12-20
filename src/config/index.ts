import dotenv from "dotenv"

dotenv.config()

export const config = {
    port: process.env.PORT,
    db_url: process.env.DATABASE_URL,
    sald_round: process.env.BCRYPT_SALD_ROUND
}