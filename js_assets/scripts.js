const searchIcon = document.querySelector(".search-icon")
const searchForm = document.querySelector(".search-form")

searchIcon.addEventListener("click", () => {
    searchForm.classList.toggle("active");
});

const searchInput = document.getElementById('search-box');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            
            const productNameElement = card.querySelector('h3');
            
            if (productNameElement) {
                const productName = productNameElement.textContent.toLowerCase();
                
                
                if (productName.includes(searchTerm)) {
                    card.style.display = 'block'; 
                } else {
                    card.style.display = 'none';  
                }
            }
        });
    });
}


const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeBtn = document.getElementById('close-btn');


cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
});


closeBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
});


cartOverlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
});







const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartItemsList = document.getElementById('cart-items');


document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
});


addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const btn = event.target;
        
        
        const productName = btn.getAttribute('data-name');
        const productPrice = btn.getAttribute('data-price');

        
        const productCard = btn.closest('.product-card');
        const productImgSrc = productCard.querySelector('.product-img').getAttribute('src');
        
        const product = {
            name: productName,
            price: productPrice,
            image: productImgSrc,
            quantity: 1
        };

        
        saveCartToStorage(product);
        
        
        loadCartFromStorage();
    });
});


function saveCartToStorage(product) {
    let cart = JSON.parse(localStorage.getItem('savedCart')) || [];
    
    
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('savedCart', JSON.stringify(cart));
}


function decreaseCartItem(productName) {
    let cart = JSON.parse(localStorage.getItem('savedCart')) || [];
    
    const itemIndex = cart.findIndex(item => item.name === productName);
    
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            
            cart.splice(itemIndex, 1);
        }
    }
    
    localStorage.setItem('savedCart', JSON.stringify(cart));
    loadCartFromStorage();
}


function loadCartFromStorage() {
    if (!cartItemsList) return;
    
    
    cartItemsList.innerHTML = '';
    
    let cart = JSON.parse(localStorage.getItem('savedCart')) || [];
    
    cart.forEach(product => {
        const newCartItem = document.createElement('li');
        const itemQuantity = product.quantity || 1;
        
        newCartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 105px; height: 105px; object-fit: cover; margin-right: 10px; border-radius: 4px;">
            ${product.name} - <span>${product.price}</span> 
            <span style="background: #e0e0e0; padding: 2px 8px; border-radius: 12px; font-size: 12px; margin-left: 10px;">x${itemQuantity}</span>
            <button class="decrease-btn" data-name="${product.name}" style="margin-left: 10px; padding: 2px 8px; cursor: pointer; background: #ffcccb; border: none; border-radius: 4px; font-weight: bold;">-</button>
        `;
        
        cartItemsList.appendChild(newCartItem);
    });

    // Attach listeners to newly generated minus buttons
    const decreaseButtons = document.querySelectorAll('.decrease-btn');
    decreaseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const prodName = e.target.getAttribute('data-name');
            decreaseCartItem(prodName);
        });
    });
}





document.addEventListener("DOMContentLoaded", () => {
    const enquiryForm = document.getElementById("enquiryForm");

    
    if (enquiryForm) {
        enquiryForm.addEventListener("submit", async (event) => {
            event.preventDefault(); // Stop the page from reloading

        
            const formData = new FormData(enquiryForm);
            
        
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            try {
                
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: json
                });

                const result = await response.json();

                
                if (response.status === 200 && result.success) {
                    alert("Thank you! Your enquiry has been submitted successfully.");
                    enquiryForm.reset(); 
                } else {
                    console.error("API Error Summary:", result);
                    alert(result.message || "Something went wrong. Please try again.");
                }

            } catch (error) {
                
                console.error("Network Error Details:", error);
                alert("Network error. Please check your internet connection and try again.");
            }
        });
    }
});




 const contactForm = document.getElementById("contactForm");
    
    if (contactForm) {
        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            
            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            try {
                
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: json
                });

                const result = await response.json();

            
                if (response.status === 200 && result.success) {
                    alert("Thank you! Your message has been sent successfully.");
                    contactForm.reset(); 
                } else {
                    console.error("API Error Summary:", result);
                    alert(result.message || "Something went wrong. Please try again.");
                }

            } catch (error) {
                console.error("Network Error Details:", error);
                alert("Network error. Please check your internet connection and try again.");
            }
        });
    }



// Updated paths with ../ to correctly jump out of the js_assets folder
const bakeryProducts = [
  // --- ROW 1: SAVOURY / BAGUETTES ---
  { name: "Baguette Sandwich", price: "R65", elementId: "baguette-sandwich", image: "../images/IMG_baguettesandwich.JPG" },
  { name: "Cheddar&Tomato Baguette", price: "R60", elementId: "cheddar-tomato-baguette", image: "../images/IMG_cheddartomato.JPG" },
  { name: "Crossaint", price: "R50", elementId: "croissant", image: "../images/IMG_crossaintsandwich.JPG" }, 
  
  // --- ROW 2: CAKES & COOKIES ---
  { name: "Chocolate Cake", price: "R25", elementId: "chocolate-cake", image: "../images/IMG_chocolatecake.JPG" },
  { name: "Cramel Cake", price: "R25", elementId: "caramel-cake", image: "../images/IMG_caramelcake.JPG" }, 
  { name: "Choc Chip Cookies", price: "R20", elementId: "choc-chip-cookies", image: "../images/IMG_chocchipcookies.JPG" },
  
  // --- ROW 3: MORE SWEET TREATS ---
  { name: "Chocolate Chip Cookies", price: "R20", elementId: "dark-choc-cookies", image: "../images/IMG_chocolatechipcookies.JPG" },
  { name: "Brownies", price: "R20", elementId: "brownies", image: "../images/IMG_brownies.JPG" },                       
  { name: "Nutella Cupcake", price: "R25", elementId: "nutella-cupcake", image: "../images/IMG_nutella.JPG" },

  // --- ROW 4: PASTRIES ---
  { name: "Macaroons(3)", price: "R45", elementId: "macaroons", image: "../images/IMG_macaroons.JPG" },
  { name: "Chocolate Eclairs", price: "R30", elementId: "chocolate-eclairs", image: "../images/IMG_chocolateeclair.JPG" },
  { name: "Nutella Crossaint", price: "R35", elementId: "nutella-croissant", image: "../images/IMG_chocolatecrossaint.JPG" },
  { name: "Chocolate Filled Pie", price: "R00", elementId: "chocolate-filled-pie", image: "../images/IMG_chocolatepastery.JPG" },

  // --- ROW 5: BEVERAGES ---
  { name: "Smoothies: Apple,Blueberry,Lemon,Orange,Strawberry", price: "R30", elementId: "smoothies", image: "../images/IMG_smoothies.JPG" },
  { name: "Coffee/Cappucino", price: "R35", elementId: "coffee-cappuccino", image: "../images/IMG_coffecuppacino.JPG" },
  { name: "Fruit Juice", price: "R20", elementId: "fruit-juice", image: "../images/IMG_fruitjuice.JPG" }
];


const searchBox = document.getElementById('search-box');
const searchResults = document.getElementById('search-results');

searchBox.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  searchResults.innerHTML = ''; 

  if (query === '') {
    searchResults.style.display = 'none';
    return;
  }

  const matchedProducts = bakeryProducts.filter(product => 
    product.name.toLowerCase().includes(query)
  );

  searchResults.style.display = 'block';

  if (matchedProducts.length === 0) {
    const noResultElement = document.createElement('div');
    noResultElement.className = 'search-no-results';
    noResultElement.innerText = 'No bakery items found';
    searchResults.appendChild(noResultElement);
  } else {
    matchedProducts.forEach(product => {
      // Create wrapper item
      const resultElement = document.createElement('div');
      resultElement.className = 'search-result-item';

      // 1. Create and add the image element
      const imgElement = document.createElement('img');
      imgElement.src = product.image;
      imgElement.alt = product.name;
      imgElement.className = 'search-result-img';
      
      // 2. Create text container (name + price)
      const textElement = document.createElement('span');
      textElement.innerText = `${product.name} - ${product.price}`;

      // Append image and text inside the row
      resultElement.appendChild(imgElement);
      resultElement.appendChild(textElement);

      // Smooth scroll behavior on click
      resultElement.addEventListener('click', () => {
        const targetElement = document.getElementById(product.elementId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          window.location.href = `products.html#${product.elementId}`;
        }
        searchResults.style.display = 'none';
        searchBox.value = ''; 
      });

      searchResults.appendChild(resultElement);
    });
  }
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-box-container')) {
    searchResults.style.display = 'none';
  }
});

// 1. Grab Lightbox elements
const prodLightbox = document.getElementById('product-lightbox');
const prodLightboxImg = document.getElementById('p-lightbox-img');
const prodLightboxCaption = document.getElementById('p-lightbox-caption');
const prodLightboxClose = document.querySelector('.p-lightbox-close');

// 2. Use Event Delegation (Safe for dynamically rendered JS items)
// This listens for clicks on the product section and checks if an image was clicked
document.addEventListener('click', (e) => {
    // Replace '.product-card img' with your exact image selector if it's different
    if (e.target.matches('.product-card img') || e.target.classList.contains('zoom-image')) {
        prodLightbox.classList.add('active');
        prodLightboxImg.src = e.target.src; // Capture clicked image source
        prodLightboxCaption.innerText = e.target.alt || "Bakery Item"; // Use alt text as description
    }
});

// 3. Close when clicking the 'X'
prodLightboxClose.addEventListener('click', () => {
    prodLightbox.classList.remove('active');
});

// 4. Close when clicking anywhere on the dark background
prodLightbox.addEventListener('click', (e) => {
    if (e.target === prodLightbox) {
        prodLightbox.classList.remove('active');
    }
});
    
 

   


