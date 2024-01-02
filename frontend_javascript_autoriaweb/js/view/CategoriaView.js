/**
 * Renderiza o formulário para criar uma nova categoria de quarto.
 * @return {string} HTML do formulário de criação de categoria de quarto.
 */
function renderizarFormulario() {
  return `
          <form class="mt-3" id="formulario_categoria">
              <div class="form-group">
                  <label for="categoria_nome">Nome da categoria:</label>
                  <input type="text" class="form-control" id="categoria_nome_formulario">
              </div>
              <div class="form-group">
                  <label for="categoria_descricao">Descrição:</label>
                  <textarea class="form-control" id="categoria_descricao_formulario"></textarea>
              </div>
              <button type="submit" class="btn btn-primary mt-2">Salvar</button>
          </form>
      `;
}

/**
 * Renderiza o formulário para atualizar uma categoria de quarto existente.
 * @param {Object} categoria - A categoria de quarto a ser atualizada.
 * @return {string} HTML do formulário de atualização de categoria de quarto.
 */
function renderizarFormularioAtualizar(categoria) {
    return `
            <form class="mt-3" id="formulario_categoria_atualizar">
                <input type="hidden" class="form-control" id="categoria_id_formulario" value="${categoria.id}">
                <div class="form-group">
                    <label for="categoria_nome">Nome da categoria:</label>
                    <input type="text" class="form-control" id="categoria_nome_formulario" value="${categoria.nomecategoria}">
                </div>
                <div class="form-group">
                    <label for="categoria_descricao">Descrição:</label>
                    <textarea class="form-control" id="categoria_descricao_formulario">${categoria.descricao}</textarea>
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
}

  /**
 * Renderiza a tabela de categorias de quarto.
 * @param {Array} categorias - Lista de categorias de quarto a serem exibidas.
 * @return {string} HTML da tabela de categoria de quartos.
 */
function renderizarTabela(categorias) {
  let tabela = `
          <table class="table table-striped mt-3">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Nome da categoria</th>
                      <th>Descrição</th>
                      <th>Ações</th>
                  </tr>
              </thead>
              <tbody>
      `;

  categorias.forEach((categoria) => {
    tabela += `
              <tr>
                  <td>${categoria.id}</td>
                  <td>${categoria.nomecategoria}</td>
                  <td>${categoria.descricao}</td>
                  <td>
                    <button class="excluir-btn" categoria-id=${categoria.id}>Excluir</button>
                    <button class="atualizar-btn" categoria-atualizar-id=${categoria.id}>Atualizar</button>
                  </td>
              </tr>
          `;
  });

  tabela += `
              </tbody>
          </table>
      `;

  return tabela;
}

const CategoriaView = {
    renderizarFormulario,
    renderizarTabela,
    renderizarFormularioAtualizar
};

export default CategoriaView;