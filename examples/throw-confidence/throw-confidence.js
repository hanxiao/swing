document.addEventListener('DOMContentLoaded', addCard);

function addCard() {
	var stack = gajus.Swing.Stack(),
	cardElement = document.querySelector('.stack li'),
	throwOutConfidenceBind = document.querySelector('#throw-out-confidence-bind'),
	directionBind = document.querySelector('#direction-bind'),
	throwOutConfidenceElements = {},
	throwOutConfidence = 0;
	
	window.card = stack.createCard(cardElement);

	stack.on('dragstart', function (e) {
		throwOutConfidenceElements.yes = e.target.querySelector('.yes').style;
		throwOutConfidenceElements.no = e.target.querySelector('.no').style;
	});

	stack.on('dragmove', function (e) {
		throwOutConfidenceElements[e.throwDirection == gajus.Swing.Card.DIRECTION_RIGHT ? 'yes' : 'no'].opacity = e.throwOutConfidence * 0.5;
		throwOutConfidence =  e.throwOutConfidence;
		throwOutConfidenceBind.innerHTML = e.throwOutConfidence.toFixed(3);
		directionBind.innerHTML = e.throwDirection == gajus.Swing.Card.DIRECTION_RIGHT ? 'right' : 'left';
	});

	stack.on('dragend', function (e) {
		if (throwOutConfidence != 1) {
			throwOutConfidenceElements.yes.opacity = 0;
			throwOutConfidenceElements.no.opacity = 0;
		} else {
			window.card.destroy()
		}
	});
}