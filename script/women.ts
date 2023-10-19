document.addEventListener('DOMContentLoaded', async () => {
    const WomenProduct = document.querySelector<HTMLElement>('.womenProducts');
    
    interface Product {
      id?: number;
      title?: string;
      category?: string;
      description?: string;
      price?: number;
      image?: string;
    }
  
    async function fetchWomenCategory(url: string) {
      const data = await fetch(url);
      const response: Product[] = await data.json();
  
      console.log(response);
      for (let i = 0; i < response.length; ++i) {
        WomenProduct.innerHTML += `
          <div class="womenProduct">
            <img src="${response[i].image}" alt=""> 
            <h2 class="title">${response[i].title}</h2>
            <h4 class="category">${response[i].category}</h4>
            <p class="description">${response[i].description}</p>
            <div class="price-container">
              <h3 class="price">$ ${response[i].price}</h3>
              <a href="#!" id="${response[i].id}" class="add-to-cart">Add to CART</a>
            </div>
          </div>
        `;
      }
    }
  
    await fetchWomenCategory("https://fakestoreapi.com/products/category/women's clothing");
  });