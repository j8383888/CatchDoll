﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
module table {
	/**
	 * FILE: 游戏配置.xlsx SHEET: 怪兽配置
	 */
	export class MonsterTable {
		id: number;
		/**
		 * 怪兽名称
		 */
		name: string;
		/**
		 * 渲染源
		 */
		dragonBones: string;
		/**
		 * 生命值
		 */
		life: number;
		/**
		 * 移动速度
		 */
		moveSpeed: number;

		GetType(): string { return 'table.MonsterTable'; }
	}
}
