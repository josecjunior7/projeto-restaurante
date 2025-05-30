const menu = document.getElementById('menu')
const cartBtn = document.getElementById('cart_btt')
const cartModal = document.getElementById('modal')
const cartItensContainer = document.getElementById('cart_itens')
const cartTotal = document.getElementById('cart_total')
const checkoutBtn = document.getElementById('checkout_btt')
const fecharModal = document.getElementById('close_modal')
const addToCartButtons = document.querySelectorAll('.icon')
const cartCounter = document.getElementById('cart_count')
const adressInput = document.getElementById('adress')
const adressFailed = document.getElementById('adress_error')


/* --------------- Abrir Modal ---------------*/
cartBtn.addEventListener("click", function() {
    cartModal.style.display = "flex"
})

/* --------------- Fechar Modal ---------------*/
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

fecharModal.addEventListener("click", function(event){
    cartModal.style.display = "none"
})
/* ---------------------------------------------*/

