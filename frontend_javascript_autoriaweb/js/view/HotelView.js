/**
 * Renderiza o formulário para criar um novo hotel
 * @return {string} HTML do formulário de criação do hotel.
 */
function renderizarFormulario() {
  return `
          <form class="mt-3" id="formulario_hotel">
          <div class="form-group">
                  <label for="hotel_cnpj">CNPJ:</label>
                  <input type="number" class="form-control" id="hotel_cnpj_formulario">
              </div>
              <div class="form-group">
                  <label for="hotel_nome">Nome do hotel:</label>
                  <input type="text" class="form-control" id="hotel_nome_formulario">
              </div>
              <div class="form-group">
                  <label for="hotel_cep">CEP:</label>
                  <input type="number" class="form-control" id="hotel_cep_formulario">
              </div>
              <button type="submit" class="btn btn-primary mt-2">Salvar</button>
          </form>
      `;
}

/**
 * Renderiza o formulário para atualizar um hotel existente.
 * @param {Object} hotel - O hotel a ser atualizado.
 * @return {string} HTML do formulário de atualização do hotel.
 */
function renderizarFormularioAtualizar(hotel) {
    return `
            <form class="mt-3" id="formulario_hotel_atualizar">
                <input type="hidden" class="form-control" id="hotel_cnpj_formulario" value="${hotel.cnpj}">
                <div class="form-group">
                    <label for="hotel_nome">Nome do hotel:</label>
                    <input type="text" class="form-control" id="hotel_nome_formulario" value="${hotel.nomehotel}">
                </div>
                <div class="form-group">
                    <label for="hotel_cep">CEP:</label>
                    <input type="number" class="form-control" id="hotel_cep_formulario" value="${hotel.cep}">
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
}

  /**
 * Renderiza a tabela de hotéis.
 * @param {Array} hoteis - Lista dos hotéis a serem exibidas.
 * @return {string} HTML da tabela dos hotéis.
 */
function renderizarTabela(hoteis) {
  let tabela = `
          <table class="table table-striped mt-3">
              <thead>
                  <tr>
                      <th>CNPJ</th>
                      <th>Nome do hotel</th>
                      <th>CEP</th>
                      <th>Ações</th>
                  </tr>
              </thead>
              <tbody>
      `;

  hoteis.forEach((hotel) => {
    tabela += `
              <tr>
                  <td>${hotel.cnpj}</td>
                  <td>${hotel.nomehotel}</td>
                  <td>${hotel.cep}</td>
                  <td>
                    <button class="excluir-btn" hotel-cnpj=${hotel.cnpj}>Excluir</button>
                    <button class="atualizar-btn" hotel-atualizar-cnpj=${hotel.cnpj}>Atualizar</button>
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

const HotelView = {
    renderizarFormulario,
    renderizarTabela,
    renderizarFormularioAtualizar
};

export default HotelView;
