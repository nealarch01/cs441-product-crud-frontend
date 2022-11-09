const productsCrud = require("products-crud");
const { exit } = require("process");

async function main() {
    const products = await productsCrud.getAllProducts();
    console.log(products);
}


main()
    .then(() => {
        exit(0);
    })