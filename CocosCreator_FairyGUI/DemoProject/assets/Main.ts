/**
 * @auth wangyun
 * @date 2020/10/29-10:27
 */

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

// cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event: cc.Event.EventKeyboard) => {
// 	console.error("KEY_DOWN: ", event.keyCode);
// 	switch(event.keyCode) {
// 		case cc.macro.KEY.f6:
// 			break;
// 		case cc.macro.KEY.f7:
// 			break;
// 	}
// });


import {GameRoot} from "./scripts/Framework/Root/GameRoot";
import {UIManager} from "./scripts/Framework/Manager/UIManager";
import {WelcomeUI} from "./scripts/Core/Welcome/WelcomeUI";

/**
 * Main
 * └── GameRoot
 *     ├── ManagerRoot
 *     │   ├── Manager1
 *     │   ├── Manager2
 *     │   ├── Manager3
 *     │   └── ...
 *     ├── ModelRoot
 *     │   ├── Model1
 *     │   ├── Model2
 *     │   ├── Model3
 *     │   └── ...
 *     └── ProxyRoot
 *         ├── Proxy1
 *         ├── Proxy2
 *         ├── Proxy3
 *         └── ...
 */
@jsClass
export class Main extends cc.Component {

	protected onLoad(): void {
		cc.game.addPersistRootNode(this.node);

		let node = new cc.Node();
		node.addComponent(GameRoot);
		cc.systemEvent.emit("GameRoot.inited");
		node.setParent(this.node);
		cc.systemEvent.emit("GameRoot.loaded");

		UIManager.instance.gotoScene(WelcomeUI).catch(reason => {
			console.error("欢迎界面加载失败，请重试！", reason)
		});
	}
}