document.getElementById("productForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const productName = document.getElementById("productName").value;
  const price = document.getElementById("price").value;
  const images = document.getElementById("image").value;
  const errorMessage = document.getElementById("errorMessage");

  if (!productName || !price || !images) {
      errorMessage.textContent = "All fields are required.";
      return;
  }

  if (isNaN(price) || parseFloat(price) <= 0) {
      errorMessage.textContent = "Price must be a positive number.";
      return;
  }

  if (!isImgUrl(images)) {
      errorMessage.textContent = "Please enter a valid image URL.";
      return;
  }

  errorMessage.textContent = "";
  createProduct(productName, price, images);
});

document.getElementById("resetForm").addEventListener("click", () => {
  document.getElementById("productForm").reset();
  document.getElementById("errorMessage").textContent = "";
});

document.getElementById("addToCart").addEventListener("click", () => {
  addToCart();
});

document.getElementById("calculatePrice").addEventListener("click", () => {
  calculatePrice();
});

function isImgUrl(images) {
  try {
      const input = new URL(images);
      return /\.(jpg|jpeg|png|gif)$/.test(input.pathname);
  } catch {
      return false;
  }
}

function createProduct(productName, price, images) {
  const productDashboard = document.getElementById("productDashboard");
  const productDiv = document.createElement("div");

  productDiv.className = "flex items-center justify-between border-b border-gray-300 pb-2";
  productDiv.innerHTML = `
      <div class="flex items-center space-x-4">
          <input type="checkbox" class="product-checkbox">
          <img src="${images}" alt="${productName}" class="w-16 h-16 object-cover rounded">
          <div>
              <h3 class="font-bold">${productName}</h3>
              <p class="text-gray-600">$${price}</p>
          </div>
      </div>
  `;

  productDashboard.appendChild(productDiv);
}

function addToCart() {
  const selectedProducts = document.querySelectorAll(".product-checkbox:checked");
  const cart = document.getElementById("cart");
  const cartProducts = new Set(Array.from(cart.querySelectorAll("h3")).map(item => item.textContent));
  const newCartProducts = new Set();

  cart.innerHTML = '';

  selectedProducts.forEach((product) => {
      const productName = product.parentNode.parentNode.querySelector("h3").textContent;
      newCartProducts.add(productName);

      const price = product.parentNode.parentNode.querySelector("p").textContent;
      const images = product.parentNode.parentNode.querySelector("img").src;
      const productDiv = document.createElement("div");
      productDiv.className = "flex items-center justify-between border-b border-gray-300 pb-2";
      productDiv.innerHTML = `
          <div class="flex items-center space-x-4">
              <img src="${images}" alt="${productName}" class="w-16 h-16 object-cover rounded">
              <div>
                  <h3 class="font-bold">${productName}</h3>
                  <p class="text-gray-600">${price}</p>
              </div>
          </div>
          <button class="delete-button bg-red-500 text-white p-2 rounded hover:bg-red-600">
              <i class="fas fa-trash"></i> Delete
          </button>
      `;

      cart.appendChild(productDiv);

      productDiv.querySelector('.delete-button').addEventListener('click', () => {
          productDiv.remove();
          updateTotalPrice();
      });
  });

  document.getElementById("calculatePrice").classList.toggle('hidden', newCartProducts.size === 0);
}

function calculatePrice() {
  const cartItems = document.querySelectorAll("#cart .flex.items-center.justify-between");
  let total = 0;
  cartItems.forEach((item) => {
      const price = item.querySelector("p").textContent;
      total += parseFloat(price.slice(1));
  });
  document.getElementById("totalPrice").textContent = `You have to pay: $${total.toFixed(2)}`;
}

function updateTotalPrice() {
  const cartItems = document.querySelectorAll("#cart .flex.items-center.justify-between");
  if (cartItems.length === 0) {
      document.getElementById("calculatePrice").classList.add('hidden');
      document.getElementById("totalPrice").textContent = '';
  } else {
      calculatePrice();
  }
}
