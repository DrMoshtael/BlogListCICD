require('dotenv').config()

const PORT=process.env.CYPRESS_PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
? process.env.CYPRESS_TEST_MONGODB_URI
: process.env.CYPRESS_MONGODB_URI

module.exports = {
    PORT,
    MONGODB_URI
}