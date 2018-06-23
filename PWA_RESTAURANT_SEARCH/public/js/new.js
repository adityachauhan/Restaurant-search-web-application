//functions to switch between nav-tabs on click of the buttons in different tabs
// these functions becomes obselete as we changed the design from navigation style to modal popup design

$("#btnLove").on('click', function (evt) {
	$('.tab3').addClass('active').siblings().removeClass('active');
});

$('#ReviewBtn').on('click', function (evt) {
    $('.tab4').addClass('active').siblings().removeClass('active');
});