let baseUrl = 'http://localhost:3000';

let getAuctionCategories = async () => {
    let options = {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    };
    try{
        let response = await fetch(baseUrl + '/auction/getAuctionCategories', options);
        let jsonResponse = await response.json();
        console.log(jsonResponse);

        return jsonResponse.data;
    }catch(err){
        console.log(err);
        return null;
    }

};

let getAllAuctions = async (categoryId) => {
    let options = {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    };
    try{
        let response = await fetch(baseUrl + '/auction/getAllAuctions?categoryId='+categoryId, options);
        let jsonResponse = await response.json();
        console.log(jsonResponse);

        return jsonResponse.data;
    }catch(err){
        console.log(err);
        return null;
    }

};

let generateRightMenu = async () => {

    let categories = await getAuctionCategories();
    console.log(categories);

    categories.map((element,index) => {

        let liElem = '<li>\n' +
            '                        <a href="products.html">\n' +
            '                            <span>' + element.title + '</span> <!--img src="assets/images/icons/living.svg" alt=""-->\n' +
            '                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
            '                                 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">\n' +
            '                                <g>\n' +
            '                                    <g>\n' +
            '                                        <path d="M458.667,0H53.333C23.893,0.035,0.035,23.893,0,53.333v405.333C0.035,488.107,23.893,511.965,53.333,512h405.333\n' +
            '                                                 c29.441-0.035,53.298-23.893,53.333-53.333V53.333C511.965,23.893,488.107,0.035,458.667,0z M490.667,458.667\n' +
            '                                                 c0,17.673-14.327,32-32,32H53.333c-17.673,0-32-14.327-32-32V53.333c0-17.673,14.327-32,32-32h405.333c17.673,0,32,14.327,32,32\n' +
            '                                                 V458.667z"/>\n' +
            '                                    </g>\n' +
            '                                </g>\n' +
            '                                <g>\n' +
            '                                    <g>\n' +
            '                                        <rect x="245.333" y="42.667" width="21.333" height="352"/>\n' +
            '                                    </g>\n' +
            '                                </g>\n' +
            '                                <g>\n' +
            '                                    <g>\n' +
            '                                        <path d="M320,181.333h-21.333v21.333H320V224h-21.333v21.333H320c0.295,0.006,0.589,0.006,0.884,0\n' +
            '                                                 c11.538-0.244,20.693-9.795,20.449-21.333v-21.333c0.006-0.295,0.006-0.589,0-0.884C341.089,190.245,331.538,181.089,320,181.333z\n' +
            '                                                 "/>\n' +
            '                                    </g>\n' +
            '                                </g>\n' +
            '                                <g>\n' +
            '                                    <g>\n' +
            '                                        <path d="M213.333,202.667v-21.333H192c-0.295-0.006-0.589-0.006-0.884,0c-11.538,0.244-20.693,9.795-20.449,21.333V224\n' +
            '                                                 c-0.006,0.295-0.006,0.589,0,0.884c0.244,11.538,9.795,20.693,21.333,20.449h21.333V224H192v-21.333H213.333z"/>\n' +
            '                                    </g>\n' +
            '                                </g>\n' +
            '                                <g>\n' +
            '                                    <g>\n' +
            '                                        <rect x="42.667" y="384" width="426.667" height="21.333"/>\n' +
            '                                    </g>\n' +
            '                                </g>\n' +
            '                                <g>\n' +
            '                                    <g>\n' +
            '                                        <rect x="234.667" y="437.333" width="42.667" height="21.333"/>\n' +
            '                                    </g>\n' +
            '                                </g>\n' +
            '                            </svg>                </a>\n' +
            '                    </li>';
        $('#rightCategoryMenu').append(liElem);
    });
};

let generateProductContainer = async (categoryId,categoryName) => {

    let auctions = await getAllAuctions(categoryId);
    console.log(auctions);

    let products = '';
    auctions.map((elem,index) => {
        products += '<div class="column is-6">\n' +
            '                                    <div class="flat-card is-long">\n' +
            '                                        <div class="left-image is-md">\n' +
            '                                            <img src="assets/images/products/house2.jpg" alt="">\n' +
            '                                        </div>\n' +
            '                                        <div class="product-info">\n' +
            '                                            <a href="product.html"><h3 class="product-name featured-md">' + elem.title +'</h3></a>\n' +
            '                                            <p class="product-description">' + elem.description + '</p>\n' +
            '                                            <p class="product-price">\n' +
            '                                                ' + elem.startingBid +'\n' +
            '                                            </p>\n' +
            '                                        </div>\n' +
            '        \n' +
            '                                        <div class="actions">\n' +
            '                                            <div class="add"><i data-feather="shopping-cart" class="has-simple-popover" data-content="Add to Cart" data-placement="top"></i></div>\n' +
            '                                            <div class="like"><i data-feather="heart" class="has-simple-popover" data-content="Add to Wishlist" data-placement="top"></i></div>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </div>';
    });

    let productContainer = '<div class="columns category-header">\n' +
        '                        <div class="column is-10 is-offset-1 is-tablet-landscape-padded">\n' +
        '                            <!-- Title -->\n' +
        '                            <div class="category-title is-product-category">\n' +
        '                                <h2>' + categoryName + '</h2>\n' +
        '                                <div class="category-icon is-hidden-mobile">\n' +
        '                                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
        '                                         viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">\n' +
        '                                        <g>\n' +
        '                                            <g>\n' +
        '                                                <path d="M458.667,0H53.333C23.893,0.035,0.035,23.893,0,53.333v405.333C0.035,488.107,23.893,511.965,53.333,512h405.333\n' +
        '                                                         c29.441-0.035,53.298-23.893,53.333-53.333V53.333C511.965,23.893,488.107,0.035,458.667,0z M490.667,458.667\n' +
        '                                                         c0,17.673-14.327,32-32,32H53.333c-17.673,0-32-14.327-32-32V53.333c0-17.673,14.327-32,32-32h405.333c17.673,0,32,14.327,32,32\n' +
        '                                                         V458.667z"/>\n' +
        '                                            </g>\n' +
        '                                        </g>\n' +
        '                                        <g>\n' +
        '                                            <g>\n' +
        '                                                <rect x="245.333" y="42.667" width="21.333" height="352"/>\n' +
        '                                            </g>\n' +
        '                                        </g>\n' +
        '                                        <g>\n' +
        '                                            <g>\n' +
        '                                                <path d="M320,181.333h-21.333v21.333H320V224h-21.333v21.333H320c0.295,0.006,0.589,0.006,0.884,0\n' +
        '                                                         c11.538-0.244,20.693-9.795,20.449-21.333v-21.333c0.006-0.295,0.006-0.589,0-0.884C341.089,190.245,331.538,181.089,320,181.333z\n' +
        '                                                         "/>\n' +
        '                                            </g>\n' +
        '                                        </g>\n' +
        '                                        <g>\n' +
        '                                            <g>\n' +
        '                                                <path d="M213.333,202.667v-21.333H192c-0.295-0.006-0.589-0.006-0.884,0c-11.538,0.244-20.693,9.795-20.449,21.333V224\n' +
        '                                                         c-0.006,0.295-0.006,0.589,0,0.884c0.244,11.538,9.795,20.693,21.333,20.449h21.333V224H192v-21.333H213.333z"/>\n' +
        '                                            </g>\n' +
        '                                        </g>\n' +
        '                                        <g>\n' +
        '                                            <g>\n' +
        '                                                <rect x="42.667" y="384" width="426.667" height="21.333"/>\n' +
        '                                            </g>\n' +
        '                                        </g>\n' +
        '                                        <g>\n' +
        '                                            <g>\n' +
        '                                                <rect x="234.667" y="437.333" width="42.667" height="21.333"/>\n' +
        '                                            </g>\n' +
        '                                        </g>\n' +
        '                                    </svg>                        </div>\n' +
        '                            </div>\n' +
        '        \n' +
        '                            <!-- Controls -->\n' +
        '                            <div class="listing-controls">\n' +
        '                                <div class="layout-controls">\n' +
        '                                    <a href="products.html"><span class="is-active"><i data-feather="grid"></i></span></a>\n' +
        '                                    <a href="products-list.html"><span><i data-feather="list"></i></span></a>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <!-- /Controls -->\n' +
        '        \n' +
        '                            <!-- Product grid -->\n' +
        '                            <div class="columns is-product-grid is-multiline">\n' + products +                                                                           +
        '                            </div>\n' +
        '                            <!-- /Product grid -->\n' +
        '        \n' +
        '                        </div>\n' +
        '                    </div>';

    $('#productContainer').append(productContainer);

};

$(document).ready(() => {

    generateRightMenu();

    getAuctionCategories().then((categories) => {
        console.log(categories);
        categories.map((elem,index) => {
            generateProductContainer(elem.categoryId,elem.title);
        });
    }).catch(err => {
        console.log(err);
    });


});