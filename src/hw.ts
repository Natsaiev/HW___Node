// Задание 1


function calculateTotal(
  price: number,
  quantity: number,
  discount: number = 0
): number {
  return price * quantity - (price * quantity * discount) / 100;
}

console.log(calculateTotal(10, 2));
console.log(calculateTotal(10, 4, 20));

// Задание 2

function displayId(id: string | number): void {
  if (typeof id === "string") {
    console.log(` id = ${id.toUpperCase()}`);
  } else if (typeof id === "number") {
    console.log(`id: ${id * 10}`);
  }
}

displayId("123");
displayId(456);

// Задание 3
interface Order {
  orderId: string;
  amount: number;
  status: "pending" | "shipped" | "delivered";
}

const orders: Order[] = [
  { orderId: "123", amount: 10, status: "pending" },
  { orderId: "456", amount: 20, status: "shipped" },
  { orderId: "789", amount: 30, status: "delivered" },
];

function filterOrdersByStatus(orders: Order[], status: string): Order[] {
  return orders.filter((order) => order.status === status);
}

console.log(filterOrdersByStatus(orders, "pending"));
console.log(filterOrdersByStatus(orders, "delivered"));

// Задание 4

let productInfo: [title: string, price: number, quantity: number] = [
  "Iphone",
  2000.99,
  18,
];

function updateStock(
  inventory: { [title: string]: number },
  productInfo: [title: string, price: number, quantity: number]
): { [title: string]: number } {
  inventory[productInfo[0]] = productInfo[2];
  return inventory;
}

console.log(updateStock({ "Iphone": 8 }, productInfo));
