document.getElementById("productForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const productName = document.getElementById("productName").value;
    const price = document.getElementById("price").value;
    const images = document.getElementById("image").value;
    const errorMessage = document.getElementById("errorMessage");
  
    if (!isImgUrl(images)) {
      errorMessage.textContent = "Please enter a valid image URL.";
      return;
    }
  
    createProduct(productName, price, images);
  });
  
  document.getElementById("resetForm").addEventListener("click", () => {
    location.reload();
  });
  
  document.getElementById("addToCart").addEventListener("click", () => {
    addTocart();
  });
  
  document.getElementById("calculatePrice").addEventListener("click", () => {
    calcultePrice();
  });
  
  isImgUrl = (images) => {
    const input = new URL(images);
    return /\.(jpg|jpeg|png|gif)$/.test(input.pathname);
  };
  
  createProduct = (productName, price, images) => {
    const productDashboard = document.getElementById("productDashboard");
    const productDiv = document.createElement("div");
    const newProduct = { productName, price, images };
    const product = [];
    product.push(newProduct);
  
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
  };
  
  addTocart = () => {
    const selectedProducts = document.querySelectorAll(".product-checkbox:checked");
    const cart = document.getElementById("cart");
  
    selectedProducts.forEach((product) => {
      const productName = product.parentNode.parentNode.querySelector("h3").textContent;
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
      `;
      cart.appendChild(productDiv);
    });
  };
  
  calcultePrice = () => {
    const selectedProducts = document.querySelectorAll(".product-checkbox:checked");
    let total = 0;
    selectedProducts.forEach((product) => {
      const price = product.parentNode.parentNode.querySelector("p").textContent;
      total += parseFloat(price.slice(1));
    });
    document.getElementById("totalPrice").textContent = `You have to pay : $${total.toFixed(2)}`;
  };
  