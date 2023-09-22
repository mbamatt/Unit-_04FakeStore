//const homeLink = document.querySelector('.nav-link.active');
//const featuresLink = document.querySelector('.nav-link:contains("Features")'); 
//const pricingLink = document.querySelector('.nav-link:contains("Pricing")'); 
const displayDiv = document.getElementById('display');
const API_URL = 'https://fakestoreapi.com/products';

const electronics = document.getElementById('electronics');
const jewelery = document.getElementById('jewelery');
const mensClothing = document.getElementById('mens-clothing');
const womensClothing = document.getElementById('womens-clothing');

console.log(electronics)
const cart = [];

function submitToCart(item) {
    cart.push(item);
    console.log("Added to cart:", item);
    console.log("Current cart:", cart);
}

const fakeStore = async (endpoint) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`);
        if(!response.ok) {
            throw new Error(`API resonded with status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
       displayCards(data); 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

window.onload = () => {
    fakeStore('/');
};

electronics.addEventListener('click', () => {
    fakeStore('/category/electronics')
});

jewelery.addEventListener('click', () => {
    fakeStore('/category/jewelery')
});

mensClothing.addEventListener('click', () => {
    fakeStore('/category/mens-clothing')
});

womensClothing.addEventListener('click', () => {
    fakeStore('/category/womens-clothing')
});

/*homeLink.addEventListener('click', () => fakeStore('/home-endpoint'));
featuresLink.addEventListener('click', () => fakeStore('/features-endpoint'));
pricingLink.addEventListener('click', () => fakeStore('/pricing-endpoint'));
*/
const displayCards = (data) => {
    
    displayDiv.innerHTML = '';

    data.forEach(item => {

        // Create card container
        const card = document.createElement('div');
        card.className = 'card';

        // Create card image
        const img = document.createElement('img');
        img.src = item.image;
        img.className = 'card-img-top';
        card.appendChild(img);

        // Create card body
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        // Add title
        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = item.title;
        cardBody.appendChild(title);

        // Add description
        const desc = document.createElement('p');
        desc.className = 'card-text';
        desc.textContent = item.description;
        cardBody.appendChild(desc);

        // Add price
        const price = document.createElement('p');
        price.className = 'card-text';
        price.textContent = `$${parseFloat(item.price).toFixed(2)}`; // Format price
        cardBody.appendChild(price);

        // Add to Cart Button
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary';
        btn.textContent = 'Add to Cart';
        btn.onclick = () => {
            const cartItem = {
                id: item.id,
                title: item.title,
                cost: parseFloat(item.price).toFixed(2),
                quantity: 1
            };
            submitToCart(cartItem);
        };
        cardBody.appendChild(btn);

        // Append card body to card
        card.appendChild(cardBody);

        // Append card to displayDiv
        displayDiv.appendChild(card);

    });
};
