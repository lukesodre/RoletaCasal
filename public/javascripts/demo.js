$(function () {
	var imagemPararMeninos = 2
	var imagemPararMeninas = 1

	$('.roulette').find('img').hover(function () {
		console.log($(this).height());
	});

	var imagensMeninos = [];
	var imagensMeninas = [];

	function getRandomArbitrary(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	extrairImagensMeninos = function () {
		imagensMeninos = [];
		var a = $('.rouletteMeninos').find('img')
		for (var i = 0; i < a.length - 1; i++) {
			imagensMeninos.push(a[i].src.substr(7).match('^(([^/]+/)*)(([^/.]+)\..+)')[4])
		}
	}

	extrairImagensMeninas = function () {
		imagensMeninas = [];
		var a = $('.rouletteMeninas').find('img')
		for (var i = 0; i < a.length - 1; i++) {
			imagensMeninas.push(a[i].src.substr(7).match('^(([^/]+/)*)(([^/.]+)\..+)')[4])
		}
	}

	var updateParamaterMeninos = function () {
		imagemPararMeninos = getRandomArbitrary(0, imagensMeninos.length);
		console.log("Imagem escolhida dos meninos:", imagemPararMeninos, imagensMeninos[imagemPararMeninos])
		pMeninos['speed'] = 8
		pMeninos['duration'] = 1
		pMeninos['stopImageNumber'] = imagemPararMeninos
		rouletterMeninos.roulette('option', pMeninos);
	}

	var updateParamaterMeninas = function () {
		imagemPararMeninas = getRandomArbitrary(0, imagensMeninas.length);
		console.log("Imagem escolhida das meninas:", imagemPararMeninas, imagensMeninas[imagemPararMeninas])
		//Se imagem escolhida nos meninos possui uma imagem com um nome igual nas meninas seleciona ela
		var escolhaMeninos = imagensMeninos[imagemPararMeninos];
		var mesmoNome = imagensMeninas.indexOf(escolhaMeninos);
		if (mesmoNome !== -1){
			console.log('Encontradas imagens com o mesmo nome, selecioando',mesmoNome, imagensMeninas[mesmoNome])
			imagemPararMeninas = mesmoNome
		}
		pMeninas['speed'] = 8
		pMeninas['duration'] = 1
		pMeninas['stopImageNumber'] = imagemPararMeninas
		rouletterMeninas.roulette('option', pMeninas);
	}



	var pMeninos = {
		startCallback: function () {
			$('#startMeninos').attr('disabled', 'true');
			extrairImagensMeninos()
			updateParamaterMeninos();
			$('.stop').removeAttr('disabled');
		},
		slowDownCallback: function () {
			$('.stop').attr('disabled', 'true');
		},
		stopCallback: function ($stopElm) {
			$('#startMeninos').removeAttr('disabled');
			$('.stop').attr('disabled', 'true');
		}

	}

	var pMeninas = {
		startCallback: function () {
			$('#startMeninas').attr('disabled', 'true');
			extrairImagensMeninas()
			updateParamaterMeninas();
			$('.stop').removeAttr('disabled');
		},
		slowDownCallback: function () {
			$('.stop').attr('disabled', 'true');
		},
		stopCallback: function ($stopElm) {
			$('#startMeninas').removeAttr('disabled');
			$('.stop').attr('disabled', 'true');
		}

	}
	var rouletterMeninos = $('div.rouletteMeninos');
	rouletterMeninos.roulette(pMeninos);


	var rouletterMeninas = $('div.rouletteMeninas');
	rouletterMeninas.roulette(pMeninas);

	$('.stop').click(function () {
		rouletterMeninos.roulette('stop');
		rouletterMeninas.roulette('stop');
	});
	$('.stop').attr('disabled', 'true');
	$('#startMeninos').click(function () {
		rouletterMeninos.roulette('start');
	});
	$('#startMeninas').click(function () {
		rouletterMeninas.roulette('start');
	});



});

