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
	interface SameUidLogin_S {
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
Cmd.SameUidLogin_S.prototype.GetType = function () {
	return "Cmd.SameUidLogin_S";
}
