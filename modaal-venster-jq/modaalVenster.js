var modaalVenObj = (function() {
	var $window = $(window);
	var $modaalVenster = $('<div class="modaal-venster"/>');
	var $modaalInhoud = $('<div class="modaal-inhoud"/>');
	var $sluitKnop = $('<span class="sluit-knop">&#10005;</span>');

	$modaalVenster.append($modaalInhoud);

	return {
		centeren: function() {
			//opdrachten centeren
			var links = Math.max($window.width()-$modaalInhoud.outerWidth(), 0) / 2;
			var boven = Math.max($window.height()-$modaalInhoud.outerHeight(), 0) / 2;
			$modaalInhoud.css({left:links, top:boven});
		},
		openen: function(instellingen) {
			$modaalInhoud.append(instellingen.inhoud, $sluitKnop);
			$modaalInhoud.css({width: instellingen.breedte+'px' || 'auto',
							   height: instellingen.hoogte+'px' || 'auto'})
				.on('click', function(e) {
					e.stopPropagation();

				});

			$modaalVenster.appendTo('body');
			modaalVenObj.centeren();
			$sluitKnop.on('click', modaalVenObj.sluit);
			$window.on('resize', modaalVenObj.centeren);
		},
		sluit: function(){
			//opdrachten sluiten
			$modaalInhoud.empty();
			$modaalVenster.detach();
			$window.off('resize', modaalVenObj.centeren);
		}
	};
	// body...
})();