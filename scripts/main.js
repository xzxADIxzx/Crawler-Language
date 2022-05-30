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
meta.description = "adon`i ma langu toi [accent]Mindustry[]"

// create a new bundle
var file = Vars.mods.locateMod("crawler-language").root.child("bundles").list()[1];
PropertiesUtils.load(Core.bundle.getProperties(), file.reader());
Vars.content.each(update); // update localized strings

function update(item) {
	// idk why but on mobile the item can be null
	if (item instanceof UnlockableContent == false) return;

	var type = item.getContentType() + "." + item.name;
	item.localizedName = Core.bundle.get(type + ".name", item.name);
	item.description = Core.bundle.getOrNull(type + ".description");
	item.details = Core.bundle.getOrNull(type + ".details");
}

function getCell(item, index) {
	index.forEach(id => item = item.getCells().get(id).get());
	return item;
}