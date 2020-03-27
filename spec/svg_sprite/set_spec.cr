require "../spec_helper"

def test_svg_sprite_set
  SvgSprite::BeautyAndTheBeast.new
end

describe SvgSprite::Set do
  describe "#style" do
    it "hides the element" do
      test_svg_sprite_set.style.should eq("display:none")
    end
  end

  describe "#class_name" do
    it "defines a set id" do
      test_svg_sprite_set.class_name
        .should eq("svg-sprite svg-beauty-and-the-beast-set")
    end
  end

  describe "name" do
    it "returns the name of the set" do
      test_svg_sprite_set.name.should eq("beauty-and-the-beast")
    end
  end
end

module SvgSprite
  class BeautyAndTheBeast
    include SvgSprite::Set
  end
end
