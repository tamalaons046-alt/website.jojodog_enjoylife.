// ===== DATA PRODUK =====
const products = [
  { name: "O_HEAD", price: 150000, img: "images/ohead2.jpg", discount: 20, rating: 4 },
  { name: "JOJODOG1", price: 150000, img: "images/jojodog3.jpg", discount: 20, rating: 5 },
  { name: "JOJODOG2", price: 150000, img: "images/jojodog1.jpg", discount: 20, rating: 4 },
  { name: "JOJODOG3", price: 150000, img: "images/jojodog4.jpg", discount: 20, rating: 5 },
  { name: "O_HEAD", price: 150000, img: "images/ohead1.jpg", discount: 20, rating: 4 },
  { name: "Topi", price: 80000, img: "images/slide1.jpg", discount: 10, rating: 4 }
];

let cart = [];

// ===== RENDER PRODUK =====
function renderProducts() {
  const el = document.getElementById('products');
  el.innerHTML = '';

  products.forEach((product, i) => {
    const discountedPrice = product.price - (product.price * product.discount / 100);
    const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);

    el.innerHTML += `
      <div class="product">
        <img src="${product.img}" alt="${product.name}">
        <h4>${product.name}</h4>
        <div>
          <span class='discount'>Rp ${product.price}</span>
          <span class='sale-price'>Rp ${discountedPrice}</span>
        </div>
        <div class='rating'>${stars}</div>
        <button onclick="addToCart(${i})">+ Keranjang</button>
      </div>
    `;
  });
}

// ===== KERANJANG =====
function addToCart(i) {
  cart.push(products[i]);
  renderCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  renderCart();
}

function renderCart() {
  const el = document.getElementById('cartItems');
  el.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const discountedPrice = item.price - (item.price * item.discount / 100);
    total += discountedPrice;

    el.innerHTML += `
      <div class="cart-item">
        ${item.name} 
        <span class="remove" onclick="removeItem(${index})">❌</span>
      </div>
    `;
  });

  document.getElementById('total').innerText = 'Total: Rp ' + total;
}

// ===== CHECKOUT =====
function checkout() {
  if (cart.length === 0) {
    alert('Keranjang kosong');
    return;
  }
  document.getElementById('checkoutModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('checkoutModal').style.display = 'none';
}

function processPayment() {
  const nama = document.getElementById('nama').value;
  const alamat = document.getElementById('alamat').value;
  const metode = document.getElementById('metode').value;

  if (!nama || !alamat || !metode) {
    alert('Isi semua data');
    return;
  }

  let total = 0;
  const ongkir = 10000;
  let pesan = '🛒 *Pesanan Baru*%0A';
  pesan += `👤 Nama: ${nama}%0A`;
  pesan += `📍 Alamat: ${alamat}%0A`;
  pesan += `💳 Metode: ${metode}%0A%0A`;
  pesan += '📦 Detail:%0A';

  cart.forEach(item => {
    const discountedPrice = item.price - (item.price * item.discount / 100);
    total += discountedPrice;
    pesan += `- ${item.name} (Rp ${discountedPrice})%0A`;
  });

  const grandTotal = total + ongkir;
  pesan += `%0A🚚 Ongkir: Rp ${ongkir}%0A`;
  pesan += `💰 Total: Rp ${grandTotal}`;

  window.open('https://wa.me/6281318876216?text=' + pesan, '_blank');

  cart = [];
  renderCart();
  closeModal();
}

// ===== MENU MOBILE =====
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('active');
}

// ===== SLIDER =====
let index = 0;
const slides = document.getElementById('slides');
setInterval(() => {
  index = (index + 1) % 2;
  slides.style.transform = `translateX(-${index * 100}%)`;
}, 3000);

// ===== INIT =====
renderProducts();