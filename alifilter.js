document.addEventListener('DOMContentLoaded', function() {

	var filterButton = document.getElementById('filter');
	filterButton.addEventListener('click', function() {
		var minrating = document.getElementById('rangeInput').value;
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.scripting.executeScript({
				target: {tabId: tabs[0].id},
				func: filter,
				args : [ minrating ],
			});
		});

		
	}, false);
	
	var rangeInput = document.getElementById('rangeInput');
	rangeInput.onchange = function() {
		updateNumberInput(4 + 0.1*document.getElementById('rangeInput').value);
	};
}, false);

function filter(minrating) {
	var interval = setInterval(function(){
		var ratings = document.getElementsByTagName('div');
		var badratings = Array.prototype.filter.call(ratings, function(rating){
			return rating.className.includes('multi--progress') && (parseFloat(rating.style.width) < minrating);
		});
		for(var i = 0; i < badratings.length; i++){
			var j = 7;
			var el = badratings[i].parentElement;
			while(j-- > 0){
				el = el.parentElement;
			}
			el.style.display = 'none';
		}
	}, 300);
}

function updateNumberInput(val) {
  document.getElementById('numberInput').value=val;
}