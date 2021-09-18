import {BaseUI} from "../../Framework/UI/BaseUI";
import WelcomeUI_View from "./WelcomeUI/WelcomeUI_View";
import {UIManager} from "../../Framework/Manager/UIManager";
import {EventManager} from "../../Framework/Manager/EventManager";
import {CommonEventType} from "../Common/CommonEventType";
import {HallUI} from "../Hall/HallUI";
import {CoroutineManager} from "../../Framework/Manager/CoroutineManager";
import {ConstValue} from "../Common/ConstValue";
import {DialogUI} from "../Common/DialogUI";

@jsClass
export class WelcomeUI extends BaseUI {
	public static get willShowLoading(): boolean {
		return false;
	}

	public get view(): WelcomeUI_View {
		return <any>this._view;
	}

	protected onLoad(): void {
		this.initListener();
		this.initUI();

		this.preload();
		this.login();
	}

	private initListener(): void {
		EventManager.instance.on(CommonEventType.Login, this, this.onLogin);
	}

	private initUI(): void {
		this.view.m_Progress.progress = 0;
	}

	public preload(): void {
		UIManager.instance.loadPkg(
			[ConstValue.PKG_COMMON, ConstValue.PKG_HALL],
			(finish: number, total: number) => this.view.m_Progress.progress = finish / total
		).then(
			() => {
				this.view.m_Progress.progress = 1;
				console.log("预加载完成！");
			},
			reason => {
				console.error("资源加载失败！", reason);
				UIManager.instance.open(DialogUI).then(ui => {
					ui.initConfirm({content: "资源加载失败，请重试"});
					ui.confirmAction = () => {
						this.onLogin();
					}
				});
			}
		);
	}

	public login(): void {
		// Do something...
		CoroutineManager.instance.once(0.5, () => {
			EventManager.instance.emit(CommonEventType.Login);
		});
	}

	public onLogin(): void {
		UIManager.instance.gotoScene(HallUI).catch(reason => {
			UIManager.instance.open(DialogUI).then(ui => {
				ui.initConfirm({content: "进入大厅失败，请重试"});
				ui.confirmAction = () => {
					this.onLogin();
				}
			});
		});
	}
}
