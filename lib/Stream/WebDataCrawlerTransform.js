'use strict'

const through2 = require('through2')
	, cheerio = require('cheerio');

var WebDataCrawlerTranform = through2.obj(function(data, encoding, callback) {
	
	var $ = cheerio.load(data.webData);
	
	$('.div_avisos_fiestas').each(function() {
		var $contenido_aviso = $(".contenido_aviso .contenido_aviso_texto", this);
		
		var salonData = {
			barrio: data.name,
			nombre: $('.titulo_aviso h4 a', this).text(),
			telefono: $contenido_aviso.find("span.subtitulo:contains('Teléfono')").text(),
			direccion: $contenido_aviso.find("span.subtitulo:contains('Dirección')").text(),
			email: $contenido_aviso.find("span.subtitulo:contains('E-mail')").text(),
		};
		console.log(salonData);
	});

});

module.exports = WebDataCrawlerTranform;
