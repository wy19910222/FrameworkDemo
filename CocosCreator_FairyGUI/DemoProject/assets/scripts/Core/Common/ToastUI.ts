/**
 * @auth wangyun
 * @date 2020/10/29-10:27
 */

import {UIType} from "../../Framework/UI/BaseUI";
import {FadeUI} from "../../Framework/UI/FadeUI";
import {ConstValue} from "./ConstValue";
import {CoroutineManager} from "../../Framework/Manager/CoroutineManager";
import {UIManager} from "../../Framework/Manager/UIManager";

@jsClass
export class ToastUI extends FadeUI {
	public static get uiType(): UIType {
		return UIType.Transparent;
	}
	public static getPkgName(): string {
		return ConstValue.PKG_COMMON;
	}
	public static getCompName(): string {
		return `${cc.js.getClassName(this)}_View`;
	}
	public static uiBind(): void {
	}
	public static get willShowLoading(): boolean {
		return false;
	}
	public static get willClearOnDestroy(): boolean {
		return false;
	}

	private _duration = 2;
	public set duration(value: number) {
		this._duration = value;
	}

	public init(content: string, duration?: number): void {
		this.view.visible = !!content;
		const lblWindow = <fgui.GLabel>this.view.getChild("Window");
		lblWindow && (lblWindow.title = content);
		CoroutineManager.instance.once(duration || this._duration, this.onExitClick, this);
	}

	public static show(content: string, duration?: number) {
		UIManager.instance.open(this).then(toastUI => toastUI.init(content, duration));
	}
}
