const profileInfo = document.querySelector(".profile-info");
const posts = document.querySelector(".posts");
const following = document.querySelector(".following");
const followers = document.querySelector(".followers");
const feed = document.querySelector(".feed");
const followingFeed = document.querySelector(".following-feed");
const followersFeed = document.querySelector(".followers-feed");
const formFeed = document.querySelector(".form-feed");

const form = document.querySelector("form");
const formName = document.querySelector(".form-name");
const formTextarea = document.querySelector(".form-textarea");

const profileFollowButton = document.querySelector(".profile-follow-button");

// profile ::  Follow button 기능 구현
profileFollowButton.addEventListener("click", (event) => {
  if (!event.target.classList.contains("follow")) {
    profileFollowButton.innerText = "Following";
  } else {
    profileFollowButton.innerText = "Follow";
  }
  event.target.classList.toggle("follow");
});

// feed :: feed 내 기능 구현

feed.addEventListener("click", (event) => {
  // Like
  if (event.target.classList.contains("card-footer-like")) {
    event.target.classList.toggle("liked");
  } else if (event.target.className === "fas fa-backspace") {
    removeFeed(event);
    removeFeedItem(event);
    // storage update
  }
});

// feed :: remove Feed
const removeFeed = (event) => {
  event.target.parentElement.parentElement.parentElement.parentElement.remove();
};

// feedItems :: remove Item Filtering
const removeFeedItem = (event) => {
  let id = event.target.parentElement.parentElement.parentElement.id;
  let name = event.target.parentElement.innerText;
  let result = feedItems.filter(
    (feed) => feed.id !== Number(id) && feed.name !== name
  );
  feedItems = result;
};

// feed :: display none

profileInfo.addEventListener("click", (event) => {
  console.log(event.target);

  if (event.target === posts) {
    feed.style.display = "flex";
    formFeed.style.display = "flex";
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
// 1. form에 입력된 데이터를 정의한다.
// 2. 정의된 데이터를 포스팅함수의 매개변수로 전달한다.

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = formData.get("name");
  const content = formData.get("content");

  if (name === "" || content === "") return;

  const options = {
    year: "numeric",
    weekday: "long",
    month: "short",
    day: "numeric",
  };
  const date = new Date().toLocaleDateString("ko-KR", options);

  const postingData = { id, name, content, date };
  posting(postingData);
  id++;

  // form 초기화
  formName.value = "";
  formTextarea.value = "";
});

// feed :: posting 함수

let feedItems = [];
let id = 0;

const posting = (data) => {
  const post = `
    <div class="feed-card">
      <div class="profile-image">
        <i class="fas fa-user"></i>
      </div>
      <div class="feed-content" id=${data.id}>
        <div class="card-header">
          <div class="card-header-title">
            ${data.name}
            <i class="fas fa-backspace"></i>
            </div>
          <div class="card-header-time">${data.date}</div>
        </div>
        <div class="card-body">
          <div class="card-body-content">${data.content}</div>
        </div>
        <div class="card-footer">
          <span class="card-footer-reply">Reply</span>
          <span class="card-footer-like">Like</span>
        </div>
      </div>
    </div>
  `;

  feed.insertAdjacentHTML("afterbegin", post);
  feedItems.push({
    id: id,
    name: data.name,
    content: data.content,
    date: data.date,
  });
  console.log(feedItems);
  // sotrage update
};
