Spree::Image.class_eval do
  attachment_definitions[:attachment][:storage] = :s3
  attachment_definitions[:attachment][:path] = 'spree/products/:id/:style/:basename.:extension'
  attachment_definitions[:attachment][:url] = ':s3_path_url'
end
