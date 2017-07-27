
// NPM package(s)
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");


//Creates a connection to bamazon database
var connection = mysql.createConnection({
    host: "localhost",
    port: "", //3306

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});


// Provide connection status
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as id" + connection.threadId);
    customerPrompt();
});




function tableOfProduct () {
    connection.query("SELECT * FROM product", function(err, res){
        console.log("----------------------");
        console.log(" Welcome To Bamazon !");
        console.log("----------------------");


        var table = new Table({
            head: ["item_id", "product_name", "department_name", "price", "stock_Quantity"],
            colWidths: [10, 30, 20, 10]
        });
        for (var i=0; i < res.length; i++) {
            var productArray = [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_Quantity];

            table.push(productArray);
        }
        console.log(table.toString());
        purchaseItem();

    })
}


var purchaseItem = function() {

    console.log('\n  ');

    inquirer.prompt([{
        name: "id",
        type: "input",
        message: " Enter the Item ID of the product you want to buy",
        validate: function(value) {

            //Validates answer
            if (isNaN(value) === false) {
                return true;
            } else {
                console.log("\nPlease enter only the item ID of the item you'd like to buy\n");
                return false;
            }
        }

    }, {
        name: "quantity",
        type: "input",
        message: " Enter the quantity you want to purchase",
        validate: function(value) {
            //validates answer
            if (isNaN(value) === false) {
                return true;
            } else {
                console.log("\nPlease enter a valid quantity\n");
                return false;
            }
        }


    }]).then(function(answer) {

        // Query the database for info about the item including the quantity currently in stock.
        connection.query("SELECT product_name, department_name, price, stock_Quantity FROM product WHERE ?", {item_id: answer.id}, function(err,res) {

            console.log('\n  You would like to buy ' + answer.quantity + ' ' + res[0].product_name + ' ' + res[0].department_name + ' at $' + res[0].price + ' each');
            if (res[0].stock_Quantity >= answer.quantity) {

                //If enough inventory to complete order, process order by updating database inventory and notifying customer that order is complete.
                var itemQuantity = res[0].stock_Quantity - answer.quantity;
                connection.query("UPDATE products SET ? WHERE ?", [
                    {
                        stock_Quantity: itemQuantity
                    }, {
                        item_id: answer.id
                    }], function(err,res) {
                });

                var cost = res[0].price * answer.quantity;
                console.log('\n  Order fulfilled! Your cost is $' + cost.toFixed(2) + '\n');

                // Order completed
                customerPrompt();

            } else {
                //If not enough inventory notify customer and prompt customer for desire to shop more
                console.log('\n We are sorry, that product is currently out of stock\n');
                console.log("Please choose another product\n");
                // Order not completed
                tableOfProduct();
            }
        })
    });
};


var customerPrompt = function() {
    return inquirer.prompt({

        name: "action",
        type: "list",

        message: " Would like to continue shopping?\n",
        choices: ["Yes", "No"]

    }).then(function(answer) {

        switch(answer.action) {
            case 'Yes':
                tableOfProduct();
                break;

            case 'No':
                console.log("Thank your for shopping with Bamazon!");
                connection.end();
                process.exit();
                break;
        }
    })
};
