/**
 * 游戏对象枚举
 * @author suo
 */
module catchDoll {

}

/**
 * 物体对象标志（一般将相同资源的对象 命名同一个sign）
 */
const enum GAMEOBJECT_SIGN {

    /**
     * 夹子
     */
    PAWS = 10001,
    /**
     * 随机箱子
     */
    RAMDOM_BOX = 1001,
    /**
     * 麻痹陷阱
     */
    PARALYTIC_TRAP = 1002,
    /**
     * 草丛
     */
    GRASS = 1003,
    /**
     * 蘑菇
     */
    Mushroom = 1004,
}
/**
 * 操作类型
 */
const enum OPERATION_TYPE {
    MASTER,
    MONSTER,
}

/**
 * 队伍
 */
const enum TEAM {
    MASTER,
    ENEMY,
    FRIEND
}


/**
 * 方向
 */
const enum FISH_DIRECTION {
    UP_TO_DOWN,
    DOWN_TO_UP,
    LEFT_TO_RIGHT,
    RIGHT_TO_LEFT,
    NO,
}

/**
 * 场景id
 */
const enum SCENEID {
    /**
     * 沉船
     */
    ChenChuan = 1,
    /**
     * 碎石
     */
    SuiShi = 2,
    /**
     * 遗迹
     */
    YiJi = 3,
    /**
     * 浅滩
     */
    QianTan = 4,
    /**
     * 海底宝藏
     */
    HaiDiBaoZang = 100029,
    /**
     * 海底宫殿
     */
    HaiDiGongDian = 100030,
}