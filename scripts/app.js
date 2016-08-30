(function () {

    // Create your own kinvey application

    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_HJHW2T4P"; // Place your appKey from Kinvey here...
    let appSecret = "1370fbed6629480c82656918a5a9df38"; // Place your appSecret from Kinvey here...
    let _guestCredentials = "8831d673-9305-4542-8dfc-11b5c08ae8a5.wxdXAejeQHrRIbKUst4qm/UD2umP/239QhIaEEy4wug="; // Create a guest user using PostMan/RESTClient/Fiddler and place his authtoken here...



    //Create AuthorizationService and Requester

    let authService = new AuthorizationService(baseUrl,
                                                appKey,
                                                appSecret,
                                                _guestCredentials);
    let requester = new Requester(authService);
    authService.initAuthorizationType("Kinvey");


    let selector = ".wrapper";
    let mainContentSelector = ".main-content";
    // Create HomeView, HomeController, UserView, UserController, PostView and PostController

    let homeView = new HomeView(selector, mainContentSelector);
    let homeController = new HomeController(homeView, requester, baseUrl, appKey);
    let userView = new UserView(selector, mainContentSelector);
    let userController = new UserController(userView, requester, baseUrl, appKey);
    let postView = new PostView(selector, mainContentSelector);
    let postController = new PostController(postView, requester, baseUrl, appKey);



    //let homeView = new HomeView(selector, mainContentSelector);
    //homeView.showGuestPage();
    //let homeController = new HomeController(homeView, requester, baseUrl, appKey);
    //homeController.showGuestPage();
    //let userView = new UserView(selector, mainContentSelector);
    //let userController = new UserController(userView, requester, baseUrl, appKey);
    //userController.showLoginPage();
    //userController.showRegisterPage();
    //let postView = new PostView(selector, mainContentSelector);
    //let postController = new PostController(postView, requester, baseUrl, appKey);



    initEventServices();

    onRoute("#/",
        function () {
        // Check if user is logged in and if its not show the guest page, otherwise show the user page...
        if(!authService.isLoggedIn()){
            homeController.showGuestPage();
        }
        else{
            homeController.showUserPage();
        }
    });

    onRoute("#/post-:id", function () {
        // Create a redirect to one of the recent posts...
        let top = $("#post-" + this.params['id']).position().top;
        $(window).scrollTop(top);
    });

    onRoute("#/login", function () {
        // Show the login page...
        userController.showLoginPage(authService.isLoggedIn());
    });

    onRoute("#/gallery", function () {
        userController.showGalleryPage(authService.isLoggedIn());
    });

    onRoute("#/contactus", function () {
       userController.showContactUs(authService.isLoggedIn());
    });

    onRoute("#/register", function () {
        // Show the register page...
        userController.showRegisterPage(authService.isLoggedIn());
    });

    onRoute("#/logout", function () {
        // Logout the current user...
        userController.logout();
    });

    onRoute('#/posts/create', function () {
        // Show the new post page...
        let data = {
            fullName: sessionStorage['fullName']
        };
        postController.showCreatePostPage(data, authService.isLoggedIn());
    });

    bindEventHandler('login', function (ev, data) {
        // Login the user...
        userController.login(data);
    });

    bindEventHandler('register', function (ev, data) {
        // Register a new user...
        userController.register(data);
    });

    bindEventHandler('createPost', function (ev, data) {
        // Create a new post...
        postController.createPost(data);
    });


    run('#/');
})();
