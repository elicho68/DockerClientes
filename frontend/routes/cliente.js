import express from "express";

const router = express.Router();

// API REST .NET publicada en Microsoft Azure
const API = process.env.API_BASE_URL ||
    "https://clientes-api-elicho-etd8afbzhjfzfcb2.centralus-01.azurewebsites.net/api/clientes";


// ======================================================
// GET - Mostrar listado de clientes
// ======================================================
router.get("/", async (req, res) => {

    try {

        const response = await fetch(API);

        if (!response.ok) {
            throw new Error(
                `Error al consultar la API. HTTP ${response.status}`
            );
        }

        const clientes = await response.json();

        res.render("cliente", {
            clientes: clientes,
            mensaje: req.query.mensaje || null,
            error: req.query.error || null
        });

    } catch (error) {

        console.error("ERROR GET:", error);

        res.render("cliente", {
            clientes: [],
            mensaje: null,
            error: "No fue posible obtener los clientes desde la API."
        });
    }
});


// ======================================================
// POST - Crear nuevo cliente
// ======================================================
router.post("/", async (req, res) => {

    try {

        const nuevoCliente = {
            cui: req.body.cui,
            nit: req.body.nit,
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            fechaNacimiento: req.body.fecha_nacimiento
        };

        const response = await fetch(API, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(nuevoCliente)
        });

        if (!response.ok) {

            const detalle = await response.text();

            console.error(
                "ERROR API POST:",
                response.status,
                detalle
            );

            throw new Error(
                `Error al crear cliente. HTTP ${response.status}`
            );
        }

        res.redirect("/cliente?mensaje=creado");

    } catch (error) {

        console.error("ERROR POST:", error);

        res.redirect("/cliente?error=crear");
    }
});


// ======================================================
// POST - Editar cliente
// Node recibe POST del formulario
// y envía PUT hacia la API .NET
// ======================================================
router.post("/editar/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const clienteActualizado = {
            idCliente: Number(id),
            cui: req.body.cui,
            nit: req.body.nit,
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            fechaNacimiento: req.body.fecha_nacimiento
        };

        const response = await fetch(
            `${API}/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(clienteActualizado)
            }
        );

        if (!response.ok) {

            const detalle = await response.text();

            console.error(
                "ERROR API PUT:",
                response.status,
                detalle
            );

            throw new Error(
                `Error al actualizar cliente. HTTP ${response.status}`
            );
        }

        res.redirect("/cliente?mensaje=actualizado");

    } catch (error) {

        console.error("ERROR PUT:", error);

        res.redirect("/cliente?error=actualizar");
    }
});


// ======================================================
// POST - Eliminar cliente
// Node recibe POST del formulario
// y envía DELETE hacia la API .NET
// ======================================================
router.post("/eliminar/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const response = await fetch(
            `${API}/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {

            const detalle = await response.text();

            console.error(
                "ERROR API DELETE:",
                response.status,
                detalle
            );

            throw new Error(
                `Error al eliminar cliente. HTTP ${response.status}`
            );
        }

        res.redirect("/cliente?mensaje=eliminado");

    } catch (error) {

        console.error("ERROR DELETE:", error);

        res.redirect("/cliente?error=eliminar");
    }
});


export default router;