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
		 * 生命
		 */
		life: number;
		/**
		 * 速度
		 */
		moveSpeed: number;
		/**
		 * 技巧
		 */
		skill: number;
		/**
		 * 能量
		 */
		power: number;
		/**
		 * 碰撞体
		 */
		colliderAry: MonsterTable.ColliderAryItem[];
		/**
		 * 等级
		 */
		level: number;
		/**
		 * 是否在图鉴中显示
		 */
		showInIllustrations: number;
		/**
		 * 内部是否活跃
		 */
		isActiveInside: number;

		GetType(): string { return 'table.MonsterTable'; }
	}
	export module MonsterTable {
		export class ColliderAryItem {
			posX: number;
			posY: number;
			radius: number;
		}
	}
}
