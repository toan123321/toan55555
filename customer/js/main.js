
const BASE_URL = "https://dummyjson.com/products";

let productList = [];
let cart = JSON.parse(localStorage.getItem("CART")) || [];

class CartItem{
constructor(product, quantity = 1){
this.id = product.id;
this.name = product.title;
this.price = product.price;
this.img = product.thumbnail;
this.quantity = quantity;
}
}

async function getProducts(){
try{
const res = await axios.get(BASE_URL);

productList = res.data.products.map(item=>({
...item,
type: item.brand?.toLowerCase().includes("apple")
? "iphone"
: "samsung"
}));

renderProducts(productList);

}catch(err){
console.log(err);
}
}

function renderProducts(arr){
let html = "";

arr.forEach(product=>{
html += `
<div class="card">
<img src="${product.thumbnail}">
<h3>${product.title}</h3>
<p>${product.price}$</p>
<p>${product.brand}</p>

<button onclick="addToCart('${product.id}')">
Add To Cart
</button>
</div>
`;
});

document.getElementById("productList").innerHTML = html;
}

function filterProduct(){
let value = document.getElementById("filter").value;

if(value === "all"){
renderProducts(productList);
return;
}

let result = productList.filter(item=>item.type === value);

renderProducts(result);
}

function addToCart(id){

let product = productList.find(item=> item.id == id);

let index = cart.findIndex(item=> item.id == id);

if(index === -1){
cart.push(new CartItem(product));
}else{
cart[index].quantity++;
}

saveCart();
renderCart();
}

function renderCart(){

let html = "";
let total = 0;

cart.forEach(item=>{

total += item.price * item.quantity;

html += `
<tr>
<td>${item.name}</td>
<td>${item.price}$</td>
<td>
<button onclick="decrease('${item.id}')">-</button>
${item.quantity}
<button onclick="increase('${item.id}')">+</button>
</td>
<td>${item.price * item.quantity}$</td>
<td>
<button onclick="removeItem('${item.id}')">
Delete
</button>
</td>
</tr>
`;
});

document.getElementById("cartBody").innerHTML = html;
document.getElementById("totalPrice").innerHTML = total;
}

function increase(id){

let item = cart.find(p=>p.id == id);

if(item){
item.quantity++;
}

saveCart();
renderCart();
}

function decrease(id){

let item = cart.find(p=>p.id == id);

if(item){
item.quantity--;

if(item.quantity <= 0){
removeItem(id);
return;
}
}

saveCart();
renderCart();
}

function removeItem(id){
cart = cart.filter(item=> item.id != id);

saveCart();
renderCart();
}

function checkout(){
alert("Checkout Success");

cart = [];

saveCart();
renderCart();
}

function saveCart(){
localStorage.setItem("CART", JSON.stringify(cart));
}

getProducts();
renderCart();
