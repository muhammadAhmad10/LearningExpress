$(function () {
  showRecipies();
  $("#add-recipie").on("click", addRecipie);
  $("#show-recipie").on("click", showRecipies);
});


//Adding new recipie to the api as well as table
function addRecipie() {
  console.log("going to add");
  data = { title: $("#recipie-title").val(), body: $("#recipie-body").val() };
  $.ajax({
    url: "https://usman-fake-api.herokuapp.com/api/recipes",
    method: "POST",
    data: data,
    success: postRecipie(data),
    error: function () {
      console.log("could not post recepies");
    },
  });
}

function postRecipie(data) {
    $("#table-body")
        .append(`<tr id="row"><td>${data.title}</td><td>${data.body}</td><td>${data._id}</td>              
            <td><button class="btn btn-danger me-3"><i class="fa fa-remove"></i></button><button class="btn btn-warning"><i class="fa fa-pencil"></i></button></td>
        </tr>`);
    $("#exampleModal").modal("hide");
}


//Showing recipies from the api to the table
function showRecipies() {
    $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/recipes",
        method: "GET",
        success: showRecipiesInTable,
        error: function () {
        console.log("could not get recepies");
        },
    });
}

function showRecipiesInTable(response) {
  for (let x = 0; x < response.length; x++) {
    $("#table-body").append(`
            <tr id="${response[x]._id}">
                <td class="title">${response[x].title}</td>
                <td class="body">${response[x].body}</td>
                <td>${response[x]._id}</td>              
                <td>
                    <button id="delete" class="btn btn-danger me-3" onclick="deleteRecipie('${response[x]._id}')">
                        <i class="fa fa-remove"></i>
                    </button>
                    <button id="edit" onclick="updateRecipie('${response[x]._id}')" class="btn btn-warning" data-bs-toggle="modal" data-targer="#exampleModalUpdate" data-bs-target="#exampleModalUpdate" data-bs-whatever="@getbootstrap">
                        <i class="fa fa-pencil"></i>
                    </button>
                </td>
            </tr>
        `);
  }
}


//deleting the recipie from the table as well as api
function deleteRecipie(id) {
    $.ajax({
        url: `https://usman-fake-api.herokuapp.com/api/recipes/${id}`,
        method: "DELETE",
        success: function () {
        $(`#${id}`).remove();
        },
        error: function () {
        console.log("Unable to delete recipe.");
        },
    });
}


//Updating recipie from the api
function updateRecipie(id) {
    const row = document.getElementById(id);
    const title = row.querySelector(".title").innerText;
    const body = row.querySelector(".body").innerText;
    var b = $("#update-recipie-body").val(body);
    var t = $("#update-recipie-title").val(title);
    $("#update-recipie").on("click", function () {
        data = { title: t.val(), body: b.val() };
        $.ajax({
        url: `https://usman-fake-api.herokuapp.com/api/recipes/${id}`,
        method: "PUT",
        data: data,
        success: function () {
            console.log("record updated");
        },
        error: function () {
            console.log("Unable to delete recipie.");
        },
        });
        $("#exampleModalUpdate").modal("hide");
    });
}
