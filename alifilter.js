document.addEventListener('DOMContentLoaded', function() {

	var filterButton = document.getElementById('filter');
	filterButton.addEventListener('click', function() {
		var minrating = document.getElementById('numberInput').value;
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.executeScript(tabs[0].id,{code: `
				var interval = setInterval(function(){
					var minrating = ` + minrating + `
					var ratings = document.getElementsByTagName('span');
					var badratings = Array.prototype.filter.call(ratings, function(rating){
						return /^([1-4]\.[0-9])$/.test(rating.innerHTML) && rating.innerHTML < minrating;
					});
					for(var i = 0; i < badratings.length; i++){
						var j = 2;
						var el = badratings[i].parentElement;
						while(j-- > 0){
							el = el.parentElement;
						}
						el.style.display = 'none';
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