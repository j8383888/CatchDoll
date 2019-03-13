module catchDoll {
	export class Grass extends SceneInteractiveObject {
		public constructor() {
			super();
		}

		public initialize(): void {
			super.initialize();
			this.isMonsterHitOpen = true;
			this._dragonBones.animation.play(this.actionNameAry[0], 0);
		}

	}
}