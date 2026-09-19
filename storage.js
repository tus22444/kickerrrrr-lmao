
// ==========================================
// KICKER STORAGE SYSTEM
// ==========================================


// ==========================================
// ACCOUNT SYSTEM
// ==========================================

// ------------------------------------------
// ADMIN ACCOUNT
// ------------------------------------------

// These are the ONLY admin login credentials.
//
// Change these if you want.
//
// NOTE:
// This is suitable for your school/demo project.
// A real website should NOT store passwords like this.

const ADMIN_ACCOUNT = {
    username: "Kicker Admin",
    email: "admin@kicker.com",
    password: "admin123",
    isAdmin: true,
    funds: 0,
    cart: [],
    wishlist: [],
    orders: [],
    createdAt: new Date().toISOString()
};


// ------------------------------------------
// GET ALL ACCOUNTS
// ------------------------------------------

function getAccounts() {

    return JSON.parse(
        localStorage.getItem("accounts")
    ) || [];

}


// ------------------------------------------
// SAVE ALL ACCOUNTS
// ------------------------------------------

function saveAccounts(accounts) {

    localStorage.setItem(
        "accounts",
        JSON.stringify(accounts)
    );

}


// ------------------------------------------
// REPAIR ACCOUNT
// ------------------------------------------

function repairAccount(account) {

    if (!account.cart || !Array.isArray(account.cart)) {
        account.cart = [];
    }

    if (!account.wishlist || !Array.isArray(account.wishlist)) {
        account.wishlist = [];
    }

    if (!account.orders || !Array.isArray(account.orders)) {
        account.orders = [];
    }

    if (typeof account.funds !== "number") {
        account.funds = 0;
    }

    // IMPORTANT:
    // Normal users = false
    // Admin = true

    if (typeof account.isAdmin !== "boolean") {
        account.isAdmin = false;
    }

    if (!account.createdAt) {
        account.createdAt = new Date().toISOString();
    }

    return account;
}


// ------------------------------------------
// REPAIR ALL ACCOUNTS
// ------------------------------------------

function repairAllAccounts() {

    const accounts = getAccounts();

    const repairedAccounts = accounts.map(account => {

        return repairAccount(account);

    });

    saveAccounts(repairedAccounts);

    return repairedAccounts;

}


// ------------------------------------------
// CREATE ADMIN ACCOUNT
// ------------------------------------------

function createAdminAccount() {

    const accounts = getAccounts();

    const existingAdmin = accounts.find(account =>
        account.email.toLowerCase() ===
        ADMIN_ACCOUNT.email.toLowerCase()
    );

    // Admin already exists
    if (existingAdmin) {

        existingAdmin.username = ADMIN_ACCOUNT.username;
        existingAdmin.isAdmin = true;

        saveAccounts(accounts);

        return;
    }

    // Create admin
    accounts.push({
        username: ADMIN_ACCOUNT.username,
        email: ADMIN_ACCOUNT.email,
        password: ADMIN_ACCOUNT.password,

        isAdmin: true,

        funds: 0,
        cart: [],
        wishlist: [],
        orders: [],

        createdAt: ADMIN_ACCOUNT.createdAt
    });

    saveAccounts(accounts);

    console.log("Kicker admin account created.");
}


// ------------------------------------------
// INITIALIZE STORAGE
// ------------------------------------------

function initializeStorage() {

    createAdminAccount();

    repairAllAccounts();

}


// ==========================================
// SIGN UP
// ==========================================

function saveData() {

    const username =
        document.getElementById("username").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmpassword").value;


    if (!username || !email || !password || !confirmPassword) {

        alert("Please fill in all fields!");

        return;

    }


    if (password !== confirmPassword) {

        alert("Passwords do not match!");

        return;

    }


    const accounts = repairAllAccounts();


    const usernameExists = accounts.some(account =>

        account.username.toLowerCase() ===
        username.toLowerCase()

    );


    if (usernameExists) {

        alert("Username already exists!");

        return;

    }


    const emailExists = accounts.some(account =>

        account.email.toLowerCase() ===
        email.toLowerCase()

    );


    if (emailExists) {

        alert("Email is already registered!");

        return;

    }


    // ------------------------------------------
    // NORMAL USER ACCOUNT
    // ------------------------------------------

    const newAccount = {

        username: username,

        email: email,

        password: password,

        isAdmin: false,

        funds: 0,

        cart: [],

        wishlist: [],

        orders: [],

        createdAt: new Date().toISOString()

    };


    accounts.push(newAccount);

    saveAccounts(accounts);


    alert("Sign up successful!");

    console.log("Created account:", newAccount);


    window.location.href = "login.html";

}


// ==========================================
// LOGIN
// ==========================================

function login() {

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    if (!email || !password) {

        alert("Please enter your email and password!");

        return;

    }


    const accounts = repairAllAccounts();


    const user = accounts.find(account =>

        account.email.toLowerCase() ===
        email.toLowerCase() &&

        account.password === password

    );


    if (!user) {

        alert("Incorrect email or password!");

        return;

    }


    // Save logged-in account
    localStorage.setItem(
        "currentUser",
        user.email
    );


    if (user.isAdmin) {

        alert(
            `Welcome, ${user.username}! ⚙️`
        );

    } else {

        alert(
            `Welcome back, ${user.username}! 👋`
        );

    }


    console.log("Logged in:", user);


    window.location.href = "introduction.html";

}


// ==========================================
// CURRENT USER
// ==========================================

// ------------------------------------------
// GET CURRENT USER
// ------------------------------------------

function getCurrentUser() {

    const currentEmail =
        localStorage.getItem("currentUser");


    if (!currentEmail) {

        return null;

    }


    const accounts = repairAllAccounts();


    const user = accounts.find(account =>

        account.email.toLowerCase() ===
        currentEmail.toLowerCase()

    );


    if (!user) {

        localStorage.removeItem("currentUser");

        return null;

    }


    return repairAccount(user);

}


// ------------------------------------------
// CHECK IF ADMIN
// ------------------------------------------

function isAdmin() {

    const user = getCurrentUser();

    return !!(
        user &&
        user.isAdmin === true
    );

}


// ------------------------------------------
// UPDATE CURRENT USER
// ------------------------------------------

function updateCurrentUser(updatedUser) {

    const currentEmail =
        localStorage.getItem("currentUser");


    if (!currentEmail) {

        return false;

    }


    const accounts = getAccounts();


    const index = accounts.findIndex(account =>

        account.email.toLowerCase() ===
        currentEmail.toLowerCase()

    );


    if (index === -1) {

        return false;

    }


    updatedUser =
        repairAccount(updatedUser);


    accounts[index] =
        updatedUser;


    saveAccounts(accounts);


    return true;

}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    localStorage.removeItem("currentUser");

    alert("You have been logged out!");

    window.location.href =
        "introduction.html";

}


// ==========================================
// SHOPPING CART
// ==========================================

// ------------------------------------------
// ADD TO CART
// ------------------------------------------

function addToCart(product) {

    const user =
        getCurrentUser();


    if (!user) {

        alert("Please log in first.");

        return false;

    }


    if (!Array.isArray(user.cart)) {

        user.cart = [];

    }


    const existingProduct =
        user.cart.find(item =>

            Number(item.id) ===
            Number(product.id)

        );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        user.cart.push({

            id: Number(product.id),

            name: product.name,

            price: Number(product.price),

            image: product.image,

            quantity: 1

        });

    }


    updateCurrentUser(user);


    return true;

}


// ------------------------------------------
// REMOVE FROM CART
// ------------------------------------------

function removeFromCart(productId) {

    const user =
        getCurrentUser();


    if (!user) {

        alert("Please log in first!");

        return;

    }


    user.cart =
        user.cart.filter(item =>

            Number(item.id) !==
            Number(productId)

        );


    updateCurrentUser(user);

}


// ------------------------------------------
// CHANGE QUANTITY
// ------------------------------------------

function changeQuantity(productId, amount) {

    const user =
        getCurrentUser();


    if (!user) {

        return;

    }


    const product =
        user.cart.find(item =>

            Number(item.id) ===
            Number(productId)

        );


    if (!product) {

        return;

    }


    product.quantity += amount;


    if (product.quantity <= 0) {

        user.cart =
            user.cart.filter(item =>

                Number(item.id) !==
                Number(productId)

            );

    }


    updateCurrentUser(user);

}


// ------------------------------------------
// CLEAR CART
// ------------------------------------------

function clearCart() {

    const user =
        getCurrentUser();


    if (!user) {

        return;

    }


    user.cart = [];


    updateCurrentUser(user);

}


// ------------------------------------------
// GET CART TOTAL
// ------------------------------------------

function getCartTotal() {

    const user =
        getCurrentUser();


    if (!user || !user.cart) {

        return 0;

    }


    return user.cart.reduce(

        (total, item) => {

            return total +

                (
                    Number(item.price) *
                    Number(item.quantity)
                );

        },

        0

    );

}


// ==========================================
// FUNDS / WALLET
// ==========================================

// ------------------------------------------
// ADD FUNDS
// ------------------------------------------

function addFunds(amount) {

    const user =
        getCurrentUser();


    if (!user) {

        alert("Please log in first!");

        return;

    }


    amount =
        Number(amount);


    if (isNaN(amount) || amount <= 0) {

        alert("Invalid amount!");

        return;

    }


    user.funds += amount;


    updateCurrentUser(user);


    console.log(
        "New balance:",
        user.funds
    );

}


// ------------------------------------------
// GET FUNDS
// ------------------------------------------

function getFunds() {

    const user =
        getCurrentUser();


    if (!user) {

        return 0;

    }


    return Number(user.funds) || 0;

}


// ==========================================
// CHECKOUT
// ==========================================

// ------------------------------------------
// BUY CART
// ------------------------------------------

function checkout() {

    const user =
        getCurrentUser();


    if (!user) {

        alert("Please log in first!");

        return false;

    }


    if (!user.cart ||
        user.cart.length === 0) {

        alert("Your cart is empty!");

        return false;

    }


    const total =
        getCartTotal();


    if (user.funds < total) {

        alert(

            `Not enough funds!\n\n` +

            `Total: $${total.toFixed(2)}\n` +

            `Your funds: $${user.funds.toFixed(2)}`

        );

        return false;

    }


    user.funds -= total;


    const order = {

        id: Date.now(),

        items:
            JSON.parse(
                JSON.stringify(user.cart)
            ),

        total: total,

        date:
            new Date().toISOString()

    };


    user.orders.push(order);


    user.cart = [];


    updateCurrentUser(user);


    alert(

        `Purchase successful! 🎉\n\n` +

        `Total: $${total.toFixed(2)}`

    );


    console.log(
        "Order:",
        order
    );


    return true;

}


// ==========================================
// WISHLIST
// ==========================================

// ------------------------------------------
// ADD TO WISHLIST
// ------------------------------------------

function addToWishlist(product) {

    const user =
        getCurrentUser();


    if (!user) {

        alert("Please log in first!");

        return;

    }


    if (!user.wishlist) {

        user.wishlist = [];

    }


    const exists =
        user.wishlist.some(item =>

            Number(item.id) ===
            Number(product.id)

        );


    if (exists) {

        alert("Already in wishlist!");

        return;

    }


    user.wishlist.push({

        id: Number(product.id),

        name: product.name,

        price: Number(product.price),

        image: product.image

    });


    updateCurrentUser(user);


    alert(
        "Added to wishlist ❤️"
    );

}


// ------------------------------------------
// REMOVE FROM WISHLIST
// ------------------------------------------

function removeFromWishlist(productId) {

    const user =
        getCurrentUser();


    if (!user) {

        return;

    }


    user.wishlist =
        user.wishlist.filter(item =>

            Number(item.id) !==
            Number(productId)

        );


    updateCurrentUser(user);

}


// ==========================================
// ACCOUNT INFO
// ==========================================

function getAccountInfo() {

    const user =
        getCurrentUser();


    if (!user) {

        return null;

    }


    return {

        username:
            user.username,

        email:
            user.email,

        funds:
            user.funds,

        cartItems:
            user.cart.length,

        wishlistItems:
            user.wishlist.length,

        orders:
            user.orders.length,

        isAdmin:
            user.isAdmin,

        createdAt:
            user.createdAt

    };

}


// ==========================================
// INITIALIZE
// ==========================================

initializeStorage();

