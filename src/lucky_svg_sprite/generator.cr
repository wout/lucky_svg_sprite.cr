class LuckySvgSprite::Generator
  getter icons : Array(String)

  def initialize(@path : String)
    @icons = Dir.glob("#{@path}/*.svg").sort
  end

  def concatenate(format : Format)
    icons.map do |icon|
      Converter.from_file(icon, format)
    end.join("\n").strip
  end

  def manifest
    icons.map do |icon|
      %("#{Inflector.dasherize(icon, from_path: true)}")
    end.join(", ")
  end

  def icon_classes
    icons.map do |icon|
      "class #{Inflector.classify(icon, from_path: true)} < BaseSvgIcon; end"
    end
  end

  def sprite_name
    Inflector.classify(@path, from_path: true)
  end

  def generate(format : Format)
    format.indent = 4
    <<-CODE
    # DO NOT EDIT! This file is generated by the lucky_svg_sprite shard.
    # More information available here:
    # https://github.com/tilishop/lucky_svg_sprite.cr#generating-sprites
    class SvgSprite::#{sprite_name} < BaseSvgSprite
      MANIFEST = {#{manifest}}

      def render_icons
        #{concatenate(format)}
      end

      #{icon_classes.join("\n  ")}
    end
    CODE
  end
end
