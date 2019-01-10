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
    MONSTER_1 = 1,
    MONSTER_2 = 2,
    MONSTER_3 = 3,
    MONSTER_ROBOT = 4,
    MONSTER_ROBOT_2 = 5,
    MONSTER_Cactus = 6,
    /**
     * 夹子
     */
    PAWS = 101,
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