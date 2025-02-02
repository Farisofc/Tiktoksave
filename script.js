const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

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
        const metaResponse = await fetch(`https://website-restapii.vercel.app/tiktok?url=${encodeURIComponent(url)}`);
        const data = await metaResponse.json();

        const response = await fetch(`https://website-restapii.vercel.app/tiktokdll?url=${encodeURIComponent(url)}`);
    const tik = await response.json();

        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = `
          <img src="${tik.result.data.author.avatar}"" alt="Foto Author">          
          <p><strong>Author:</strong> ${data.result.author}</p>
          <p><strong>Judul:</strong> ${data.result.title}</p>
          <a href="${data.result.nowm}" target="_blank" download>
            <button>Unduh Video</button>           
          </a>
          
          <a href="${data.result.audio}" target="_blank" download>
            <button>Unduh Audio</button>
          </a>
          <video id="videoPlayer" controls style="width: 100%; margin-top: 20px;">
    <source src="${tik.result.data.play}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
`;
const videoPlayer = document.getElementById("videoPlayer");
videoPlayer.play(); 
      } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan. Silakan coba lagi.");
      }
    });
