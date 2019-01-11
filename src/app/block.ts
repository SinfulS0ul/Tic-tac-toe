export class Block {
	free = true;

	value = '';
	symbol = '';


	setValue(value) {
		this.value = value;

		if (this.value === 'tick') {
			this.symbol = 'done';
		} else {
			this.symbol = 'close';
		}
	}
}
