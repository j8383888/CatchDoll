/**
 * 游戏物体渲染对象
 * @author suo
 */
module catchDoll {
    export class GameObjectRender extends GameObject {

        /**
         * 渲染对象
         */
        protected _imagePlayer: ImagePlayer = null;
		/**
         * 渲染对象
         */
        protected _moviePlayer: MoviePlayer = null;
        /**
         * 龙骨
         */
        protected _dragonBones: dragonBones.EgretArmatureDisplay = null;

        public constructor() {
            super();
        }

        public get imagePlayer(): ImagePlayer {
            return this._imagePlayer;
        }

		/**
         * 加载资源
         */
        public loadConfigAsset(assetData: IConfigAsset): void {
            let imageAry: IImagePlayer[] = assetData.imageAry;
            if (imageAry && imageAry.length) {
                this._imagePlayer = new ImagePlayer();
                for (let i: number = 0; i < imageAry.length; i++) {
                    this._imagePlayer.push(imageAry[i])
                }
                this.addChild(this._imagePlayer)
            }
            let movieClipAry: IMoviePlayer[] = assetData.movieClipAry;
            if (movieClipAry && movieClipAry.length) {
                this._moviePlayer = new MoviePlayer()
                for (let i: number = 0; i < movieClipAry.length; i++) {
                    this._moviePlayer.push(movieClipAry[i])
                }
                this.addChild(this._moviePlayer)
            }
            if (assetData.dragonBonesName) {
                this._dragonBones = UIUtil.creatDragonbones(assetData.dragonBonesName)
                this.addChild(this._dragonBones);
            }
        }

        /**
         * 加载配置
         */
        public loadConfigData(initOnce: IConfigData): void {
        }

        /**
          * 只初始化一次（在loadConfig之后调用）
          */
        public initOther(): void {

        }

		/**
         * 初始化
         */
        public initialize(): void {
            if (this.varsData) {
                if (this.varsData.bornX) {
                    this.x = this.varsData.bornX;
                }
                else {
                    this.x = -1000;
                }
                if (this.varsData.bornY) {
                    this.y = this.varsData.bornY;
                }
                else {
                    this.y = -1000;
                }
                if (this.varsData.rotation) {
                    this.rotation = this.varsData.rotation;
                }
            }
            LayerManager.instance.addToLayer(this, this.layerType);
        }

        /**
         * 反初始化
         */
        public uninitialize(): void {
            if (this._moviePlayer) {
                this._moviePlayer.stop();
            }
            if (this._dragonBones) {
                this._dragonBones.animation.stop();
            }
            LayerManager.instance.removeFromLayer(this);
        }

        /**
         * 释放
         */
        public dispose(): void {
            if (this._moviePlayer) {
                this._moviePlayer.dispose();
                this._moviePlayer = null;
            }
            if (this._imagePlayer) {
                this._imagePlayer.dispose();
                this._imagePlayer = null;
            }
            if (this._dragonBones) {
                this._dragonBones.dispose();
                this._dragonBones = null;
            }
            super.dispose();
        }
    }
}