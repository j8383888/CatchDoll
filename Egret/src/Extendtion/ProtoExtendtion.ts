/** 
 * @description Auto Generate By protoExtendtion.py
 * @version 2019-07-16 18:00:26 
 * @author suo
 */
class ProtoExtendtion {
	public static protoMap: Dictionary;
	public static init(): void {
		this.protoMap = new Dictionary();
		this.protoMap.set("Cmd.Login_C",Cmd.Login_C);
		this.protoMap.set("Cmd.PlayerInfo_S",Cmd.PlayerInfo_S);
		this.protoMap.set("Cmd.ItemInfo_CS",Cmd.ItemInfo_CS);
		this.protoMap.set("Cmd.ItemUpdate_CS",Cmd.ItemUpdate_CS);
		this.protoMap.set("Cmd.Heartbeat_CS",Cmd.Heartbeat_CS);
		this.protoMap.set("Cmd.TaskUpdate_CS",Cmd.TaskUpdate_CS);
		this.protoMap.set("Cmd.RefreshTask_C",Cmd.RefreshTask_C);
		this.protoMap.set("Cmd.GetTaskAward_C",Cmd.GetTaskAward_C);
		this.protoMap.set("Cmd.SameUidLogin_S",Cmd.SameUidLogin_S);
		this.protoMap.set("Cmd.ServeTips_S",Cmd.ServeTips_S);
	}
}
declare namespace Cmd{
	interface Login_C {
		GetType(): string;
	}
	interface PlayerInfo_S {
		GetType(): string;
	}
	interface ItemInfo_CS {
		GetType(): string;
	}
	interface ItemUpdate_CS {
		GetType(): string;
	}
	interface Heartbeat_CS {
		GetType(): string;
	}
	interface TaskUpdate_CS {
		GetType(): string;
	}
	interface RefreshTask_C {
		GetType(): string;
	}
	interface GetTaskAward_C {
		GetType(): string;
	}
	interface SameUidLogin_S {
		GetType(): string;
	}
	interface ServeTips_S {
		GetType(): string;
	}
}
Cmd.Login_C.prototype.GetType = function () {
	return "Cmd.Login_C";
}
Cmd.PlayerInfo_S.prototype.GetType = function () {
	return "Cmd.PlayerInfo_S";
}
Cmd.ItemInfo_CS.prototype.GetType = function () {
	return "Cmd.ItemInfo_CS";
}
Cmd.ItemUpdate_CS.prototype.GetType = function () {
	return "Cmd.ItemUpdate_CS";
}
Cmd.Heartbeat_CS.prototype.GetType = function () {
	return "Cmd.Heartbeat_CS";
}
Cmd.TaskUpdate_CS.prototype.GetType = function () {
	return "Cmd.TaskUpdate_CS";
}
Cmd.RefreshTask_C.prototype.GetType = function () {
	return "Cmd.RefreshTask_C";
}
Cmd.GetTaskAward_C.prototype.GetType = function () {
	return "Cmd.GetTaskAward_C";
}
Cmd.SameUidLogin_S.prototype.GetType = function () {
	return "Cmd.SameUidLogin_S";
}
Cmd.ServeTips_S.prototype.GetType = function () {
	return "Cmd.ServeTips_S";
}
