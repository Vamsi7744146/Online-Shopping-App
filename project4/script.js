 //Elements References

        let productscontainer = document.getElementById('product-container');
        let cartcontainer = document.getElementById('cart-container');
        let feedbackElement = document.getElementById('feedback');
        let clearcartbtn = document.getElementById('clearcart');
        let sortbypriceBtn = document.getElementById('sortbyprice')

        //Default Products

        let products = [
            {
                id: 1,
                name: 'Laptop',
                price: 50000,
            },

            {
                id: 2,
                name: 'Phone',
                price: 25000,
            },

            {
                id: 3,
                name: 'Tablet',
                price: 15000,
            },

            {
                id: 4,
                name: 'Buds',
                price: 5555,
            },

            {
                id: 5,
                name: 'Headphone',
                price: 5000,
            },
        ];

        let cart = [];




        clearcartbtn.addEventListener('click', clearcart);
        sortbypriceBtn.addEventListener('click', sortbyprice);

        function clearcart() {
            cart.length = 0;
            renderCartDetails();
            updateUserFeedback('cart is cleared', 'success');
        }

        function sortbyprice() {
            cart.sort(function (item1, item2) {
                return item1.price - item2.price;
            });
            renderCartDetails();
        }


        function renderProductDetails() {
            products.forEach(function (product) {
                let { id, name, price } = product;
                let productRow = `<div class='product-row'>
                 <p>${name}- Rs. ${price} </p>
                 <button onclick="addToCart(${id})">Add to cart</button>
                 </div>`;
                productscontainer.insertAdjacentHTML('beforeEnd', productRow)
            });
        }

        function renderCartDetails() {
            cartcontainer.innerHTML = "";
            cart.forEach(function (product) {
                let { id, name, price } = product;
                let cartItemRow = `
        <div class="product-row">
                <p>${name}- Rs. ${price}</p>
                <button onclick="removefromcart(${id})">Remove</button>
            </div>
        `;
                cartcontainer.insertAdjacentHTML('beforeEnd', cartItemRow);
            });


            console.log("cart", cart)

            let totalprice = cart.reduce(function (acc, curproduct) {
                return acc + curproduct.price;
            }, 0)
            document.getElementById("totalprice").textContent = `Rs.${totalprice}`;
        }


        //Add to Cart

        function addToCart(id) {


            //check if the product is already available in the cart
            let isProductAvailable = cart.some((product) => product.id === id);
            //  console.log('isProductAvailable', isProductAvailable);
            if (isProductAvailable) {
                updateUserFeedback(`item  is already added to the cart`, 'error');
                return;
            }


            let productToAdd = products.find(function (product) {
                return product.id === id;
            });

            cart.push(productToAdd);
            console.log(cart);
            renderCartDetails();
            updateUserFeedback(`${productToAdd.name} is added to the cart`, 'success');
        }


        function removefromcart(id) {
            console.log(id);
            let product = cart.find((product) => product.id == id);

            let productIndex = cart.findIndex((product) => product.id === id)
            cart.splice(productIndex, 1);

            updateUserFeedback(`${product.name} is removed from the cart`, 'error')

            renderCartDetails();
        }


        let timerId;
        function updateUserFeedback(msg, bgcolor) {
            clearTimeout(timerId);
            feedbackElement.style.display = 'block'
            if (bgcolor === 'success') {
                feedbackElement.style.backgroundColor = 'violet';
            }
            if (bgcolor === 'error') {
                feedbackElement.style.backgroundColor = 'orange';
            }
            feedbackElement.textContent = msg;

            timerId = setTimeout(function () {
                feedbackElement.style.display = 'none';
            }, 3000);
        }


        //rendering Product Details
        renderProductDetails();


        /* let divElement = document.createElement('div');
         divElement.className = 'product-row'
         divElement.innerHTML = `
  <p>${name}- Rs. ${price} </p>
         <button onclick="addToCart(${id})">Add to cart</button>
 `;
         productscontainer.appendChild(divElement);
    
*/