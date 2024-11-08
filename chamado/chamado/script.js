document.addEventListener('DOMContentLoaded', () => {
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new Date().toISOString().split('T')[0]; // Adicionando a data atual
        const situacao = 'aberto'; // Valor fixo
        const ticket = `TCK${Date.now()}`; // Gerando um ID único para o ticket
        const nome = document.querySelector('input[name=nome]').value;
        const email = document.querySelector('input[name=email]').value;
        const setor = document.querySelector('select[name=setor]').value;
        const assunto = document.querySelector('input[name=assunto]').value;
        const descricao = document.querySelector('textarea[name=descricao]').value;
      

        fetch('https://api.sheetmonkey.io/form/iK47v68dCT7kBhk5iv4nNA', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome,
                email,
                setor,
                assunto,
                descricao,
                data,
                situacao,
                ticket
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
    }

    document.getElementById('chamado').addEventListener('submit', handleSubmit);
});

