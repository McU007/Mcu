// Global variables
let cart = JSON.parse(localStorage.getItem('naturalUrologyCart')) || [];
let products = {
    gomitas: [],
    capsulas: [],
    suplementos: []
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    updateCartDisplay();
    loadCartFromStorage();
 });


    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatbotButton = document.getElementById('close-chatbot');
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const chatWindow = document.getElementById('chat-window');
    const apiEndpoint = '/.netlify/functions/gemini';

    // Evento: Al hacer click en el ícono se muestra el contenedor del chat.
    if (chatbotIcon && chatbotContainer) {
        chatbotIcon.addEventListener('click', () => {
            chatbotContainer.classList.remove('hidden');
        });
    }

    // Evento: Al hacer click en el botón de cerrar, oculta el contenedor del chat.
    if (closeChatbotButton && chatbotContainer) {
        closeChatbotButton.addEventListener('click', () => {
            chatbotContainer.classList.add('hidden');
        });
    }

    // Evento: Al enviar el formulario, envía el mensaje del usuario y muestra la respuesta del bot.
    if (chatForm && messageInput && chatWindow) {
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Previene recargar la página

            const userMessage = messageInput.value.trim();
            if (!userMessage) return; // Sale si el input está vacío

            // Muestra el mensaje del usuario en la ventana del chat.
            addMessageToWindow(userMessage, 'user-message');
            messageInput.value = '';

            // Muestra mensaje de "Escribiendo..." mientras espera la respuesta.
            const loadingIndicator = addMessageToWindow('Escribiendo...', 'loading');

            try {
                // Llama al backend (Netlify Function) enviando el mensaje como prompt.
                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: userMessage }),
                });

                // Si hay error en la respuesta HTTP, lanza excepción.
                if (!response.ok) throw new Error(`Error: ${response.statusText}`);

                // Procesa la respuesta y muestra el mensaje del bot.
                const data = await response.json();
                chatWindow.removeChild(loadingIndicator);
                addMessageToWindow(data.message, 'bot-message');
            } catch (error) {
                // Si hay error de red o backend, muestra mensaje de error al usuario.
                console.error('Error:', error);
                chatWindow.removeChild(loadingIndicator);
                addMessageToWindow('Lo siento, algo salió mal. Por favor, inténtalo de nuevo.', 'bot-message');
            }
        });

        // Función auxiliar para agregar mensajes a la ventana del chat.
        // 'message': texto del mensaje. 'className': clase CSS para diferenciar tipo de mensaje.
        function addMessageToWindow(message, className) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', className);
            messageElement.textContent = message;
            chatWindow.appendChild(messageElement);
            // Asegura que siempre se vea el último mensaje (scroll abajo).
            chatWindow.scrollTop = chatWindow.scrollHeight;
            return messageElement;
        }
    }
    // =============== FIN DE LA INTEGRACIÓN DEL CHATBOT ===============
  });
}

// Initialize products with sample data
function initializeProducts() {
    // Gomitas (12 products)
    for (let i = 1; i <= 12; i++) {
        products.gomitas.push({
            id: `gomita-${i}`,
            name: `Gomita Prostática Natural ${i}`,
            price: 49,
            image: `🍬`,
            description: `Deliciosa gomita natural ${i} elaborada con ingredientes 100% naturales específicamente formulada para la salud prostática. Contiene extractos de saw palmetto, zinc y licopeno para el bienestar del sistema urológico.`,
            category: 'gomitas'
        });
    }

    // Capsulas (80 products)
    for (let i = 1; i <= 80; i++) {
        products.capsulas.push({
            id: `capsula-${i}`,
            name: `Cápsula Urológica ${i}`,
            price: 49,
            image: `💊`,
            description: `Cápsula natural ${i} con formulación avanzada para el cuidado de la salud prostática y urinaria. Contiene extractos concentrados de plantas medicinales tradicionales para máxima efectividad.`,
            category: 'capsulas'
        });
    }

    // Suplementos (12 products)
    for (let i = 1; i <= 12; i++) {
        products.suplementos.push({
            id: `suplemento-${i}`,
            name: `Suplemento Prostático ${i}`,
            price: 49,
            image: `🌾`,
            description: `Suplemento natural ${i} rico en nutrientes esenciales para la salud prostática. Perfecto para complementar tu alimentación diaria con ingredientes orgánicos y propiedades antiinflamatorias.`,
            category: 'suplementos'
        });
    }

    renderProducts();
    renderPromotions();
}

// Render products in their respective grids
function renderProducts() {
    renderProductGrid('gomitas', products.gomitas);
    renderProductGrid('capsulas', products.capsulas);
    renderProductGrid('suplementos', products.suplementos);
}

function renderProductGrid(category, productList) {
    const grid = document.getElementById(`${category}-grid`);
    if (!grid) return;

    grid.innerHTML = '';
    
    productList.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">S/. ${product.price}</div>
                <button class="add-to-cart" onclick="addToCart('${product.id}')">
                    Agregar al Carrito
                </button>
            </div>
        `;
        
        // Add double-click event to show product details
        productCard.addEventListener('dblclick', () => showProductDetail(product.id));
        
        grid.appendChild(productCard);
    });
}

// Render promotions
function renderPromotions() {
    const promotionsGrid = document.getElementById('promotions-grid');
    if (!promotionsGrid) return;

    const promotions = [
        {
            title: '🎉 Pack Gomitas Prostáticas x2',
            price: 99,
            originalPrice: 149,
            description: 'Llévate 2 frascos de nuestras deliciosas gomitas prostáticas por el precio de uno. Perfectas para un tratamiento prolongado y efectivo.',
            details: 'Incluye:\n• 2 Frascos de Gomitas Prostáticas (60 unidades c/u)\n• Envío gratuito\n• Guía de uso personalizada\n• Seguimiento de resultados'
        },
        {
            title: '💊 Pack Cápsulas Premium',
            price: 109,
            originalPrice: 180,
            description: 'Combo especial de nuestras cápsulas más efectivas con 30% de descuento. Formula concentrada para resultados óptimos.',
            details: 'Incluye:\n• 3 Frascos de Cápsulas Premium (90 cápsulas c/u)\n• Tabletas de Saw Palmetto GRATIS\n• Plan nutricional personalizado\n• Consulta virtual incluida'
        },
        {
            title: '🌾 Mega Pack Salud Prostática',
            price: 149,
            originalPrice: 220,
            description: 'El paquete más completo para el cuidado integral de tu salud prostática. Todo lo que necesitas en un solo pack.',
            details: 'Incluye:\n• 2 Frascos Gomitas Prostáticas\n• 2 Frascos Cápsulas Premium\n• 1 Suplemento Antioxidante\n• Guía completa de salud prostática\n• 3 meses de seguimiento'
        },
        {
            title: '🎯 Pack Inicio Prostático',
            price: 159,
            originalPrice: 240,
            description: 'Pack perfecto para comenzar tu tratamiento natural. Incluye los productos esenciales más consultorías especializadas.',
            details: 'Incluye:\n• 1 Frasco Gomitas Prostáticas\n• 2 Frascos Cápsulas Urológicas\n• 1 Suplemento Natural\n• 2 Consultas con especialista\n• Manual de ejercicios prostáticos'
        },
        {
            title: '⚡ Bundle Premium VIP',
            price: 300,
            originalPrice: 450,
            description: 'La experiencia más completa para tu salud prostática. Incluye productos premium y acompañamiento personalizado por 6 meses.',
            details: 'Incluye:\n• 4 Frascos Gomitas Premium\n• 4 Frascos Cápsulas Elite\n• 2 Suplementos Especializados\n• 6 meses de seguimiento médico\n• Tests de laboratorio incluidos\n• Programa nutricional personalizado\n• Acceso VIP a contenido exclusivo'
        }
    ];

    promotions.forEach((promotion, index) => {
        const promotionItem = document.createElement('div');
        promotionItem.className = 'promotion-item';
        promotionItem.innerHTML = `
            <div class="promotion-price">S/. ${promotion.price}</div>
            <h3>${promotion.title}</h3>
            <p class="promotion-description">${promotion.description}</p>
            <div class="promotion-savings">Ahorra S/. ${promotion.originalPrice - promotion.price}</div>
        `;
        
        // Agregar funcionalidad para expandir
        promotionItem.addEventListener('click', () => {
            showPromotionModal(promotion);
        });
        
        promotionItem.addEventListener('dblclick', () => {
            showPromotionModal(promotion);
        });
        
        promotionsGrid.appendChild(promotionItem);
    });
}

// Mostrar modal de promoción expandida
function showPromotionModal(promotion) {
    const modal = document.getElementById('promotion-modal');
    const modalBody = document.getElementById('promotion-modal-body');
    
    modalBody.innerHTML = `
        <h2>${promotion.title}</h2>
        <div class="promotion-modal-price">
            <span class="current-price">S/. ${promotion.price}</span>
            <span class="original-price">S/. ${promotion.originalPrice}</span>
            <span class="savings">¡Ahorra S/. ${promotion.originalPrice - promotion.price}!</span>
        </div>
        <p class="promotion-modal-description">${promotion.description}</p>
        <div class="promotion-modal-details">
            <h3>📋 Detalles del Pack:</h3>
            <pre>${promotion.details}</pre>
        </div>
        <div class="promotion-modal-actions">
            <button class="btn-primary" onclick="addPromotionToCart('${promotion.title}', ${promotion.price})">
                Agregar al Carrito - S/. ${promotion.price}
            </button>
            <button class="btn-secondary" onclick="closePromotionModal()">
                Cerrar
            </button>
        </div>
    `;
    
    modal.style.display = 'flex';
}

// Cerrar modal de promoción
function closePromotionModal() {
    const modal = document.getElementById('promotion-modal');
    modal.style.display = 'none';
}

// Agregar promoción al carrito
function addPromotionToCart(title, price) {
    const promotionItem = {
        id: `promo-${Date.now()}`,
        name: title,
        price: price,
        image: '🎁',
        description: 'Promoción especial',
        category: 'promocion',
        quantity: 1
    };
    
    cart.push(promotionItem);
    updateCartDisplay();
    saveCartToStorage();
    showNotification(`Promoción agregada al carrito: ${title}`);
    closePromotionModal();
}

// Event listeners para cerrar modal
document.addEventListener('DOMContentLoaded', function() {
    // Cerrar modal al hacer clic en la X
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('promotion-modal-close')) {
            closePromotionModal();
        }
        
        // Cerrar modal al hacer clic fuera del contenido
        if (e.target.classList.contains('promotion-modal')) {
            closePromotionModal();
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePromotionModal();
        }
    });
});

// Navigation functions
function toggleMegaMenu(sectionId) {
    // Close all other megamenus
    const allMegamenus = document.querySelectorAll('.megamenu');
    allMegamenus.forEach(menu => {
        if (menu.id !== `megamenu-${sectionId}`) {
            menu.classList.remove('active');
        }
    });
    
    // Toggle the selected megamenu
    const targetMegamenu = document.getElementById(`megamenu-${sectionId}`);
    if (targetMegamenu) {
        targetMegamenu.classList.toggle('active');
        
        // If it's products section, show gomitas by default
        if (sectionId === 'productos' && targetMegamenu.classList.contains('active')) {
            showProductSection('gomitas');
        }
        
        // Scroll to the megamenu or video section
        if (targetMegamenu.classList.contains('active')) {
            setTimeout(() => {
                targetMegamenu.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
    
    // Check if any megamenu is active, if not, show video section
    setTimeout(() => {
        const activeMegamenus = document.querySelectorAll('.megamenu.active');
        const videoSection = document.querySelector('.video-section');
        
        if (activeMegamenus.length === 0 && videoSection) {
            videoSection.style.display = 'block';
            setTimeout(() => {
                videoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } else if (videoSection) {
            videoSection.style.display = 'none';
        }
    }, 150);
}

function showProductSection(subsection) {
    // Update filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target?.classList.add('active');

    // Hide all product subsections
    const subsections = document.querySelectorAll('.product-subsection');
    subsections.forEach(sub => {
        sub.style.display = 'none';
    });

    // Show selected subsection
    const targetSubsection = document.getElementById(`${subsection}-section`);
    if (targetSubsection) {
        targetSubsection.style.display = 'block';
    }
}

// Product detail modal
function showProductDetail(productId) {
    const product = findProductById(productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const details = document.getElementById('productDetails');
    
    details.innerHTML = `
        <div class="product-detail">
            <div class="product-image" style="font-size: 6em; margin-bottom: 20px;">${product.image}</div>
            <h3>${product.name}</h3>
            <div class="price">S/. ${product.price}</div>
            <div class="description">${product.description}</div>
            <button class="add-to-cart" onclick="addToCart('${product.id}'); closeProductModal();" style="padding: 15px 30px; font-size: 1.2em;">
                Agregar al Carrito
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
}

// Cart functions
function addToCart(productId) {
    const product = findProductById(productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
    saveCartToStorage();
    showNotification(`${product.name} agregado al carrito`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCartToStorage();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartDisplay();
        saveCartToStorage();
    }
}

function clearCart() {
    cart = [];
    updateCartDisplay();
    saveCartToStorage();
    showNotification('Carrito vacío');
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;

    // Update cart items
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Tu carrito está vacío</p>';
            if (cartTotal) cartTotal.textContent = '0';
            return;
        }

        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">S/. ${item.price} c/u</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart('${item.id}')">Eliminar</button>
            `;
            cartItems.appendChild(cartItem);
        });

        if (cartTotal) cartTotal.textContent = total;
    }
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    }
}

// Storage functions
function saveCartToStorage() {
    localStorage.setItem('naturalUrologyCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('naturalUrologyCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Payment functions
function showPaymentOptions() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    document.getElementById('cartModal').style.display = 'none';
    document.getElementById('paymentModal').style.display = 'block';
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
    const paymentDetails = document.getElementById('paymentDetails');
    if (paymentDetails) {
        paymentDetails.style.display = 'none';
        paymentDetails.innerHTML = '';
    }
}

function showPaymentDetails(method) {
    const details = document.getElementById('paymentDetails');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let paymentInfo = '';
    
    switch(method) {
        case 'bcp':
            paymentInfo = `
                <div class="payment-info">
                    <h4>💳 Datos para Transferencia BCP</h4>
                    <div class="payment-data">
                        <p><strong>Número de cuenta:</strong> 19197088999093</p>
                        <p><strong>Titular:</strong> Aura Haydee Niño</p>
                        <p><strong>Banco:</strong> BCP</p>
                        <p><strong>Monto a transferir:</strong> S/. ${total}</p>
                    </div>
                    <div class="payment-instructions">
                        <p><em>📱 Después de realizar la transferencia, envía el comprobante por WhatsApp al +51 940 106 849</em></p>
                        <button onclick="window.open('https://wa.me/51940106849?text=Hola! He realizado una transferencia BCP por S/.${total}. Adjunto comprobante.', '_blank')" class="whatsapp-btn">
                            Enviar Comprobante por WhatsApp
                        </button>
                    </div>
                </div>
            `;
            break;
        case 'interbancaria':
            paymentInfo = `
                <div class="payment-info">
                    <h4>🏦 Datos para Transferencia Interbancaria</h4>
                    <div class="payment-data">
                        <p><strong>Número de cuenta:</strong> 00219119708899909356</p>
                        <p><strong>Titular:</strong> Aura Haydee Niño</p>
                        <p><strong>Monto a transferir:</strong> S/. ${total}</p>
                    </div>
                    <div class="payment-instructions">
                        <p><em>📱 Después de realizar la transferencia, envía el comprobante por WhatsApp al +51 940 106 849</em></p>
                        <button onclick="window.open('https://wa.me/51940106849?text=Hola! He realizado una transferencia interbancaria por S/.${total}. Adjunto comprobante.', '_blank')" class="whatsapp-btn">
                            Enviar Comprobante por WhatsApp
                        </button>
                    </div>
                </div>
            `;
            break;
        case 'yape':
            paymentInfo = `
                <div class="payment-info">
                    <h4>📱 Datos para Yape</h4>
                    <div class="payment-data">
                        <p><strong>Nombre:</strong> Aura Haydee Niño</p>
                        <p><strong>Número:</strong> +51 940 106 849</p>
                        <p><strong>Monto a yapear:</strong> S/. ${total}</p>
                    </div>
                    <div class="payment-instructions">
                        <p><em>📱 Después de realizar el Yape, envía una captura por WhatsApp al mismo número</em></p>
                        <button onclick="window.open('https://wa.me/51940106849?text=Hola! He realizado un Yape por S/.${total}. Adjunto captura.', '_blank')" class="whatsapp-btn">
                            Enviar Captura por WhatsApp
                        </button>
                    </div>
                </div>
            `;
            break;
    }
    
    details.innerHTML = paymentInfo;
    details.style.display = 'block';
}

// Utility functions
function findProductById(productId) {
    for (const category in products) {
        const product = products[category].find(p => p.id === productId);
        if (product) return product;
    }
    return null;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2d5a27;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 3000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cartModal');
    const paymentModal = document.getElementById('paymentModal');
    const productModal = document.getElementById('productModal');
    
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
    if (event.target === paymentModal) {
        paymentModal.style.display = 'none';
    }
    if (event.target === productModal) {
        productModal.style.display = 'none';
    }
});

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
