module catchDoll {
	export class TransmitDoor extends SceneInteractiveObject {
		public constructor() {
			super();
		}

		public initialize(): void {
			super.initialize();
			let mov = this._moviePlayer.getMovieClipByKey("idle")
			mov.play(-1)
			mov.visible = true;
		}
	}
}