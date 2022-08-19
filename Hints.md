# Coding challenge for itemis CC Cloud & Enterprise recruiting
## Problem 1: SALES TAXES
Basic sales tax is applicable at a rate of 10% on all goods, except books, food, and medical
products that are exempt. Import duty is an additional sales tax
applicable on all imported goods at a rate of 5%, with no exemptions. When I purchase items
I receive a receipt which lists the name of all the items and their price (including tax),
finishing with the total cost of the items,
and the total amounts of sales taxes paid. The rounding rules for sales tax are that for a tax
rate of n%, a shelf price of p contains (np/100 rounded up to the nearest 0.05) amount of
sales tax.
Write an application that prints out the receipt details for these shopping baskets...

---

# How I built the application
## Planning
During the planning I defined the start and the goal, which means the input and the output. Connecting these two point the main focuses were:
- type of input/output data
- method of the reading of the input data
- functions for transform of the data and the data types
- method of display of the output data

## Desing
Desing was not the main focus during the project, but I can complete the application with UI/UX for your request.
## Development
The main steps of the development were:
1. Creating an input field to read the data from the user. The data is stored as a string in the *"input"* variable after clicking on the *"Add product..."* button.
2. Normalizing the input string as removing the white spaces and splitting by words and numbers into an array. I decided to choose this data type because of the several methods and iterations, that can be applied during the development.
3. Checking the correct input: there is a quantity, name and price of the product. If not, an alert warns the user for the right format of the input.
4. This format helps to set the quantity (number), the name (string) and the price (number) variables as the proper index of the array (e.g. array[0] => always the quantity). In the case of the name the *"imported"* word has to be the first, in different cases there is a function for replacing the words in the original array with the *"splice()"* method.
5. Lowercasing the words to make easier the element checking in the future methodes (e.g. array.includes() )
6. Checking if the product is imported. If yes, it generates an import tax (5%) of the original price. The tax is rounded up to the nearest 0.05.
7. Checking if the product is exempt. If not, it generates a basic tax (10%) of the original price. The tax is rounded up to the nearest 0.05
8. Summarizing the final price with the taxes and creating/updating variables for the sales tax and the total of the shopping list.
9. Creating the object of the product as a quantity, name and price with taxes and return it. It helps the reference for the different part of the product during the display.
10. Creating/updating the shopping list variable (push product object into an array) with *"useEffect"*, the trigger of this function is the clicking on the *"Add product..."* button.
11. The return method of the component has a form with an input field and a button element to read data as input. The display of the shopping list is happening with the help of an unordered list, the list is generating from the *"shoppingList"* variable (array with objects) with *"map()"* method. Finally displaying of the sales tax and total variables to make complete the shopping list.
## Testing
Unfortunately I do not have many experience in testing yet, it means that I usually applied the "console.log" and the "debugger" methods to check the actual values of the variables or the way of working of the functions during the development.

Because the challenge description asked for test unit as expected outputs for defined inputs, I prepared the *App.test.js* for testing the outputs of the application. 
In the file there are 3 tests, after setting the different input values the test is checking the expected output values as the follows:

### INPUT:
Input 1:
- 1 book at 12.49
- 1 music CD at 14.99
- 1 chocolate bar at 0.85

Input 2:
- 1 imported box of chocolates at 10.00
- 1 imported bottle of perfume at 47.50

Input 3:
- 1 imported bottle of perfume at 27.99
- 1 bottle of perfume at 18.99
- 1 packet of headache pills at 9.75
- 1 box of imported chocolates at 11.25### OUTPUT

### OUTPUT:
Output 1:
- 1 book: 12.49
- 1 music CD: 16.49
- 1 chocolate bar: 0.85
- Sales Taxes: 1.50
- Total: 29.83
  
Output 2:
- 1 imported box of chocolates: 10.50
- 1 imported bottle of perfume: 54.65
- Sales Taxes: 7.65
- Total: 65.15

Output 3:
- 1 imported bottle of perfume: 32.19
- 1 bottle of perfume: 20.89
- 1 packet of headache pills: 9.75
- 1 imported box of chocolates: 11.85
- Sales Taxes: 6.70
- Total: 74.68