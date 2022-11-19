function runPostsApp() {
  var postsBaseUrl = "https://jsonplaceholder.typicode.com";
  var postsContainerEl = document.querySelector("#posts-container");

  function renderPostList(posts) {
    posts.forEach(function (post) {
      var postDiv = createPost(post);
      if (postDiv) {
        postsContainerEl.appendChild(postDiv);
      }
    });
  }

  function createPost(post) {
    var div = document.createElement("div");

    var deleteButton = document.createElement("deleteButton");
    deleteButton.innerHTML = "DELETE";

    var updateButton = document.createElement("updateButton");
    updateButton.innerHTML = "UPDATE";

    deleteButton.onclick = function () {
      fetch(postsBaseUrl + "/posts/" + post.id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            div.remove();
          } else {
            console.log("NOT DELETED");
          }
          return response;
        })
        .then((response) => response.json())
        .then((data) => console.log(data));
    };

    // updateButton.onclick = function () {
    //   var editModal = document.querySelector("#modal");

    //   fetch(postsBaseUrl + "/posts/1" + editModal, {
    //     method: "PUT",
    //     headers: { "Content-type": "application/json" },
    //   })
    //     .then(function (response) {
    //       return response.json;
    //     })
    // };

    div.innerHTML =
      "<div class='post-title'>" +
      "<h2>" +
      post.title +
      "</h2>" +
      "</div><p class='post-body'>" +
      post.body +
      "</p>";

    div.appendChild(deleteButton);
    div.appendChild(updateButton);
    return div;
  }

  fetch(postsBaseUrl + "/posts")
    .then(function (response) {
      return response.json();
    })
    .then(function (posts) {
      renderPostList(posts);
    });
}

var pageInit = function () {
  runPostsApp();
};

window.addEventListener("load", function () {
  pageInit();
});
