require 'yelp'

Yelp.client.configure do |config|
  config.consumer_key = 'BEN0ftR6BkEy9e26y1SiAA'
  config.consumer_secret = '7iDa0nBtEoDXC6pX3JvP7O0NN5M'
  config.token = 'sHw_R6K4i0ZqTKMmm0iarKWYHF6TyRsC'
  config.token_secret = 'QHABwuphCtKSkkAv3P1MLVvv-8E'
end



# client = Yelp::Client.new({ consumer_key: "BEN0ftR6BkEy9e26y1SiAA",
#                             consumer_secret: "7iDa0nBtEoDXC6pX3JvP7O0NN5M",
#                             token: "sHw_R6K4i0ZqTKMmm0iarKWYHF6TyRsC",
#                             token_secret: "QHABwuphCtKSkkAv3P1MLVvv-8E"
#                           })