const baseURL = "https://api.github.com/users";

const body = document.querySelector("body");
const toggleSwitch = document.querySelector("#toggle-btn");
const input = document.querySelector("input");
const searchBtn = document.querySelector(".search-btn");
const reveal = document.querySelector(".hidden");

let currMode = "Dark";
toggleSwitch.addEventListener("click", (evt) => {
  if (currMode === "Light") {
    currMode = "Dark";
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
    toggleSwitch.classList.add("fa-toggle-on");
    toggleSwitch.classList.remove("fa-toggle-off");
    toggleSwitch.style.color = "#ffffff";
  } else {
    currMode = "Light";
    body.classList.add("light-mode");
    body.classList.remove("dark-mode");
    toggleSwitch.classList.add("fa-toggle-off");
    toggleSwitch.classList.remove("fa-toggle-on");
    toggleSwitch.style.color = "#000000";
  }
});

input.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    searchBtn.click();
  }
});

const getUserData = async (userName) => {
  if (!userName) return { error: "Please enter a GitHub username." };
  const response = await fetch(`${baseURL}/${userName}`);
  const userData = await response.json();
  if (userData.message === "Not Found") return { error: "User not found. Please check the username and try again." };
  return { data: userData };
};

const showError = (msg) => {
  alert(msg);
  reveal.classList.add("hidden");
};

const showUser = (userData) => {
  reveal.classList.remove("hidden");
  const img = document.querySelector(".img img");
  if (img) img.src = userData.avatar_url;
  document.querySelector("#name").innerText = `Profile Name: ${userData.name || "N/A"}`;
  document.querySelector("#bio").innerText = `Bio: ${userData.bio || "N/A"}`;
  document.querySelector("#followers").innerText = `Followers: ${userData.followers ?? "N/A"}`;
  document.querySelector("#following").innerText = `Following: ${userData.following ?? "N/A"}`;
  document.querySelector("#repos").innerText = `Repositories: ${userData.public_repos ?? "N/A"}`;
  document.querySelector("#blog").innerText = `Blog: ${userData.blog || "N/A"}`;
  document.querySelector("#company").innerText = `Company: ${userData.company || "N/A"}`;
  document.querySelector("#location").innerText = `Location: ${userData.location || "N/A"}`;
  document.querySelector("#created-on").innerText = `Created On: ${userData.created_at || "N/A"}`;
  document.querySelector("#last-update").innerText = `Last Update: ${userData.updated_at || "N/A"}`;
  document.querySelector("#profile-link").href = userData.html_url || "#";
};

searchBtn.addEventListener("click", async () => {
  const userName = input.value.trim();
  const result = await getUserData(userName);
  if (result.error) {
    showError(result.error);
    return;
  }
  showUser(result.data);
});