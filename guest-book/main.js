const profileHeader = document.querySelector(".profile-header");
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

const POST_LS = "posts";

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
  storageUpdate();
};

// feed :: display none

profileHeader.addEventListener("click", (e) => {
  formFeed.style.display = "flex";
  feed.style.display = "flex";
  followingFeed.style.display = "flex";
  followersFeed.style.display = "flex";
});

posts.addEventListener("click", (e) => {
  formFeed.style.display = "flex";
  feed.style.display = "flex";
  followingFeed.style.display = "none";
  followersFeed.style.display = "none";
});

following.addEventListener("click", (e) => {
  formFeed.style.display = "none";
  feed.style.display = "none";
  followingFeed.style.display = "flex";
  followersFeed.style.display = "none";
});

followers.addEventListener("click", (e) => {
  formFeed.style.display = "none";
  feed.style.display = "none";
  followingFeed.style.display = "none";
  followersFeed.style.display = "flex";
});

// form :: submit logic
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
  storageUpdate();
};

// Local Storage ::
const storageUpdate = () => {
  localStorage.setItem(POST_LS, JSON.stringify(feedItems));
};

const loadFeedItems = () => {
  const feedData = localStorage.getItem(POST_LS);
  if (feedData !== null) {
    const feeds = JSON.parse(feedData);
    feeds.forEach((feed) => {
      posting(feed);
    });
    id = feeds.length;
    feedItems = feeds;
  }
};

loadFeedItems();
