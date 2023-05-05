
import "./menu.js";
import "./slider.js";
import { suggestionsData,popularFoodData } from "./productsData.js";
const sugProductsDom =document.querySelector(".suggestions-carts");
const productNumber=document.querySelector(".product-number");
const cartTotal=document.querySelector(".cart-total");
const cartSugItem=document.querySelector(".product-list");
const clearCart =document.querySelector(".clear-cart");


let sugCart =[];

let buttonsSugDOM =[];

class suggestionProduct{
    getSuggestionsProducts(){
        return suggestionsData;
    }
}

class UI {
displySugProducts(product){
let result ="";
product.forEach((element) => {
    result+=`
    
    <div class="cart">
<div class="cart-img">
    <img  src=${element.imgurl} alt="">
</div>
<div class="cart-detail">
<div class="cart-title">
    <h3>${element.title}</h3>
</div>
<div class="discount-part">
    <div class="favorite">
        <img src="./assets/images/Heart.png" alt="">
        <p>افزودن به علاقمندی</p>
    </div>
    <div>
        <span class="last-price">170,000</span>
        <span class="discount">20%</span>
    </div>
</div>
<div class="prices">
    <div class="point">
        <span><img id="star"src="./assets/images/Star rate.png" alt=""></span>
        <span class="star-number">5</span>
        <span class="point-number">(62امتیاز)</span>
    </div>
    <div class="price"><span>${element.price}</span></div>
</div>
<div class="shop-btn">
    <button class="add-to-cart" data-id=${element.id}>افزودن به سبد خرید</button>
</div>
</div>
        </div>
    `;
    sugProductsDom.innerHTML=result;
});
}
getBtnsSug(){
    const addToCartSug =[...document.querySelectorAll(".add-to-cart")];
   buttonsSugDOM=addToCartSug;
   
    addToCartSug.forEach((btn)=>{
        const id =btn.dataset.id;
        
// there is in shopping cart

        const isInCartSug =sugCart.find((p)=> p.id === parseInt(id));
        if(isInCartSug){
            
            btn.innerText ="موجود در سبد خرید";
            btn.style.background="red";
        };
// there isn't in shopping cart


        btn.addEventListener("click",(event)=>{
          
event.target.innerText="موجود در سبد خرید";

const addedProduct= {...Storage.getProductsug(id),quantity:1}
sugCart=[...sugCart,addedProduct];



Storage.saveCartSugProdects(sugCart);

this.setCartSugValue(sugCart);

this.addCartSugItems(addedProduct)

        })
    })
}

setCartSugValue(cartValue){
let tempCartItems=0;
const totalPrice =cartValue.reduce((acc,curr)=>{
    tempCartItems += curr.quantity;
    return acc + curr.quantity * curr.price;
},0);

cartTotal.innerText=`مبلغ قابل پرداخت : ${totalPrice}$`;
productNumber.innerText =tempCartItems;
}

addCartSugItems(cartItem){
    const divSug =document.createElement("div");
    
    divSug.innerHTML=`
    <li>
    <div class="rate-food">
        <span class="trash" ><img data-id=${cartItem.id}   src="./assets/images/trash.png" alt=""></span>
        <span data-id=${cartItem.id}  class="pluse">+</span>
        <span>${cartItem.quantity}</span>
    </div>
    <div class="title-product">

        <h3>${cartItem.title}</h3>
        <p>${cartItem.price}</p>
    </div>
</li>
    `
    cartSugItem.appendChild(divSug);
}

setAppSug(){
  sugCart =Storage.getCartSug();
// console.log(sugCart);
   sugCart.forEach((cartItem)=> this.addCartSugItems(cartItem));
this.setCartSugValue(sugCart)

}

cartClear(){
    clearCart.addEventListener("click",()=>{
        sugCart.forEach((cItem)=> this.removeItemSug(cItem.id));

        while(cartSugItem.children.length){
            cartSugItem.removeChild(cartSugItem.children[0]);
        }
        closeModal();
        
    }
    
    );
}

removeItemSug(id){
   
    sugCart =sugCart.filter((item)=> item.id !== id);

    this.setCartSugValue(sugCart);

    Storage.saveCartSugProdects(sugCart);
  

const addButtons=buttonsSugDOM.find(btn => parseInt(btn.dataset.id) === parseInt(id));
addButtons.innerText="افزودن به سبد خرید";
    
}

cartLogic(){
    cartSugItem.addEventListener("click",(e)=>{


if(e.target.classList.contains("pluse")){
    console.log(e.target.dataset.id);

    const addQuantity=e.target;


    const addedItem =sugCart.find((cItem)=> cItem.id == addQuantity.dataset.id);
    addedItem.quantity++;
    this.setCartSugValue(sugCart);
    Storage.saveCartSugProdects(sugCart);

    addQuantity.nextElementSibling.innerText=addedItem.quantity;
}
else(e.target.classList.contains("trash"));

const removeItem =e.target;

const _removeItem =sugCart.find((c)=> c.id == removeItem.dataset.id);

this.removeItemSug(_removeItem.id);
Storage.saveCartSugProdects(sugCart);
cartSugItem.removeChild(removeItem.parentElement.parentElement.parentElement.parentElement);

    }) 
}

}


class Storage {
 static saveSugProdects(product)  {
    localStorage.setItem("sugProduct",JSON.stringify(product));
}

    static getProductsug(id){
const _product =JSON.parse(localStorage.getItem("sugProduct"));
return _product.find((p) => p.id === parseInt(id));
    }

    static saveCartSugProdects(cart){
        localStorage.setItem("sugCart",JSON.stringify(cart));
    }

    static getCartSug(){
        return JSON.parse(localStorage.getItem("sugCart")) ?
        JSON.parse(localStorage.getItem("sugCart")) :[];
    }
}

document.addEventListener("DOMContentLoaded",()=>{

    const sugProducts =new suggestionProduct();
    const productsData =sugProducts.getSuggestionsProducts();
const ui = new UI(productsData);
ui.setAppSug()
ui.displySugProducts(productsData);
ui.getBtnsSug();
ui.cartClear();
ui.cartLogic();
Storage.saveSugProdects(productsData);
}
);





// Modal-cart

const showModal =document.querySelector("#show-modal");
const cartShopping=document.querySelector(".cart-shopping");
const backDrop =document.querySelector(".backdrop");
const close =document.querySelector(".close-btn");
showModal.addEventListener("click",(e)=>{
e.preventDefault();
backDrop.classList.remove("hidden");
cartShopping.classList.remove("hidden");
});


close.addEventListener("click",closeModal);


    function closeModal(){
        backDrop.classList.add("hidden");
        cartShopping.classList.add("hidden");
    }