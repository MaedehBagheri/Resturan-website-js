const menuIcon=document.querySelector(".menu-icon");
const menu=document.querySelector(".menu")
const close =document.getElementById("close");
const active =document.querySelector(".active")
menuIcon.onclick=()=>{
menu.classList.toggle("active");
}

close.onclick=()=>{
    menu.classList.remove("active");
    }