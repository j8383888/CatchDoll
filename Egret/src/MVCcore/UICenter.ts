/**
 * 原作者 momo
 * @author suo 
 */
class UICenter extends BaseUICenter {

    private static _instance: UICenter = null;
    constructor() {
        super();

        this.addManager(commonUI.BattleScene, catchDoll.BattleSceneManager);
        this.addManager(commonUI.WorldMap, catchDoll.WorldMapManager);
        this.addManager(commonUI.TurnTable, catchDoll.TurntableManager);
        this.addManager(commonUI.StartScene, catchDoll.StartSceneManager);
        this.addManager(commonUI.RegisterPanel, catchDoll.RegisterPanelManager);
        this.addManager(commonUI.FunctionUI, catchDoll.FunctionUIManager);
        this.addManager(commonUI.SetUpPanel, catchDoll.SetUpPanelManager);
        
    }

    public static get instance(): UICenter {
        if (this._instance == null) {
            this._instance = new UICenter();
        }
        return this._instance;
    }


}

const enum commonUI {
    /*抓娃娃战斗场景*/
    BattleScene,
    /*选择关卡场景*/
    WorldMap,
    /*转盘*/
    TurnTable,
    /*开始界面*/
    StartScene,
    /*签到面板*/
    RegisterPanel,
    /*功能UI*/
    FunctionUI,
    /*设置*/
    SetUpPanel,
}

