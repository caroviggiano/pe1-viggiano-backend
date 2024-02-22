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

    res.send(products)

    // (GET) Mostrar todos los productos
    
})

app.get ("/api/products/:pid/", (req, res) => {
    // (GET) Mostrar producto que coincida con :pid
})

app.post ("/api/products/", (req, res) => {
    // (POST) Crear un producto nuevo
})

app.put ("/api/products/:pid/", (req, res) => {
    // (PUT) Editar producto que coincida con :pid
})

app.delete ("/api/products/:pid/", (req, res) => {
    // (DELETE) Eliminar producto que coincida con :pid
})

// Rutas del carrito

app.post ("/api/carts/", (req, res) => {
    // (POST) Crear un nuevo carrito
    let carrito = fs.readFileSync(pathCart, "utf-8")
    let parsedCart = JSON.parse (carrito)

    const ID = randomUUID()

    let cart = {
        id: ID,
        products: []
    }

    parsedCart.push (cart)
    let data = JSON.stringify(parsedCart)
    writeFileSync(pathCart, data, null)

    res.send("Carrito creado")
})

app.get ("/api/carts/:cid/", (req, res) => {
    // (GET) Listar los productos del carrito

    let id = req.params.cid
    let carrito = fs.readFileSync(pathCart, "utf-8")
    let parsedCart = JSON.parse (carrito)

    let finalCart = parsedCart.find((cart) => cart.id === id )
    let data = JSON.stringify(finalCart)
    res.send(data)
})

app.post ("/api/carts/:cid/product/:pid/", (req, res) => {
    // (POST) Agrgar un producto nuevo al carrito seleccionado

    let cart = fs.readFileSync(pathCart, "utf-8")
    let parsedCart = JSON.parse (carrito)

    let cid = req.params.cid
    let foundCart= parsedCart.findIndex((c)=> c.id === cid)

    parsedCart[foundCart].products.push(foundProduct)
    let result = parsedCart

    let pid = req.params.pid
    let foundProduct= products.find((p)=> p.id === pid)
    res.send("OK")
})

