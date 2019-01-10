/**
 * 选择视图管理器
 * @author suo
 */
module catchDoll {
	export class WorldMapManager extends BaseUIManager {
		public constructor() {
			super();
			this.addControl(WorldMapControl);
			this.addView(WorldMapView);
		}
	}
}