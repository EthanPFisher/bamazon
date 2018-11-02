var mysql = require("mysql");
var inq = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    connection.query("SELECT * FROM products", function (err, products) {
        if (err) throw err;
        console.table(products);
        runPrompts(products);
    });
}

function runPrompts(products) {
    inq.prompt([
        {
            type: "number",
            message: "Enter ID number of item you'd like to purchase:",
            name: "id",
            validate: function (value) {
                if (isNaN(value) === false && value < products.length + 1 && value >= 1) {
                    return true;
                }
                return false;
            }
        },
        {
            type: "number",
            message: "Enter quantity you'd like to purchase:",
            name: "quantity",
            validate: function (value) {
                if (isNaN(value) === false && value > 0) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (res) {

        if (products[res.id - 1].stock_quantity == 0 || products[res.id - 1].stock_quantity < res.quantity) {

            console.log("Insufficient quantity!")
            connection.end()

        } else {

            var newQuantity = products[res.id - 1].stock_quantity - res.quantity;

            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: newQuantity
                    },
                    {
                        item_id: res.id
                    }
                ],
                function (error) {
                    if (error) throw err;
                    var total = products[res.id - 1].price * res.quantity

                    console.log("You ordered " + res.quantity + " of " + products[res.id - 1].product_name + "(s). The total price is $" + total + ". Thank you for shopping!")
                }
            );
            connection.end()
        }
    })
}
