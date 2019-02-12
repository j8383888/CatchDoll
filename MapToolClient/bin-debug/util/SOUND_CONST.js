var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var catchDoll;
(function (catchDoll) {
    var SOUND_CONST = (function () {
        function SOUND_CONST() {
        }
        /*背景音效*/
        SOUND_CONST.BGM_SOUND = "bgm_FishingJoy_mp3";
        /*下注金额按钮音效*/
        SOUND_CONST.BET_LEVEL_CLICK = "chips_FishingJoy_mp3";
        /*点击按钮声音*/
        SOUND_CONST.COMMON_BTN_CLICK = "btn_FishingJoy_mp3";
        /*倒计时声音*/
        SOUND_CONST.COUNTDOWN = "countdown_FishingJoy_mp3";
        /*下注声音组*/
        SOUND_CONST.BET_SOUND_ARY = ["sgj_bt1_FishingJoy_mp3", "sgj_bt2_FishingJoy_mp3", "sgj_bt3_FishingJoy_mp3", "sgj_bt4_FishingJoy_mp3",
            "sgj_bt5_FishingJoy_mp3", "sgj_bt6_FishingJoy_mp3", "sgj_bt7_FishingJoy_mp3", "sgj_bt8_FishingJoy_mp3"];
        /*开始选转*/
        SOUND_CONST.ROTATION_START = "sgj_start_FishingJoy_mp3";
        /*持续旋转*/
        SOUND_CONST.ROTATION_LOOP = "sgj_loop_FishingJoy_mp3";
        /*持续旋转长*/
        SOUND_CONST.ROTATION_LOOP_lOOG = "sgj_loop_long_FishingJoy_mp3";
        /*旋转结束*/
        SOUND_CONST.ROTATION_END = "sgj_end_FishingJoy_mp3";
        /*闪烁*/
        SOUND_CONST.TWINKLE_SOUND = "twinkle_FishingJoy_mp3";
        /*反向旋转声音*/
        SOUND_CONST.REVERSE_ROTATION = "sjg_xh_FishingJoy_mp3";
        /*小胜*/
        SOUND_CONST.SMALL_WIN = "win_FishingJoy_mp3";
        /*关闭*/
        SOUND_CONST.CLOSE = "close_FishingJoy_mp3";
        /*点击*/
        SOUND_CONST.CLICK = "click_qingcui_FishingJoy_mp3";
        /*大四喜*/
        SOUND_CONST.BIG_FOUR = "sgj_dsx_FishingJoy_mp3";
        /*大三元*/
        SOUND_CONST.BIG_THREE = "sgj_dsy_FishingJoy_mp3";
        /*小三元*/
        SOUND_CONST.SMALL_THREE = "sgj_xsy_FishingJoy_mp3";
        return SOUND_CONST;
    }());
    catchDoll.SOUND_CONST = SOUND_CONST;
    __reflect(SOUND_CONST.prototype, "catchDoll.SOUND_CONST");
})(catchDoll || (catchDoll = {}));
//# sourceMappingURL=SOUND_CONST.js.map