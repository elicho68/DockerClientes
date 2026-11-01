import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import clienteRoutes from "./routes/cliente.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Necesario para obtener __dirname usando ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Motor de vistas EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Página principal
app.get("/", (req, res) => {
    res.render("index");
});

// Rutas de clientes
app.use("/cliente", clienteRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Aplicación iniciada en puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

//import express from "express";
//import clientesRouter from "./routes/cliente.js";

//const app = express();
// Middleware para procesar datos de formularios y JSON
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());
// URL base de la API .NET
//app.locals.urlApi = "http://localhost:5059/api";

//app.set("view engine", "ejs");
//app.get("/", function (req, res) {
//res.render("index");
//                   });
//app.use("/cliente", clientesRouter);                   
//    app.listen(5000, function () {
//    console.log("Aplicación iniciada: http://localhost:5000/");
//    });