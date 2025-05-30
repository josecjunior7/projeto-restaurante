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

let cart = []


/* --------------- Abrir Modal ---------------*/
cartBtn.addEventListener("click", function() {
    updateCartModal()
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

menu.addEventListener("click", function(){
    let parentButton = event.target.closest(".icon")
    //console.log(parentButton)
    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name, price)
    }
})

function addToCart(name, price) {
    const repeatItem = cart.find(item => item.name === name)
    if(repeatItem){
        repeatItem.quantity += 1
    }else {
        cart.push({
            name,
            price,
            quantity: 1,
        })

        updateCartModal()
    }


}

function updateCartModal(){
    cartItensContainer.innerHTML = ""
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("section")

        cartItemElement.innerHTML = `
            <section>
                <section>
                    <p>${item.name}</p>
                    <p>${item.quantity}</p>
                    <p>${item.price} R$</p>
                </section>

                <section>
                    <button>
                        Remover
                    </button>
                </section>
            </section>
        `

        cartItensContainer.appendChild(cartItemElement)
    })
}