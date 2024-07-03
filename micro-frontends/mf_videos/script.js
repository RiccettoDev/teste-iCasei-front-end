const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const videoResults = document.getElementById('videoResults');

searchButton.addEventListener('click', async () => {
  const searchTerm = searchInput.value.trim();

  if (searchTerm === '') {
    alert('Por favor, digite um termo para pesquisa.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(searchTerm)}`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    displayVideos(data.items);
  } catch (error) {
    console.error('Erro ao buscar vídeos:', error.message);
    alert('Erro ao buscar vídeos. Tente novamente mais tarde.');
  }
});

function displayVideos(videos) {
  let videoHtml = '';

  videos.forEach(video => {
    const videoId = video.id.videoId;
    const videoTitle = video.snippet.title;
    const videoThumbnail = video.snippet.thumbnails.medium.url;

    videoHtml += `
      <div class="video-item">
        <img src="${videoThumbnail}" alt="${videoTitle}">
        <h3>${videoTitle}</h3>
        <div class="video-buttons">
          <a class="play-button" href="https://www.youtube.com/watch?v=${videoId}" target="_blank">Play</a>
          <button class="like-button">Like</button>
        </div>
      </div>
    `;
  });

  videoResults.innerHTML = videoHtml;
}
