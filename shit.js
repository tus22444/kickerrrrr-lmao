
/* ==========================================
   KICKER SHARED JAVASCRIPT
========================================== */


/* ==========================================
   NAVBAR ACCOUNT SYSTEM
========================================== */

// ==========================================
// NAVBAR ACCOUNT SYSTEM
// ==========================================

function updateNavbar() {

    const accountArea =
        document.getElementById("accountArea");

    if (!accountArea) return;


    const user = getCurrentUser();


    // ==========================================
    // LOGGED IN
    // ==========================================

    if (user) {

        // Make sure old accounts have everything
        if (!Array.isArray(user.cart)) {
            user.cart = [];
        }

        if (!Array.isArray(user.wishlist)) {
            user.wishlist = [];
        }

        if (!Array.isArray(user.orders)) {
            user.orders = [];
        }

        if (typeof user.funds !== "number") {
            user.funds = 0;
        }

        // Save repaired account
        updateCurrentUser(user);


        accountArea.innerHTML = `

            <span class="welcome-user">
                👤 ${user.username}
            </span>

            <a
                href="cart.html"
                class="nav-cart"
            >
                🛒 Cart
                <span id="cartCount">
                    ${user.cart.length}
                </span>
            </a>

            <button
                type="button"
                id="logoutButton"
                class="logout-btn"
            >
                Log Out
            </button>

        `;


        // Logout button
        const logoutButton =
            document.getElementById("logoutButton");


        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                function () {

                    logout();

                }
            );

        }

    }


    // ==========================================
    // NOT LOGGED IN
    // ==========================================

    else {

        accountArea.innerHTML = `

            <a
                href="signup.html"
                class="account-button"
            >
                Sign Up
            </a>

            <a
                href="login.html"
                class="account-button"
            >
                Log In
            </a>

        `;

    }
}


/* ==========================================
   CART COUNT
========================================== */

// ==========================================
// CART COUNT
// ==========================================

function updateCartCount() {

    const user = getCurrentUser();

    const cartCount =
        document.getElementById("cartCount");


    if (!cartCount) return;


    if (!user) {

        cartCount.textContent = "0";

        return;
    }


    if (!Array.isArray(user.cart)) {

        user.cart = [];

        updateCurrentUser(user);

    }


    cartCount.textContent =
        user.cart.length;
}


/* ==========================================
   HERO SLIDER
========================================== */

function setupHeroSlider() {

    const nextAdButton =
        document.getElementById("nextAd");

    const prevAdButton =
        document.getElementById("prevAd");


    /*
       Only run hero slider code if
       the page actually has the slider.
    */

    if (!nextAdButton || !prevAdButton) {
        return;
    }


    const ads = [

        {
            smallText:
                "NEW PRODUCT HAS ARRIVED!",

            title:
                '"THIS IS<br>LIFE CHANGING."',

            description:
                "Discover the latest kickers and exclusive drops.",

            image:
                "fotos/db43f0d4c87354b73f3ce4bc308f75de.png"
        },

        {
            smallText:
                "JUST DROPPED!",

            title:
                '"STEP UP<br>YOUR GAME."',

            description:
                "Fresh sneakers made for your everyday style.",

            image:
                "fotos/1047340_main.png"
        }

    ];


    let currentAd = 0;

    let isAnimating = false;


    const smallText =
        document.querySelector(".small-text");

    const title =
        document.querySelector(".hero-text h1");

    const description =
        document.querySelector(".description");

    const image =
        document.querySelector(".hero-image img");

    const heroText =
        document.querySelector(".hero-text");

    const heroImage =
        document.querySelector(".hero-image");


    function showAd(index) {

        currentAd = index;

        if (smallText) {

            smallText.textContent =
                ads[index].smallText;

        }

        if (title) {

            title.innerHTML =
                ads[index].title;

        }

        if (description) {

            description.textContent =
                ads[index].description;

        }

        if (image) {

            image.src =
                ads[index].image;

        }
    }


    /* --------------------------------------
       NEXT AD
    -------------------------------------- */

    nextAdButton.addEventListener(
        "click",
        () => {

            if (isAnimating) return;

            isAnimating = true;


            if (heroText) {

                heroText.classList.add(
                    "hero-slide-left"
                );

            }


            if (heroImage) {

                heroImage.classList.add(
                    "hero-slide-left"
                );

            }


            setTimeout(() => {

                currentAd++;

                if (currentAd >= ads.length) {

                    currentAd = 0;

                }


                showAd(currentAd);


                if (heroText) {

                    heroText.classList.remove(
                        "hero-slide-left"
                    );

                    heroText.classList.add(
                        "hero-enter-right"
                    );

                    void heroText.offsetWidth;

                }


                if (heroImage) {

                    heroImage.classList.remove(
                        "hero-slide-left"
                    );

                    heroImage.classList.add(
                        "hero-enter-right"
                    );

                }


                setTimeout(() => {

                    if (heroText) {

                        heroText.classList.remove(
                            "hero-enter-right"
                        );

                    }

                    if (heroImage) {

                        heroImage.classList.remove(
                            "hero-enter-right"
                        );

                    }

                }, 50);


                setTimeout(() => {

                    isAnimating = false;

                }, 450);


            }, 450);

        }
    );


    /* --------------------------------------
       PREVIOUS AD
    -------------------------------------- */

    prevAdButton.addEventListener(
        "click",
        () => {

            if (isAnimating) return;

            isAnimating = true;


            if (heroText) {

                heroText.classList.add(
                    "hero-slide-right"
                );

            }


            if (heroImage) {

                heroImage.classList.add(
                    "hero-slide-right"
                );

            }


            setTimeout(() => {

                currentAd--;

                if (currentAd < 0) {

                    currentAd =
                        ads.length - 1;

                }


                showAd(currentAd);


                if (heroText) {

                    heroText.classList.remove(
                        "hero-slide-right"
                    );

                    heroText.classList.add(
                        "hero-enter-left"
                    );

                    void heroText.offsetWidth;

                }


                if (heroImage) {

                    heroImage.classList.remove(
                        "hero-slide-right"
                    );

                    heroImage.classList.add(
                        "hero-enter-left"
                    );

                }


                setTimeout(() => {

                    if (heroText) {

                        heroText.classList.remove(
                            "hero-enter-left"
                        );

                    }

                    if (heroImage) {

                        heroImage.classList.remove(
                            "hero-enter-left"
                        );

                    }

                }, 50);


                setTimeout(() => {

                    isAnimating = false;

                }, 450);


            }, 450);

        }
    );

}


/* ==========================================
   ALL SHOES PAGINATION
========================================== */

function setupShoesPagination() {

    const shoesGrid =
        document.getElementById("allShoesGrid");


    /*
       Only run pagination if the page
       actually has the shoes grid.
    */

    if (!shoesGrid) return;


    const shoesPerPage = 8;

    let currentShoesPage = 1;


    const shoesCards =
        shoesGrid.querySelectorAll(
            ".product-card"
        );


    const totalShoesPages =
        Math.ceil(
            shoesCards.length /
            shoesPerPage
        );


    const prevShoesBtn =
        document.getElementById(
            "prevShoesPage"
        );


    const nextShoesBtn =
        document.getElementById(
            "nextShoesPage"
        );


    const shoesPageIndicator =
        document.getElementById(
            "shoesPageIndicator"
        );


    function updateShoesPage() {

        const start =
            (currentShoesPage - 1)
            * shoesPerPage;


        const end =
            start + shoesPerPage;


        shoesCards.forEach(
            (card, idx) => {

                card.style.display =
                    (
                        idx >= start &&
                        idx < end
                    )
                        ? "block"
                        : "none";

            }
        );


        if (shoesPageIndicator) {

            shoesPageIndicator.textContent =
                `Page ${currentShoesPage} of ${totalShoesPages}`;

        }


        if (prevShoesBtn) {

            prevShoesBtn.disabled =
                currentShoesPage === 1;

        }


        if (nextShoesBtn) {

            nextShoesBtn.disabled =
                currentShoesPage === totalShoesPages;

        }

    }


    if (prevShoesBtn) {

        prevShoesBtn.addEventListener(
            "click",
            () => {

                if (currentShoesPage > 1) {

                    currentShoesPage--;

                    updateShoesPage();

                }

            }
        );

    }


    if (nextShoesBtn) {

        nextShoesBtn.addEventListener(
            "click",
            () => {

                if (
                    currentShoesPage <
                    totalShoesPages
                ) {

                    currentShoesPage++;

                    updateShoesPage();

                }

            }
        );

    }


    updateShoesPage();

}















// ==========================================
// PRODUCT CART BUTTONS
// ==========================================

function setupProductButtons() {

    const cartButtons =
        document.querySelectorAll(".add-cart-btn");

    cartButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const card =
                button.closest(".product-card");

            if (!card) return;

            const product = {

                id: Number(
                    card.dataset.productId
                ),

                name:
                    card.dataset.productName,

                price: Number(
                    card.dataset.productPrice
                ),

                image:
                    card.dataset.productImage

            };

            const added = addToCart(product);

            if (added) {

                alert(
                    product.name +
                    " added to cart!"
                );

                updateCartCount();

            }

        });

    });

}


















/* ==========================================
   PRODUCT PAGE LINKS
========================================== */


function setupProductLinks() {

    document
        .querySelectorAll(".product-card")
        .forEach(card => {

            const productId =
                card.dataset.productId;

            const viewButton =
                card.querySelector(
                    ".view-product"
                );


            if (
                viewButton &&
                productId
            ) {

                viewButton.href =
                    "product.html?id=" +
                    productId;

            }

        });

}


/* ==========================================
   PRODUCT FILTER
========================================== */

function filterProducts() {

    const filter =
        window.location.hash
            .substring(1)
            .toLowerCase() || "all";


    const productCards =
        document.querySelectorAll(
            ".product-card"
        );


    /* --------------------------------------
       FILTER PRODUCTS
    -------------------------------------- */

    productCards.forEach(card => {

        const tagString =
            card.dataset.tags || "";


        const tags =
            tagString
                .toLowerCase()
                .split(/\s+/);


        if (
            filter === "all" ||
            tags.includes(filter)
        ) {

            card.classList.remove(
                "filtered-out"
            );

        } else {

            card.classList.add(
                "filtered-out"
            );

        }

    });


    /* --------------------------------------
       ACTIVE FILTER BUTTON
    -------------------------------------- */

    document
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            const href =
                button.getAttribute("href");

            if (!href) return;


            const buttonFilter =
                href.includes("#")
                    ? href
                        .split("#")[1]
                        .toLowerCase()
                    : "all";


            button.classList.toggle(
                "active",
                buttonFilter === filter
            );

        });


    /* --------------------------------------
       SECTION TITLES
    -------------------------------------- */

    const sectionTitle =
        document.querySelector(
            ".section-title h2"
        );


    if (sectionTitle) {

        const titles = {

            all:
                "Built to Play. Made to Perform.",

            lightweight:
                "Lightweight Speed.",

            performance:
                "Built for Performance.",

            comfortable:
                "Comfort Comes First.",

            speed:
                "Built for Explosive Speed.",

            control:
                "Designed for Precise Control.",

            "match-ready":
                "Ready for Match Day.",

            comfort:
                "Comfort Comes First."

        };


        sectionTitle.textContent =
            titles[filter] || titles.all;

    }

}


/* ==========================================
   INITIALIZE EVERYTHING
========================================== */

function initializeKicker() {

    /*
       Account system
    */

    updateNavbar();

    updateCartCount();


    /*
       Product buttons
    */

    setupProductButtons();


    /*
       Product links
    */

    setupProductLinks();


    /*
       Hero slider
    */

    setupHeroSlider();


    /*
       Pagination
    */

    setupShoesPagination();


    /*
       Filters
    */

    filterProducts();

}


/* ==========================================
   START KICKER
========================================== */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeKicker
    );

} else {

    initializeKicker();

}


/* ==========================================
   HASH CHANGE
========================================== */

window.addEventListener(
    "hashchange",
    filterProducts
);













































// ==========================================
// KIDS PRODUCTS
// ==========================================

// ==========================================
// KIDS PRODUCTS
// ==========================================

function loadKidsProducts() {

    const products = JSON.parse(
        localStorage.getItem("products")
    ) || [];

    const kidsGrid = document.getElementById(
        "kidsShoesGrid"
    );

    if (!kidsGrid) {
        return;
    }

    kidsGrid.innerHTML = "";

    const kidsProducts = products.filter(
        product =>
            product.category &&
            product.category.toLowerCase() === "kids"
    );

    kidsProducts.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        // ==========================================
        // PRODUCT DATA
        // ==========================================

        card.setAttribute(
            "data-product-id",
            product.id
        );

        card.setAttribute(
            "data-product-name",
            product.name
        );

        card.setAttribute(
            "data-product-price",
            product.price
        );

        card.setAttribute(
            "data-product-image",
            product.image
        );

        // ==========================================
        // PRODUCT HTML
        // ==========================================

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
                ${product.description || "Kids Football Shoes"}
            </p>

            <strong>
                $${product.price}
            </strong>

            <a
                href="product.html?id=${product.id}"
                class="view-product"
            >
                View Product →
            </a>

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
                    aria-label="Add ${product.name} to wishlist"
                >
                    ♡
                </button>

            </div>

        `;

        kidsGrid.appendChild(card);

    });

    // ==========================================
    // CONNECT CART BUTTONS
    // ==========================================

    setupProductButtons();

    // ==========================================
    // CONNECT PRODUCT LINKS
    // ==========================================

    setupProductLinks();

    // ==========================================
    // APPLY FILTER
    // ==========================================

    filterProducts();
}







// ==========================================
// MEN PRODUCTS
// ==========================================

// ==========================================
// LOAD MEN PRODUCTS
// ==========================================

function loadMenProducts() {

    const products = JSON.parse(
        localStorage.getItem("products")
    ) || [];

    const menGrid = document.getElementById(
        "menShoesGrid"
    );

    if (!menGrid) {
        return;
    }

    // Clear existing hard-coded products
    menGrid.innerHTML = "";

    // ==========================================
    // GET MEN PRODUCTS ONLY
    // ==========================================

    const menProducts = products.filter(
        product =>
            product.category &&
            product.category.toLowerCase() === "men"
    );

    // ==========================================
    // CREATE PRODUCT CARDS
    // ==========================================

    menProducts.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        // ==========================================
        // PRODUCT DATA
        // ==========================================

        card.setAttribute(
            "data-product-id",
            product.id
        );

        card.setAttribute(
            "data-product-name",
            product.name
        );

        card.setAttribute(
            "data-product-price",
            product.price
        );

        card.setAttribute(
            "data-product-image",
            product.image
        );

        card.setAttribute(
            "data-tags",
            product.tags || ""
        );

        // ==========================================
        // PRODUCT HTML
        // ==========================================

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
                ${product.description || "Men's Football Shoes"}
            </p>

            <strong>
                $${product.price}
            </strong>

            <a
                href="product.html?id=${product.id}"
                class="view-product"
            >
                View Product →
            </a>

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
                    aria-label="Add ${product.name} to wishlist"
                >
                    ♡
                </button>

            </div>

        `;

        menGrid.appendChild(card);
    });










// ==========================================
// WOMEN PRODUCTS
// ==========================================

function loadWomenProducts() {

    const products = JSON.parse(
        localStorage.getItem("products")
    ) || [];

    const womenGrid = document.getElementById(
        "womenShoesGrid"
    );

    if (!womenGrid) {
        return;
    }

    // Clear existing products
    womenGrid.innerHTML = "";

    // ==========================================
    // GET WOMEN PRODUCTS ONLY
    // ==========================================

    const womenProducts = products.filter(
        product =>
            product.category &&
            product.category.toLowerCase() === "women"
    );

    // ==========================================
    // CREATE PRODUCT CARDS
    // ==========================================

    womenProducts.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        // ==========================================
        // PRODUCT DATA
        // ==========================================

        card.setAttribute(
            "data-product-id",
            product.id
        );

        card.setAttribute(
            "data-product-name",
            product.name
        );

        card.setAttribute(
            "data-product-price",
            product.price
        );

        card.setAttribute(
            "data-product-image",
            product.image
        );

        card.setAttribute(
            "data-tags",
            product.tags || ""
        );

        // ==========================================
        // PRODUCT HTML
        // ==========================================

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
                ${product.description || "Women's Football Shoes"}
            </p>

            <strong>
                $${product.price}
            </strong>

            <a
                href="product.html?id=${product.id}"
                class="view-product"
            >
                View Product →
            </a>

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
                    aria-label="Add ${product.name} to wishlist"
                >
                    ♡
                </button>

            </div>
        `;

        womenGrid.appendChild(card);
    });

    // ==========================================
    // CONNECT CART BUTTONS
    // ==========================================

    setupProductButtons();

    // ==========================================
    // CONNECT PRODUCT LINKS
    // ==========================================

    setupProductLinks();

    // ==========================================
    // APPLY FILTER
    // ==========================================

    filterProducts();
}


// ==========================================
// UNISEX PRODUCTS
// ==========================================















    // ==========================================
    // CONNECT CART BUTTONS
    // ==========================================

    setupProductButtons();

    // ==========================================
    // CONNECT PRODUCT LINKS
    // ==========================================

    setupProductLinks();

    // ==========================================
    // APPLY FILTER
    // ==========================================

    filterProducts();
}


// ==========================================
// WOMEN PRODUCTS
// ==========================================

function loadWomenProducts() {

    const products = JSON.parse(
        localStorage.getItem("products")
    ) || [];

    const womenGrid =
        document.getElementById("womenShoesGrid");

    if (!womenGrid) return;

    womenGrid.innerHTML = "";

    const womenProducts = products.filter(product => {

        if (!product.category) return false;

        const category =
            String(product.category)
                .trim()
                .toLowerCase();

        return (
            category === "women" ||
            category === "woman"
        );
    });

    createDynamicProducts(
        womenProducts,
        womenGrid,
        "Women's Football Shoes"
    );
}


// ==========================================
// UNISEX PRODUCTS
// ==========================================

function loadUnisexProducts() {

    const products = JSON.parse(
        localStorage.getItem("products")
    ) || [];

    const unisexGrid =
        document.getElementById("unisexShoesGrid");

    if (!unisexGrid) return;

    unisexGrid.innerHTML = "";

    const unisexProducts = products.filter(product => {

        if (!product.category) return false;

        const category =
            String(product.category)
                .trim()
                .toLowerCase();

        return (
            category === "unisex"
        );
    });

    createDynamicProducts(
        unisexProducts,
        unisexGrid,
        "Unisex Football Shoes"
    );
}


// ==========================================
// NEW ARRIVALS
// ==========================================

function loadNewArrivalsProducts() {

    const products = JSON.parse(
        localStorage.getItem("products")
    ) || [];

    const newArrivalsGrid =
        document.getElementById(
            "newArrivalsShoesGrid"
        );

    if (!newArrivalsGrid) return;

    newArrivalsGrid.innerHTML = "";

    const newProducts = products.filter(product => {

        return (
            product.newArrival === true ||
            product.newArrival === "true" ||
            product.newArrivals === true ||
            product.newArrivals === "true" ||
            product.isNew === true ||
            product.isNew === "true"
        );
    });

    createDynamicProducts(
        newProducts,
        newArrivalsGrid,
        "New Arrival Football Shoes"
    );
}


// ==========================================
// UNDER $500
// ==========================================

function loadUnder500Products() {

    const products = JSON.parse(
        localStorage.getItem("products")
    ) || [];

    const under500Grid =
        document.getElementById(
            "under500ShoesGrid"
        );

    if (!under500Grid) return;

    under500Grid.innerHTML = "";

    const under500Products = products.filter(
        product =>
            Number(product.price) <= 500
    );

    createDynamicProducts(
        under500Products,
        under500Grid,
        "Football Shoes Under $500"
    );
}


// ==========================================
// CREATE PRODUCT CARD
// ==========================================

function createDynamicProducts(
    products,
    grid,
    defaultDescription
) {

    products.forEach(product => {

        const card =
            document.createElement("div");

        card.className =
            "product-card";

        // ==========================================
        // PRODUCT DATA
        // ==========================================

        card.setAttribute(
            "data-product-id",
            product.id
        );

        card.setAttribute(
            "data-product-name",
            product.name
        );

        card.setAttribute(
            "data-product-price",
            product.price
        );

        card.setAttribute(
            "data-product-image",
            product.image
        );

        card.setAttribute(
            "data-tags",
            product.tags || ""
        );

        // ==========================================
        // PRODUCT HTML
        // ==========================================

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
                ${
                    product.description ||
                    defaultDescription
                }
            </p>

            <strong>
                $${product.price}
            </strong>

            <a
                href="product.html?id=${product.id}"
                class="view-product"
            >
                View Product →
            </a>

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
                    aria-label="Add ${product.name} to wishlist"
                >
                    ♡
                </button>

            </div>
        `;

        grid.appendChild(card);
    });

    // ==========================================
    // CONNECT EVERYTHING
    // ==========================================

    setupProductButtons();
    setupProductLinks();
    filterProducts();
}


// ==========================================
// LOAD WHEN PAGE OPENS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadWomenProducts
);

document.addEventListener(
    "DOMContentLoaded",
    loadUnisexProducts
);

document.addEventListener(
    "DOMContentLoaded",
    loadNewArrivalsProducts
);

document.addEventListener(
    "DOMContentLoaded",
    loadUnder500Products
);

// ==========================================
// LOAD MEN PRODUCTS WHEN PAGE OPENS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadMenProducts
);
  


// ==========================================
// LOAD KIDS PRODUCTS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadKidsProducts
);


// ==========================================
// LOAD WHEN PAGE OPENS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadKidsProducts
);