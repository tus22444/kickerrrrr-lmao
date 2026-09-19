
// ==========================================
// KICKER ADMIN SYSTEM
// ==========================================


// ------------------------------------------
// 1. CHECK ADMIN
// ------------------------------------------

function checkAdmin() {

    const user = getCurrentUser();

    if (!user || !user.isAdmin) {
        alert("Access denied!");
        window.location.href = "introduction.html";
        return false;
    }

    return true;
}


// ------------------------------------------
// 2. LOAD ADMIN
// ------------------------------------------

function loadAdmin() {

    if (!checkAdmin()) return;

    const user = getCurrentUser();

    document.getElementById("adminName").textContent =
        user.username;

    loadStats();
    loadProducts();
    loadUsers();
    loadOrders();
    loadProfile();
}


// ------------------------------------------
// 3. SHOW SECTION
// ------------------------------------------

function showSection(sectionName) {

    const sections =
        document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.add("hidden");
    });

    const selectedSection =
        document.getElementById(sectionName);

    if (selectedSection) {
        selectedSection.classList.remove("hidden");
    }


    // Refresh information
    if (sectionName === "dashboard") {
        loadStats();
    }

    if (sectionName === "products") {
        loadProducts();
    }

    if (sectionName === "users") {
        loadUsers();
    }

    if (sectionName === "orders") {
        loadOrders();
    }

    if (sectionName === "profile") {
        loadProfile();
    }
}


// ------------------------------------------
// 4. SHOW ADD PRODUCT
// ------------------------------------------

function showAddProduct() {

    showSection("addProduct");

}


// ==========================================
// PRODUCTS
// ==========================================


// ------------------------------------------
// 5. GET PRODUCTS
// ------------------------------------------

function getProducts() {

    return JSON.parse(
        localStorage.getItem("products")
    ) || [];

}


// ------------------------------------------
// 6. SAVE PRODUCTS
// ------------------------------------------

function saveProducts(products) {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}


// ------------------------------------------
// 7. ADD PRODUCT
// ------------------------------------------

function addProduct(event) {

    event.preventDefault();

    const products = getProducts();


    const product = {

        id: Date.now(),

        name:
            document.getElementById("productName").value.trim(),

        price:
            Number(
                document.getElementById("productPrice").value
            ),

        image:
            document.getElementById("productImage").value.trim(),

        category:
            document.getElementById("productCategory").value,

        description:
            document.getElementById(
                "productDescription"
            ).value.trim()

    };


    products.push(product);

    saveProducts(products);


    alert("Product added successfully! 📦");


    event.target.reset();


    showSection("products");

    loadStats();

}


// ------------------------------------------
// 8. DISPLAY PRODUCTS
// ------------------------------------------

function loadProducts() {

    const products = getProducts();

    const container =
        document.getElementById("productList");


    container.innerHTML = "";


    if (products.length === 0) {

        container.innerHTML =
            "<p>No products yet.</p>";

        return;
    }


    products.forEach(product => {

        const div =
            document.createElement("div");

        div.className = "product-admin-card";


        div.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div>

                <h3>${product.name}</h3>

                <p>
                    Price:
                    $${product.price.toFixed(2)}
                </p>

                <p>
                    Category:
                    ${product.category}
                </p>

                <p>
                    ${product.description || "No description"}
                </p>

                <button
                    onclick="deleteProduct(${product.id})"
                >
                    🗑️ Delete
                </button>

            </div>

        `;


        container.appendChild(div);

    });

}


// ------------------------------------------
// 9. DELETE PRODUCT
// ------------------------------------------

function deleteProduct(id) {

    if (!confirm("Delete this product?")) {
        return;
    }


    let products = getProducts();


    products = products.filter(
        product => product.id !== id
    );


    saveProducts(products);


    loadProducts();

    loadStats();


    alert("Product deleted successfully.");

}


// ==========================================
// USERS
// ==========================================


// ------------------------------------------
// 10. GET ACCOUNTS
// ------------------------------------------

function getAccounts() {

    return JSON.parse(
        localStorage.getItem("accounts")
    ) || [];

}


// ------------------------------------------
// 11. SAVE ACCOUNTS
// ------------------------------------------

function saveAccounts(accounts) {

    localStorage.setItem(
        "accounts",
        JSON.stringify(accounts)
    );

}


// ------------------------------------------
// 12. DISPLAY USERS
// ------------------------------------------

function loadUsers() {

    const accounts = getAccounts();

    const container =
        document.getElementById("userList");


    container.innerHTML = "";


    if (accounts.length === 0) {

        container.innerHTML =
            "<p>No registered users.</p>";

        return;
    }


    accounts.forEach((user, index) => {

        const div =
            document.createElement("div");

        div.className = "user-card";


        div.innerHTML = `

            <h3>
                👤 ${user.username}
            </h3>

            <p>
                📧 ${user.email}
            </p>

            <p>
                💰 Funds:
                ${Number(user.funds || 0).toLocaleString()} VND
            </p>

            <p>
                📦 Orders:
                ${(user.orders || []).length}
            </p>

            <div class="admin-user-buttons">

                <button
                    onclick="giveFunds(${index})"
                >
                    💰 Give Funds
                </button>

                <button
                    onclick="removeFunds(${index})"
                >
                    💸 Remove Funds
                </button>

                <button
                    onclick="deleteUser(${index})"
                >
                    🗑️ Delete User
                </button>

            </div>

        `;


        container.appendChild(div);

    });

}


// ==========================================
// FUNDS SYSTEM
// ==========================================


// ------------------------------------------
// 13. GIVE FUNDS
// ------------------------------------------

function giveFunds(index) {

    const accounts = getAccounts();

    const user = accounts[index];


    const amount = Number(
        prompt(
            `How much VND do you want to give ${user.username}?`
        )
    );


    if (!amount || amount <= 0) {

        alert("Invalid amount.");

        return;
    }


    user.funds =
        Number(user.funds || 0) + amount;


    saveAccounts(accounts);


    loadUsers();


    alert(
        `${amount.toLocaleString()} VND added to ${user.username}! 💰`
    );

}


// ------------------------------------------
// 14. REMOVE FUNDS
// ------------------------------------------

function removeFunds(index) {

    const accounts = getAccounts();

    const user = accounts[index];


    const amount = Number(
        prompt(
            `How much VND do you want to remove from ${user.username}?`
        )
    );


    if (!amount || amount <= 0) {

        alert("Invalid amount.");

        return;
    }


    if (amount > Number(user.funds || 0)) {

        alert("User does not have enough funds.");

        return;
    }


    user.funds =
        Number(user.funds || 0) - amount;


    saveAccounts(accounts);


    loadUsers();


    alert(
        `${amount.toLocaleString()} VND removed from ${user.username}.`
    );

}


// ==========================================
// DELETE USERS
// ==========================================


// ------------------------------------------
// 15. DELETE USER
// ------------------------------------------

function deleteUser(index) {

    const accounts = getAccounts();

    const user = accounts[index];


    // Prevent deleting yourself
    const currentUser = getCurrentUser();

    if (
        currentUser &&
        user.email === currentUser.email
    ) {

        alert("You cannot delete your own admin account.");

        return;
    }


    if (
        !confirm(
            `Delete account "${user.username}"?`
        )
    ) {

        return;
    }


    accounts.splice(index, 1);


    saveAccounts(accounts);


    loadUsers();

    loadStats();


    alert("User deleted successfully.");

}


// ==========================================
// ORDERS
// ==========================================


// ------------------------------------------
// 16. LOAD ORDERS
// ------------------------------------------

function loadOrders() {

    const accounts = getAccounts();

    const container =
        document.getElementById("orderList");


    container.innerHTML = "";


    let totalOrders = 0;


    accounts.forEach(user => {

        const orders = user.orders || [];


        orders.forEach(order => {

            totalOrders++;


            const div =
                document.createElement("div");

            div.className = "order-card";


            div.innerHTML = `

                <h3>
                    🛒 Order #${order.id}
                </h3>

                <p>
                    Customer:
                    ${user.username}
                </p>

                <p>
                    Email:
                    ${user.email}
                </p>

                <p>
                    Total:
                    ${Number(order.total || 0).toLocaleString()} VND
                </p>

                <p>
                    Items:
                    ${(order.items || []).length}
                </p>

            `;


            container.appendChild(div);

        });

    });


    if (totalOrders === 0) {

        container.innerHTML =
            "<p>No orders yet.</p>";

    }

}


// ==========================================
// STATISTICS
// ==========================================


// ------------------------------------------
// 17. LOAD STATS
// ------------------------------------------

function loadStats() {

    const accounts = getAccounts();

    const products = getProducts();


    let orders = 0;


    accounts.forEach(user => {

        orders +=
            (user.orders || []).length;

    });


    document.getElementById("productCount")
        .textContent = products.length;


    document.getElementById("userCount")
        .textContent = accounts.length;


    document.getElementById("orderCount")
        .textContent = orders;

}


// ==========================================
// ADMIN PROFILE
// ==========================================


// ------------------------------------------
// 18. LOAD PROFILE
// ------------------------------------------

function loadProfile() {

    const user = getCurrentUser();

    const container =
        document.getElementById("adminProfile");


    if (!user) return;


    container.innerHTML = `

        <h3>
            👤 ${user.username}
        </h3>

        <p>
            Email:
            ${user.email}
        </p>

        <p>
            Account created:
            ${
                user.createdAt
                ? new Date(user.createdAt)
                    .toLocaleDateString()
                : "Unknown"
            }
        </p>

        <p>
            Admin:
            ${user.isAdmin ? "Yes ✅" : "No ❌"}
        </p>

    `;

}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    if (!confirm("Log out of the admin panel?")) {
        return;
    }


    // Use your existing logout system if available
    localStorage.removeItem("currentUser");


    window.location.href =
        "introduction.html";

}


// ==========================================
// START
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadAdmin
);
