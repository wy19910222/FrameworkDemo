/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class WelcomeUI_View extends fgui.GComponent {

	public m_Progress:fgui.GProgressBar;
	public m_ChkAgreement:fgui.GButton;
	public static URL:string = "ui://avxff0ihm4720";

	public static createInstance():WelcomeUI_View {
		return <WelcomeUI_View>(fgui.UIPackage.createObject("WelcomeUI", "View"));
	}

	protected onConstruct():void {
		this.m_Progress = <fgui.GProgressBar>(this.getChildAt(2));
		this.m_ChkAgreement = <fgui.GButton>(this.getChildAt(4));
	}
}