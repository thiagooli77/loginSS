const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const cancelarBtn = document.getElementById("cancelarBtn");
const registrarBtn = document.getElementById("registrarBtn");

// Abre o modal
openModal.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Fecha o modal ao clicar em cancelar
cancelarBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Fecha o modal ao clicar fora do conteúdo
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Registrar dados (simulação)
registrarBtn.addEventListener("click", () => {
  const nomeCampanha = document.getElementById("nomeCampanha").value;
  const descricaoCampanha = document.getElementById("descricaoCampanha").value;
  const dataInicio = document.getElementById("dataInicio").value;
  const dataTermino = document.getElementById("dataTermino").value;


  if (!nomeCampanha || !descricaoCampanha || !dataInicio||!dataTermino) {
    alert("Por favor, preencha os campos!");
    return;
  }

  const registro = {
    nomeCampanha,
    descricaoCampanha,
    dataInicio,
    dataTermino

  };

  console.log("Registro salvo:", registro);
  localStorage.setItem("registro", JSON.stringify(registro));

  alert("Registro salvo com sucesso!");
  modal.style.display = "none";

  // Limpa os campos
    document.getElementById("nomeCampanha").value = ""; 
    document.getElementById("descricaoCampanha").value = "";
    document.getElementById("dataInicio").value = "";
    document.getElementById("dataTermino").value = "";
});
