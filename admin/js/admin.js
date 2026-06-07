
const BASE_URL = "https://dummyjson.com/products";

let productList = [];

async function getProducts(){

const res = await axios.get(BASE_URL);

productList = res.data.products.map(item=>({
id:item.id,
name:item.title,
price:item.price,
img:item.thumbnail,
type:item.brand
}));

renderTable(productList);
}

function renderTable(arr){

let html = "";

arr.forEach(product=>{

html += `
<tr>
<td>${product.name}</td>
<td>${product.price}$</td>
<td>
<img src="${product.img}" width="80">
</td>
<td>${product.type}</td>
<td>
<button onclick="deleteProduct('${product.id}')">
Delete
</button>
</td>
</tr>
`;
});

document.getElementById("tableBody").innerHTML = html;
}

function addProduct(){

let product = {
id: Date.now(),
name: document.getElementById("name").value,
price: document.getElementById("price").value,
img: document.getElementById("img").value,
type: document.getElementById("type").value
};

if(product.name === ""){
alert("Name is required");
return;
}

productList.push(product);

renderTable(productList);
}

function deleteProduct(id){

productList = productList.filter(item=> item.id != id);

renderTable(productList);
}

function searchProduct(){

let keyword = document
.getElementById("search")
.value
.toLowerCase();

let result = productList.filter(item=>
item.name.toLowerCase().includes(keyword)
);

renderTable(result);
}

function sortAsc(){

let result = [...productList];

result.sort((a,b)=> a.price - b.price);

renderTable(result);
}

function sortDesc(){

let result = [...productList];

result.sort((a,b)=> b.price - a.price);

renderTable(result);
}

getProducts();
