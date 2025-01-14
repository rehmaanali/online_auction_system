let baseUrl = 'https://onlineauctionsystem-production.up.railway.app';

const getUserProfile = async () => {
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
        let response = await fetch(baseUrl + '/auth/getProfile', options);
        let jsonResponse = await response.json();

        console.log(jsonResponse);
        return jsonResponse.data;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const getAuctionCategories = async () => {
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

let viewProfile = profile => {
    let first_name = profile[0].name.split(' ')[0];
    let last_name = profile[0].name.split(' ')[1];
    let profileDetails = '<div class="column is-5">\n' +
        '        <!-- User card -->\n' +
        '        <div class="flat-card profile-card is-auto">\n' +
        '            <div class="card-body">\n' +
        '                <div class="profile-image">\n' +
        '                    <img src="'+ profile[0].imgUrl +'" alt="">\n' +
        '                </div>\n' +
        '                <div class="username has-text-centered">\n' +
        '                    <span>' + profile[0].name + '</span>\n' +
        '                    <small>Member since Sep 23 2017</small>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="profile-footer has-text-centered">\n' +
        '                <span class="achievement-title">Wallet</span>\n' +
        '                <div class="count">\n' +
        '                    &#8377 ' + profile[0].wallet +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '\n' +
        '    <!-- Details -->\n' +
        '    <div class="column is-7">\n' +
        '        <div class="flat-card profile-info-card is-auto">\n' +
        '            <!-- Title -->\n' +
        '            <div class="card-title">\n' +
        '                <h3>Account details</h3>\n' +
        '\n' +
        '                <div class="edit-account has-simple-popover popover-hidden-mobile" data-content="Edit Account"\n' +
        '                     data-placement="top">\n' +
        '                    <a href="account-edit.html"><i class="feather-icons" data-feather="settings"></i></a>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <!-- Contact Info -->\n' +
        '            <div class="card-body">\n' +
        '                <div class="columns">\n' +
        '                    <div class="column is-6">\n' +
        '                        <div class="info-block">\n' +
        '                            <span class="label-text">First Name</span>\n' +
        '                            <span class="label-value">' + first_name + '</span>\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div class="info-block">\n' +
        '                            <span class="label-text">Email</span>\n' +
        '                            <span class="label-value">' + profile[0].emailId + '</span>\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div class="info-block">\n' +
        '                            <span class="label-text">Sex</span>\n' +
        '                            <span class="label-value">' + profile[0].sex + '</span>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '\n' +
        '                    <div class="column is-6">\n' +
        '                        <div class="info-block">\n' +
        '                            <span class="label-text">Last Name</span>\n' +
        '                            <span class="label-value">' + last_name + '</span>\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div class="info-block">\n' +
        '                            <span class="label-text">Phone</span>\n' +
        '                            <span class="label-value">+1 555 623 568</span>\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div class="info-block">\n' +
        '                            <span class="label-text">Age</span>\n' +
        '                            <span class="label-value">' + profile[0].age + '</span>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <!-- Background Nephos Icon -->\n' +
        '            <img class="card-bg" src="assets/images/logo/nephos-greyscale.svg" alt="">\n' +
        '        </div>\n' +
        '\n' +
        '        <!-- Address Info -->\n' +
        '        <div class="flat-card profile-info-card is-auto">\n' +
        '            <!-- Title -->\n' +
        '            <div class="card-title">\n' +
        '                <h3>Billing address</h3>\n' +
        '                <!-- Cog Button -->\n' +
        '                <div class="edit-account is-vhidden">\n' +
        '                    <a href="account-edit.html"><i class="feather-icons" data-feather="settings"></i></a>\n' +
        '                </div>\n' +
        '\n' +
        '            </div>\n' +
        '            <!-- Billing Address -->\n' +
        '            <div class="card-body">\n' +
        '                <div class="columns">\n' +
        '                    <div class="column is-6">\n' +
        '                        <div class="info-block">\n' +
        '                            <span class="label-text">House Number</span>\n' +
        '                            <span class="label-value">' + profile[0].houseNo + '</span>\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div class="info-block">\n' +
        '                            <span class="label-text">City</span>\n' +
        '                            <span class="label-value">' + profile[0].city + '</span>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '\n' +
        '                    <div class="column is-6">\n' +
        '                        <div class="info-block">\n' +
        '                            <span class="label-text">Street</span>\n' +
        '                            <span class="label-value">' + profile[0].street + '</span>\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div class="info-block">\n' +
        '                            <span class="label-text">Country</span>\n' +
        '                            <span class="label-value">' + profile[0].country + '</span>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <!-- /Address Form -->\n' +
        '        </div>\n' +
        '    </div>';

    $('#account-details').append(profileDetails);
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

$(document).ready(() => {

    if(localStorage.getItem('userData') === undefined || localStorage.getItem('userData') === null) {
        window.location = "authentication.html";
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

    getUserProfile().then((profile) => {
        console.log(profile);
        viewProfile(profile);

    }).catch(err => {
        console.log(err);
    });

    generateRightMenu();
});