let baseUrl = 'http://localhost:3000';

const getMyAuctions = async () => {
    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    let options = {
        headers : {
            'Content-Type': 'application/json',
            'Authorization': 'token ' + userData.userId
        },
        method: 'GET'
    };

    try {
        let response = await fetch(baseUrl + '/auction/getAllAuctions?createdByUserId=' + userData.userId, options);
        let jsonResponse = await response.json();

        console.log(jsonResponse);
        return jsonResponse.data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

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

const createAuction = async data => {
    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    let options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'token ' + userData.userId
        },
        method: 'POST',
        body: JSON.stringify(data)
    };

    try {
        let response = await fetch(baseUrl + '/auction/createAuction', options);
        let jsonResponse = await response.json();
        console.log(jsonResponse);

        return jsonResponse.data;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const deleteAuction = async data => {
    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    let options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'token ' + userData.userId
        },
        method: 'POST',
        body: JSON.stringify(data)
    };

    try {
        let response = await fetch(baseUrl + '/auction/deleteAuction', options);
        let jsonResponse = await response.json();
        console.log(jsonResponse);

        return jsonResponse;
    } catch (err) {
        console.log(err);
        return null;
    }
};

let viewMyAuctions = auctions => {
    auctions.map((element, index) => {
        let elem = '<li id="'+ element.auctionId + '" class="wishlist-item">\n' +
            '                                                <div class="item-wrapper">\n' +
            '                                                    <img src="assets/images/products/office7.gif" alt="">\n' +
            '                                                    <span class="product-info">\n' +
            '                                                        <span>' + element.title + '</span>\n' +
            '                                                        <span>' + element.description + '</span>\n' +
            '                                                    </span>\n' +
            '                                                    <div class="action">' +
            '                                                        <span style="color: #0023FF"> Starting Bid:' + element.startingBid + '</span>\n' +
                                                                '</div>\n' +
                                                                '<div class="action delete-auction" data-auctionId = "' + element.auctionId + '">' +
            '                                                           <button class="button is-danger raised">Cancel</button>'
            +                                                    '</div>\n' +
            '                                                </div>\n' +
            '                                            </li>';
        $("#my-auctions").append(elem);
    });
    $('.delete-auction').click(() => {
        let auctionId = $('.delete-auction').data("auctionid");
        console.log(auctionId);
        deleteAuction({auctionId}).then(res => {
            if(res!==null)
            {
                iziToast.show({
                    title: 'Success',
                    message: 'Auction Deleted Successfully',
                    titleColor: 'green',
                    messageColor: 'green',
                    backgroundColor: 'black'
                });

                window.location.reload();
            }else {
                iziToast.show({
                    title: 'Error',
                    message: 'Error in deleting the auction',
                    titleColor: 'Red',
                    messageColor: 'Red',
                    backgroundColor: 'yellow'
                });
            }
        }).catch(err => {
            iziToast.show({
                title: 'Error 2',
                message: err,
                titleColor: 'Red',
                messageColor: 'Red',
                backgroundColor: 'yellow'
            });
        });
    });
};

let viewModalCategories = categories => {
    categories.map((cat,index) => {
        let opt = '<option id="' + cat.categoryId + '" value="' + cat.categoryId + '">' + cat.title + '</option>';
        $('#auction-category').append(opt);
    });
};

$(document).ready( () => {
    if(localStorage.getItem("userData") === null || localStorage.getItem("userData") === undefined)
    {
        window.location = "home.html";
    }

    getMyAuctions().then((auctions) => {
        console.log(auctions);
        viewMyAuctions(auctions);
    }).catch(err => {
        console.log(err);
    });

    getAuctionCategories().then((categories) => {
        console.log(categories);
        viewModalCategories(categories);
    }).catch(err => {
        console.log(err);
    });

    $('#create-auction').click(() => {
        $('#add-modal-auction').toggleClass('is-active', true);
    });

    $('#cancel-auction').click(() => {
        $('#add-modal-auction').toggleClass('is-active', false);
    });

    $('#confirm-auction').click( () => {
        let userData = localStorage.getItem("userData");
        if(userData===null || userData===undefined) {
            iziToast.show({
                title: 'Error',
                message: 'Please login first to create an Auction!',
                titleColor: 'black',
                backgroundColor: 'yellow'
            });
            window.location = 'authentication.html'
        }
        else {
            let category = document.getElementById('auction-category');
            let categoryId = category.options[category.selectedIndex].value;
            let data = {
                userId: userData.userId,
                title: $('#auction-title').val(),
                description: $('#auction-description').val(),
                startDate: $('#auction-start-date').val(),
                endDate: $('#auction-end-date').val(),
                categoryId: parseInt(categoryId),
                startingBid: $('#auction-starting-bid').val()
            };
            console.log(JSON.stringify(data) + " " + categoryId);

            createAuction(data).then( response => {
                if(response !== null) {
                    iziToast.show({
                        title: 'Success',
                        message: 'Auction created Successfully',
                        titleColor: 'green',
                        messageColor: 'green',
                        backgroundColor: 'black'
                    });

                    window.location.reload();
                }
                else {
                    iziToast.show({
                        title: 'Error 1',
                        message: 'Error in creating the auction',
                        titleColor: 'Red',
                        messageColor: 'Red',
                        backgroundColor: 'yellow'
                    });
                }
            }).catch( err => {
                iziToast.show({
                    title: 'Error 2',
                    message: err,
                    titleColor: 'Red',
                    messageColor: 'Red',
                    backgroundColor: 'yellow'
                });
            });
        }
    });

});