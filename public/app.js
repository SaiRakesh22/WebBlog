$(".nav-link").on("mouseover",function(){
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
})
$(".nav-link").on("mouseout", function() {
    $(this).removeClass("active");
});
