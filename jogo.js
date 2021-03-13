var altura = 0
var largura = 0
var vidas = 1
var tempo = 15	//Tempo necessário para vencer o jogo

var criaZombieTempo = 1500

//Recebe o nível escolhido e muda o tempo de aparição(spawn)
var nivel = window.location.search
nivel = nivel.replace('?', '')

if (nivel === 'normal') {
	var criaZombieTempo = 1500
} else if (nivel === 'dificil') {
	var criaZombieTempo = 1000
} else if (nivel === 'impossivel') {
	var criaZombieTempo = 750
}

// Identifica o tamanho da tela do usuário para gerar os zombies
function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight
	largura = window.innerWidth
}
ajustaTamanhoPalcoJogo()

//Função do cronometro e Controlador de vitória
var cronometro = setInterval(function () {
	tempo -= 1
	if (tempo < 0) {
		clearInterval(cronometro)
		clearInterval(criaZombie)
		window.location.href = 'vitoria.html'
	} else {
		document.getElementById('cronometro').innerHTML = tempo
	}
}, 1000)


//---- Função principal: gera os zombies em lugares aleatórios -----
function posicaoRandomica() {
	if (document.getElementById('zombie')) {
		//Remove o zombie anterior Caso exista(Usuário não clicou)
		document.getElementById('zombie').remove()

		//Controlador das vidas e Redirecionamento --> game over
		if (vidas > 3) {
			window.location.href = 'fim_de_jogo.html'
		} else {
			document.getElementById('v' + vidas).src = "../imagens/coracao_vazio.png"
			vidas++
		}
	}

	//Gera a posição aleatória X e Y com base na tela do usuário
	var posicaoX = Math.floor(Math.random() * largura) - 90
	var posicaoY = Math.floor(Math.random() * altura) - 90

	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	//Cria o elemento html
	var zombie = document.createElement('img')
	zombie.src = '../imagens/zomb.png'
	zombie.className = tamanhoAleatorio() + ' ' + ladoAleatorio()

	//Especifica a posição do zombie
	zombie.style.left = posicaoX + 'px'
	zombie.style.top = posicaoY + 'px'
	zombie.style.position = 'absolute'
	zombie.id = 'zombie'

	//Remove o elemento HTML se o usuário clicar nele
	zombie.onclick = function () {
		this.remove()
	}
	//Insere no body o elemento criado
	document.body.appendChild(zombie)
	//-Remover- ladoAleatorio()
}

// ------- Funções Auxiliares para criação do elemento HTML ------
function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3)
	switch (classe) {
		case 0:
			return 'tamanho1'
		case 1:
			return 'tamanho2'
		case 2:
			return 'tamanho3'
	}
}
function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2)
	switch (classe) {
		case 0:
			return 'ladoA'
		case 1:
			return 'ladoB'
	}
}