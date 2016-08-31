$(document).ready(function () {
    let tn_array = $(".slides img").map(function () {
        return $(this).attr("src");
    }).get();
    $('#MainImage').attr('src', tn_array[0]);
    $('#Previous').css("visibility", "hidden"); // hidden previous button when is first image

    let lengthImages = tn_array.length;
    let CurrImage = 0;
    let widthImg = 200;
    let BottomLength = 1;

    $('#Next').click(function () {
        $('#MainImage').fadeOut(function () {
            CurrImage = CurrImage + 1;                  // Update current image index
            if (CurrImage <= lengthImages - BottomLength) {
                $('#slider .slides').animate({ 'margin-left': '-=' + widthImg }); //show back images when click next button
            }
            $('#MainImage').attr('src', tn_array[CurrImage]); // set image to Main image
            if (CurrImage == lengthImages - BottomLength) {
                $('#Next').css("visibility", "hidden");         // hide next button when last image
            }
            if ($('#Previous').css("visibility") == "hidden") { // hide previous button
                $('#Previous').css("visibility", "visible");
            }
        }).fadeIn(500);
    });
    $('#Previous').click(function () {
        $('#MainImage').fadeOut(function () {
            CurrImage = CurrImage - 1;
            $('#slider .slides').animate({ 'margin-left': '+=' + widthImg }); // show back images when click previous button
            $('#MainImage').attr('src', tn_array[CurrImage]);
            if (CurrImage == 0) {
                $('#Previous').css("visibility", "hidden");  // hide previous button
            }
            if ($('#Next').css("visibility") == "hidden") { // hide next button
                $('#Next').css("visibility", "visible");
            }
        }).fadeIn(500);
    });
});

