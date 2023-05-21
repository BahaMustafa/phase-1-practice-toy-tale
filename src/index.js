let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // Fetch Andy's Toys
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      let toysContainer = document.getElementById("toy-collection");
      toys.forEach(toy => {
        toysContainer.innerHTML += `
          <div class="card">
            <h2>${toy.name}</h2>
            <img src="${toy.image}" class="toy-avatar" />
            <p>${toy.likes} Likes </p>
            <button class="like-btn" id="${toy.id}">Like ❤️</button>
          </div>
        `;
      });
    });

  // Add a New Toy
  let toyForm = document.querySelector(".add-toy-form");
  toyForm.addEventListener("submit", function(e) {
    e.preventDefault();

    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": toyForm.name.value,
        "image": toyForm.image.value,
        "likes": 0
      })
    })
    .then(response => response.json())
    .then(toy => {
      let toysContainer = document.getElementById("toy-collection");
      toysContainer.innerHTML += `
        <div class="card">
          <h2>${toy.name}</h2>
          <img src="${toy.image}" class="toy-avatar" />
          <p>${toy.likes} Likes</p>
          <button class="like-btn" id="${toy.id}">Like ❤️</button>
        </div>
      `;
    });
  });

  // Increase a Toy's Likes
  let toysContainer = document.getElementById("toy-collection");
  toysContainer.addEventListener("click", function(e) {
    if(e.target.className === "like-btn") {
      let currentLikes = parseInt(e.target.previousElementSibling.innerText);
      let newLikes = currentLikes + 1;

      fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": newLikes
        })
      })
      .then(response => response.json())
      .then(toy => {
        e.target.previousElementSibling.innerText = `${toy.likes} Likes`;
      });
    }
  });
});
