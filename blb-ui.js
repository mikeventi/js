window.addEvent('domready',function(){
	/*
		Globals
	*/
	var homeTeam; // javascript object  {abbr: 'NYY',city: 'New York',team: 'Yankees'}
	var awayTeam; // javascript object
	var predictionTypes = [
		'Single',
		'INODFSF',
		'Triple',
		'Strikeout-Looking',
		'Strikeout-Swinging',
		'Hit By Pitch',
		'Walk',
		'Home-Run'];
	
	var setLineup = function (obj) {
		/*
			obj {
			team: 'away',
			players: [
				{spot: 1, pos: 'SS', last: 'Jeter', first: 'Derek'},
				{spot: 2, pos: 'RF', last: 'Swisher', first: 'Nick'}
				]
			}
		*/
		var parent = document.id(obj.team+'-team').getFirst('div.line-up');
		obj.players.each(function(player){
			playerul = parent.getFirst('#batter-'+player.spot).getChildren();
			playerul[0].set('html',player.spot);
			playerul[1].set('html',player.first+' '+player.last);
			playerul[2].set('html',player.pos);
		});
	};
	var newBatter = function (obj) {
		var parent = document.id(obj.team+'-team').getFirst('div.current-batter').getChildren();
		parent[0].set('html','test');
		parent[1].set('html','road');
	};
	/*
		Toggles prediction checkbox/radio item
	*/
	var toggleCheck = function (item) {
		if (item.hasClass('unchecked')==true){
			item.removeClass('unchecked');
			item.addClass('checked');
		} else {
			item.removeClass('checked');
			item.addClass('unchecked');			
		}
	};
	var lockPrediction = function () {

	};
	/*
		Updates bar above field with current count.
		Expects integers
	*/
	var updateCount = function (balls, strikes, outs) {
		var ballsEl 		= document.id('gamebar-count-balls').getChildren('li.gamebar-count');
		var strikesEl 		= document.id('gamebar-count-strikes').getChildren('li.gamebar-count');
		var outsEl			= document.id('gamebar-count-outs').getChildren('li.gamebar-count');
		
		ballsEl.setProperties({
			'class':'gamebar-count ball-'+balls
		});
		strikesEl.setProperties({
			'class':'gamebar-count strike-'+strikes
		});
		outsEl.setProperties({
			'class':'gamebar-count out-'+outs
		});
	};
	/*
		Creates a prediction element that can be selected
	*/
	var createPredictionType = function (label) {
		var predictionEls	= document.id('predictions').getChildren('dl');
		var newDt 	= new Element('dt');
		var inputEl = new Element('p',{
			id: label,
			'class':'blb-checkbox unchecked',
			html: '&nbsp;',
			events: {
				click: function() {
					toggleCheck(this);
					lockPrediction();
					document.id('notification').set('tween',{duration:'long'});
					document.id('notification').tween('opacity','0','1');
					document.id('notification').tween('opacity','1','0');
				}
			}
		});
		var newDd 	= new Element('dd',{
			html: label
		});
		inputEl.inject(newDt);
		if (predictionEls[0].getChildren('dd').length < 7) {
			newDt.inject(predictionEls[0]);
			newDd.inject(predictionEls[0]);
		} else {
			newDt.inject(predictionEls[1]);
			newDd.inject(predictionEls[1]);			
		}
	};
	predictionTypes.each(function(item,index){
		createPredictionType(item);
	});
	newBatter();
});