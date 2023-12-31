$(document).ready(function () {
    let availableFields = ['Subcategory', 'Title', 'Price', 'Popularity'];
    let selectedFields = [];

    // Populate displayHandling dropdown
    availableFields.forEach(function (field) {
        $('#displayHandling').append($('<option>', {
            value: field,
            text: field
        }));
    });

    // Add field to selectedFields
    $('#addFields').click(function () {
        $('#displayHandling option:selected').each(function () {
            let selectedOption = $(this).val();
            selectedFields.push(selectedOption);
            availableFields = availableFields.filter(field => field !== selectedOption);
        });
        refreshTable();
    });

    // Remove field from selectedFields
    $('#removeFields').click(function () {
        selectedFields = selectedFields.filter(field => {
            availableFields.push(field);
            return false;
        });
        refreshTable();
    });

    // Fetch and display JSON data
    $.getJSON('https://s3.amazonaws.com/open-to-cors/assignment.json', function (data) {
        // Sort data based on descending popularity
        data.sort((a, b) => b.Popularity - a.Popularity);

        // Initial display
        refreshTable();
    });

    function refreshTable() {
        // Clear table content
        $('#dataTable').empty();

        // Add table headers
        let headerRow = $('<tr>');
        selectedFields.forEach(function (field) {
            headerRow.append($('<th>', { text: field }));
        });
        $('#dataTable').append(headerRow);

        // Add table rows
        $.getJSON('https://s3.amazonaws.com/open-to-cors/assignment.json', function (data) {
            data.sort((a, b) => b.Popularity - a.Popularity);
            data.forEach(function (product) {
                let row = $('<tr>');
                selectedFields.forEach(function (field) {
                    row.append($('<td>', { text: product[field] }));
                });
                $('#dataTable').append(row);
            });
        });
    }
});
