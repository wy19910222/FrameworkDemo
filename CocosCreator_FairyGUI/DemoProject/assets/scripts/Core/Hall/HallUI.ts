import {BaseUI} from "../../Framework/UI/BaseUI";
import {ToastUI} from "../Common/ToastUI";

@jsClass
export class HallUI extends BaseUI {
	public static get willShowLoading(): boolean {
		return false;
	}

	protected onLoad() {
		ToastUI.show("现在已经在大厅了！");
	}
}