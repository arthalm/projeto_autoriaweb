import hotelView from "../view/HotelView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário do hotel.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */
function renderizarHotelFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = hotelView.renderizarFormulario();
  document.getElementById("formulario_hotel").addEventListener("submit", cadastrarHotel);
}

/**
 * Cadastra um novo hotel.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarHotel(event) {
  event.preventDefault();
  const cnpjValor = document.getElementById("hotel_cnpj_formulario").value;
  const nomehotelValor = document.getElementById("hotel_nome_formulario").value;
  const cepValor = document.getElementById("hotel_cep_formulario").value;
  const novoHotel = { cnpj: cnpjValor, nomehotel: nomehotelValor, cep: cepValor };

  try {
    await fetch(`${API_BASE_URL}/hoteis`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoHotel),
    });
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaHoteis(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar hotel:", error);
  }
}
/**
 * Renderiza a lista de hotéis.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaHoteis(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/hoteis");
    const hoteisBD = await response.json(); 

    const hoteis = hoteisBD.map((row) => {
      return {
        cnpj: row.cnpj,
        nomehotel: row.nomehotel,
        cep: row.cep,
        dataAbertura: row.data_abertura,
      };
    });
    componentePrincipal.innerHTML = hotelView.renderizarTabela(hoteis);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar hotéis:", error);
  }
}

/**
 * Adiciona eventos de clique aos botões de exclusão de hotel.
 * Cada botão, quando clicado, aciona a função de exclusão do hotel correspondente.
 */
function inserirEventosExcluir() {
  const botoesExcluir = document.querySelectorAll(".excluir-btn");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", function () {
      const hotelCNPJ = this.getAttribute("hotel-cnpj");
      excluirHotel(hotelCNPJ);
    });
  });
}

/**
 * Adiciona eventos de clique aos botões de atualização de tarefa.
 * Cada botão, quando clicado, aciona a função de buscar a tarefa específica para atualização.
 */
function inserirEventosAtualizar() {
  const botoesAtualizar = document.querySelectorAll(".atualizar-btn");
  botoesAtualizar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const hotelCNPJ = this.getAttribute("hotel-atualizar-cnpj");
      buscarHotel(hotelCNPJ);
    });
  });
}

/**
 * Exclui um hotel específico com base no CNPJ.
 * Após a exclusão bem-sucedida, a lista de hotéis é atualizada.
 * @param {string} cnpj - CNPJ da tarefa a ser excluída.
 */
async function excluirHotel(cnpj) {
  try {
    const response = await fetch(`${API_BASE_URL}/hoteis/${cnpj}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir o hotel");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaHoteis(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir o hotel:", error);
  }
}

/**
 * Busca um hotel específico para atualização, com base no CNPJ.
 * Após encontrar o hotel, renderiza o formulário de atualização.
 * @param {string} cnpj - CNPJ do hotel a ser buscado.
 */
async function buscarHotel(cnpj) {
  try {
    const response = await fetch(`${API_BASE_URL}/hoteis/${cnpj}`);
    const hoteisBD = await response.json();
    if (hoteisBD.length <= 0) return;

    const hotel = hoteisBD.map(row => ({
      cnpj: row.cnpj,
      nomehotel: row.nomehotel,
      cep: row.cep,
      dataAbertura: row.data_abertura,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = hotelView.renderizarFormularioAtualizar(hotel);
    document.getElementById("formulario_hotel_atualizar").addEventListener("submit", atualizarHotel);
  } catch (error) {
    console.error("Erro ao buscar hotéis:", error);
  }
}

/**
 * Atualiza um hotel específico.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarHotel(event) {
  event.preventDefault();

  const cnpjValor = document.getElementById("hotel_cnpj_formulario").value;
  const nomehotelValor = document.getElementById("hotel_nome_formulario").value;
  const cepValor = document.getElementById("hotel_cep_formulario").value;
  const hotel = {cnpj: cnpjValor, nomehotel: nomehotelValor, cep: cepValor,};

  try {
    const response = await fetch(`${API_BASE_URL}/hoteis`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(hotel),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar o hotel");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaHoteis(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar hotel:", error);
  }
}

const HotelController = {
  renderizarHotelFormulario,
  cadastrarHotel,
  renderizarListaHoteis,
  excluirHotel,
};

export default HotelController;
