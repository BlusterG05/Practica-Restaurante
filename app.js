const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();
require("dotenv").config();

const routes = require("./routes");

// Seguridad: Uso de helmet para configurar cabeceras HTTP
app.use(helmet());

// Seguridad: Limitar tasa de solicitudes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 solicitudes por ventana
  message:
    "Demasiadas solicitudes desde esta IP, por favor intenta de nuevo después de 15 minutos.",
});

app.use(limiter);

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.BACKEND_APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});