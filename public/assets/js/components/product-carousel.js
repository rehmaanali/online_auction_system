let baseUrl = 'https://onlineauctionsystem-production.up.railway.app';

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

let getAuctionDetails = async (auctionId) => {
    let options = {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    };
    try{
        let response = await fetch(baseUrl + '/auction/getAuction?auctionId=' + auctionId, options);
        let jsonResponse = await response.json();
        console.log(jsonResponse);

        return jsonResponse.data;
    }catch(err){
        console.log(err);
        return null;
    }
};

let bid = async(auctionId, bidAmt) => {

    let userData = localStorage.getItem("userData");
    userData = JSON.parse(userData);

    let data = {
        'auctionId': auctionId,
        'bidAmt': bidAmt
    };

    let options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'token ' + userData.token
        },
        method: 'POST',
        body: JSON.stringify(data)
    };

    try {
        let response = await fetch(baseUrl + '/auction/bid', options);
        let jsonResponse = await response.json();
        if(response.ok)
        {
            return true;
        }
        else{
            iziToast.show({
                title: 'Error',
                message: jsonResponse.message,
                titleColor: 'black',
                backgroundColor: 'yellow'
            });
        }
    }
    catch (err) {
        console.log(err);
        return err;
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

let generateProductDetails = async(auctionId, auction) => {
    auction = await getAuctionDetails(auctionId);

    if(auction.length === 0)
        return null;

    console.log(auction[0]);
    auction = auction[0];

    $('#productTitle').text(auction.title);
    $('#categoryTitle').text(auction.categoryName);
    $('#numBids').text("Bids: " + auction.numBids);
    $('#productDescription').text(auction.description);
    $('#modalProductDescription').text(auction.description);
    $('#currentBid').text(auction.currentBid);
    $('#productImage').attr("src", auction.imgUrl);
    $('#modalProductImage').attr("src", auction.imgUrl);

    return auction;

};

$(document).ready(() => {
    if(localStorage.getItem('userData') === undefined || localStorage.getItem('userData') === null) {
        let guestUser = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
        $('#logOutBtn').append(guestUser);
        $('#logOutBtn').click(() => {
            window.location = "authentication.html";
        });
    }
    else{
        let logOutBtn = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>';
        $('#logOutBtn').append(logOutBtn);
        $('#logOutBtn').click(() => {
            localStorage.clear();
            iziToast.show({
                timeout: 1500,
                title: 'Success',
                message: "User logged out successfully",
                titleColor: 'black',
                backgroundColor: 'green',
                onClosing: () => {
                    window.location = "authentication.html"
                }
            });
        });
    }

    generateRightMenu();

    let winUrl = window.location.href;
    let auctionId = winUrl.split('?auctionId=')[1];

    generateProductDetails(auctionId).then(auction => {
        if(auction===null)
            window.location = 'products.html';

        $('#bid').click(() => {
            $('#bidModal').toggleClass('is-active',true);
        });

        $('#cancelBid').click(() => {
            $('#bidModal').toggleClass('is-active',false);
        });

        $('#confirmBid').click(() => {

            let userData = localStorage.getItem("userData");
            if(userData===null || userData===undefined)
            {
                iziToast.show({
                    timeout: 1500,
                    title: 'Error',
                    message: 'Please Login first to Bid!',
                    titleColor: 'black',
                    backgroundColor: 'yellow'
                });

                return;
            }

            if(JSON.parse(userData).userId === auction.userId)
            {
                iziToast.show({
                    timeout: 1500,
                    title: 'Error',
                    message: 'You Cannot Bid on your own Item!',
                    titleColor: 'black',
                    backgroundColor: 'yellow'
                });
                return;
            }

            let bidVal = $('#bidAmt').val();
            console.log(bidVal);

            if(bidVal <= auction.currentBid)
            {
                iziToast.show({
                    timeout: 1500,
                    title: 'Error',
                    message: 'The Current Bid value is higher than your Bid. Please raise the Bid',
                    titleColor: 'black',
                    backgroundColor: 'yellow'
                });
                return;
            }

            if(bidVal > JSON.parse(userData).wallet)
            {
                iziToast.show({
                    timeout: 1500,
                    title: 'Error',
                    message: 'Your wallet does not have sufficient funds. Please add money',
                    titleColor: 'black',
                    backgroundColor: 'yellow'
                });
            }

            else{
                bid(auctionId, parseInt(bidVal)).then(done => {
                    if(done)
                    {
                        iziToast.show({
                            timeout: 1500,
                            title: 'Success!',
                            message: 'Successfully Placed Bid on the Product',
                            titleColor: 'black',
                            backgroundColor: 'green',
                            onClosing: function(){
                                window.location.reload();
                            }
                        });
                        $('#bidModal').toggleClass('is-active',false);

                    }
                }).catch(err => {
                    iziToast.show({
                        timeout: 1500,
                        title: 'Error',
                        message: err,
                        titleColor: 'black',
                        backgroundColor: 'yellow'
                    });
                });
            }

        });

    }).catch(err => {
        console.log(err);
        window.location = 'products.html';
    });



});