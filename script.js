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
  xhr.open("GET", "data/republica_platao.json", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      const autor = data.autor;
      const titulo = data.titulo;

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
      ).innerHTML = `<h2>${titulo}</h2><em>${autor}</em>${conteudoHTML}`;
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
