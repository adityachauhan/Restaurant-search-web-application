var slider = document.getElementById("myRange");
var output = document.getElementById("demo");

output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
}


/*$(document).ready(function () {
    $("#myBtn").click(function () {
        $("#myModal").modal();
    });
});*/
/*$("#test").click(function () {
    $('#guide-tabs li:eq(2) a').tab('show');
})*/
/*$("#gotohome").click(function () {
    $('#guide-tabs a[href="#tab3default"]').tab('show');
})
*/