const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/connectDB')
// const {loadProcedures} = require('./database/loadProcedures')
const PORT = process.env.PORT || 7000
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs')
const path  = require('path');

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("home page")
})

const routesPath = path.join(__dirname, 'routes');


fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith('Routes.js')) {
    const route = require(path.join(routesPath, file));

    // Validate that the file exports a router
    if (route && typeof route === 'function') {
      app.use('/api', route);
      console.log(`✅ Loaded route: ${file}`);
    } else {
      console.warn(`⚠️ Skipped ${file}: not a valid router export`);
    }
  }
});
 


// ✅ Load all Swagger doc files from api-doc folder
const apiDocsPath = path.join(__dirname, 'api-doc');
const apiFiles = fs
  .readdirSync(apiDocsPath)
  .filter((file) => file.endsWith('.js'))
  .map((file) => path.join(apiDocsPath, file));

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Medical App API',
      version: '1.0.0',
      description: 'API documentation for Appointment, Billing, Doctor, Patient & Services',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: apiFiles, // load all your JS Swagger docs
};

const swaggerSpec = swaggerJsdoc(options);

// 🧾 Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log('✅ Swagger docs loaded from:', apiFiles);
const startServer = async () => {
    try {
       await connectDB();
// await loadProcedures();
app.listen(PORT , () => {
    console.log(`server running on http://localhost:${PORT}`)
})

    } catch (error) {
        console.log("🚀 ~ startServer ~ error:", error)

    }
}

startServer();
