require("Crawler-Language/mod");

Events.on(EventType.ClientLoadEvent, e => {
	var dialog = Vars.ui.language;
	var button = new TextButton("Crawler", Styles.clearTogglet);
	button.clicked(() => {
	    //if(dialog.getLocale().equals(loc)) return;
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

// Change Core.bundle
if (Core.settings.getString("locale") != "cw")
	return;

var file = Vars.mods.locateMod("crawler-language").root.child("bundles").list()[0];
PropertiesUtils.load(Core.bundle.getProperties(), file.reader());
update_content();

function update_content() {
	var content = Vars.content;
	content.items().items.forEach(item => update(item) );
	content.liquids().items.forEach(item => update(item) );
	content.blocks().items.forEach(item => update(item) );
	content.units().items.forEach(item => update(item) );
	content.statusEffects().items.forEach(item => update(item) );
	content.sectors().items.forEach(item => update(item) );
	content.planets().items.forEach(item => update(item) );
}

function update(item){
	if (item == null) return; // idk why but on mobile something went wrong
	if (item.isHidden()) return; // Don`t update if item hidden... like "none"
	var type = item.getContentType();
	item.localizedName = Core.bundle.get(type + "." + item.name + ".name");
	item.description = Core.bundle.getOrNull(type + "." + item.name + ".description");
	item.details = Core.bundle.getOrNull(type + "." + item.name + ".details");
}