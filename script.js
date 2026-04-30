const botaoMenu = document.querySelector(".btn-menu");
const menuEscondido = document.querySelector(".menu-lateral");
botaoMenu.addEventListener("click", function() {
    menuEscondido.classList.toggle("ativo");
    botaoMenu.classList.toggle("girar");
});
async function carregarTimes() {
    console.log("Chamando a API...");
    try {
        let response = await fetch("https://api.npoint.io/122595f2649ef97d6c67");
        let timesDaAPI = await response.json();
        console.log("Dados recebidos:", timesDaAPI);
        const tabuleiro = document.getElementById("tabuleiro-copa");
        const primeiraSemi = document.getElementById("vencedor-q1");
        timesDaAPI.forEach(function(time) {
            let novoBotao = document.createElement("button");
            novoBotao.innerText = time.nome;
            novoBotao.dataset.destino = time.destino;
            novoBotao.classList.add("jogo", "quartas");
            tabuleiro.insertBefore(novoBotao, primeiraSemi);
        });
        console.log("Botões criados na tela!");
        ativarMaquinaDeCliques();
    } catch (erro) {
        console.error("Erro ao buscar os times:", erro);
    }
}
function ativarMaquinaDeCliques() {
    const todosOsJogos = document.querySelectorAll(".jogo");
    todosOsJogos.forEach(function(botao) {
        botao.addEventListener("click", function(event) {
            let nomeDoTime = event.target.innerText;
            let idDoDestino = event.target.dataset.destino;
            if (nomeDoTime.trim() === "?" || !idDoDestino) {
                return; 
            }
            let espacoDestino = document.getElementById(idDoDestino);
            if (espacoDestino.innerText.trim() === "?" || espacoDestino.innerText === "A Grande Final") {
                if (espacoDestino.innerText === "A Grande Final") {
                    espacoDestino.innerText = nomeDoTime + " CAMPEÃO! 🏆";
                } else {
                    espacoDestino.innerText = nomeDoTime;
                }
                event.target.classList.add("brilho-vencedor");
            } else {
                console.log("O juiz já apitou o fim desse confronto!");
            }
        });
    });
}
carregarTimes();