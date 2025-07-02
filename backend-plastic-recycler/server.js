import express from "express"
import cors from "cors"
import session from "express-session"
import mongoose from "mongoose";
import { MONGO_URL, FRONTEND_URL, PORT } from "./config.js"
// se incia el servidor
const app = express()
//configura sessions
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))
//  Configura cors
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}))
// simula una peticion a base de datos de productos
const products = [
  {
    id: 1,
    image: "bultoCompactado.jpeg",
    title: "Bulto Compacatdo",
    description: "Bulto de compactado de 50kg",
    price: 20
  },
  {
    id: 2,
    image: "bultoPeletizado.jpeg",
    title: "Auriculares Inalámbricos",
    description: "Bulto de peletizado de 40kg",
    price: 17
  }
];

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Conectado a MongoDB");
}).catch((err) => {
  console.error("Error al conectar a MongoDB:", err);
});

import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  image: String,
  title: String,
  description: String,
  price: Number
});
const Product = model("Product", ProductSchema);

const UserSchema = new Schema({
  username: String,
  password: String
});
const User = model("User", UserSchema);

const PedidoSchema = new Schema({
  tel: String,
  nombres: String,
  apellidos: String,
  direccion: String,
  correo: String,
  usuario: String,
  fecha: { type: Date, default: Date.now }
});
const Pedido = model("Pedido", PedidoSchema);

app.use(express.json())

// ------------------------------- endpoints para la pagina --------------------------------------


app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});


// ------------------------------- Registrar usuario --------------------------------------

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: "Usuario ya existe" });
  }

  const newUser = new User({ username, password });
  await newUser.save();

  res.status(201).json({ message: "Usuario registrado correctamente" });
});




// ------------------------------- Logear usuario --------------------------------------

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  req.session.user = user;
  res.json({ message: "Login exitoso", user });
});


// ------------------------------- Cerrar sesion--------------------------------------


app.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Logout error" });
        }
        res.clearCookie("connect.sid"); // Limpia la cookie de sesión
        res.json({ message: "Logged out successfully" });
    });
});

// ------------------------------- Verficiar seesion abierta --------------------------------------


app.get("/me", (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.status(401).json({ loggedIn: false });
    }
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});



// ------------------------------- Recibir pedido --------------------------------------
app.post("/pedidos", async (req, res) => {
  const pedido = req.body;

  if (!req.session.user) {
    return res.status(401).json({ message: "No autorizado" });
  }

  if (!pedido.tel || !pedido.nombres || !pedido.apellidos || !pedido.direccion || !pedido.correo) {
    return res.status(400).json({ message: "Faltan datos del pedido" });
  }

  const nuevoPedido = new Pedido({
    ...pedido,
    usuario: req.session.user.username
  });

  await nuevoPedido.save();

  res.status(201).json({ message: "Pedido recibido con éxito", pedido: nuevoPedido });
});


// ------------------------------ Buscar pedido --------------------------------------

app.get("/pedidos/:tel", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "No autorizado" });
  }

  const pedido = await Pedido.findOne({ tel: req.params.tel });

  if (!pedido) {
    return res.status(404).json({ message: "Pedido no encontrado" });
  }

  res.json(pedido);
});



// ------------------------------- Fin de endpoints --------------------------------------



app.listen(PORT, () => {
    console.log("Server running on port 3000")
})