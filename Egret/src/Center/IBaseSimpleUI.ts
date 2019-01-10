/**
 * 简易UI接口
 * @author suo
 */
interface IBaseSimpleUI {
	/**
	 * 打开参数
	 */
	openParam?:any

	onInit(): void;
	onShow(): void;
	onHide(): void;
	dispose(): void;
}