function displayCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsList = document.getElementById('cart-items');
        const totalPriceEl = document.getElementById('total-price');

        cartItemsList.innerHTML = '';  // Limpar lista existente
        let totalPrice = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('li');
            itemElement.textContent = `${item.title} - ${item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
            cartItemsList.appendChild(itemElement);

            totalPrice += item.price;
        });

        totalPriceEl.textContent = totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // Exibir carrinho ao carregar a página
    displayCart();