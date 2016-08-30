class HomeView {
    constructor(wrapperSelector, mainContentSelector){
        this._wrapperSelector = wrapperSelector;
        this._mainContentSelector = mainContentSelector;
    }

    showGuestPage(sideBarData, mainData){
        let _that = this;

        $.get('templatees/welcome-guest.html', function (template) {
            let renderedWrapper = Mustache.render(template, null);

            $(_that._wrapperSelector).html(renderedWrapper);

            $.get('templatees/posts.html', function (template) {
                let blogPosts = {
                    blogPosts: mainData
                };
                let renderedPosts = Mustache.render(template, blogPosts);
                $('.articles').html(renderedPosts);
            });

            $.get('templatees/recent-posts.html', function (template) {
                let recentPosts = {
                    recentPosts: sideBarData
                };
                let renderedRecentPosts = Mustache.render(template, recentPosts);
                $('.recent-posts').html(renderedRecentPosts);


            });
        });

    }

    showUserPage(sideBarData, mainData){

        let _that = this;

        $.get('templatees/welcome-user.html', function (template) {
            let renderedWrapper = Mustache.render(template, null);

            $(_that._wrapperSelector).html(renderedWrapper);

            $.get('templatees/posts.html', function (template) {
                let blogPosts = {
                    blogPosts: mainData
                };
                let renderedPosts = Mustache.render(template, blogPosts);
                $('.articles').html(renderedPosts);
            });



            $.get('templatees/recent-posts.html', function (template) {
                let recentPosts = {
                    recentPosts: sideBarData
                };
                let renderedRecentPosts = Mustache.render(template, recentPosts);
                $('.recent-posts').html(renderedRecentPosts);


            });
        });
    }
}