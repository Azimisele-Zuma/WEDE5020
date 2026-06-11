const searchIcon = document.querySelector(".search-icon")
const searchForm = document.querySelector(".search-form")

searchIcon.addEventListener("click", () => {
    searchForm.classList.toggle("active");
});


const cartIcon = document.querySelector("#cart-btn");
const cartContainer = document.querySelector(".cart-items-container");

cartIcon.addEventListener("click", () => {
    cartContainer.classList.toggle("active");
});
