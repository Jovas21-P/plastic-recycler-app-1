import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Rutas } from './components/Rutas.jsx'
import { CartProvider } from './components/ProdContext.jsx'
import { UserProvider } from './components/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
  <CartProvider>
  <BrowserRouter>
    <Rutas></Rutas>
  </BrowserRouter>
  </CartProvider>
  </UserProvider>
)
