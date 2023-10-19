document.addEventListener('DOMContentLoaded', function () {
    let products = document.querySelector('.products');
    let response;
    function generateStarRating(ratingValue) {
        let starRating = "";
        for (let i = 0; i < ratingValue; i++) {
            starRating += "⭐️";
        }
        return starRating;
    }

    async function fetchProducts(url) {
        let data = await fetch(url);
        response = await data.json();
        console.log(response);

        for (let i = 0; i < response.length; ++i) {
            products.innerHTML += `
                <div class="product">
                        <img src="${response[i].image}" alt="">
                    <h2 class="title">${response[i].title}</h2>
                    <p class="rating">${generateStarRating(response[i].rating.rate)} (${response[i].rating.count} reviews)
                    <div class="price-container">
                        <h3 class="price">Price : $ ${response[i].price}</h3>
                        <button id="${response[i].id}" class="add-to-cart">Add To Cart</button>
                        <button data-id ="${response[i].id}"class="view-more">View More</button>
                    </div>
                </div>
            `;
        }


    }

    products.addEventListener('click', function (event) {
        if (event.target.classList.contains('view-more')) {
            const productId = event.target.getAttribute('data-id')
            window.location.href = "description.html";
            localStorage.setItem("currentProduct", `${productId}`);
        }
    });

    products.addEventListener('click', function (event) {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = event.target.id;
            const selectedProduct = response.find(product => product.id == productId);

            addToCart(selectedProduct);
        }

    });
    document.querySelector('#sortLowToHigh').addEventListener('click', function () {
        response.sort((a, b) => a.price - b.price);
        renderProducts();
    });

    // Sort high to low
    document.querySelector('#sortHighToLow').addEventListener('click', function () {
        response.sort((a, b) => b.price - a.price);
        renderProducts();

    });

    document.querySelector('#sortByRating').addEventListener('click', function () {
        response.sort((a, b) => b.rating.rate - a.rating.rate);
        renderProducts();
    });

    function renderProducts() {
        products.innerHTML = '';
        console.log("hi");
        for (let i = 0; i < response.length; ++i) {
            products.innerHTML += `
            <div class="product">
              <img src="${response[i].image}" alt="">
              <h2 class="title">${response[i].title}</h2>
              <p class="rating">${generateStarRating(response[i].rating.rate)} (${response[i].rating.count} reviews)
              <div class="price-container">
                <h3 class="price">Price : $ ${response[i].price}</h3>
                <button id="${response[i].id}" class="add-to-cart">Add To Cart</button>
                <button data-id ="${response[i].id}"class="view-more">View More</button>
              </div>
            </div>
          `;
        }
    }

    function addToCart(product) {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        let existingItem = cartItems.find(item => item.id === product.id);



        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;

        } else {
            cartItems.push({
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.price,
                quantity: 1,
            });
        }

        localStorage.setItem('cart', JSON.stringify(cartItems));

        const bagCountSup = document.querySelector('.bag sup');
        bagCountSup.textContent = `(${existingItem.quantity})`;

        alert('Item added to the cart!');



    }

    fetchProducts('https://fakestoreapi.com/products');
});

