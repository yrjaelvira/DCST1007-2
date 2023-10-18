class MyDate extends Date {
	constructor() {
		super();
	}

	visDato() {
		let mnd = ['jan', 'feb', 'mar', 'apr', 'mai', 
						'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'];
		return this.getDate() + "." + mnd[this.getMonth()] + this.getFullYear();
	}
}