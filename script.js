// Função para alternar entre modo claro e escuro
function toggleDarkMode() {
  const body = document.body;
  const card = document.getElementById("markdown-card");

  body.classList.toggle("dark-mode");
  card.classList.toggle("dark-card");
}

// Função para carregar e exibir o conteúdo JSON
function carregarConteudo() {
  const xhr = new XMLHttpRequest();

  // Função para obter o valor do parâmetro 'opus' da URL
  function getOpusFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("opus");
  }

  // Obtém o nome da obra e exibe na página
  var opusName = getOpusFromURL();
  if (opusName === "" || opusName === null) {
    opusName = "index";
  }
  xhr.open("GET", `data/${opusName}.json`, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);

      let titulo = "";
      if (data.autor !== undefined) {
        titulo = `<h2>${data.titulo} - <span>${data.autor}</span></h2>`;
      } else {
        titulo = `<h2>${data.titulo}</h2>`;
      }

      // Montar o conteúdo Markdown
      let conteudoMarkdown = "";
      for (let i = 0; i < data.capitulos.length; i++) {
        var tmp = data.capitulos[i];
        conteudoMarkdown += `## ${tmp.titulo}\n\n${tmp.conteudo}\n\n`;
      }

      // Converter Markdown em HTML
      const converter = new showdown.Converter();
      const conteudoHTML = converter.makeHtml(conteudoMarkdown);

      // Exibir o conteúdo na página
      document.getElementById(
        "markdown-content"
      ).innerHTML = `${titulo}${conteudoHTML}`;
    } else {
      console.error("Erro ao carregar o arquivo JSON.");
    }
  };

  xhr.send();
}

// Chamar a função para carregar o conteúdo
carregarConteudo();

// Chamar a função para carregar o conteúdo
document.addEventListener("DOMContentLoaded", carregarConteudo);

// Evento de clique para alternar o modo escuro
const darkModeButton = document.getElementById("dark-mode-button");
if (darkModeButton) {
  darkModeButton.addEventListener("click", toggleDarkMode);
}
