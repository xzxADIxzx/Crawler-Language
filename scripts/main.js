Events.on(EventType.ClientLoadEvent, event => {
	var button = new TextButton("crawler langu", Styles.clearTogglet);
	button.clicked(() => {
		if (Core.settings.getString("locale") == "cw") return;
		Core.settings.put("locale", "cw");
		Log.info("Setting locale: @", "cw");
		Vars.ui.showInfo("@language.restart");
	});

	var widget = getCell(Vars.ui.language, [1, 0]).getWidget();
	widget.add(button).group(getCell(widget, [0]).getButtonGroup()).update(t => {
		t.setChecked(Core.settings.getString("locale") == "cw");
	}).size(400, 50).row();
});

// why download a mod if you play in another language?
if (Core.settings.getString("locale") != "cw") return;

// translate meta
var meta = Vars.mods.locateMod("crawler-language").meta;
meta.author = "[#0096FF]xzxADIxzx";
meta.displayName = "Crawler Langu ";
meta.description = "adone langu toi [accent]Mindustry[]"

// change Core.bundle
var file = Vars.mods.locateMod("crawler-language").root.child("bundles").list()[0];
PropertiesUtils.load(Core.bundle.getProperties(), file.reader());
Vars.content.each(item => update(item)); // update localized strings

function update(item) {
	if (item == null || item.isHidden()) return; // idk why but on mobile something went wrong
	var type = item.getContentType();
	item.localizedName = Core.bundle.get(type + "." + item.name + ".name");
	item.description = Core.bundle.getOrNull(type + "." + item.name + ".description");
	item.details = Core.bundle.getOrNull(type + "." + item.name + ".details");
}

function getCell(item, index) {
	index.forEach(id => item = item.getCells().get(id).get());
	return item;
}