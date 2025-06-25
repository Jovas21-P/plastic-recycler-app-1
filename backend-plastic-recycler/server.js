import express from "express"
import cors from "cors"
import session from "express-session"
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
    origin: "http://localhost:5173",
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

const users = []

const pedidos = []


// ------------------------------- endpoints para la pagina --------------------------------------
app.use(express.json())

app.get("/products", (req, res) => {
    res.json(products)
})

// ------------------------------- Registrar usuario --------------------------------------

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Validar campos obligatorios
  if (!username || !password) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  // Verificar si el usuario ya existe
  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.status(409).json({ message: "Usuario ya existe" });
  }

  // Crear nuevo usuario (en producción, encripta la contraseña)
  const newUser = {
    username,
    password
  };

  users.push(newUser);

  res.status(201).json({ message: "Usuario registrado correctamente" });
});



// ------------------------------- Logear usuario --------------------------------------

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.user = user;
    res.json({ message: "Login successful", user: { users } });
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

app.get("/users", (req, res) => {
    res.json(users)
});


// ------------------------------- Recibir pedido --------------------------------------
app.post("/pedidos", (req, res) => {
  const pedido = req.body;

  // Validar que el usuario esté logueado
  if (!req.session.user) {
    return res.status(401).json({ message: "No autorizado. Inicia sesión para hacer pedidos." });
  }

  // Validar campos mínimos del pedido
  if (!pedido.tel || !pedido.nombres || !pedido.apellidos || !pedido.direccion || !pedido.correo) {
    return res.status(400).json({ message: "Faltan datos del pedido" });
  }

  // Agregar el pedido al array
  pedidos.push({
    ...pedido,
    usuario: req.session.user.username,
    fecha: new Date().toISOString()
  });

  res.status(201).json({ message: "Pedido recibido con éxito", pedido });
});

app.get("/pedidos/:tel", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "No autorizado" });
  }

  const tel = req.params.tel;
  // Buscar pedidos que coincidan con el teléfono
  const pedido = pedidos.find(p => p.tel === tel);

  if (!pedido) {
    return res.status(404).json({ message: "Pedido no encontrado" });
  }

  res.json(pedido);
});






app.listen(3000, () => {
    console.log("Server running on port 3000")
})