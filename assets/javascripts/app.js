(function() {
    
    $('#view-page-new-products .scroll, #view-page-new-products .scroll-item').css({
        height: $(window).height()
    });
    
    var scrollNP = new IScroll('#view-page-new-products .scroll', {
        snap: true
    });
    
})();
