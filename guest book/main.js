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

const profileInfo = document.querySelector(".profile-info");
const posts = document.querySelector(".posts");
const following = document.querySelector(".following");
const followers = document.querySelector(".followers");
const feed = document.querySelector(".feed");
const followingFeed = document.querySelector(".following-feed");
const followersFeed = document.querySelector(".followers-feed");
const formFeed = document.querySelector(".form-feed");

profileInfo.addEventListener("click", (event) => {
  console.log(event.target);

  if (event.target === posts) {
    feed.style.display = "flex";
    formFeed.style.display = "none";
    followingFeed.style.display = "none";
    followersFeed.style.display = "none";
  } else if (event.target === following) {
    feed.style.display = "none";
    formFeed.style.display = "none";
    followingFeed.style.display = "flex";
    followersFeed.style.display = "none";
  } else if (event.target === followers) {
    feed.style.display = "none";
    formFeed.style.display = "none";
    followingFeed.style.display = "none";
    followersFeed.style.display = "flex";
  }
});

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
