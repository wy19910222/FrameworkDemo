/**
 * @auth wangyun
 * @date 2020/10/29-10:27
 */

import {UIType} from "../../Framework/UI/BaseUI";
import {FadeUI} from "../../Framework/UI/FadeUI";
import {ConstValue} from "./ConstValue";

export enum DialogType {
	None,
	Cancel,
	Confirm,
	Confirm_Exit,
	Confirm_Cancel,
	Confirm_Cancel_Exit
}

@jsClass
export class DialogUI extends FadeUI {
	public static get uiType(): UIType {
		return UIType.Dialog;
	}
	public static getPkgName(): string {
		return ConstValue.PKG_COMMON;
	}
	public static getCompName(): string {
		return `${cc.js.getClassName(this)}_View`;
	}
	public static uiBind(): void {
	}
	public static get willClearOnDestroy(): boolean {
		return false;
	}

	private _confirmAction: () => void;
	public set confirmAction(value: () => void) {
		this._confirmAction = value;
	}

	private _cancelAction: () => void;
	public set cancelAction(value: () => void) {
		this._cancelAction = value;
	}

	private _exitAction: () => void;
	public set exitAction(value: () => void) {
		this._exitAction = value;
	}

	private _txtContent: fgui.GTextField;

	private _btnConfirm: fgui.GButton;
	public get btnConfirm(): fgui.GButton {
		return this._btnConfirm;
	}

	private _btnCancel: fgui.GButton;
	public get btnCancel(): fgui.GButton {
		return this._btnCancel;
	}

	private _btnExit: fgui.GButton;
	public get btnExit(): fgui.GButton {
		return this._btnExit;
	}

	private _cType: fgui.Controller;

	protected onLoad(): void {
		let window = <fgui.GComponent>this.view.getChild("Window");
		if (window) {
			this._cType = window.getController("CType");
			this._txtContent = <fgui.GTextField>window.getChild("TxtContent");
			this._btnConfirm = <fgui.GButton>window.getChild("BtnConfirm");
			this._btnConfirm.onClick(() => this.onConfirmClick(), this);
			this._btnCancel = <fgui.GButton>window.getChild("BtnCancel");
			this._btnCancel.onClick(() => this.onCancelClick(), this);
			this._btnExit = <fgui.GButton>window.getChildByPath("Bg").button;
			this._btnExit.onClick(this.onExitClick, this);
		}
	}

	public init(type: DialogType, words: {content: string, confirm?: string, cancel?: string}, ...args: any[]): void {
		this._cType && (this._cType.selectedIndex = type);
		if (words) {
			this.setContent(words.content);
			words.confirm && this._btnConfirm && (this._btnConfirm.text = words.confirm);
			words.cancel && this._btnCancel && (this._btnCancel.text = words.cancel);
		}
	}
	public initNone(words: {content: string, confirm?: string, cancel?: string}, ...args: any[]): void {
		this.init(DialogType.None, words, ...args);
	}
	public initCancel(words: {content: string, confirm?: string, cancel?: string}, ...args: any[]): void {
		this.init(DialogType.Cancel, words, ...args);
	}
	public initConfirm(words: {content: string, confirm?: string, cancel?: string}, ...args: any[]): void {
		this.init(DialogType.Confirm, words, ...args);
	}
	public initConfirmExit(words: {content: string, confirm?: string, cancel?: string}, ...args: any[]): void {
		this.init(DialogType.Confirm_Exit, words, ...args);
	}
	public initConfirmCancel(words: {content: string, confirm?: string, cancel?: string}, ...args: any[]): void {
		this.init(DialogType.Confirm_Cancel, words, ...args);
	}
	public initConfirmCancelExit(words: {content: string, confirm?: string, cancel?: string}, ...args: any[]): void {
		this.init(DialogType.Confirm_Cancel_Exit, words, ...args);
	}

	public setContent(content: string, ...args: any[]): void {
		content && this._txtContent && (this._txtContent.text = content.format(...args));
	}

	public onConfirmClick(): void {
		super.onExitClick();
		this._confirmAction && this._confirmAction();
	}

	public onCancelClick(): void {
		super.onExitClick();
		this._cancelAction && this._cancelAction();
	}

	public onExitClick(): void {
		super.onExitClick();
		this._exitAction && this._exitAction();
	}
}
