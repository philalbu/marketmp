const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

console.log('Product ID:', productId); // Verificar o ID do produto

const apiUrl = `https://marketmp-production.up.railway.app/api/products?filters[id]=${productId}&populate=*`;

async function fetchProductDetails() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // // Verifique a resposta da API
    // console.log('API Response:', data);

    // Verifique se há dados do produto
    if (!data.data || data.data.length === 0) {
      document.getElementById('product-details').textContent = 'Produto não encontrado!';
      return;
    }

    const product = data.data[0];

    // // Logar o produto para verificar a estrutura
    // console.log('Product:', product);

    // Acessar diretamente os dados do produto, sem o "attributes"
    const title = product.title_product;
    const price = product.price_product;
    const imageUrl = product.photo_product?.url;
    const stock = product.stock_product;

    if (!title || !price || !stock) {
      throw new Error('Dados incompletos do produto.');
    }

    // Valida imagem
    const fullImageUrl = imageUrl
      ? `https://marketmp-production.up.railway.app${imageUrl}`
      : 'https://via.placeholder.com/200';

    // Preenche os elementos HTML
    document.getElementById('detail-title').textContent = title;
    document.getElementById('detail-price').textContent = price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    document.getElementById('detail-image').src = fullImageUrl;
    document.getElementById('detail-stock').textContent = stock;


  } catch (error) {
    console.error('Erro ao buscar detalhes do produto:', error);
    document.getElementById('product-details').textContent = 'Erro ao carregar detalhes.';
  }
}

const buyButton = document.getElementById('buy-button');

// Função para redirecionar para o checkout
buyButton.addEventListener('click', () => {
  // Redireciona para a página de checkout, passando o ID do produto como parâmetro
  window.location.href = `pages/checkout.html?id=${productId}`;
});

window.onload = fetchProductDetails;
