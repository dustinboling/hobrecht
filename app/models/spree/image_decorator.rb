Spree::Image.class_eval do
  attachment_definitions[:attachment][:path] = '/spree/products/:id/:style/:basename.:extension'
  attachment_definitions[:attachment][:url] = '//s3.amazonaws.com/hobrechtmedia/spree/products/:id/:style/:basename.:extension'
end
