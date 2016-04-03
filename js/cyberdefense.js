

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('body').on('click', '.page-scroll a', function(e) {

        //Prevent default action
        e.preventDefault();

        //Set the anchor
        var $anchor = $(this);

        //Set the hashtag
        window.location.hash = this.hash;

        //Get the height of the menu for correcting where to calculate how to align the section starting point.
        var height = $('.collapse').height();

        //Remove any active menu options
        $('li.active').each(function () {
            $(this).removeClass('active');
        });

        $(this).parent().addClass('active');

        //Scroll the window to the root of the anchor
        $('html, body').stop().animate(
            {
                scrollTop: $($anchor.attr('href')).offset().top - height
            }, 700, 'easeInOutExpo');

    });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});


// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

//Enable data toggles
$(function () {
    $('[data-toggle="popover"]').popover();
});

//Only allow one pop up at a time
$(document).on('show.bs.popover', function() {
    $('.popover').not(this).popover('hide');
});