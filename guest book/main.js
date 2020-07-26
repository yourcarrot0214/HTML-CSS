// profile ::  Follow button 기능 구현

const profileFollowButton = document.querySelector(".profile-follow-button");

profileFollowButton.addEventListener("click", (event) => {
  if (!event.target.classList.contains("follow")) {
    profileFollowButton.innerText = "Following";
  } else {
    profileFollowButton.innerText = "Follow";
  }
  event.target.classList.toggle("follow");
});

// feed :: like 기능 구현

const likeButtons = document.querySelectorAll(".card-footer-like");

likeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (event.target.classList.contains("liked")) {
      event.target.innerText = "Like";
    } else {
      event.target.innerText = "Liked";
    }
    event.target.classList.toggle("liked");
  });
});

// feed :: display none

const posts = document.querySelector(".posts");

// form :: submit logic

const form = document.querySelector("form");
const formName = document.querySelector(".form-name");
const formTextarea = document.querySelector(".form-textarea");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = formData.get("name");
  const content = formData.get("content");
  const postingData = { name, content };

  console.log(postingData);
  formName.value = "";
  formTextarea.value = "";
});
