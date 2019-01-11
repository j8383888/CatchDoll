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

		private _curTime: number = 0;  // 当前检测次数
		private _maxTime: number = 5; // 最大检测次数
		private _checkTime: number = 1000; // 检测时间间隔
		private _isOpenHeart: boolean = true; // 是否开始心跳检测
		private _heartTimer: any = null; // 心跳检测函数
		private _isGetRep: boolean = false; // 是否收到回复


		public constructor() {
			this._init();
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


			this._webSocket.type = egret.WebSocket.TYPE_BINARY;
			this._webSocket.addEventListener(egret.Event.CONNECT, this._onSocketOpen, this)
			this._webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this._onReceiveMessage, this);
			this._webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this._onSocketError, this);
			this._webSocket.addEventListener(egret.Event.CLOSE, this._onSocketClose, this);
			this._webSocket.connect("127.0.0.1", 8001);
			// this._webSocket.connect("129.28.87.105", 8001);
			this._writeByteAry.endian = egret.EndianConst.BIG_ENDIAN.toString();

			protobuf.parse(RES.getRes("common_proto"), this._protoRoot);
		}

		/**
		 * 登录
		 */
		private _login(): void {
			let cmd: Cmd.Login_C = new Cmd.Login_C()
			cmd.account = "suo";
			cmd.password = MathUtil.random(0, 10000).toString();

			let index = location.search.indexOf("?uid=")
			if (index != -1) {
				let StrAry = location.search.split("?uid=")
				let uid = StrAry[StrAry.length - 1];
				cmd.uid = Number(uid);
				this.sendMsg(cmd);
			}

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
			// this._login();
			this.heartCheck();
		}
		/**
		 *  心跳检测
		 */
		public heartCheck(): void {
			if (this._isOpenHeart) {
				this._heartTimer = setTimeout(this.sendHeartMsg.bind(this), this._checkTime);
			}
		}
		/**
		 *  发送心跳消息
		 */
		public sendHeartMsg(): void {
			console.log("send heartMsg");
			if (this._isGetRep) {
				// 发送心跳协议到服务器
				this._isGetRep = false;
				this._curTime = 0;
			} else{
				this._curTime++;
			}
			if (this._curTime > this._maxTime) {
				console.log("心跳异常");
				clearTimeout(this._heartTimer);
			} else{
				this.heartCheck();
			}
		}
		/**
		 * 接受数据
		 */
		private _onReceiveMessage(e: egret.ProgressEvent): void {

			//todo 在这里收到心跳协议回复，将_isGetRep置为true
			if ("是不是心跳判断") {
				this._isGetRep = true;
			}

			let ws: egret.WebSocket = e.target as egret.WebSocket;
			this._readByteAry.clear();
			ws.readBytes(this._readByteAry);
			/*rawData:buffer 组成:协议名字长度+协议名字+协议数据长度+协议数据 */
			let nameLen: number = this._readByteAry.readUnsignedShort();
			let cmdTitle = this._readByteAry.readUTFBytes(nameLen);
			let rawDataLen: number = this._readByteAry.readUnsignedShort();
			let rawData: Uint8Array = this._readByteAry.bytes.slice(4 + nameLen, 4 + nameLen + rawDataLen);
			const protoType: protobuf.Type = this._protoRoot.lookupType(cmdTitle);
			let message: protobuf.Message<{}> = protoType.decode(rawData)

			console.log("[收到服务器数据: " + cmdTitle + ":" + JSON.stringify(message) + "]");
			let jsonData = message.toJSON();
			/* 登陆协议 */
			switch (cmdTitle) {
				case "Cmd.Login_C":
					let accurateData: Cmd.Login_C = jsonData as Cmd.Login_C;
					break;
				case "Cmd.PlayerInfo_S":
					let accurateData2: Cmd.PlayerInfo_S = jsonData as Cmd.PlayerInfo_S;
					Master.instance.uid = accurateData2.uid;
					Master.instance.itemData = accurateData2.itemInfo;
					EventManager.fireEvent(EVENT_ID.SERVE_COMPLETE);
					break;
				case "Cmd.ItemUpdate_CS":
					let accurateData3: Cmd.ItemUpdate_CS = jsonData as Cmd.ItemUpdate_CS;
					Master.instance.itemData = accurateData3.itemInfo;
					EventManager.fireEvent(EVENT_ID.UPDATE_ITEM_INFO);
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
			// let constructor = cmd.constructor
			if (cmd["GetType"] === void 0) {
				console.assert(false, "cmd未扩展GetType")
				return
			}

			let protoName: string = cmd["GetType"]()
			console.error("协议标题：" + protoName)
			const protoType = this._protoRoot.lookupType(protoName)
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



			// this._writeByteAry.position = 0;
			// let len3: number = this._writeByteAry.readUnsignedShort();
			// let TypeName = this._writeByteAry.readUTFBytes(len3);


			this._webSocket.writeBytes(this._writeByteAry);
			this._webSocket.flush();
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			this._webSocket.removeEventListener(egret.Event.CONNECT, this._onSocketOpen, this)
			this._webSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this._onReceiveMessage, this);
			this._webSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this._onSocketError, this);
			this._webSocket.removeEventListener(egret.Event.CLOSE, this._onSocketClose, this);
		}
	}
}