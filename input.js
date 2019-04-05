$("#add-btn").on("click", function(event) {
    event.preventDefault();

    var newTable = {
        groupName: $("#groupName").val().trim(),
        number: $("#phone").val().trim(),
        email: $("#email").val().trim(),
        id: $("#uniqueId").val().trim()
    };

    $.post("api/add", newTable)
    .then(function(data) {
        console.log(data);
        alert("Adding table...");
    });
});

$.get("/api/reservations", function(data) {
    for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        var listResGroup = $("<li class='list-res-group'>");

        listResGroup.append($("<h2>").text("Group Name: " + data[i].groupName));
        listResGroup.append($("<h3>").text("Number: " + data[i].number));
        listResGroup.append($("<h3>").text("Email: " + data[i].email));
        listResGroup.append($("<h3>").text("Id: " + data[i].id));

        $("#current-res-section").append(listResGroup);
    }
});

$.get("/api/waitinglist", function(data) {
    for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        var listWaitGroup = $("<li class='list-waitlist-group'>");

        listWaitGroup.append($("<h2>").text("Group Name: " + data[i].groupName));
        listWaitGroup.append($("<h3>").text("Number: " + data[i].number));
        listWaitGroup.append($("<h3>").text("Email: " + data[i].email));
        listWaitGroup.append($("<h3>").text("Id: " + data[i].id));

        $("#current-waitlist-section").append(listWaitGroup);
    }
});