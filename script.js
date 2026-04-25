const form = document.getElementById("form-anotacao");
const tituloInput = document.getElementById("titulo");
const descricaoInput = document.getElementById("descricao");
const lista = document.getElementById("lista-anotacoes");

let anotacoes = [];

function carregarAnotacoes() {
  const dados = localStorage.getItem("anotacoes");

  if (dados) {
    anotacoes = JSON.parse(dados);
  }

  renderizarAnotacoes();
}

form.addEventListener("submit", function (e) {

  e.preventDefault();

  const titulo = tituloInput.value;
  const descricao = descricaoInput.value;

  const data = new Date();

  const dataFormatada = `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;

  const novoId = anotacoes.length > 0 ? anotacoes[anotacoes.length - 1].id + 1 : 1;

  const anotacao = {
    id: novoId,
    titulo,
    descricao,
    data: dataFormatada
  };

  anotacoes.push(anotacao);

  salvar();

  renderizarAnotacoes();

  form.reset();
});

function removerAnotacao(id) {

  anotacoes = anotacoes.filter(a => a.id !== id);

  salvar();

  renderizarAnotacoes();
}

function salvar() {

  localStorage.setItem(
    "anotacoes",
    JSON.stringify(anotacoes)
  );
}

function renderizarAnotacoes() {

  lista.innerHTML = "";

  anotacoes.forEach(anotacao => {

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <div>
        <h2>
          <b>${anotacao.titulo}</b>
          | ${anotacao.data}
        </h2>

        <p>${anotacao.descricao}</p>
      </div>

      <button data-id="${anotacao.id}">
        X
      </button>
    `;

    const botao = card.querySelector("button");

    botao.addEventListener("click", () => {
      removerAnotacao(anotacao.id);
    });

    lista.appendChild(card);
  });
}

carregarAnotacoes();