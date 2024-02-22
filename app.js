import express from "express";
import fs, { writeFileSync } from "fs";
import {randomUUID} from "node:crypto"

const pathCart = "./data/carrito.json"
const app = express ()
const port = 8080

app.listen (port, console.log("servidor corriendo en el puerto " + port))

//MIDLEWARE
app.use (express.json ())
app.use (express.urlencoded({extended:true}))

const products = [{"id":1, "title":"producto1", "description":"description1", "price":1500, "thumbnail": "imagen1" , "code":"1234", "stock":51},{"id":2, "title":"producto2", "description":"description2", "price":2500, "thumbnail": "imagen2" , "code":"114", "stock":40},{"id":3, "title":"producto3", "description":"description3", "price":3500, "thumbnail": "imagen3" , "code":"234", "stock":12}]

// Rutas de los productos

app.get ("/api/products/", (req, res) => {
    // (GET) Mostrar todos los productos
    res.send(products);
});

app.get ("/api/products/:pid/", (req, res) => {
    // (GET) Mostrar producto que coincida con :pid
    const productId = parseInt(req.params.pid);
    const product = products.find(p => p.id === productId);

    if (product) {
        res.send(product);
    } else {
        res.status(404).send("Producto no encontrado");
    }
});

app.post ("/api/products/", (req, res) => {
    // (POST) Crear un producto nuevo
    const newProduct = req.body;
    newProduct.id = products.length + 1; // Asignar un nuevo ID
    products.push(newProduct);

    res.send(newProduct);
});

app.put ("/api/products/:pid/", (req, res) => {
    // (PUT) Editar producto que coincida con :pid
    const productId = parseInt(req.params.pid);
    const updatedProduct = req.body;

    const index = products.findIndex(p => p.id === productId);

    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        res.send(products[index]);
    } else {
        res.status(404).send("Producto no encontrado");
    }
});

app.delete ("/api/products/:pid/", (req, res) => {
    // (DELETE) Eliminar producto que coincida con :pid
    const productId = parseInt(req.params.pid);
    const index = products.findIndex(p => p.id === productId);

    if (index !== -1) {
        const deletedProduct = products.splice(index, 1);
        res.send(deletedProduct);
    } else {
        res.status(404).send("Producto no encontrado");
    }
});

// Rutas del carrito

app.post("/api/carts/", (req, res) => {
    // (POST) Crear un nuevo carrito
    let carrito = fs.readFileSync(pathCart, "utf-8");
    let parsedCart = JSON.parse(carrito);

    const ID = randomUUID();

    let cart = {
        id: ID,
        products: [],
    };

    parsedCart = Array.isArray(parsedCart) ? parsedCart : [];
    parsedCart.push(cart);

    let data = JSON.stringify(parsedCart);
    writeFileSync(pathCart, data);

    res.send("Carrito creado");
});

app.get ("/api/carts/:cid/", (req, res) => {
    // (GET) Listar los productos del carrito

    let id = req.params.cid
    let carrito = fs.readFileSync(pathCart, "utf-8")
    let parsedCart = JSON.parse (carrito)

    let finalCart = parsedCart.find((cart) => cart.id === id )
    let data = JSON.stringify(finalCart)
    res.send(data)
})

app.post("/api/carts/:cid/product/:pid/", (req, res) => {
    // (POST) Agrgar un producto nuevo al carrito seleccionado
    let cart = fs.readFileSync(pathCart, "utf-8");
    let parsedCart = JSON.parse(cart);

    let cid = req.params.cid;
    let foundCartIndex = parsedCart.findIndex((c) => c.id === cid);

    if (foundCartIndex !== -1) {
        let pid = req.params.pid;
        let foundProduct = products.find((p) => p.id === parseInt(pid));

        if (foundProduct) {
            parsedCart[foundCartIndex].products.push(foundProduct);
            let result = parsedCart;

            let data = JSON.stringify(result);
            writeFileSync(pathCart, data);

            res.send("OK");
        } else {
            res.status(404).send("Producto no encontrado");
        }
    } else {
        res.status(404).send("Carrito no encontrado");
    }
});
