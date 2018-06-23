//functions to take care of pagination of searched restaurants

$(document).ready(function () {
    getPagination('#restaurantTable');
    $('#maxRows option:last').prop('selected', true).trigger('change');
});

function getPagination(table) {
    $('#maxRows').on('change', function(e) {
        $('.pagination').html('');
        var trnum = 0;
        var maxRows = parseInt($(this).val());
        var totalRows = $(table + ' tbody tr').length;
        $(table + ' tr:gt(0)').each(function() {
            trnum++;
            if (trnum > maxRows) {

                $(this).hide();
            }
            if (trnum <= maxRows) {
                $(this).show();
            }
        });
        if (totalRows > maxRows) {
            var pagenum = Math.ceil(totalRows / maxRows);
            for (var i = 1; i <= pagenum;) {
                $('.pagination').append('<li class"wp" data-page="' + i + '">\
<span>' + i++ + '<span class="sr-only">(current)</span></span>\
</li>').show();
            }
        }
        $('.pagination li:first-child').addClass('active');
        $('.pagination li').on('click', function() {
            var pageNum = $(this).attr('data-page');
            var trIndex = 0;
            $('.pagination li').removeClass('active');
            $(this).addClass('active');
            $(table + ' tr:gt(0)').each(function() {
                trIndex++;
                if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
        });
    });
}





