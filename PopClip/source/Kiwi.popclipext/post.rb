post_text = ENV['POPCLIP_TEXT'].chomp
kiwi_post_params = nil

if post_text.match(/^\/.+(png|jpg|gif|jpeg)$/)
	if File.exists?(post_text)
		kiwi_post_params = "image=#{post_text}"
	end
end

if kiwi_post_params.nil?
	kiwi_post_params = "text=#{post_text}"
	if ENV['POPCLIP_MODIFIER_FLAGS'] == '1048576'
		kiwi_post_params += "&window=false"
	end
end

system("open 'kiwi://post?#{kiwi_post_params}'")