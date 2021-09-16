document.addEventListener('DOMContentLoaded', function() {

	var filterButton = document.getElementById('filter');
	filterButton.addEventListener('click', function() {
		var minrating = document.getElementById('numberInput').value;
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.executeScript(tabs[0].id,{code: `
				var interval = setInterval(function(){
					var minrating = ` + minrating + `
					var ratings = document.getElementsByClassName('_1hEhM');
					var badratings = Array.prototype.filter.call(ratings, function(rating){
						return rating.innerHTML < minrating;
					});
					for(var i = 0; i < badratings.length; i++){
						var j = 10;
						var el = badratings[i].parentElement;
						while(el.className != '_1OUGS'){
							el = el.parentElement;
							j--;
							if(j == 0) break;
						}
						if(j != 0) el.style.display = 'none'; // depending on what you're doing
					}
				}, 300);
			`});
		});

		
	}, false);
	
	var rangeInput = document.getElementById('rangeInput');
	rangeInput.onchange = function() {
		updateNumberInput(4 + 0.1*document.getElementById('rangeInput').value);
	};
}, false);

function updateNumberInput(val) {
  document.getElementById('numberInput').value=val;
}