Events.on(EventType.ClientLoadEvent, e => {
	var dialog = Vars.ui.language;
	var button = new TextButton("crawler langu", Styles.clearTogglet);
	button.clicked(() => {
		if (Core.settings.getString("locale") == "cw") return;
	    Core.settings.put("locale", "cw");
	    Log.info("Setting locale: @", "cw");
	    Vars.ui.showInfo("@language.restart");
	});

	var widget = dialog.getCells().get(1).get().getCells().get(0).get().getWidget();
	var btngop = dialog.getCells().get(1).get().getCells().get(0).get().getWidget().getCells().get(0).get();
	widget.add(button).group(btngop.getButtonGroup()).update(t => { 
		t.setChecked(Core.settings.getString("locale") == "cw"); 
	}).size(400, 50).row();
});

// why download a mod if you play in another language?
if (Core.settings.getString("locale") != "cw") return;

// translate meta
var meta = Vars.mods.locateMod("crawler-language").meta;
meta.author = "[#0096FF]xzxADIxzx";
meta.displayName = "Crawler Langu ";
meta.description = "adone [purple]langu[] toi [accent]Mindustry[]"

// change Core.bundle
var file = Vars.mods.locateMod("crawler-language").root.child("bundles").list()[0];
PropertiesUtils.load(Core.bundle.getProperties(), file.reader());
Vars.content.each(item => update(item)); // update localized strings

function update(item){
	if (item == null) return; // idk why but on mobile something went wrong
	if (item.isHidden()) return; // don`t update if item hidden... like "none"
	var type = item.getContentType();
	item.localizedName = Core.bundle.get(type + "." + item.name + ".name");
	item.description = Core.bundle.getOrNull(type + "." + item.name + ".description");
	item.details = Core.bundle.getOrNull(type + "." + item.name + ".details");
}