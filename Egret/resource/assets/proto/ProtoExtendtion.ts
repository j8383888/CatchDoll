declare namespace Cmd{
	interface Login_C {
		GetType(): string;
	}
	interface ItemInfo_CS {
		GetType(): string;
	}
	interface PlayerInfo_S {
		GetType(): string;
	}
	interface ItemUpdate_CS {
		GetType(): string;
	}
}
Cmd.Login_C.prototype.GetType = function () {
	return "Cmd.Login_C"
}
Cmd.ItemInfo_CS.prototype.GetType = function () {
	return "Cmd.ItemInfo_CS"
}
Cmd.PlayerInfo_S.prototype.GetType = function () {
	return "Cmd.PlayerInfo_S"
}
Cmd.ItemUpdate_CS.prototype.GetType = function () {
	return "Cmd.ItemUpdate_CS"
}
