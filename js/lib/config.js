
require.config({
	baseUrl: "js/lib",
	waitSeconds: 0,
	paths: {
		jquery: 'jquery.1.8',
		init:'super',
		fps:'fps',
		conso:'console',
		play:'play',
		fps:'fps',
		html2canvas:'html2canvas.min'
	},
	shim: {
		conso:{ 
			exports:'conso'
		}
	}
});