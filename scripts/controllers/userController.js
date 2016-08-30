class UserController {
    constructor(userView, requester, baseUrl, appKey){
        this._userView = userView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/user/" + appKey + "/";
    }

    showLoginPage(isLoggedIn){
        this._userView.showLoginPage(isLoggedIn);
    }

    showRegisterPage(isLoggedIn){
        this._userView.showRegisterPage(isLoggedIn);
    }

    showContactUs(isLoggedIn){
        this._userView.showContactUs(isLoggedIn);
    }
    showGalleryPage(isLoggedIn){
        this._userView.showGalleryPage(isLoggedIn);
    }

        register(requestData) {
        if (requestData.username.length < 6) {
            showPopup('error', "Username must consist of atleast 5 symbols.");
            return;
        }

        if (requestData.fullName.length < 8) {
            showPopup('error', "Full name must consist of atleast 8 symbols.");
            return;
        }

        if (requestData.password.length < 6) {
            showPopup('error', "Password must consist of atleast 6 symbols.");
            return;
        }

        if (requestData.password !== requestData.confirmPassword) {
            showPopup('error', "Password do not match.");
            return;
        }

        delete requestData['confirmPassword'];
        let requestUrl = this._baseServiceUrl;

        this._requester.post(requestUrl, requestData,
            function success(data) {
                showPopup('success', "You have successfully registered.");
                redirectUrl("#/login");
            },
            function error(data) {
                showPopup('error', "An error has occurred while attempting to register.");
            });
    }

    login(requestData){
        let requestUrl = this._baseServiceUrl + "login";

        this._requester.post(requestUrl, requestData,
            function success(data) {
                showPopup('success', "You have successfully logged in.");

                sessionStorage['_authToken'] = data._kmd.authtoken;
                sessionStorage['username'] = data.username;
                sessionStorage['fullName'] = data.fullName;

                redirectUrl("#/");
            },
            function error(data) {
                showPopup('error', "An error has occurred while attempting to login.")
            });
    }

    logout(){
        sessionStorage.clear();
        redirectUrl("#/");
    }
}