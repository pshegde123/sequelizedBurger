// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {

    $(".burgerAvailable").on("click", function (event) {
        var id = $(this).data("id");
        var cName = $("#customer").val().trim();
        console.log("burger-actions:cName=",cName);

        let newBurgerState = {
            Devoured: true,
            customer_name: cName
        }
        //Send the PUT request
        $.ajax("/burger:" + id, {
            type: "PUT", data: newBurgerState
        }
        ).then(
            function () {
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newBurger = {
            Name: $("#newBurger").val().trim()
        };
        // Send the POST request.
        $.ajax("/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});