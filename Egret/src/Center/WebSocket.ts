module catchDoll {
	export class WebSocket {

		/*单例*/
		private static _instance: WebSocket = null;
		/*socket*/
		private _webSocket: egret.WebSocket = new egret.WebSocket();
		/**
		 * 写入字节数组
		 */
		private _writeByteAry: egret.ByteArray = new egret.ByteArray();

		/**
		 * 读取字节数组
		 */
		private _readByteAry: egret.ByteArray = new egret.ByteArray();

		private _protoRoot = new protobuf.Root();
		/**
		 * 当前检测次数
		 */
		private _curHeartCount: number = 0;
		/**
		 * 最大检测次数
		 **/
		private readonly MAX_COUNT: number = 3;
		/**
		 * 转圈菊花
		 */
		public loadingCircle: egret.MovieClip;
		/**
		 * 黑色底板
		 */
		private _blakBG: egret.Shape = new egret.Shape();




		public constructor() {
			this._init();


			this._blakBG.graphics.beginFill(0x000000, 0.6);
			this._blakBG.graphics.drawRect(0, 0, GameCenter.stageW, GameCenter.stageH);
			this._blakBG.graphics.endFill();
			this._blakBG.touchEnabled = true;
			this._blakBG.visible = false;
			LayerManager.instance.addToLayer(this._blakBG, LAYER.LOADING);


			this.loadingCircle = UIUtil.creatMovieClip("loading_1")
			this.loadingCircle.x = GameCenter.stageW / 2;
			this.loadingCircle.y = GameCenter.stageH / 2;
			this.loadingCircle.scaleX = this.loadingCircle.scaleY = 2
			this.loadingCircle.visible = false;
			LayerManager.instance.addToLayer(this.loadingCircle, LAYER.LOADING);
		}

		/**
		 * 显示loading
		 */
		private _showLoading(isShow: boolean): void {
			if (isShow) {
				this.loadingCircle.gotoAndPlay(1, -1);
				this.loadingCircle.visible = true;
				this._blakBG.visible = true;
			}
			else {
				this.loadingCircle.stop();
				this.loadingCircle.visible = false;
				this._blakBG.visible = false;

			}
		}


		/**
		 * 获得单例
		 */
		public static get instance(): WebSocket {
			if (this._instance == null) {
				this._instance = new WebSocket();
			}
			return this._instance;
		}

		/**
		 * 初始化
		 */
		private _init(): void {

			ProtoExtendtion.init();
			this._webSocket.type = egret.WebSocket.TYPE_BINARY;
			this._webSocket.addEventListener(egret.Event.CONNECT, this._onSocketOpen, this)
			this._webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this._onReceiveMessage, this);
			this._webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this._onSocketError, this);
			this._webSocket.addEventListener(egret.Event.CLOSE, this._onSocketClose, this);
			this._writeByteAry.endian = egret.EndianConst.BIG_ENDIAN.toString();
			protobuf.parse(RES.getRes("common_proto"), this._protoRoot);
			this._webSocket.connectByUrl("wss://suozgame.com:8001");
			// this._webSocket.connectByUrl("ws://127.0.0.1:8001");
		}

		/**
		 * 登录
		 */
		private _login(): void {
			let cmd: Cmd.Login_C = new Cmd.Login_C()

			if (egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
				cmd.account = "wxgame";
				cmd.password = DataCenter.instance.js_code
			}
			else {
				cmd.account = "other";
				cmd.password = MathUtil.random(0, 10000).toString();

				let index = location.search.indexOf("?uid=")
				if (index != -1) {
					let StrAry = location.search.split("?uid=")
					let uid = StrAry[StrAry.length - 1];
					cmd.uid = uid;
				}
				else {
					cmd.uid = "9997";
				}
			}
			this.sendMsg(cmd);
		}


		/**
		 * 微信登录
		 */
		public wxLogin(): void {

		}

		/**
		 * socket异常
		 */
		private _onSocketError(e: egret.IOErrorEvent): void {
			console.log("IO异常")
		}

		/**
		 * socket关闭
		 */
		private _onSocketClose(e: egret.Event): void {
			console.log("服务器断开连接")
		}

		/**   
		 * socket链接
		 */
		private _onSocketOpen(e: egret.Event): void {
			console.log("webScoket链接成功")
			this._login();

		}
		/**
		 *  心跳检测
		 */
		private _heartCheck(): void {
			Laya.timer.loop(1000 * 90, this, this._sendHeartMsg);
		}
		/**
		 *  发送心跳消息
		 */
		private _sendHeartMsg(): void {
			this._curHeartCount++;
			Laya.timer.once(1000 * 90, this, this._showLoading, [true])

			if (this._curHeartCount >= this.MAX_COUNT) {
				ConfirmUtil.showPanel("网络连接失败，请检查网络", Handler.create(window.location, window.location.reload, null, true))
				Laya.timer.clear(this, this._sendHeartMsg);
			}
			let cmd: Cmd.Heartbeat_CS = new Cmd.Heartbeat_CS();
			cmd.uid = Master.instance.uid
			this.sendMsg(cmd);
		}
		/**
		 * 接受数据
		 */
		private _onReceiveMessage(e: egret.ProgressEvent): void {

			let ws: egret.WebSocket = e.target as egret.WebSocket;
			this._readByteAry.clear();
			ws.readBytes(this._readByteAry);
			/*rawData:buffer 组成:协议名字长度+协议名字+协议数据长度+协议数据 */
			let nameLen: number = this._readByteAry.readUnsignedShort();
			let cmdTitle = this._readByteAry.readUTFBytes(nameLen);
			let rawDataLen: number = this._readByteAry.readUnsignedShort();
			let rawData: Uint8Array = this._readByteAry.bytes.slice(4 + nameLen, 4 + nameLen + rawDataLen);
			let protoType: any;
			let message: any;
			if (egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
				protoType = ProtoExtendtion.protoMap.get(cmdTitle);
				console.log(protoType, cmdTitle)
				message = protoType.decode(rawData)
			}
			else {
				protoType = this._protoRoot.lookupType(cmdTitle);
				message = (protoType.decode(rawData) as protobuf.Message<{}>).toJSON()
			}

			console.log("[收到服务器数据: " + cmdTitle + ":" + JSON.stringify(message) + "]");
			/* 登陆协议 */
			switch (cmdTitle) {
				case "Cmd.Login_C":
					break;
				case "Cmd.PlayerInfo_S":
					let accurateData2: Cmd.PlayerInfo_S = message as Cmd.PlayerInfo_S;
					Master.instance.uid = accurateData2.uid;
					Master.instance.itemData = accurateData2.itemInfo;
					Master.instance.taskData = accurateData2.taskInfo;
					Master.instance.setServeTime(accurateData2.serveTime);
					EventManager.fireEvent(EVENT_ID.SERVE_COMPLETE);
					this._heartCheck();

					break;
				case "Cmd.ItemUpdate_CS":
					let accurateData3: Cmd.ItemUpdate_CS = message as Cmd.ItemUpdate_CS;
					Master.instance.itemData = accurateData3.itemInfo;
					EventManager.fireEvent(EVENT_ID.UPDATE_ITEM_INFO);

					break;
				case "Cmd.Heartbeat_CS":
					let accurateData4: Cmd.Heartbeat_CS = message as Cmd.Heartbeat_CS;
					if (Master.instance.uid == accurateData4.uid) {
						Laya.timer.clear(this, this._showLoading);
						this._showLoading(false);
						this._curHeartCount = 0;
					}
					else {
						console.assert(false, "逻辑有误")
					}
					break;
				case "Cmd.TaskUpdate_CS":
					let accurateData5: Cmd.TaskUpdate_CS = message as Cmd.TaskUpdate_CS;
					Master.instance.taskData = accurateData5;
					EventManager.fireEvent(EVENT_ID.TaskUpdate_CS);
					break;
				case "Cmd.SameUidLogin_S":
					let accurateData6: Cmd.SameUidLogin_S = message as Cmd.SameUidLogin_S;
					ConfirmUtil.showPanel("账号重复登陆，请检查", Handler.create(window.location, window.location.reload, null, true))

					break;
				case "Cmd.ServeTips_S":
					let accurateData7: Cmd.ServeTips_S = message as Cmd.ServeTips_S
					SystemTipsUtil.showTips(accurateData7.tips);
					break;
			}
		}

		/**
		 * 发送数据
		 */
		public sendString(str: string): void {
			this._webSocket.writeUTF(str)
			this._webSocket.flush();
		}

		/**
		 * 发送字节二进制             
		 */
		public sendMsg(cmd: any): void {
			if (cmd["GetType"] === void 0) {
				console.assert(false, "cmd未扩展GetType")
				return
			}

			let protoName: string = cmd["GetType"]()
			let protoType: any;
			if (egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
				protoType = cmd.constructor;
			}
			else {
				protoType = this._protoRoot.lookupType(protoName)
			}
			let writer: protobuf.Writer = protoType.encode(cmd);
			let data: Uint8Array = writer.finish();
			this._writeByteAry.clear();

			this._writeByteAry.writeUTFBytes(protoName);
			let len: number = this._writeByteAry.length;
			this._writeByteAry.position = 0;
			let len2: number = data.length;
			this._writeByteAry.position = 0;

			this._writeByteAry.writeUnsignedShort(len);
			this._writeByteAry.writeUTFBytes(protoName);
			this._writeByteAry.writeUnsignedShort(len2);
			this._writeByteAry._writeUint8Array(data);

			this._webSocket.writeBytes(this._writeByteAry);
			this._webSocket.flush();
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			this.loadingCircle.stop();
			this.loadingCircle = null;
			Laya.timer.clear(this, this._sendHeartMsg);
			this._webSocket.removeEventListener(egret.Event.CONNECT, this._onSocketOpen, this)
			this._webSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this._onReceiveMessage, this);
			this._webSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this._onSocketError, this);
			this._webSocket.removeEventListener(egret.Event.CLOSE, this._onSocketClose, this);
		}
	}
}