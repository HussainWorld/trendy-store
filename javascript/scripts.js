const loginLogoutDiv = document.getElementById('loginLogoutDiv')
const logingLogoutText = document.getElementById('logingLogoutText')

const loginRegisterBtm = document.getElementById('loginRegisterBtm')

const checkoutDiv = document.getElementById('checkout')


let cartItems = [];
let totalAmount = 0;

let selectedMainCategory = 'All'; 
let selectedSubCategory = null; 

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
}

function addToCart(name, price, image) {
  const existingItem = cartItems.find(item => item.name === name);
  if (existingItem) {
      existingItem.quantity += 1;
  } else {
      cartItems.push({ name, price, image, quantity: 1 });
  }
  updateCart();
  showCart();
}

function showCart() {
  const cartSidebar = document.getElementById('cartSidebar');
  cartSidebar.classList.add('active');
}

function hideCart() {
  const cartSidebar = document.getElementById('cartSidebar');
  cartSidebar.classList.remove('active');
}

function updateCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  const totalAmountElement = document.getElementById('totalAmount');
  const subTotalElement = document.getElementById('subTotal');

  cartItemsContainer.innerHTML = '';
  cartItems.forEach((item, index) => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
      
      cartItemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-details">
              <p>${item.name}</p>
              <p>Quantity: ${item.quantity}</p>
              <p>BHD ${item.price.toFixed(2)}</p>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${index})">×</button>
      `;
      
      cartItemsContainer.appendChild(cartItemElement);
  });
  
  totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  totalAmountElement.textContent = `Total: BHD ${totalAmount.toFixed(2)}`;

  const subTotal = totalAmount + 12;
  subTotalElement.textContent = `Sub Total: BHD ${subTotal.toFixed(2)}`;
}


function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
}

function proceedToCheckout() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalAmount', totalAmount);

    if (cartItems.length != 0){
     
     checkoutDiv.classList.remove('hidden');
     setTimeout(() => { 
      checkoutDiv.classList.add('visible');
     }, 10);
        setTimeout(() => {
      checkoutDiv.classList.remove('visible');
       setTimeout(() => {
        checkoutDiv.classList.add('hidden');
       }, 500); 
     }, 3000); 

     toggleCart()

    }
}

function toggleSidebar() {
  const sidebar = document.getElementById("loginSidebar");
    sidebar.classList.toggle('active');
}

function registerUser() {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const email = document.getElementById("email").value.trim();

  if (firstName.length < 3) {
    alert("First name must be at least 3 characters long.");
    return;
  }

  if (lastName.length < 3) {
    alert("Last name must be at least 3 characters long.");
    return;
  }

  const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!/^[0-9]{8}$/.test(mobile)) {
    alert("Mobile number must be an 8-digit number.");
    return;
  }

  const fullName = `${firstName} ${lastName}`;
  localStorage.setItem("userName", fullName);

  const userDisplay = document.getElementById("userDisplay");
  userDisplay.innerHTML = `Hello, ${fullName} <button id="logoutButton" onclick='signOut()'>Sign Out</button>`;
  toggleSidebar();


  logingLogoutText.textContent = 'You have successfully logged in!'
  loginLogoutDiv.style.backgroundColor = '#4caf50';
   loginLogoutDiv.classList.remove('hidden');
   setTimeout(() => { 
     loginLogoutDiv.classList.add('visible');
   }, 10);
 
   setTimeout(() => {
     loginLogoutDiv.classList.remove('visible');
     setTimeout(() => {
       loginLogoutDiv.classList.add('hidden'); 
     }, 500); 
   }, 3000); 

}

document.addEventListener("DOMContentLoaded", () => {
  const userName = localStorage.getItem("userName");
  const userDisplay = document.getElementById("userDisplay");

  if (userName) {
    userDisplay.innerHTML = `Hello, ${userName} <button onclick='signOut()'>Sign Out</button>`;

    
  }
});

function signOut() {
  localStorage.removeItem("userName"); 
  const userDisplay = document.getElementById("userDisplay");
  userDisplay.innerHTML = "";

  logingLogoutText.textContent = 'You have successfully logged out!'
  loginLogoutDiv.style.backgroundColor = 'red';

    loginLogoutDiv.classList.remove('hidden');
    setTimeout(() => { 
      loginLogoutDiv.classList.add('visible');
    }, 10);
  
    setTimeout(() => {
      loginLogoutDiv.classList.remove('visible'); 
      setTimeout(() => {
        loginLogoutDiv.classList.add('hidden'); 
      }, 500); 
    }, 3000); 

}

document.querySelector('.search-bar input').addEventListener('input', function() {
  const searchQuery = this.value.toLowerCase();
  console.log('Search query:', searchQuery); 
  
  const products = document.querySelectorAll('.products .product');
  console.log('Number of products:', products.length); 

  products.forEach(product => {
      const productName = product.querySelector('p').textContent.toLowerCase();
      console.log('Product name:', productName); 
      
      if (productName.includes(searchQuery)) {
          product.style.display = 'block'; 
      } else {
          product.style.display = 'none'; 
      }
  });
});
