const urlBasic = "https://www.scorebat.com/video-api/v3/feed/";
const token =
  "MTQwMTQxXzE3MDU5MzU2MjFfNWU3ZGQ2MzIwMGNiZWM5ZjY4NThhMDg5ODM1NzdjZDc4ZGRhOWVkYQ==";
const container = document.querySelector(".highlights");
async function fetchData(url) {
  try {
    const response = await fetch(`${url}?token=${token}`);
    if (response.status === 404) {
      throw new Error("Page not found");
    } else if (response.status === 500) {
      throw new Error("Server error");
    } else if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    printCards(data)
  } catch (error) {
    console.error(error);
  }
}

fetchData(urlBasic)

function printCards(response) {
  let match = response.response;
  match.forEach((element) => {
    let card = document.createElement("article");
    card.classList.add("card");
    card.innerHTML = `
        <figure class="card-video-container">
            ${element.videos[0].embed}
        </figure>
        <h2 class="card-title">${element.title}</h2>
        <p class="card-des">
        ${element.competition}
        </p>
    `;
    container.appendChild(card)
  });
}
