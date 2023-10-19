fetch('https://fakestoreapi.com/products/'.concat(localStorage.getItem('currentProduct')))

.then(res => res.json())

.then(data => { console.log(data)

        let product = data;
        let products = document.querySelector('.products');
       
                products.innerHTML += `
                    <div class="product">
                            <img src="${data.image}" alt="">
                        <h2 class="title">${data.title}</h2>
                        <p class = "details">${data.description}</p>
                        <div class="price-container">
                            <h3 class="price">Price : $ ${data.price}</h3>
                            <button id="${data.id}" class="add-to-cart">Add To Cart</button>
                        
                        </div>
                    </div>
                `;

                products.addEventListener('click', function (event) {
                    if (event.target.classList.contains('add-to-cart')) {
                        const productId = event.target.id;
                        /* const selectedProduct = data.find(product => product.id == productId); */
                     
                        addToCart(product);
                    }
              
                  });
              
               
                function addToCart(product) {
                    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
                    let existingItem = cartItems.find(item => item.id === product.id);
              
                    if (existingItem) {
                        existingItem.quantity = (existingItem.quantity || 1) + 1;
                    } else {
                        cartItems.push({
                            id: data.id,
                            title: data.title,
                            image: data.image,
                            price: data.price,
                            quantity: 1,
                        });
                    }
              
                    localStorage.setItem('cart', JSON.stringify(cartItems));
              
                    alert('Item added to the cart!');
                }
              
})