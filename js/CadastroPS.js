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
  const nome = document.getElementById("nome").value;
  const crp = document.getElementById("crp").value;
  const especialidade = document.getElementById("especialidade").value;
  const email = document.getElementById("e-mail").value;
  const telefone = document.getElementById("telefone").value;
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  if (!nome || !crp || !especialidade) {
    alert("Por favor, preencha o nome, o CRP e a especialidade!");
    return;
  }

  const registro = {
    nome,
    crp,
    especialidade,
    email,
    telefone,
    senha,
    confirmarSenha  
  };

  console.log("Registro salvo:", registro);
  localStorage.setItem("registro", JSON.stringify(registro));

  alert("Registro salvo com sucesso!");
  modal.style.display = "none";

  // Limpa os campos
  document.getElementById("nome").value = "";
  document.getElementById("crp").value = "";
  document.getElementById("especialidade").value = "";
  document.getElementById("e-mail").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("senha").value = "";
  document.getElementById("confirmarSenha").value = "";
});
