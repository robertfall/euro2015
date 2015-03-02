class JsxFilter < Nanoc::Filter
  identifier :jsx
  type :text

  def run(content, params={})
    `echo "#{content}" | jsx`
  end
end
