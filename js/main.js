const API_URL = "https://api.github.com/users/"; // Github API

// Get DOM html attribute 
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// getUser("moralistfestus");

// fetch user from API_URL github API 
async function getUser(username) {
    const resp = await fetch(API_URL + username);
    const respData = await resp.json();
    createUserCard(respData);
    getRepos(username);
}

// Fetch all user's Repos
async function getRepos(username) {
  const resp = await fetch(API_URL + username + "/repos");
  const respData = await resp.json();
  addReposToCard(respData);
}

// Add user profile to a rendered html card attribute
function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");
  repos.forEach((repo) => {
          const repoEl = document.createElement("a");
          repoEl.classList.add("repo");
          repoEl.href = repo.html_url;
          repoEl.target = "_blank";
          repoEl.innerText = repo.name;
          reposEl.appendChild(repoEl);
      });
}

// User card
function createUserCard(user) {
  const cardHTML = `
      <div class="card">
          <div>
              <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
          </div>
          <div class="user-info">
              <h2>${user.name}</h2>
              <p>${user.bio}</p>
              <ul class="info">
                  <li><strong>Followers: </strong>${user.followers}</li>
                  <li><strong>Following: </strong>${user.following}</li>
                  <li><strong>Repos: </strong>${user.public_repos}</li>
                  <li><strong>Twitter: </strong> ${user.twitter_username}</li>
                  <li><strong>PublicGists: </strong>${user.public_gists}</li>
                  <li><strong>Company: </strong>${user.company}</li>
                  <li><strong>Location: </strong>${user.location}</li>
                  <li><strong>CreatedAt: </strong>${user.created_at}</li>

              </ul>
              <div id="repos"></div>
          </div>
      </div>
  `;

  main.innerHTML = cardHTML;
}

// Prevent page from reloading or refreshing after submitting form
form.addEventListener("submit", (e) => {
  e.preventDefault();
 // e.returnValue = false;  
 const user = search.value;
  if (user) {
      getUser(user);
      search.value = "";
  }
});
