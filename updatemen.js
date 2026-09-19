// ======================================================
// KICKER MEN'S PRODUCTS
// ======================================================


// ======================================================
// GET PRODUCTS
// ======================================================

function getMenProducts() {

    return JSON.parse(
        localStorage.getItem("products")
    ) || [];

}


// ======================================================
// CREATE PRODUCT CARD
// ======================================================

function createMenProductCard(product) {

    const card = document.createElement("div");

    card.className = "product-card";

    card.dataset.productId = product.id;


    card.innerHTML = `

        <div class="product-image">

            <img
                src="${product.image}"
                alt="${product.name}"
            >

        </div>


        <h3>
            ${product.name}
        </h3>


        <p>
            ${product.description || "Football Shoes"}
        </p>


        <strong>
            $${Number(product.price).toFixed(2)}
        </strong>


        <div class="product-buttons">

            <button
                class="add-cart-btn"
                type="button"
            >
                Add to Cart 🛒
            </button>


            <button
                class="wishlist-btn"
                type="button"
            >
                ♡
            </button>

        </div>

    `;


    // ==================================================
    // WHOLE CARD OPENS PRODUCT
    // ==================================================

    card.addEventListener(
        "click",
        function () {

            window.location.href =
                `product.html?id=${product.id}`;

        }
    );


    // ==================================================
    // ADD TO CART
    // ==================================================

    const cartButton =
        card.querySelector(".add-cart-btn");


    cartButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            addMenProductToCart(product.id);

        }
    );


    // ==================================================
    // WISHLIST
    // ==================================================

    const wishlistButton =
        card.querySelector(".wishlist-btn");


    wishlistButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            addMenProductToWishlist(product.id);

        }
    );


    return card;

}


// ======================================================
// LOAD MEN PRODUCTS
// ======================================================

function loadMenProducts(filter = "all") {

    const grid =
        document.getElementById(
            "menShoesGrid"
        );


    if (!grid) {
        return;
    }


    const allProducts =
        getMenProducts();


    // Only Men's products
    let products =
        allProducts.filter(
            product =>
                product.category === "men"
        );


    // ==================================================
    // FILTER PRODUCTS
    // ==================================================

    if (filter !== "all") {

        products =
            products.filter(product => {

                const tags =
                    (product.tags || "")
                    .toLowerCase();

                return tags.includes(filter);

            });

    }


    // ==================================================
    // CLEAR GRID
    // ==================================================

    grid.innerHTML = "";


    // ==================================================
    // NO PRODUCTS
    // ==================================================

    if (products.length === 0) {

        grid.innerHTML = `

            <p style="
                grid-column: 1 / -1;
                text-align: center;
            ">

                No Men's products available.

            </p>

        `;

        return;

    }


    // ==================================================
    // DISPLAY PRODUCTS
    // ==================================================

    products.forEach(product => {

        grid.appendChild(
            createMenProductCard(product)
        );

    });

}


// ======================================================
// ADD TO CART
// ======================================================

function addMenProductToCart(productId) {

    const products =
        getMenProducts();


    const product =
        products.find(
            item =>
                String(item.id) ===
                String(productId)
        );


    if (!product) {

        alert("Product not found.");

        return;

    }


    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const existing =
        cart.find(
            item =>
                String(item.id) ===
                String(productId)
        );


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert(
        `${product.name} added to cart! 🛒`
    );

}


// ======================================================
// WISHLIST
// ======================================================

function addMenProductToWishlist(productId) {

    const products =
        getMenProducts();


    const product =
        products.find(
            item =>
                String(item.id) ===
                String(productId)
        );


    if (!product) {
        return;
    }


    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];


    const exists =
        wishlist.some(
            item =>
                String(item.id) ===
                String(productId)
        );


    if (exists) {

        alert(
            "This product is already in your wishlist ❤️"
        );

        return;

    }


    wishlist.push({

        id: product.id,

        name: product.name,

        price: product.price,

        image: product.image

    });


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    alert(
        `${product.name} added to wishlist! ❤️`
    );

}


// ======================================================
// FILTER BUTTONS
// ======================================================

document
    .querySelectorAll(".filter-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const filter =
                    this.dataset.filter;


                loadMenProducts(filter);

            }
        );

    });


// ======================================================
// LOAD PAGE
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadMenProducts();


        if (
            typeof updateNavbar ===
            "function"
        ) {

            updateNavbar();

        }

    }
);


// ======================================================
// UPDATE WHEN ADMIN CHANGES PRODUCTS
// ======================================================

window.addEventListener(
    "storage",
    function (event) {

        if (event.key === "products") {

            loadMenProducts();

        }

    }
);