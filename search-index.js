crystal_doc_search_index_callback({"repository_name":"lucky_svg_sprite","body":"# Lucky SVG Sprite generator\n\n![Lucky SVG Sprite generator logo](https://raw.githubusercontent.com/wout/lucky_svg_sprite/master/logo.svg?sanitize=true)\n\nGenerate [Lucky](https://luckyframework.org/)-flavored SVG sprites from a \nfolder of separate SVG icons. This shard includes the necessary Lucky components\nto mount sprites and icons in pages. Styling icons, like `width`, \n`height`, `stroke`, `fill` and `opacity`, can be done in CSS.\n\n![GitHub](https://img.shields.io/github/license/wout/lucky_svg_sprite)\n![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/wout/lucky_svg_sprite)\n![GitHub Workflow Status](https://img.shields.io/github/workflow/status/wout/lucky_svg_sprite/lucky_svg_sprite%20CI)\n\nTurn your regular SVG icon files:\n\n```svg\n<!-- src/components/svg_icons/default/lucky-logo-symbolic.svg -->\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg viewBox=\"0 0 16 16\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n  <g fill=\"none\" stroke=\"#000000\">\n    <path d=\"m12.626 ... 5.1818z\" stroke-width=\"1\"/>\n    <path d=\"m3.9846 ... 7.1105-12.89\" stroke-width=\"0.5\"/>\n    <path d=\"m5.9305 ... 6.1854-11.213\" stroke-width=\"0.5\"/>\n  </g>\n</svg>\n```\n\nInto reusable Lucky components:\n\n```crystal\ntag \"symbol\", id: \"svg-lucky-logo-symbolic-icon\", viewBox=\"0 0 16 16\" do\n  tag \"g\", fill: \"none\", stroke: \"#000000\" do\n    tag \"path\", d: \"m12.626 ... 5.1818z\", stroke_width: \"1\"\n    tag \"path\", d: \"m3.9846 ... 7.1105-12.89\", stroke_width: \"0.5\"\n    tag \"path\", d: \"m5.9305 ... 6.1854-11.213\", stroke_width: \"0.5\"\n  end\nend\n```\n\nWhich you can then easily mount in your pages:\n\n```crystal\nbody do\n  mount SvgSprite::Default.new\n  \n  header do\n    mount SvgSprite::Default::LuckyLogoSymbolic.new\n  end\nend\n```\n\nWith just one single command:\n\n```bash\n$ bin/svg_sprite\n```\n\nAnd that's all instantaneously! 🚀️\n\n## Installation\n\nAdd the dependency to your `shard.yml`:\n\n```yaml\ndependencies:\n  lucky_svg_sprite:\n    github: wout/lucky_svg_sprite\n```\n\nRun `shards install`.\n\n__📄️ Note:__ *Installation might take a while since the generator binary needs\nto be built. Having it built now, means that you'll have instantaneous sprite\nregeneration. So, don't worry, be patient and grab a ☕️.*\n\n## Usage\n\nFirst, make sure your require this library in Lucky's shards.cr file:\n\n```crystal\nrequire \"lucky_svg_sprite\"\n```\n\n### Setup\n\nAfter installation, run the following command:\n\n```bash\n$ bin/svg_sprite --init default\n```\n\nThis will set up the required structure and files:\n\n- `src/components/base_svg_icon.cr` (for customization)\n- `src/components/base_svg_sprite.cr` (for customization)\n- `src/components/svg_icons/default/example.svg` (`example` icon)\n- `src/components/svg_sprites` (where generated sprites will be stored)\n- `src/components/svg_sprites/default.cr` (sprite component with `example` icon)\n\nYou can choose a different set name too:\n\n```bash\n$ bin/svg_sprite --init menu_symbolic\n```\n\n### Generating sprites\n\nTo regenerate your sprite after adding new icons, run:\n\n```bash\n$ bin/svg_sprite\n```\n\nThis will generate a new sprite from the **default** set. Add the name of the\nset you want to generate:\n\n```bash\n$ bin/svg_sprite menu_icons\n```\n\nBy default, this command assumes your icons are in the desired color and you \ndon't change their `stroke` or `fill` through CSS. By passing the\n`--strip-colors` flag, all `stroke` and `fill` attributes of your icons will be \nremoved:\n\n```bash\n$ bin/svg_sprite --strip-colors\n# or\n$ bin/svg_sprite -c\n# or\n$ bin/svg_sprite menu_icons -c\n```\n\nBy using this flag, you will then be able to style your icons using CSS:\n\n```css\n.svg-default-icon {\n  stroke: pink;\n  opacity: 0.8;\n  fill: none;\n}\n```\n\n__📄️ Note:__ *Obviously, this is not recommended for multicolor icons.*\n\nWhat if you want to take it further and strip other attributes as well? We got \nyou covered:\n\n```bash\n$ bin/svg_sprite --strip=opacity,stroke-linecap,stroke-linejoin\n# or\n$ bin/svg_sprite -s opacity,stroke-linecap,stroke-linejoin\n```\n\nAll attributes you strip away can then be declared in your stylesheet.\n\n### Automatically generating sprites 🚀️\n\nIf you have [Guardian.cr](https://github.com/f/guardian) installed, create a\n`guardfile.yml` (`guardian --init`) and add the following line:\n\n```yaml\nfiles: ./src/components/svg_icons/default/*.svg\nrun: bin/svg_sprite\n```\n\nYou can do the same for all your icon sets, each with their own arguments:\n\n```yml\nfiles: ./src/components/svg_icons/default/*.svg\nrun: bin/svg_sprite\n---\nfiles: ./src/components/svg_icons/symbolic/*.svg\nrun: bin/svg_sprite symbolic --strip-colors\n```\n\nThen, in a new terminal window, simply run:\n\n```\n$ guardian\n```\n\nAnd watch your sprites be generated whenever you edit or add an icon to one of\nyour sets.\n\n__📄️ Note:__ *This setup works well with Lucky's watcher, because when the new\nsprite file is generated, Lucky will pick up on that and start recompiling the\napp.*\n\n### Mounting a sprite\n\nIn your layout file, mount the sprite at the top of the body tag:\n\n```crystal\nbody do\n  mount SvgSprite::Default.new\n  ...\nend\n```\n\n__📄️ Note:__ *Yes, it's awkward, but it should be that way due to a\n[bug in Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=349175).\nIf they are not at the top, or at least mounted before they are used, Chrome\nwill not render the icons. There are fixes, but they are beyond the\nscope of this shard.*\n\nThis will mount the **default** icon set. Yes, that's right, you can create\nmultiple icon sets. For example, you might need to have **symbolic** and \n**colored** set. In that case, you will need to mount two sets:\n\n```crystal\nbody do\n  mount SvgSprite::Colored.new\n  mount SvgSprite::Symbolic.new\n  ...\nend\n```\n\nEvidently, icons for the respective sets should be stored in:\n\n```\nsrc/components/svg_icons/colored\nsrc/components/svg_icons/symbolic\n```\n\n__☝ Tip:__ If you have many icons in your app, sets can also be useful to\ncreate groups of icons that belong together on the same page or in the same\ncomponent. For example, you could have a set for menu icons, a set for icons\nused on the dashboard and so on. Then you can mount those sets wherever you need\nthem and avoid one large blob of icons mounted on every page where you only\nactually need a selection of them at the same time.\n\n### Mounting an icon\n\nIcons can be mounted wherever you like:\n\n```crystal\nlink to: Profile::Show do\n  mount SvgSprite::Default::UserProfile.new\n  text \"My Profile\"\nend\n\ndiv class: \"shopping-bag\" do\n  mount SvgSprite::MyLovelySet::ProductsShoppingBags.new\nend\n```\n\nThe name of the icon class is the classified version of its file name. Here are\nsome examples:\n\n```crystal\n# src/components/svg_icons/default/hairy-ball.svg\nmount SvgSprite::Default::HairyBall.new\n\n# src/components/svg_icons/default/aircraft_chopper_4.svg\nmount SvgSprite::Default::AircraftChopper4.new\n\n# src/components/svg_icons/my_lovely_set/ContactUs.svg\nmount SvgSprite::MyLovelySet::ContactUs.new\n```\n\n__📄️ Note:__ *The great thing about having dedicated Crystal classes per icon, \nis that you'll never have a missing icon. And if an SVG icon's source file gets\ndeleted or renamed, the compiler will let you know after regenerating the\nsprite. An added bonus of using Crystal.* 🎉️\n\nIf you find yourself in a situation where you want to mount a series of icons\nusing a loop (like in a menu for example), then a macro will come in handy:\n\n```crystal\nul do\n  {% for button in SvgSprite::Menu::MANIFEST %}\n    {% name = button.gsub(/-/, \"_\").camelcase %}\n    li do\n      link to: {{name.id}}::Index, flow_id: \"{{button.id}}-section-button\" do\n        mount SvgSprite::Menu::{{name.id}}.new\n        text {{name}}\n      end\n    end\n  {% end %}\nend\n```\n\n__📄️ Note:__ *Every sprite carries a tuple containing the names of all its\nicons; a manifest if you will. For the menu example above, it can be found in \n`SvgSprite::Menu::MANIFEST`. The returned list contains sanitized, parameterized \nicon file names, without their extension. So for example: \n`{\"my-account\", \"dashboard\", \"blog-posts\"}`*\n\n### Customizing attributes\n\n#### `style`\n\nGenerated sprites are hidden with an inline style tag:\n\n```html\n<svg class=\"svg-sprite svg-default-set\" style=\"display:none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <defs>\n    ...\n  </defs>\n</svg>\n```\n\nIf you believe style attributes have no place in HTML, then you are in luck.\nJust add a `style` method to your `base_svg_sprite.cr` component returning an\nempty string:\n\n```crystal\n# src/components/base_svg_sprite.cr\nabstract class BaseSvgSprite < LuckySvgSprite::Set\n  def style\n    \"\"\n  end\nend\n```\n\nOf course, this will mess up your layout, so you'll need to make sure to hide it\nin your stylesheet:\n\n```css\n.svg-sprite {\n  display: none;\n}\n```\n\n#### `class`\n\nClass names can be a very personal thing, so you might want to change them. By\ndefault, sprites have two class names. For example:\n- `svg-sprite` (all sprites)\n- `svg-default-set` (only the **default** set)\n\nSimilarly, icons also have three class names:\n- `svg-icon` (all icons)\n- `svg-default-icon` (all icons in the **default** set)\n- `svg-default-example-icon` (the **example** icon in the **default** set)\n\nYou can change them by adding a method called `class_name`, which returns the\nclass name you prefer over the default one.\n\n**For sprites:**\n\n```crystal\n# src/components/base_svg_sprite.cr\nabstract class BaseSvgSprite < LuckySvgSprite::Set\n  def class_name\n    \"my-sprite my-#{name}-set\"\n  end\nend\n```\n\nWhich will result in:\n\n```html\n<svg class=\"my-sprite my-default-set\" style=\"display:none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <defs>\n    ...\n  </defs>\n</svg>\n```\n\n**For icons:**\n\n```crystal\n# src/components/base_svg_icon.cr\nabstract class BaseSvgIcon < LuckySvgSprite::Icon\n  def class_name\n    \"#{set}__icon #{set}__icon--{name}\"\n  end\nend\n```\n\nWhich will result in:\n\n```html\n<svg class=\"menu__icon menu__icon--products\">\n  <use xlink:href=\"#svg-menu-products-icon\"></use>\n</svg>\n```\n\n## Useful tools\n\n### Norde\n\nManaging and searching icons manually can be a tedious job. I found\n[Norde](https://norde.io/) to be very useful. It comes installed with a few icon\nsets, like Font Awesome and Material Design, but you can install any set you\nlike. Best of all, it is available for Linux, macOS and Windows.\n\n## Development\n\nMake sure you have [Guardian.cr](https://github.com/f/guardian) installed. Then\nrun:\n\n```bash\n$ guardian\n```\n\nThis will automatically:\n- run ameba for src and spec files\n- run the relevant spec for any file in src\n- run spec file whenever they are saved\n- install shards whenever you save shard.yml\n\n## Documentation\n\n- [API (master)](https://wout.github.io/lucky_svg_sprite)\n\n## Contributing\n\n1. Fork it (https://github.com/wout/lucky_svg_sprite/fork)\n2. Create your feature branch (`git checkout -b my-new-feature`)\n3. Commit your changes (`git commit -am 'Add some feature'`)\n4. Push to the branch (`git push origin my-new-feature`)\n5. Create a new Pull Request\n\n## Contributors\n\n- [wout](https://github.com/wout) - creator and maintainer\n\n## Thanks & attributions\n- The SVG to Lucky component converter is heavily based on\n[HTML2Lucky](https://luckyhtml.herokuapp.com/).\nThanks [@paulcsmith](https://github.com/paulcsmith)! ","program":{"html_id":"lucky_svg_sprite/toplevel","path":"toplevel.html","kind":"module","full_name":"Top Level Namespace","name":"Top Level Namespace","abstract":false,"superclass":null,"ancestors":[],"locations":[],"repository_name":"lucky_svg_sprite","program":true,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[{"html_id":"lucky_svg_sprite/LuckySvgSprite","path":"LuckySvgSprite.html","kind":"module","full_name":"LuckySvgSprite","name":"LuckySvgSprite","abstract":false,"superclass":null,"ancestors":[],"locations":[{"filename":"src/lucky_svg_sprite/mixins/icon.cr","line_number":1,"url":"https://github.com/wout/lucky_svg_sprite/blob/880b5f09e6ca566b8619752ed7a07f57ab10f395/src/lucky_svg_sprite/mixins/icon.cr#L1"},{"filename":"src/lucky_svg_sprite/version.cr","line_number":1,"url":"https://github.com/wout/lucky_svg_sprite/blob/880b5f09e6ca566b8619752ed7a07f57ab10f395/src/lucky_svg_sprite/version.cr#L1"}],"repository_name":"lucky_svg_sprite","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[{"id":"VERSION","name":"VERSION","value":"\"0.9.0\"","doc":null,"summary":null}],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[{"html_id":"lucky_svg_sprite/LuckySvgSprite/Icon","path":"LuckySvgSprite/Icon.html","kind":"class","full_name":"LuckySvgSprite::Icon","name":"Icon","abstract":true,"superclass":{"html_id":"lucky_svg_sprite/Lucky/BaseComponent","kind":"class","full_name":"Lucky::BaseComponent","name":"BaseComponent"},"ancestors":[{"html_id":"lucky_svg_sprite/LuckySvgSprite/Mixins/Icon","kind":"module","full_name":"LuckySvgSprite::Mixins::Icon","name":"Icon"},{"html_id":"lucky_svg_sprite/Lucky/BaseComponent","kind":"class","full_name":"Lucky::BaseComponent","name":"BaseComponent"},{"html_id":"lucky_svg_sprite/Lucky/HTMLBuilder","kind":"module","full_name":"Lucky::HTMLBuilder","name":"HTMLBuilder"},{"html_id":"lucky_svg_sprite/Lucky/SelectHelpers","kind":"module","full_name":"Lucky::SelectHelpers","name":"SelectHelpers"},{"html_id":"lucky_svg_sprite/Lucky/LabelHelpers","kind":"module","full_name":"Lucky::LabelHelpers","name":"LabelHelpers"},{"html_id":"lucky_svg_sprite/Lucky/InputHelpers","kind":"module","full_name":"Lucky::InputHelpers","name":"InputHelpers"},{"html_id":"lucky_svg_sprite/Lucky/TagDefaults","kind":"module","full_name":"Lucky::TagDefaults","name":"TagDefaults"},{"html_id":"lucky_svg_sprite/Lucky/RenderIfDefined","kind":"module","full_name":"Lucky::RenderIfDefined","name":"RenderIfDefined"},{"html_id":"lucky_svg_sprite/Lucky/HelpfulParagraphError","kind":"module","full_name":"Lucky::HelpfulParagraphError","name":"HelpfulParagraphError"},{"html_id":"lucky_svg_sprite/Lucky/MountComponent","kind":"module","full_name":"Lucky::MountComponent","name":"MountComponent"},{"html_id":"lucky_svg_sprite/Lucky/ForgeryProtectionHelpers","kind":"module","full_name":"Lucky::ForgeryProtectionHelpers","name":"ForgeryProtectionHelpers"},{"html_id":"lucky_svg_sprite/Lucky/TimeHelpers","kind":"module","full_name":"Lucky::TimeHelpers","name":"TimeHelpers"},{"html_id":"lucky_svg_sprite/Lucky/UrlHelpers","kind":"module","full_name":"Lucky::UrlHelpers","name":"UrlHelpers"},{"html_id":"lucky_svg_sprite/Lucky/HTMLTextHelpers","kind":"module","full_name":"Lucky::HTMLTextHelpers","name":"HTMLTextHelpers"},{"html_id":"lucky_svg_sprite/Lucky/TextHelpers","kind":"module","full_name":"Lucky::TextHelpers","name":"TextHelpers"},{"html_id":"lucky_svg_sprite/Lucky/NumberToCurrency","kind":"module","full_name":"Lucky::NumberToCurrency","name":"NumberToCurrency"},{"html_id":"lucky_svg_sprite/Lucky/AssetHelpers","kind":"module","full_name":"Lucky::AssetHelpers","name":"AssetHelpers"},{"html_id":"lucky_svg_sprite/Lucky/Assignable","kind":"module","full_name":"Lucky::Assignable","name":"Assignable"},{"html_id":"lucky_svg_sprite/Lucky/SpecialtyTags","kind":"module","full_name":"Lucky::SpecialtyTags","name":"SpecialtyTags"},{"html_id":"lucky_svg_sprite/Lucky/FormHelpers","kind":"module","full_name":"Lucky::FormHelpers","name":"FormHelpers"},{"html_id":"lucky_svg_sprite/Habitat/SettingsHelpers","kind":"module","full_name":"Habitat::SettingsHelpers","name":"SettingsHelpers"},{"html_id":"lucky_svg_sprite/Habitat/TempConfig","kind":"module","full_name":"Habitat::TempConfig","name":"TempConfig"},{"html_id":"lucky_svg_sprite/Lucky/LinkHelpers","kind":"module","full_name":"Lucky::LinkHelpers","name":"LinkHelpers"},{"html_id":"lucky_svg_sprite/Lucky/CustomTags","kind":"module","full_name":"Lucky::CustomTags","name":"CustomTags"},{"html_id":"lucky_svg_sprite/Lucky/CheckTagContent","kind":"module","full_name":"Lucky::CheckTagContent","name":"CheckTagContent"},{"html_id":"lucky_svg_sprite/Lucky/BaseTags","kind":"module","full_name":"Lucky::BaseTags","name":"BaseTags"},{"html_id":"lucky_svg_sprite/Lucky/CheckTagContent","kind":"module","full_name":"Lucky::CheckTagContent","name":"CheckTagContent"},{"html_id":"lucky_svg_sprite/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"lucky_svg_sprite/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/lucky_svg_sprite/icon.cr","line_number":1,"url":"https://github.com/wout/lucky_svg_sprite/blob/880b5f09e6ca566b8619752ed7a07f57ab10f395/src/lucky_svg_sprite/icon.cr#L1"}],"repository_name":"lucky_svg_sprite","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[{"id":"ASSIGNS","name":"ASSIGNS","value":"[] of Nil","doc":null,"summary":null}],"included_modules":[{"html_id":"lucky_svg_sprite/LuckySvgSprite/Mixins/Icon","kind":"module","full_name":"LuckySvgSprite::Mixins::Icon","name":"Icon"}],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"lucky_svg_sprite/LuckySvgSprite","kind":"module","full_name":"LuckySvgSprite","name":"LuckySvgSprite"},"doc":null,"summary":null,"class_methods":[{"html_id":"file_location-class-method","name":"file_location","doc":"Returns the relative file location to the\nproject root. e.g. src/components/my_component.cr","summary":"<p>Returns the relative file location to the project root.</p>","abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/lucky_svg_sprite/icon.cr","line_number":1,"url":"https://github.com/wout/lucky_svg_sprite/blob/880b5f09e6ca566b8619752ed7a07f57ab10f395/src/lucky_svg_sprite/icon.cr#L1"},"def":{"name":"file_location","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"\"/home/runner/work/lucky_svg_sprite/lucky_svg_sprite/src/lucky_svg_sprite/icon.cr\".gsub(\"#{Dir.current}/\", \"\")"}}],"constructors":[],"instance_methods":[{"html_id":"render-instance-method","name":"render","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/lucky_svg_sprite/icon.cr","line_number":4,"url":"https://github.com/wout/lucky_svg_sprite/blob/880b5f09e6ca566b8619752ed7a07f57ab10f395/src/lucky_svg_sprite/icon.cr#L4"},"def":{"name":"render","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"tag(\"svg\", class: class_name) do\n  tag(\"use\", \"xlink:href\": \"#svg-#{set}-#{name}-icon\")\nend"}}],"macros":[],"types":[]},{"html_id":"lucky_svg_sprite/LuckySvgSprite/Mixins","path":"LuckySvgSprite/Mixins.html","kind":"module","full_name":"LuckySvgSprite::Mixins","name":"Mixins","abstract":false,"superclass":null,"ancestors":[],"locations":[{"filename":"src/lucky_svg_sprite/mixins/icon.cr","line_number":1,"url":"https://github.com/wout/lucky_svg_sprite/blob/880b5f09e6ca566b8619752ed7a07f57ab10f395/src/lucky_svg_sprite/mixins/icon.cr#L1"}],"repository_name":"lucky_svg_sprite","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"lucky_svg_sprite/LuckySvgSprite","kind":"module","full_name":"LuckySvgSprite","name":"LuckySvgSprite"},"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[{"html_id":"lucky_svg_sprite/LuckySvgSprite/Mixins/Icon","path":"LuckySvgSprite/Mixins/Icon.html","kind":"module","full_name":"LuckySvgSprite::Mixins::Icon","name":"Icon","abstract":false,"superclass":null,"ancestors":[],"locations":[{"filename":"src/lucky_svg_sprite/mixins/icon.cr","line_number":1,"url":"https://github.com/wout/lucky_svg_sprite/blob/880b5f09e6ca566b8619752ed7a07f57ab10f395/src/lucky_svg_sprite/mixins/icon.cr#L1"}],"repository_name":"lucky_svg_sprite","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[{"html_id":"lucky_svg_sprite/LuckySvgSprite/Icon","kind":"class","full_name":"LuckySvgSprite::Icon","name":"Icon"}],"namespace":{"html_id":"lucky_svg_sprite/LuckySvgSprite/Mixins","kind":"module","full_name":"LuckySvgSprite::Mixins","name":"Mixins"},"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[{"html_id":"class_name-instance-method","name":"class_name","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/lucky_svg_sprite/mixins/icon.cr","line_number":2,"url":"https://github.com/wout/lucky_svg_sprite/blob/880b5f09e6ca566b8619752ed7a07f57ab10f395/src/lucky_svg_sprite/mixins/icon.cr#L2"},"def":{"name":"class_name","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"\"svg-icon svg-#{set}-icon svg-#{set}-#{name}-icon\""}},{"html_id":"name-instance-method","name":"name","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/lucky_svg_sprite/mixins/icon.cr","line_number":6,"url":"https://github.com/wout/lucky_svg_sprite/blob/880b5f09e6ca566b8619752ed7a07f57ab10f395/src/lucky_svg_sprite/mixins/icon.cr#L6"},"def":{"name":"name","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"name_part(-1)"}},{"html_id":"set-instance-method","name":"set","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/lucky_svg_sprite/mixins/icon.cr","line_number":10,"url":"https://github.com/wout/lucky_svg_sprite/blob/880b5f09e6ca566b8619752ed7a07f57ab10f395/src/lucky_svg_sprite/mixins/icon.cr#L10"},"def":{"name":"set","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"name_part(-2)"}}],"macros":[],"types":[]},{"html_id":"lucky_svg_sprite/LuckySvgSprite/Mixins/Set","path":"LuckySvgSprite/Mixins/Set.html","kind":"module","full_name":"LuckySvgSprite::Mixins::Set","name":"Set","abstract":false,"superclass":null,"ancestors":[],"locations":[{"filename":"src/lucky_svg_sprite/mixins/set.cr","line_number":1,"url":"https://github.com/wout/lucky_svg_sprite/blob/880b5f09e6ca566b8619752ed7a07f57ab10f395/src/lucky_svg_sprite/mixins/set.cr#L1"}],"repository_name":"lucky_svg_sprite","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[{"html_id":"lucky_svg_sprite/LuckySvgSprite/Set","kind":"class","full_name":"LuckySvgSprite::Set","name":"Set"}],"namespace":{"html_id":"lucky_svg_sprite/LuckySvgSprite/Mixins","kind":"module","full_name":"LuckySvgSprite::Mixins","name":"Mixins"},"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[{"html_id":"class_name-instance-method","name":"class_name","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/lucky_svg_sprite/mixins/set.cr","line_number":6,"url":"https://github.com/wout/lucky_svg_sprite/blob/880b5f09e6ca566b8619752ed7a07f57ab10f395/src/lucky_svg_sprite/mixins/set.cr#L6"},"def":{"name":"class_name","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"\"svg-sprite svg-#{name}-set\""}},{"html_id":"name-instance-method","name":"name","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/lucky_svg_sprite/mixins/set.cr","line_number":10,"url":"https://github.com/wout/lucky_svg_sprite/blob/880b5f09e6ca566b8619752ed7a07f57ab10f395/src/lucky_svg_sprite/mixins/set.cr#L10"},"def":{"name":"name","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"{{ (@type.id.split(\"::\")).last.underscore.gsub(/_/, \"-\") }}"}},{"html_id":"style-instance-method","name":"style","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/lucky_svg_sprite/mixins/set.cr","line_number":2,"url":"https://github.com/wout/lucky_svg_sprite/blob/880b5f09e6ca566b8619752ed7a07f57ab10f395/src/lucky_svg_sprite/mixins/set.cr#L2"},"def":{"name":"style","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"\"display:none\""}}],"macros":[],"types":[]}]},{"html_id":"lucky_svg_sprite/LuckySvgSprite/Set","path":"LuckySvgSprite/Set.html","kind":"class","full_name":"LuckySvgSprite::Set","name":"Set","abstract":true,"superclass":{"html_id":"lucky_svg_sprite/Lucky/BaseComponent","kind":"class","full_name":"Lucky::BaseComponent","name":"BaseComponent"},"ancestors":[{"html_id":"lucky_svg_sprite/LuckySvgSprite/Mixins/Set","kind":"module","full_name":"LuckySvgSprite::Mixins::Set","name":"Set"},{"html_id":"lucky_svg_sprite/Lucky/BaseComponent","kind":"class","full_name":"Lucky::BaseComponent","name":"BaseComponent"},{"html_id":"lucky_svg_sprite/Lucky/HTMLBuilder","kind":"module","full_name":"Lucky::HTMLBuilder","name":"HTMLBuilder"},{"html_id":"lucky_svg_sprite/Lucky/SelectHelpers","kind":"module","full_name":"Lucky::SelectHelpers","name":"SelectHelpers"},{"html_id":"lucky_svg_sprite/Lucky/LabelHelpers","kind":"module","full_name":"Lucky::LabelHelpers","name":"LabelHelpers"},{"html_id":"lucky_svg_sprite/Lucky/InputHelpers","kind":"module","full_name":"Lucky::InputHelpers","name":"InputHelpers"},{"html_id":"lucky_svg_sprite/Lucky/TagDefaults","kind":"module","full_name":"Lucky::TagDefaults","name":"TagDefaults"},{"html_id":"lucky_svg_sprite/Lucky/RenderIfDefined","kind":"module","full_name":"Lucky::RenderIfDefined","name":"RenderIfDefined"},{"html_id":"lucky_svg_sprite/Lucky/HelpfulParagraphError","kind":"module","full_name":"Lucky::HelpfulParagraphError","name":"HelpfulParagraphError"},{"html_id":"lucky_svg_sprite/Lucky/MountComponent","kind":"module","full_name":"Lucky::MountComponent","name":"MountComponent"},{"html_id":"lucky_svg_sprite/Lucky/ForgeryProtectionHelpers","kind":"module","full_name":"Lucky::ForgeryProtectionHelpers","name":"ForgeryProtectionHelpers"},{"html_id":"lucky_svg_sprite/Lucky/TimeHelpers","kind":"module","full_name":"Lucky::TimeHelpers","name":"TimeHelpers"},{"html_id":"lucky_svg_sprite/Lucky/UrlHelpers","kind":"module","full_name":"Lucky::UrlHelpers","name":"UrlHelpers"},{"html_id":"lucky_svg_sprite/Lucky/HTMLTextHelpers","kind":"module","full_name":"Lucky::HTMLTextHelpers","name":"HTMLTextHelpers"},{"html_id":"lucky_svg_sprite/Lucky/TextHelpers","kind":"module","full_name":"Lucky::TextHelpers","name":"TextHelpers"},{"html_id":"lucky_svg_sprite/Lucky/NumberToCurrency","kind":"module","full_name":"Lucky::NumberToCurrency","name":"NumberToCurrency"},{"html_id":"lucky_svg_sprite/Lucky/AssetHelpers","kind":"module","full_name":"Lucky::AssetHelpers","name":"AssetHelpers"},{"html_id":"lucky_svg_sprite/Lucky/Assignable","kind":"module","full_name":"Lucky::Assignable","name":"Assignable"},{"html_id":"lucky_svg_sprite/Lucky/SpecialtyTags","kind":"module","full_name":"Lucky::SpecialtyTags","name":"SpecialtyTags"},{"html_id":"lucky_svg_sprite/Lucky/FormHelpers","kind":"module","full_name":"Lucky::FormHelpers","name":"FormHelpers"},{"html_id":"lucky_svg_sprite/Habitat/SettingsHelpers","kind":"module","full_name":"Habitat::SettingsHelpers","name":"SettingsHelpers"},{"html_id":"lucky_svg_sprite/Habitat/TempConfig","kind":"module","full_name":"Habitat::TempConfig","name":"TempConfig"},{"html_id":"lucky_svg_sprite/Lucky/LinkHelpers","kind":"module","full_name":"Lucky::LinkHelpers","name":"LinkHelpers"},{"html_id":"lucky_svg_sprite/Lucky/CustomTags","kind":"module","full_name":"Lucky::CustomTags","name":"CustomTags"},{"html_id":"lucky_svg_sprite/Lucky/CheckTagContent","kind":"module","full_name":"Lucky::CheckTagContent","name":"CheckTagContent"},{"html_id":"lucky_svg_sprite/Lucky/BaseTags","kind":"module","full_name":"Lucky::BaseTags","name":"BaseTags"},{"html_id":"lucky_svg_sprite/Lucky/CheckTagContent","kind":"module","full_name":"Lucky::CheckTagContent","name":"CheckTagContent"},{"html_id":"lucky_svg_sprite/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"lucky_svg_sprite/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/lucky_svg_sprite/set.cr","line_number":1,"url":"https://github.com/wout/lucky_svg_sprite/blob/880b5f09e6ca566b8619752ed7a07f57ab10f395/src/lucky_svg_sprite/set.cr#L1"}],"repository_name":"lucky_svg_sprite","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[{"id":"ASSIGNS","name":"ASSIGNS","value":"[] of Nil","doc":null,"summary":null}],"included_modules":[{"html_id":"lucky_svg_sprite/LuckySvgSprite/Mixins/Set","kind":"module","full_name":"LuckySvgSprite::Mixins::Set","name":"Set"}],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"lucky_svg_sprite/LuckySvgSprite","kind":"module","full_name":"LuckySvgSprite","name":"LuckySvgSprite"},"doc":null,"summary":null,"class_methods":[{"html_id":"file_location-class-method","name":"file_location","doc":"Returns the relative file location to the\nproject root. e.g. src/components/my_component.cr","summary":"<p>Returns the relative file location to the project root.</p>","abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/lucky_svg_sprite/set.cr","line_number":1,"url":"https://github.com/wout/lucky_svg_sprite/blob/880b5f09e6ca566b8619752ed7a07f57ab10f395/src/lucky_svg_sprite/set.cr#L1"},"def":{"name":"file_location","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"\"/home/runner/work/lucky_svg_sprite/lucky_svg_sprite/src/lucky_svg_sprite/set.cr\".gsub(\"#{Dir.current}/\", \"\")"}}],"constructors":[],"instance_methods":[{"html_id":"render-instance-method","name":"render","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/lucky_svg_sprite/set.cr","line_number":6,"url":"https://github.com/wout/lucky_svg_sprite/blob/880b5f09e6ca566b8619752ed7a07f57ab10f395/src/lucky_svg_sprite/set.cr#L6"},"def":{"name":"render","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"tag(\"svg\", class: class_name, style: style, xmlns: \"http://www.w3.org/2000/svg\") do\n  tag(\"defs\") do\n    render_icons\n  end\nend"}},{"html_id":"render_icons-instance-method","name":"render_icons","doc":null,"summary":null,"abstract":true,"args":[],"args_string":"","args_html":"","location":{"filename":"src/lucky_svg_sprite/set.cr","line_number":4,"url":"https://github.com/wout/lucky_svg_sprite/blob/880b5f09e6ca566b8619752ed7a07f57ab10f395/src/lucky_svg_sprite/set.cr#L4"},"def":{"name":"render_icons","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":""}}],"macros":[],"types":[]}]}]}})