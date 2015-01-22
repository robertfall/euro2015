# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.
require 'active_support/core_ext/string/inflections'

include Nanoc::Helpers::Blogging
include Nanoc::Helpers::Tagging
include Nanoc::Helpers::LinkTo

def images_for(country)
  items.select {|i| i.identifier =~ /images\/#{country}/}
end

def countries
  articles.map { |a| a[:country] }.uniq
end
