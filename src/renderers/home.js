const rightPaneText = document.getElementById("right-pane-text");
const getAllRef = document.getElementById("getAll");
const lookupRef = document.getElementById("lookupProduct");
const createNewRef = document.getElementById("createNew");
const updateItemRef = document.getElementById("updateItem");
const deleteItemRef = document.getElementById("deleteItem");
const tableRef = document.getElementById("data-table");


const tableContainerRef = document.getElementById("table-container");
const searchFormRef = document.getElementById("search-form-container");
const createDisplayRef = document.getElementById("create-form-container");
const updateDisplayRef = document.getElementById("update-form-container");
const deleteDisplayRef = document.getElementById("delete-form-container");


function disableRightPaneViews() {
    tableContainerRef.style.display = "none";
    searchFormRef.style.display = "none";
    createDisplayRef.style.display = "none";
    updateDisplayRef.style.display = "none";
    deleteDisplayRef.style.display = "none";
}


getAllRef.addEventListener("click", async () => {
    disableRightPaneViews();
    const allProducts = await backendAPI.getAllProducts();
    displayTable(allProducts.products);
    tableContainerRef.style.display = "table";
});

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


updateItemRef.addEventListener("click", async () => {
    disableRightPaneViews();
    updateDisplayRef.style.display = "block";
    updateDisplayRef.addEventListener("submit", async (event) => {
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

createNewRef.addEventListener("click", async () => {
    disableRightPaneViews();
    createDisplayRef.style.display = "block";
});

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