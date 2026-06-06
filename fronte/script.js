// ===== ESTADO GLOBAL DE LA MISIÓN =====
let carrito = [];
const API_URL = 'http://localhost:3000/api';

// ===== CARGAR MENÚ DESDE EL BACKEND =====
async function cargarMenuDesdeServidor() {
    const menuGrid = document.querySelector('.menu-grid');
    
    try {
        // Petición GET a nuestro backend modular
       const respuesta = await fetch(`${API_URL}/productos`);
        const platos = await respuesta.json();
        
        // Limpiar el contenedor del menú antes de renderizar
        menuGrid.innerHTML = '';
        
        // Recorrer los platos que vienen de la base de datos simulada
        platos.forEach(plato => {
            const card = document.createElement('article');
            card.className = 'card';
            card.innerHTML = `
                <h3>🍔 ${plato.nombre}</h3>
                <p>${plato.descripcion}</p>
                <span>$${plato.precio.toLocaleString()}</span>
                <button onclick="agregarCarrito('${plato.nombre}', ${plato.precio})">
                    Agregar
                </button>
            `;
            menuGrid.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error al conectar con la base de datos de suministros:', error);
        menuGrid.innerHTML = '<p class="pedido-info" style="color: #ef4444;">❌ No se pudo cargar el menú táctico. ¿Está encendido el servidor?</p>';
    }
}

// ===== SISTEMA DE CARRITO TÁCTICO =====
function agregarCarrito(nombre, precio) {
    const itemExistente = carrito.find(item => item.nombre === nombre);

    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    actualizarInterfaz();
}

function eliminarCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    actualizarInterfaz();
}

function calcularTotal() {
    return carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
}

// ===== ACTUALIZAR LA INTERFAZ DE USUARIO =====
function actualizarInterfaz() {
    const carritoContainer = document.getElementById('carrito');
    const totalContainer = document.getElementById('total');
    
    carritoContainer.innerHTML = '';

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p class="pedido-info">El carrito militar está vacío. ¡Añade provisiones!</p>';
        totalContainer.innerText = 'Total: $0';
        actualizarRecomendacionIA(null);
        return;
    }

    carrito.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item-carrito';
        itemElement.innerHTML = `
            <div>
                <strong>${item.nombre}</strong> (x${item.cantidad}) - $${(item.precio * item.cantidad).toLocaleString()}
            </div>
            <button onclick="eliminarCarrito('${item.nombre}')">❌ Retirar</button>
        `;
        carritoContainer.appendChild(itemElement);
    });

    const total = calcularTotal();
    totalContainer.innerText = `Total: $${total.toLocaleString()}`;

    // Enviamos el último artículo agregado al servidor para que el General analice la jugada
    const ultimoItem = carrito[carrito.length - 1].nombre;
    actualizarRecomendacionIA(ultimoItem);
}

// ===== CONEXIÓN AL BACKEND: MOTOR DE RECOMENDACIÓN IA =====
async function actualizarRecomendacionIA(ultimoProducto) {
    const recomendacionTexto = document.getElementById('recomendacionTexto');
    
    if (!ultimoProducto) {
        recomendacionTexto.innerText = 'Agrega productos al carrito para recibir sugerencias inteligentes del General.';
        return;
    }

    try {
        // Petición POST real a la ruta modular de la Inteligencia Artificial
        const respuesta = await fetch(`${API_URL}/ia/recomendar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ultimoProducto })
        });
        
        const datos = await respuesta.json();
        recomendacionTexto.innerHTML = `⚠️ <strong>Sugerencia de la IA:</strong> ${datos.sugerencia}`;
        
    } catch (error) {
        console.error("Error conectando con el módulo de IA del backend:", error);
        recomendacionTexto.innerText = 'Error al enlazar con la IA militar.';
    }
}

// Recomendar desde el botón del General
function recomendar() {
    alert("Análisis en tiempo real activo: El General te sugiere asegurar una 'Supremacía' para mantener los niveles de energía altos en combate.");
}

// ===== MODO CLARO / OSCURO =====
const modoBtn = document.getElementById('modoBtn');
modoBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    modoBtn.innerText = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
});

// ===== INTEGRACIÓN CON WHATSAPP =====
document.getElementById('formPedido').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const mensajeStatus = document.getElementById('mensaje');

    if (carrito.length === 0) {
        mensajeStatus.style.color = '#ef4444';
        mensajeStatus.innerText = '❌ Error de misión: Tu carrito está vacío.';
        return;
    }

    let textoPedido = `*🍔 ORDEN DE COMPRA - OPERACIÓN HAMBRE *%0A`;
    textoPedido += `*Soldado:* ${nombre}%0A`;
    textoPedido += `---------------------------------------%0A`;
    
    carrito.forEach(item => {
        textoPedido += `• ${item.nombre} (x${item.cantidad}) - $${(item.precio * item.cantidad).toLocaleString()}%0A`;
    });
    
    textoPedido += `---------------------------------------%0A`;
    textoPedido += `*TOTAL A PAGAR:* $${calcularTotal().toLocaleString()}%0A%0A`;
    textoPedido += `⚡ _¡Solicito entrega inmediata en el cuartel!_`;

    const numeroTelefono = "573001234567"; // Pon aquí tu número real
    const urlWhatsapp = `https://wa.me/${numeroTelefono}?text=${textoPedido}`;

    mensajeStatus.style.color = '#22c55e';
    mensajeStatus.innerText = '🚀 ¡Desplegando canal de WhatsApp...!';
    
    setTimeout(() => {
        window.open(urlWhatsapp, '_blank');
    }, 1200);
});

// ===== INICIALIZAR LA OPERACIÓN AL CARGAR LA PÁGINA =====
document.addEventListener('DOMContentLoaded', () => {
    cargarMenuDesdeServidor();
    actualizarInterfaz();
});