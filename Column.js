function Column(id, name) { 
	var self = this;
	this.id = id; 
	this.name = name || 'Nie podano nazwy';
	this.element = createColumn();  

	function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="col- col-3 column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ol class="card-list"></ol>');
		var columnDelete = $('<button class="btn-delete">Usuń kolumnę</button>');
		var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');
		
		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.click(function() {
			self.deleteColumn();
		});
		
		columnAddCard.click(function(event) {
				var cardName = prompt("Wpisz nazwę karty");
				event.preventDefault();
				$.ajax({ 
				url: baseUrl + '/card', 
				method: 'POST', 
				data: { 
 					name: cardName, 
 					bootcamp_kanban_column_id: self.id
				}, 
				success: function(response) { 
 					var card = new Card(response.id, cardName, self.id); 
 					self.createCard(card); 
				} 
			});
		});
			
			// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append(columnTitle)
			.append(columnDelete)
			.append(columnAddCard)
			.append(columnCardList);
			return column;
	}
}

Column.prototype = {
	createCard: function(card) {
	  	this.element.children('ol').append(card.element);
	},
	deleteColumn: function() {
 		var self = this; 
 		$.ajax({ 
 			url: baseUrl + '/column/' + self.id, 
 			method: 'DELETE', 
 			success: function(response){ 
 					self.element.remove(); 
 				} 
 			});
	}
};