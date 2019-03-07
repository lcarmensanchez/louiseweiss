import { Config } from "./Config";
import { Preload } from "./Preload";
import { Boot } from "./Boot";
import { Menu } from "./Menu";
import { Pacman } from "./PacmanScene";
import { CarGame } from "./CarScene";
import { GameOverScene } from "./GameOverScene";

export class App {

	GameRef: Phaser.Game;
	Scenes: Array<Phaser.Scene>;

	constructor() {
		this.Scenes = new Array<Phaser.Scene>();
		this.Scenes.push(new Boot());
		this.Scenes.push(new Preload);
		this.Scenes.push(new Menu());
		this.Scenes.push(new Pacman());
		this.Scenes.push(new CarGame());
		this.Scenes.push(new GameOverScene());

		Config.Phaser.scene = this.Scenes;

		if (Config.Game.debugMode) {
			Config.Phaser.url = 'http://localhost:8080/';
		}

		this.GameRef = new Phaser.Game(Config.Phaser);
	}
}

function resizeApp()
{
	// Width-height-ratio of game resolution
	let game_ratio = 360.0 / 640.0;
	
	// Make div full height of browser and keep the ratio of game resolution
	let div = document.getElementById('phaser-app');
	div.style.width = (window.innerHeight * game_ratio) + 'px';
	div.style.height = window.innerHeight + 'px';
	
	// Check if device DPI messes up the width-height-ratio
	let canvas = document.getElementsByTagName('canvas')[0];
	
	let dpi_w = (parseInt(div.style.width) / canvas.width);
	let dpi_h = (parseInt(div.style.height) / canvas.height);		
	
	let height = window.innerHeight * (dpi_w / dpi_h);
	let width = height * game_ratio;
	
	canvas.style.width = width + 'px';
	canvas.style.height = height + 'px';
}

export function start() {
	console.log("here")
	let game = new App();
	resizeApp();
	// window.onload = () => {
	// 	console.log("here2")
	// 	let game = new LouiseWeiss.App();
	// 	resizeApp();

	// // LouiseWeiss.InitPhaser.initGame();
	// };
	window.addEventListener('resize', resizeApp);
}
