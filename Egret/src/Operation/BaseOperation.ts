/**
 * 操作控制器基类
 * @author suo
 */
module catchDoll {
    export abstract class BaseOperation {

        /**
         * 操作类型
         */
        public operationType: OPERATION_TYPE;

        public constructor() {

        }
        /**
         * 注册
         */
        public abstract register(gameObj: catchDoll.GameObject): void

        /**
         * 反注册
         */
        public abstract unregister(): void

        /**
         * 帧循环
         */
        public enterFrame(): void {

        }

    }
}