// 1. profile Follow button 기능 구현

const profileFollowButton = document.querySelector(".profile-follow-button");

profileFollowButton.addEventListener("click", (event) => {
  if (!event.target.classList.contains("follow")) {
    profileFollowButton.innerText = "Following";
  } else {
    profileFollowButton.innerText = "Follow";
  }
  event.target.classList.toggle("follow");
});

// 2. feed :: like 기능 구현

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
