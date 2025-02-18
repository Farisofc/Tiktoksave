const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Toggle tema dark/light
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  themeToggle.textContent = body.classList.contains("dark") ? "☀" : "🌙";

  document.querySelectorAll(".section, .result, input").forEach(element => {
    element.classList.toggle("dark");
  });
});

document.getElementById("downloadButton").addEventListener("click", async () => {
  const url = document.getElementById("tiktokUrl").value;

  if (!url) {
    alert("Harap masukkan URL TikTok!");
    return;
  }

  try {
    // Ambil metadata video
    const metaResponse = await fetch(`https://website-restapii.vercel.app/tiktok?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      }
    });
    const data = await metaResponse.json();

    // Ambil URL video & audio
    const response = await fetch(`https://website-restapii.vercel.app/tiktokdll?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      }
    });
    const tik = await response.json();

    // Validasi data sebelum ditampilkan
    if (!data.result || !tik.result || !tik.result.data) {
      alert("Gagal mengambil data. Coba lagi.");
      return;
    }

    // Update tampilan hasil
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
      <img src="${tik.result.data.author.avatar}" alt="Foto Author">          
      <p><strong>Author:</strong> ${data.result.author}</p>
      <p><strong>Judul:</strong> ${data.result.title}</p>
      
      <a href="${data.result.nowm}" target="_blank" download>
        <button>Unduh Video</button>           
      </a>
      
      <a href="${tik.result.data.music.play}" target="_blank" download>
        <button>Unduh Audio</button>
      </a>
      
      <video id="videoPlayer" controls style="width: 100%; margin-top: 20px;">
        <source src="${tik.result.data.play}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;

    // Autoplay video setelah di-load
    const videoPlayer = document.getElementById("videoPlayer");
    videoPlayer.play(); 

  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan. Silakan coba lagi.");
  }
});
