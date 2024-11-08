// Função para verificar o modelo da impressora e exibir ou ocultar as opções de cores
function verificarImpressora() {
    const modelo = document.getElementById("modelo").value;
    const coresContainer = document.getElementById("coresContainer");

    // Se a impressora for EPSON, exibe as opções de cores
    if (modelo.startsWith("EPSON")) {
        coresContainer.style.display = "block";
    } else {
        // Se for outra impressora, oculta as opções de cores e marca "Preto" automaticamente
        coresContainer.style.display = "none";
    }
}

// Função para processar o envio do formulário
const handleSubmit = (event) => {
    event.preventDefault();

    // Gerando dados do formulário
    const data = new Date().toISOString().split('T')[0]; // Data atual
    const situacao = 'aberto'; // Valor fixo
    const ticket = `TCK${Date.now()}`; // Gerando um ID único para o ticket
    const nome = document.querySelector('input[name=nome]').value;
    const setor = document.querySelector('select[name=setor]').value;
    const email = document.querySelector('input[name=email]').value;
    const modelo = document.querySelector('select[name=modelo]').value;

    // Verifica se a impressora é EPSON e captura as cores selecionadas
    let coresSelecionadas = [];
    if (modelo.startsWith("EPSON")) {
        const checkboxes = document.querySelectorAll('input[name=cor]:checked');
        checkboxes.forEach((checkbox) => {
            coresSelecionadas.push(checkbox.value);
        });
    } else {
        // Se não for EPSON, define apenas a cor preta
        coresSelecionadas.push('preto');
    }

    // Fazendo a requisição para a API
    fetch('https://api.sheetmonkey.io/form/ijTocNfTm7ThxTtL1e7BNN', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ticket,
            data,
            situacao,
            nome,
            setor,
            email,
            modelo,
            cores: coresSelecionadas.join(', ') // Enviando as cores selecionadas como string
        }),
    })
    .then(response => {
        if (response.ok) {
            alert("Chamado aberto com sucesso!");
        } else {
            alert("Houve um problema ao abrir o chamado.");
        }
    })
    .catch(error => {
        console.error("Erro ao abrir o chamado:", error);
        alert("Erro ao abrir o chamado.");
    });
};

// Adicionando o listener de envio ao formulário
document.getElementById('tonner').addEventListener('submit', handleSubmit);
