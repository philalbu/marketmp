function setupApp() {
    const apiUrl = 'https://marketmp-production.up.railway.app/api/products?populate=*';
    const userName = localStorage.getItem('userName');  // Obter o nome do usuário
    let cart = JSON.parse(localStorage.getItem(`${userName}-cart`)) || [];  // Associar o carrinho ao usuário

    // Função para salvar o carrinho no localStorage
    function saveCart() {
        localStorage.setItem(`${userName}-cart`, JSON.stringify(cart));  // Salva o carrinho com chave única por usuário
        updateCartCount();  // Atualizar contagem do carrinho
    }

    // Função para atualizar o contador de itens no carrinho
    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = cart.length;  // Exibe a quantidade de itens no carrinho
    }

    // Função para abrir o drawer do carrinho
    function openCartDrawer() {
        const cartDrawer = document.getElementById('cart-drawer');
        cartDrawer.style.display = 'block';  // Exibe o drawer do carrinho
        renderCartItems();  // Renderiza os itens do carrinho dentro do drawer
    }

    // Função para fechar o drawer do carrinho
    function closeCartDrawer() {
        const cartDrawer = document.getElementById('cart-drawer');
        cartDrawer.style.display = 'none'; // Fecha o drawer do carrinho
    }

    // Função para renderizar os itens no carrinho
    function renderCartItems() {
        const cartDrawerContent = document.getElementById('cart-drawer-content');
        cartDrawerContent.innerHTML = '';  // Limpa o conteúdo anterior

        if (cart.length === 0) {
            cartDrawerContent.innerHTML = '<p>Seu carrinho está vazio.</p>';
            return;
        }

        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-image" />
                <div class="cart-item-info">
                    <p class="cart-item-title">${item.title}</p>
                    <p class="cart-item-price">${item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
            `;
            cartDrawerContent.appendChild(cartItemElement);
        });
    }

function updateStock(productId) {
    console.log(`Tentando atualizar o estoque do produto com ID: ${productId}`);
  
    const url = `https://marketmp-production.up.railway.app/api/products/${productId}?populate=*`; // Usando o ID correto
  
    // Altere para o valor do estoque que deseja atualizar
    const newStockValue = 50; // Exemplo de novo valor para o estoque
  
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // Adicione o token de autorização, se necessário
            // 'Authorization': `Bearer ${yourToken}`
        },
        body: JSON.stringify({
            data: {
                stock_product: newStockValue, // Atualizando o estoque para o campo correto
            },
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.data) {
            console.log("Estoque atualizado:", data);
        } else {
            console.error('Erro ao atualizar estoque:', data.error.message);
        }
    })
    .catch(error => {
        console.error('Erro ao atualizar estoque:', error);
    });
}



    // Função para buscar os produtos da API
    async function fetchProducts() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            const productList = document.getElementById('product-list');

            data.data.forEach(product => {
                const productElement = document.querySelector('.product-item').cloneNode(true);

                const imageUrl = product.photo_product?.url
                    ? `https://marketmp-production.up.railway.app${product.photo_product.url}`
                    : 'https://via.placeholder.com/300x200?text=Sem+Imagem';


                const formattedPrice = product.price_product.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                });

                productElement.querySelector('.product-image').src = imageUrl;
                productElement.querySelector('.product-title').textContent = product.title_product;
                productElement.querySelector('.product-price').textContent = formattedPrice;

                // Evento de clique para abrir a página de detalhes ao clicar no card
                productElement.addEventListener('click', () => {
                    window.location.href = `pages/product-details.html?id=${product.id}`;
                });

                // Impedir a navegação ao clicar no botão de adicionar ao carrinho
                const addToCartBtn = productElement.querySelector('.add-to-cart-btn');
                addToCartBtn.addEventListener('click', (event) => {
                    event.stopPropagation(); // Evita que o clique no botão afete o card inteiro
                    event.preventDefault(); // Evita navegação indesejada

                    // Adicionar o produto ao carrinho
                    const productToAdd = {
                        id: product.id,
                        title: product.title_product,
                        price: product.price_product,
                        image: imageUrl,
                    };
                    cart.push(productToAdd);
                    saveCart();

                    // Atualizar o estoque no Strapi
                    const stock = product.stock_product || 0;
                    if (stock > 0) {
                        updateStock(product.id, stock - 1); // Diminui o estoque
                    }

                    // Atualiza o botão para "Esgotado" se o estoque for 0
                    addToCartBtn.textContent = stock - 1 <= 0 ? 'Esgotado' : 'Adicionar ao Carrinho';
                    addToCartBtn.disabled = stock - 1 <= 0;
                });

                productElement.style.display = 'block';
                productList.appendChild(productElement);
            });

        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    // Eventos para abrir e fechar o carrinho
    const cartBtn = document.getElementById('cart-btn');
    cartBtn.addEventListener('click', openCartDrawer);  // Ao clicar no botão, abre o drawer do carrinho

    const closeCartBtn = document.getElementById('close-cart-btn');
    closeCartBtn.addEventListener('click', closeCartDrawer);  // Ao clicar no botão de fechar, fecha o drawer

    // Inicia a busca pelos produtos e atualiza o contador de itens
    fetchProducts();
    updateCartCount();  // Atualizar o contador de itens no carrinho ao carregar
}
