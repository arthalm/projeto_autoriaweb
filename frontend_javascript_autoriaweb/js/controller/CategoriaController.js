import categoriaView from "../view/CategoriaView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário de categoria de quarto.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */
function renderizarCategoriaFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = categoriaView.renderizarFormulario();
  document.getElementById("formulario_categoria").addEventListener("submit", cadastrarCategoria);
}

/**
 * Cadastra uma nova categoria de quarto.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarCategoria(event) {
  event.preventDefault();
  const nomecategoriaValor = document.getElementById("categoria_nome_formulario").value;
  const descricaoValor = document.getElementById("categoria_descricao_formulario").value;
  const novaCategoria = { nomecategoria: nomecategoriaValor, descricao: descricaoValor};

  try {
    await fetch(`${API_BASE_URL}/categorias`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaCategoria),
    });
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaCategorias(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar categoria de quarto:", error);
  }
}
/**
 * Renderiza a lista de categorias de quarto.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaCategorias(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/categorias");
    const categoriasBD = await response.json();

    const categorias = categoriasBD.map((row) => {
      return {
        id: row.id,
        nomecategoria: row.nomecategoria,
        descricao: row.descricao,
        dataAbertura: row.data_abertura,
      };
    });
    componentePrincipal.innerHTML = categoriaView.renderizarTabela(categorias);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar categorias de quarto:", error);
  }
}

/**
 * Adiciona eventos de clique aos botões de exclusão de categoria de quarto.
 * Cada botão, quando clicado, aciona a função de exclusão de categoria de quarto correspondente.
 */
function inserirEventosExcluir() {
  const botoesExcluir = document.querySelectorAll(".excluir-btn");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", function () {
      const categoriaId = this.getAttribute("categoria-id");
      excluirCategoria(categoriaId);
    });
  });
}

/**
 * Adiciona eventos de clique aos botões de atualização de categoria de quarto.
 * Cada botão, quando clicado, aciona a função de buscar a categoria de quarto específica para atualização.
 */
function inserirEventosAtualizar() {
  const botoesAtualizar = document.querySelectorAll(".atualizar-btn");
  botoesAtualizar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const categoriaId = this.getAttribute("categoria-atualizar-id");
      buscarCategoria(categoriaId);
    });
  });
}

/**
 * Exclui uma categoria de quarto específica com base no ID.
 * Após a exclusão bem-sucedida, a lista de categorias de quarto é atualizada.
 * @param {string} id - ID da categoria de quarto a ser excluída.
 */
async function excluirCategoria(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/categorias/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir a categoria de quarto");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaCategorias(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir a categoria de quarto:", error);
  }
}

/**
 * Busca uma categoria de quarto específica para atualização, com base no ID.
 * Após encontrar a categoria de quarto, renderiza o formulário de atualização.
 * @param {string} id - ID da categoria de quarto a ser buscada.
 */
async function buscarCategoria(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/categorias/${id}`);
    const categoriasBD = await response.json();
    if (categoriasBD.length <= 0) return;

    const categoria = categoriasBD.map(row => ({
      id: row.id,
      nomecategoria: row.nomecategoria,
      descricao: row.descricao,
      dataAbertura: row.data_abertura,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = categoriaView.renderizarFormularioAtualizar(categoria);
    document.getElementById("formulario_categoria_atualizar").addEventListener("submit", atualizarCategoria);
  } catch (error) {
    console.error("Erro ao buscar categorias de quarto:", error);
  }
}

/**
 * Atualiza uma categoria de quarto específica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarCategoria(event) {
  event.preventDefault();

  const idValor = document.getElementById("categoria_id_formulario").value;
  const nomecategoriaValor = document.getElementById("categoria_nome_formulario").value;
  const descricaoValor = document.getElementById("categoria_descricao_formulario").value;
  const categoria = {id: idValor, nomecategoria: nomecategoriaValor, descricao: descricaoValor};

  try {
    const response = await fetch(`${API_BASE_URL}/categorias`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(categoria),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar a categoria de quarto");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaCategorias(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar categoria de quarto:", error);
  }
}

const CategoriaController = {
  renderizarCategoriaFormulario,
  cadastrarCategoria,
  renderizarListaCategorias,
  excluirCategoria,
};

export default CategoriaController;
