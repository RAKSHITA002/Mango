/*  interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
   
}

interface CartItem {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity: number;
}

document.addEventListener('DOMContentLoaded', async function () {
    let productsContainer: HTMLElement | null = document.getElementById('products');
    let response: Product[] = [];

   
    async function fetchProducts(url: string): Promise<void> {
        let data = await fetch(url);
        response = await data.json();
        console.log(response);

        if (productsContainer) {
            for (let i = 0; i < response.length; ++i) {
                productsContainer.innerHTML += renderProduct(response[i]);
            }
        }
    }

    
    function renderProduct(product: Product): string {
        return `
            <div class="product">
                <a href="description.html?id=${product.id}">
                    <img src="${product.image}" alt="">
                </a>
                <h2 class="title">${product.title}</h2>
                <div class="price-container">
                    <h3 class="price">Price: $${product.price}</h3>
                    <button id="${product.id}" class="add-to-cart">Add To Cart</button>
                    <button class="about-button" data-id="${product.id}">About</button>
                </div>
            </div>
        `;
    }

   
    function sortProducts(sortBy: string): void {
        response.sort((a, b) => {
            if (sortBy === 'price') {
                return a.price - b.price;
            } else {
                return b.price - a.price; 
            }
        });

        if (productsContainer) {
           
            productsContainer.innerHTML = '';

           
            for (let i = 0; i < response.length; ++i) {
                productsContainer.innerHTML += renderProduct(response[i]);
            }
        }
    }

    
    document.getElementById('sortOptions')?.addEventListener('change', function (event) {
        const sortBy: string = (event.target as HTMLSelectElement).value;
        sortProducts(sortBy);
    });

   
    productsContainer?.addEventListener('click', function (event) {
        if ((event.target as HTMLElement).classList.contains('about-button')) {
            const productId: number | null = parseInt((event.target as HTMLElement).getAttribute('data-id') || '', 10);

            if (productId) {
                
                const selectedProduct = response.find(product => product.id === productId);
                localStorage.setItem('product_' + productId, JSON.stringify(selectedProduct));

              
                window.location.href = "description.html";
            }
        } else if ((event.target as HTMLElement).classList.contains('add-to-cart')) {
            const productId: number | null = parseInt((event.target as HTMLElement).id, 10);
            if (productId) {
                const selectedProduct = response.find(product => product.id === productId);

              
                addToCart(selectedProduct);
            }
        }
    });

    
    function addToCart(product: Product): void {
        let cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart')) || [];
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

        alert('Item added to the cart!');
    }

    await fetchProducts('https://fakestoreapi.com/products');
});
  */
/* 
document.addEventListener('DOMContentLoaded', async () => {
    const products = document.querySelector('.products');
    let response: Product[] = [];
  
    async function fetchProducts(url: string) {
      const data = await fetch(url);
      response = await data.json();
      
      console.log(response);
  
      for (let i = 0; i < response.length; ++i) {
        products.innerHTML += `
          <div class="product">
            <img src="${response[i].image}" alt="">
            <h2 class="title">${response[i].title}</h2>
            <div class="price-container">
              <h3 class="price">Price: $ ${response[i].price}</h3>
              <button id="${response[i].id}" class="add-to-cart">Add To Cart</button>
              <button data-id="${response[i].id}" class="view-more">View More</button>
            </div>
          </div>
        `;
      }
    }
    
  
    products.addEventListener('click', function (event) {
      if (event.target.classList.contains('view-more')) {
        const productId = event.target.getAttribute('data-id');
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
  
    function addToCart(product: Product) {
      let cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart')) || [];
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
  
      alert('Item added to the cart!');
    }
  
    await fetchProducts('https://fakestoreapi.com/products');
  });

  
  
  interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
  }
  
  interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  }  */

  document.addEventListener('DOMContentLoaded', async () => {
    const products = document.querySelector('.products');
    const sortOptions = document.querySelector('#sortOptions') as HTMLSelectElement;
    let response: Product[] = [];
  
    async function fetchProducts(url: string, sortOrder: string) {
      const data = await fetch(url);
      response = await data.json();
      
      console.log(response);
  
      // sort products based on selected option
      if (sortOrder === 'priceHL') {
        response.sort((a, b) => b.price - a.price);
      } else if (sortOrder === 'priceLH') {
        response.sort((a, b) => a.price - b.price);
      } else if (sortOrder === 'ratings') {
        response.sort((a, b) => b.rating.rate - a.rating.rate);
      }
  
      renderProducts(response);
    }
  
    function renderProducts(products: Product[]) {
      products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
          <img src="${product.image}" alt="">
          <h2 class="title">${product.title}</h2>
          <div class="price-container">
            <h3 class="price">Price: $ ${product.price}</h3>
            <button id="${product.id}" class="add-to-cart">Add To Cart</button>
            <button data-id="${product.id}" class="view-more">View More</button>
          </div>
        `;
        products.appendChild(div);
      });
    }
  
    products.addEventListener('click', function (event) {
      if (event.target.classList.contains('view-more')) {
        const productId = event.target.getAttribute('data-id');
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
  
    function addToCart(product: Product) {
      let cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart')) || [];
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
  
      alert('Item added to the cart!');
    }
  
    sortOptions.addEventListener('change', async () => {
      products.innerHTML = ''; // clear existing products
      const sortOrder = sortOptions.value;
      await fetchProducts('https://fakestoreapi.com/products', sortOrder);
    });
  
    await fetchProducts('https://fakestoreapi.com/products', 'priceHL');
  });
  
  interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    rating: Rating;
  }
  
  interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  }
  
  interface Rating {
    rate: number;
    count: number;
  }