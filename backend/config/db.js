const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`mongo db connected ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(`Error:  ${error.message} `.red.underline.bold)
    process.exit(1)
    // 1: exit with fail
  }
}

module.exports = connectDB
