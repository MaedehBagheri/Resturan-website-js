const showModal =document.querySelector("#show-modal");
const cartShopping=document.querySelector(".cart-shopping");
const backDrop =document.querySelector(".backdrop");
const close =document.querySelector(".close-btn");
showModal.addEventListener("click",(e)=>{
e.preventDefault();
backDrop.classList.remove("hidden");
cartShopping.classList.remove("hidden");
});


close.addEventListener("click",(e)=>{
    e.preventDefault();
    backDrop.classList.add("hidden");
    cartShopping.classList.add("hidden");
    });
