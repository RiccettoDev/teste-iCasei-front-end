const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const videoResults = document.getElementById('videoResults');

const YOUR_YOUTUBE_API_KEY = 'AIzaSyBEYGQj-gAWPbkmDc_i1gDFMCcBX2yHyVM';

searchButton.addEventListener('click', async () => {
  const searchTerm = searchInput.value.trim();

  if (searchTerm === '') {
    alert('Por favor, digite um termo para pesquisa.');
    return;
  }

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(searchTerm)}&key=${YOUR_YOUTUBE_API_KEY}&part=snippet&type=video&maxResults=10`);
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
    const videoThumbnail = video.snippet.thumbnails.default.url;

    videoHtml += `
      <div class="video-item">
        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
          <img src="${videoThumbnail}" alt="${videoTitle}">
          <h3>${videoTitle}</h3>
        </a>
      </div>
    `;
  });

  videoResults.innerHTML = videoHtml;
}
