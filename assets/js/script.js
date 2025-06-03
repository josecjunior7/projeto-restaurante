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

menu.addEventListener("click", function(event){
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
        cartItemElement.style.display = "flex"
        cartItemElement.style.justifyContent = "space-between"
        cartItemElement.style.marginBottom = "10px"
        cartItemElement.style.flexDirection = "column"

        cartItemElement.innerHTML = `
            <section style="display: flex; background-color: rgba(243, 243, 243, 0.568); justify-content: space-between; align-items: center; gap: 8px; padding: 5px 8px 5px 5px; width: 95%; box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.205); border-radius: 12px; width: 380px">
                <section style="display: flex; flex-direction: column; text-align: left;">
                    <p style="color: black;">${item.name} </p>
                    <p style="color: black; text-align: left;">Quantidade: ${item.quantity}</p>
                    <p style="color: black; text-align: left;">${item.price.toFixed(2)} R$</p>
                </section>
                
                <section>
                    <button style="padding: 6px 6px; background-color: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Remover
                    </button>
                </section>
            </section>
        `

        total += item.price * item.quantity
        
        cartItensContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}