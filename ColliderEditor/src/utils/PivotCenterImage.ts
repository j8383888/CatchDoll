/**
 * 中心点在中间的Image
 * @author suo
 */
class PivotCenterImage extends eui.Image {
	public constructor(source?: string) {
		super(source);
	}

	protected createChildren(): void {
		super.createChildren();
		this.anchorOffsetX = this.width / 2;
		this.anchorOffsetY = this.height / 2;
	}
}