function game(data){
	var self = this;
	self.data = data.words;
	self.render = function(){
		//select a subject for the question
		var subject = getRand(0, self.data.length);
		//select options
		var options = getOptions(self.data, subject);
		//Generate an h2 for the subject
		$("body").append(genEl("h2", self.data[subject].word));
		//generate an h3 for each option
		for(var i = 0; i < options.length; i++){
			var option = options[i];
			console.log(options);
			$("body").append(genEl("h2", self.data[option].translation));
		}
		//Establish click behavior
		$(document).on("click", "h3", function(){
			if($(this).text() == self.data[subject].translation){
				console.log("CORRECT");
				$(this).css("color", "#ffafaf");
				$("h2").css("color", "#afffaf");
			}else{
				$(this).css("color", "#ffafaf");
				$("h2").css("color", "#ffafafk");
			}
		})
	}





	function getOptions(data, exclude){
		var data = data;
		var options = [exclude];
		while(options.length<4){
			var attempt = getRand(0, data.length);
			if(!inArray(attempt, options)){
				options.push(attempt);
			}
		}

		return shuffleArray(options)
	}

	function inArray(attempt, options){
		var bool = false;
		for(var i = 0; i < options.length; i++){
			if(attempt == options[i]){
				bool = true;
			}
		}
		return bool
	}

	function shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	}

	function getRand(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}

	function genEl(name, text){
		//create
		var el = $("<" + name + ">");

		el.text(text);

		return el
	}
}
