document.addEventListener('DOMContentLoaded', function () {
    renderCartItems();
    function renderCartItems() {
        var cartItemsContainer = document.getElementById('cart-items');
        var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';
        var totalPrice = 0;
        cartItems.forEach(function (item) {
            var cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            // Product image
            var imgElement = document.createElement('img');
            imgElement.src = item.image;
            imgElement.alt = item.title;
            cartItemElement.appendChild(imgElement);
            // Product details
            var detailsElement = document.createElement('div');
            detailsElement.classList.add('cart-item-details');
            // Title
            var titleElement = document.createElement('h3');
            titleElement.textContent = item.title;
            detailsElement.appendChild(titleElement);
            // Price
            var priceElement = document.createElement('p');
            priceElement.textContent = "Price: $".concat(item.price.toFixed(2));
            detailsElement.appendChild(priceElement);
            // Quantity handling
            var quantityContainer = document.createElement('div');
            quantityContainer.classList.add('quantity-container');
            var minusButton = createButton('-', function () { return updateQuantity(item, -1); });
            quantityContainer.appendChild(minusButton);
            var quantityElement = document.createElement('span');
            quantityElement.textContent = "".concat(item.quantity || 1);
            quantityContainer.appendChild(quantityElement);
            var plusButton = createButton('+', function () { return updateQuantity(item, 1); });
            quantityContainer.appendChild(plusButton);
            detailsElement.appendChild(quantityContainer);
            // Remove button
            var removeButton = createButton('Remove', function () { return removeFromCart(item); });
            detailsElement.appendChild(removeButton);
            cartItemElement.appendChild(detailsElement);
            cartItemsContainer.appendChild(cartItemElement);
            // Calculate total price
            totalPrice += item.price * (item.quantity || 1);
        });
        // Render total price
        var totalPriceElement = document.createElement('div');
        totalPriceElement.classList.add('total-price');
        totalPriceElement.textContent = "Total Price: $".concat(totalPrice.toFixed(2));
        cartItemsContainer.appendChild(totalPriceElement);
    }
    function createButton(text, onClick) {
        var button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }
    function updateQuantity(item, change) {
        var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        var updatedCartItems = cartItems.map(function (cartItem) {
            if (cartItem.id === item.id) {
                cartItem.quantity = (cartItem.quantity || 1) + change;
            }
            return cartItem;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        renderCartItems();
    }
    function removeFromCart(item) {
        var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        var updatedCartItems = cartItems.filter(function (cartItem) { return cartItem.id !== item.id; });
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        renderCartItems();
    }
});
