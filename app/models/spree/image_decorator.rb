Spree::Image.class_eval do
  attachment_definitions[:attachment][:path] = '/spree/products/:id/:style/:basename.:extension'
end
