# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.
require 'active_support/core_ext/string/inflections'
require 'json'

include Nanoc::Helpers::Blogging
include Nanoc::Helpers::Tagging
include Nanoc::Helpers::LinkTo
include Nanoc::Helpers::XMLSitemap

def images_for(country)
  items.select {|i| i.identifier =~ /images\/#{country}\/\d\d/}
end

def thumbs_for(country)
  items.select {|i| i.identifier =~ /images\/#{country}\/thumbs\/\d\d/}
end

def thumbnail_json
  collection = []
  countries.each do |c|
    collection << { name: c, code:c.parameterize.underscore, class: c.parameterize, thumbs: thumbs_for(c.parameterize.underscore).map { |t| File.basename(t[:filename])}}
  end
  collection.to_json
end

def countries
  articles.map { |a| a[:country] }.uniq
end

def video(path, poster_path)
<<-eos
  <video autoplay="autoplay" controls="controls" loop="loop" poster="#{poster_path}" preload="auto">
      <source src="#{path}">
    </video>
eos
end
