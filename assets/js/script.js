   document.addEventListener('DOMContentLoaded', ()=>{
            const iniciarBtn = document.querySelector('#iniciar');
            const sairBtn = document.querySelector('#sair');
            const fundoGeral = document.querySelector('.fundo-geral');

            iniciarBtn.addEventListener('click', ()=>{
                fundoGeral.style.opacity = '0';
                setTimeout(()=>{
                    fundoGeral.style.display = 'none';
                    iniciarJogo()
                }, 500);
            });
            sairBtn.addEventListener('click', ()=>{
                window.close()
            });
        })

function iniciarJogo(){
let odin = {
    visivel: {
        caixas: document.querySelectorAll('.quadrado'),
        odin: document.querySelector('.odin'),
        tempoGeral: document.querySelector('#tempo-geral'),
        pontuacaoGeral: document.querySelector('#pontuacao-geral'),
    },
    valor:{
        tempoId: null,
        tempoCronometroId: 0, 
        posicaoOdin: 0,
        resultado:0,
        cronometro:30,
    },
    acao:{
        velocidadeOdin: 400,
        diminuirTempo: 1000,
    }
}
const movimentoOdin = function(){
    odin.valor.tempoId = setInterval(quadradoAleatorio, odin.acao.velocidadeOdin);
}
const intervaloTempo = function(){
    odin.valor.tempoCronometroId = setInterval(cronometroMenor, odin.acao.diminuirTempo);
}
function cronometroMenor(){
    odin.valor.cronometro--
    odin.visivel.tempoGeral.textContent = odin.valor.cronometro

    if(odin.valor.cronometro < 1){
        clearInterval(odin.valor.tempoId);
        clearInterval(odin.valor.tempoCronometroId);
        window.alert(`Fim da Caçada! Você conseguiu ${odin.valor.resultado} pontos`);

        odin.valor.cronometro = 30;
        odin.valor.resultado = 0;
        odin.visivel.tempoGeral.textContent = odin.valor.cronometro;
        odin.visivel.pontuacaoGeral.textContent = odin.valor.resultado;

        initialize();
    }
}
function quadradoAleatorio(){
    odin.visivel.caixas.forEach((quadrado)=>{
        quadrado.classList.remove('odin');
    })

    let numeroAleatorio = Math.floor(Math.random() *9);
    let quadradoAle = odin.visivel.caixas[numeroAleatorio]
    quadradoAle.classList.add('odin');
    odin.valor.posicaoOdin = quadradoAle.id
}


function addListenerHitBox(){
    odin.visivel.caixas.forEach((quadrado)=>{
        quadrado.addEventListener('click', ()=>{
            if(quadrado.id === odin.valor.posicaoOdin){
                odin.valor.resultado++
                odin.visivel.pontuacaoGeral.textContent = odin.valor.resultado;
                odin.visivel.posicaoOdin = null;
                tocarSom('hit')
            }
        });
    })
}

function tocarSom(nomeAudio){
    let audio = new Audio(`./assets/audios/${nomeAudio}.m4a`);
    audio.volume = 0.1;
    audio.play();
}
function initialize(){
        quadradoAleatorio();
        movimentoOdin();
        addListenerHitBox();
        intervaloTempo();
}

initialize()
}