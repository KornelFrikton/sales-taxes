import React, { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [input, setInput] = useState("");
  const [handledProduct, setHandledProduct] = useState();
  const [salesTaxes, setSalesTaxes] = useState(0);
  const [total, setTotal] = useState(0);
  const [shoppingList, setShoppingList] = useState([]);

  const importTax = 0.05;
  const basicTax = 0.1;

  // Get value from the input field
  const handleInput = (e) => {
    return setInput(e.target.value);
  };

  // Handling the new product
  const handleProduct = (e) => {
    e.preventDefault();
    let normalizedName = input.trim().replace(/ +/g, " ");
    let separatedName = normalizedName.split(" ");

    //Creating lowercase product name
    const lowerName = separatedName.map((element) => {
      return element.toLowerCase();
    });

    //Checking the correct product description
    if (
      separatedName.length < 3 ||
      separatedName[separatedName.length - 2] !== "at"
    ) {
      return alert(
        "Please check the product description!\nExample: 1 book at 10.05"
      );
    }

    //Checking the product quantity
    const productQuantity = parseInt(separatedName[0]);
    if (Number.isNaN(productQuantity) || productQuantity <= 0) {
      return alert("Not proper product quantity!");
    }

    //Checking the product price
    let productPrice = parseFloat(separatedName[separatedName.length - 1]);
    if (Number.isNaN(productPrice) || productPrice < 0) {
      return alert("Not proper product price");
    }

    //Checking if imported is the beginning of the product name
    if (lowerName.includes("imported")) {
      let index = lowerName.indexOf("imported");
      if (index !== 1) {
        separatedName.splice(index, 1);
        separatedName.splice(1, 0, "imported");
      }
    }

    //Creating product name
    let productName = separatedName[1];
    for (let i = 2; i < separatedName.length - 2; i++) {
      productName = productName.concat(" ", separatedName[i]);
    }

    //Checking if product is imported
    let importTaxPrice = 0;
    if (lowerName.includes("imported")) {
      importTaxPrice +=
        (Math.ceil(productPrice * importTax * 20) / 20).toFixed(2) * 1;
    }

    //Checking if product is exempt
    let basicTaxPrice = 0;
    let exemptProduct = [
      "book",
      "chocolate",
      "pill",
      "books",
      "chocolates",
      "pills",
    ];
    if (!exemptProduct.some((element) => lowerName.includes(element))) {
      basicTaxPrice +=
        (Math.ceil(productPrice * basicTax * 20) / 20).toFixed(2) * 1;
    }

    //Calculating the product price with taxes
    let productFinalPrice = (
      productPrice +
      basicTaxPrice +
      importTaxPrice
    ).toFixed(2);

    //Calculating the sales taxes
    let finalTaxes = (
      parseFloat(salesTaxes) +
      basicTaxPrice +
      importTaxPrice
    ).toFixed(2);
    setSalesTaxes(finalTaxes);

    //Calculating the total
    let finalAmount = (
      parseFloat(total) + parseFloat(productFinalPrice)
    ).toFixed(2);
    setTotal(finalAmount);

    //Creating the product object
    var productObject = {
      id: uuidv4(),
      name: productName,
      quantity: productQuantity,
      price: productFinalPrice,
    };

    return setHandledProduct(productObject);
  };

  //Generating the shoppinglist
  useEffect(() => {
    if (typeof handledProduct !== "undefined") {
      const newList = [...shoppingList, handledProduct];
      setShoppingList(newList);
    }
  }, [handledProduct]);

  return (
    <div className="app">
      <form action="" method="get" onSubmit={handleProduct}>
        <label htmlFor="product">
          Please add the product to the shopping list.{" "}
          <p>
            {" "}
            The correct format of the product: pieces product name at price{" "}
          </p>{" "}
          <p> Example: 1 book at 10.05 </p>
        </label>
        <input
          type="text"
          id="product"
          data-testid="product-input"
          onChange={handleInput}
          required
        ></input>
        <input type="submit" value="Add product to the shoppinglist"></input>
      </form>
      <div data-testid="shopping-list">
        Shoppinglist:
        <ul>
          {shoppingList.map((item) => (
            <li key={item.id}>
              <div>
                {item.quantity} {item.name}: {item.price}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div data-testid="total-sales">Sales Taxes: {salesTaxes}</div>
      <div data-testid="total-amount">Total: {total}</div>
    </div>
  );
}

export default App;
