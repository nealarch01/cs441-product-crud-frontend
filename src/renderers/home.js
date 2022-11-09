// Left Pane Buttons
const getAllRef = document.getElementById("getAll");
const lookupRef = document.getElementById("lookupProduct");
const createNewRef = document.getElementById("createNew");
const updateItemRef = document.getElementById("updateItem");
const deleteItemRef = document.getElementById("deleteItem");


// Right Pane
const tableContainerRef = document.getElementById("table-container");
const searchFormRef = document.getElementById("search-form-container");
const createFormRef = document.getElementById("create-form-container");
const updateFormRef = document.getElementById("update-form-container");
const deleteFormRef = document.getElementById("delete-form-container");
const tableRef = document.getElementById("data-table");
const rightPaneText = document.getElementById("right-pane-text");


function disableRightPaneViews() {
    tableContainerRef.style.display = "none";
    searchFormRef.style.display = "none";
    createFormRef.style.display = "none";
    updateFormRef.style.display = "none";
    deleteFormRef.style.display = "none";
}


getAllRef.addEventListener("click", async () => {
    disableRightPaneViews();
    const allProducts = await backendAPI.getAllProducts();
    displayTable(allProducts.products);
    tableContainerRef.style.display = "table";
});


// Search
searchFormRef.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from submitting
    let productSku = document.getElementById("search-sku-input").value;
    console.log(productSku);
    const data = await backendAPI.getProductBySku(productSku);
    if (data.products === null) {
        alert("Product not found");
    }
    if (data.products[0] === null) {
        alert("Product not found");
    } else {
        searchFormRef.style.display = "none"; // Disable the search form
        displayTable([{ "node": data.products[0] }]); // Create the table
        tableContainerRef.style.display = "table";
    }
});

lookupRef.addEventListener("click", async () => {
    disableRightPaneViews();
    searchFormRef.style.display = "block";
});

// Update
updateItemRef.addEventListener("click", async () => {
    disableRightPaneViews();
    updateFormRef.style.display = "block";
    updateFormRef.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the form from submitting
        let productSku = document.getElementById("update-sku-input").value;
        let productQuantity = document.getElementById("update-quantity-input").value;
        const data = await backendAPI.updateProductQuantity(productSku, productQuantity);
        if (data.err === null) {
            alert("Product updated");
        } else {
            alert("Product not found. No changes were made.");
        }
    });
});


// Create
createFormRef.addEventListener("submit", async (event) => {
    event.preventDefault();
    let title = document.getElementById("create-title").value;
    let brand = document.getElementById("create-brand").value;
    let summary = document.getElementById("create-summary").value;
    let category = document.getElementById("create-category").value;
    let price = document.getElementById("create-price").value;
    let quantity = document.getElementById("create-quantity").value;
    let supplier = document.getElementById("create-supplier").value;
    let result = await backendAPI.createProduct(title, brand, summary, category, price, quantity, supplier);
    if (result.err !== null) {
        alert("Product not created.");
        console.log(result.err);
    } else {
        alert("Product created!");
    }
});

createNewRef.addEventListener("click", async () => {
    disableRightPaneViews();
    createFormRef.style.display = "block";
});

// Delete
deleteFormRef.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from submitting
    let productSku = document.getElementById("delete-sku-input").value;
    const data = await backendAPI.deleteProduct(productSku);
    if (data.err === null) {
        alert("Product deleted");
    } else {
        alert("Product not found. No changes were made.");
    }
});

deleteItemRef.addEventListener("click", async () => {
    disableRightPaneViews();
    deleteFormRef.style.display = "block";
});

// Table Render function
// @param []{node: Product}
function displayTable(products) {
    // Get the keys
    const keys = Object.keys(products[0].node); // The headers of the table
    let tableHeader = ``;
    let tableBody = ``;

    // Create the table header
    keys.forEach((field) => {
        tableHeader += `<th>${field}</th>`;
    });

    // Create the table body
    products.forEach(({ node }) => {
        tableBody += `<tr>`;
        keys.forEach((field) => {
            tableBody += `<td>${node[field]}</td>`;
        });
        tableBody += `</tr>`;
    });

    let tableStr = `
        <table>
            <thead>
                <tr>
                    ${tableHeader}
                </tr>
            </thead>
                <tbody>
                    ${tableBody}
                </tbody>
        </table>
    `;
    // console.log(tableStr);
    tableRef.innerHTML = tableStr;
    // Set the display to table
}


disableRightPaneViews();