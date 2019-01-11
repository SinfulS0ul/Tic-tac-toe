import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameService } from '../game.service';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss'],
	providers: [GameService]
})
export class GameComponent {
	lock = false;
	constructor(public gs: GameService, public snackBar: MatSnackBar) {
	}
	newGame() {
		this.gs.freeBlocksRemaining = 9;
		this.gs.initBlocks();
		this.lock = false;
		this.gs.turn = 0;
	}

	resetGame() {
		this.newGame();
		this.gs.players[0].score = this.gs.players[1].score = 0;
		this.gs.draw = 0;
	}

	playerClick(i) {
		if (this.gs.blocks[i].free === false || this.lock === true) {
			return;
		}

		this.gs.freeBlocksRemaining -= 1;
		if (this.gs.freeBlocksRemaining <= 0) {
			this.gs.draw += 1;
			this.lock = true;
			this.snackBar.open('That\'s draw i think', ':)', {
				duration: 4000,
			});
			this.newGame();
			return;
		}

		this.gs.blocks[i].free = false;

		if (this.gs.turn === 0) {
			this.gs.blocks[i].setValue('tick');
		} else {
			this.gs.blocks[i].setValue('cross');
		}

		const complete = this.gs.blockSetComplete();

		if (complete === false) {
			this.changeTurn();
			return;
		} else {
			this.lock = true;
			this.gs.players[this.gs.turn].score += 1;
			if (this.gs.turn === 0) {
				this.snackBar.open('Cool!', ':O', {
					duration: 4000,
				});
			} else if (this.gs.turn === 1) {
				this.snackBar.open('Perhaps we\'ll have better luck next time', 'C:', {
					duration: 4000,
				});
			}
			this.newGame();
			return;
		}
	}

	botTurn() {

		if (this.gs.freeBlocksRemaining <= 0) {
			return;
		}

		const bot_selected = this.gs.figureBotMove() - 1;

		if (this.gs.blocks[bot_selected].free === true) {
			this.playerClick(bot_selected);
		} else {
			this.botTurn();
			return;
		}
	}

	changeTurn() {
		const player = this.gs.changeTurn();

		if (player === 1) {
			this.botTurn();
		}
	}
}
