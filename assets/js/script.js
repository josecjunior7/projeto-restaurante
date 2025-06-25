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

// FUNÇÃO DE ADICIONAR ITEM NO CARRINHO

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

// FUNÇÃO PARA ATUALIZAR O CARRINHO
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
            <section class="cart-item-inner">
                <section style="display: flex; flex-direction: column; text-align: left;">
                    <p style="color: black; padding: 3px 3px;">${item.name} </p>
                    <p style="color: black; text-align: left; padding: 3px 3px;">Quantidade: ${item.quantity}</p>
                    <input type="text" name="obs" id="obs">
                    <p style="color: black; text-align: left; padding: 3px 3px;">${item.price.toFixed(2)} R$</p>
                </section>
                
                <section>
                    <button class="remove-btt-cart" data-name="${item.name}" style="padding: 6px 6px; background-color: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">
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

    cartCounter.innerHTML = cart.length
}

// FUNÇÃO REMOVER ITEM
cartItensContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-btt-cart")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name)
    }
})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name)
    if(index !== -1) {
        const item = cart[index]
        if(item.quantity > 1) {
            item.quantity -= 1
            updateCartModal()
            return
        }

        cart.splice(index, 1)
        updateCartModal()

    }
}

// FUNÇÃO DE ENDEREÇO

adressInput.addEventListener("input", function(event){
    let inputValue = event.target.value
    if (adressInput.value !== "") {
        adressInput.style.border = "2px solid black"
        adressFailed.style.display = "none"
    }
    
})

checkoutBtn.addEventListener("click", function(){
    const isOpen = checkRestauranteOpen()  // <-- Ative isso de novo!
    if(!isOpen){
        Toastify({
            text: "Ops, o restaurante está fechado no momento.",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#f44336",
            },
            }).showToast();
        return
    }

    if(cart.length === 0) return

    if (adressInput.value === "") {
        adressFailed.style.display = "inline-block"
        adressInput.style.border = "2px solid red"
        return
    }

    const cartItems = cart.map((item) => {
        return (
            `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price.toFixed(2)}\n`
        )
    }).join("")

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

    const message = encodeURIComponent(
        `Pedido:\n${cartItems}\nTotal: R$${total.toFixed(2)}\nEndereço: ${adressInput.value}`
    )

    const phone = "5581985707206"
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")

    cart = []
    updateCartModal()
})


// FUNÇÃO DE HORÁRIO DE FUNCIONAMENTO DO RESTAURANTE

function checkRestauranteOpen(){
    const data = new Date()
    const hora = data.getHours()
    return hora >= 18 && hora < 22

}

const spanItem= document.getElementById("date-span")
const isOpen = checkRestauranteOpen()

if(isOpen){
    spanItem.style.backgroundColor = "#00a03d" // green
} else {
    spanItem.style.backgroundColor = "#f44336" // red
}