
import "./menu.js";
import "./modalcart.js";
import "./slider.js";
import { suggestionsData,popularFoodData } from "./productsData.js";
const sugProductsDom =document.querySelector(".suggestions-carts");
const productNumber=document.querySelector(".product-number");
const cartTotal=document.querySelector(".cart-total");

let sugCart =[];


let allproductsSug=[];


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
    const addToCartSug =document.querySelectorAll(".add-to-cart");
    const btnsSug =[...addToCartSug];
    btnsSug.forEach((btn)=>{
        const id =btn.dataset.id;
        
// there is in shopping cart

        const isInCartSug =sugCart.find((p)=> p.id === id);
        if(isInCartSug){
            btn.innerText ="موجود در سب خرید"
        }
// there isn't in shopping cart


        btn.addEventListener("click",(event)=>{
            console.log(event.target.dataset.id);
event.target.innerText="موجود در سبد خرید";
const addedProduct= Storage.getProductsug(id);
sugCart=[...sugCart,{...addedProduct,quantity:1}];

Storage.saveCartSugProdects(sugCart);

this.setCartSugValue(sugCart)

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
}

document.addEventListener("DOMContentLoaded",()=>{
    const sugProducts =new suggestionProduct();
    const productsData =sugProducts.getSuggestionsProducts();
   console.log(productsData);
const ui = new UI(productsData);
ui.displySugProducts(productsData);
ui.getBtnsSug()
Storage.saveSugProdects(productsData);

}
);
