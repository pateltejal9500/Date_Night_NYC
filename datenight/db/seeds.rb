# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Neighborhood.delete_all
Event.delete_all

the_bronx = Neighborhood.create({
name: "The Bronx",
zipcode: 10451
})

bay_ridge = Neighborhood.create({
name: "Bay Ridge",
zipcode: 11209
})

bedford_stuyvesant = Neighborhood.create({
name: "Bedford-Stuyvesant",
zipcode: 11205
})

boerum_hill = Neighborhood.create({
name: "Boerum Hill",
zipcode: 11201
})

brighton_beach = Neighborhood.create({
name: "Brighton Beach",
zipcode: 11235
})

brooklyn_heights = Neighborhood.create({
name: "Brooklyn Heights",
zipcode: 11201
})

bushwick = Neighborhood.create({
name: "Bushwick",
zipcode: 11221
})

carroll_gardens = Neighborhood.create({
name: "Carroll Gardens",
zipcode: 11231
})

clinton_hill = Neighborhood.create({
name: "Clinton Hill",	
zipcode: 11205
})

crown_heights = Neighborhood.create({
name: "Crown Heights",
zipcode: 11225
})

ditmas_park = Neighborhood.create({
name: "Ditmas Park",
zipcode: 11218
})

downtown_brooklyn = Neighborhood.create({
name: "Downtown Brooklyn",
zipcode: 11201	
})

dumbo = Neighborhood.create({
name: "DUMBO",
zipcode: 11201	
})

flatbush = Neighborhood.create({
name: "Flatbush",
zipcode: 11226
})

fort_greene = Neighborhood.create({
name: "Fort Greene",
zipcode: 11205
})

gowanus = Neighborhood.create({
name:	"Gowanus",
zipcode: 11217
})

greenpoint = Neighborhood.create({
name: "Greenpoint",
zipcode: 11222
})

kensington = Neighborhood.create({
name: "Kensington",
zipcode: 11218	
})

park_slope = Neighborhood.create({
name: "Park Slope",
zipcode: 11215
})

prospect_heights = Neighborhood.create({
name: "Prospect Heights",
zipcode: 11238	
})

prospect_lefferts_gardens = Neighborhood.create({
name: "Prospect Lefferts Gardens",
zipcode: 11225
})

red_hook = Neighborhood.create({
name: "Red Hook",
zipcode: 11231
})

sunset_park = Neighborhood.create({
name: "Sunset Park",
zipcode: 11220
})

williamsburg = Neighborhood.create({
name: "Williamsburg", 
zipcode: 11206
})

windsor_terrace = Neighborhood.create({
name: "Windsor Terrace", 
zipcode: 11215
})


alphabet_city = Neighborhood.create({
name: "Alphabet City",
zipcode: 10014
})

battery_park_city = Neighborhood.create({
name: "Battery Park City",
zipcode: 10004
})

chelsea = Neighborhood.create({
name: "Chelsea",
zipcode: 10011
})

chinatown = Neighborhood.create({
name: "Chinatown",
zipcode: 10013
})

clinton = Neighborhood.create({
name: "Clinton/Hell's Kitchen",
zipcode: 10019
})

east_harlem = Neighborhood.create({
name: "East Harlem",
zipcode: 10035
})

east_village = Neighborhood.create({
name: "East Village",
zipcode: 10009
})

financial_district = Neighborhood.create({
name: "Financial District",
zipcode: 10038
})

gramercy_park = Neighborhood.create({
name: "Gramercy Park",
zipcode: 10010
})

hamilton_heights = Neighborhood.create({
name: "Hamilton Heights",
zipcode: 10031
})

harlem = Neighborhood.create({
name: "Harlem",
zipcode: 10026
})

inwood = Neighborhood.create({
name: "Inwood",
zipcode: 10034
})

kips_bay = Neighborhood.create({
name: "Kips Bay",
zipcode: 10016
})

lenox_hill = Neighborhood.create({
name: "Lenox Hill",
zipcode: 10021
})

lincoln_square = Neighborhood.create({
name: "Lincoln Square",
zipcode: 10023
})

little_italy = Neighborhood.create({
name: "Little Italy",
zipcode: 10013
})

lower_east_side = Neighborhood.create({
name: "Lower East Side",
zipcode: 10002
})

manhattan_valley = Neighborhood.create({
name: "Manhattan Valley",
zipcode: 10025
})

manhattanville = Neighborhood.create({
name: "Manhattanville",
zipcode: 10031
})

midtown = Neighborhood.create({
name: "Midtown",
zipcode: 10019
})

morningside_heights = Neighborhood.create({
name: "Morningside Heights",
zipcode: 10027
})

murray_hill = Neighborhood.create({
name: "Murray Hill",
zipcode: 10016
})

noho = Neighborhood.create({
name: "NoHo",
zipcode: 10003
})

peter_cooper_village = Neighborhood.create({
name: "Peter Cooper Village",
zipcode: 10009
})

randalls_island = Neighborhood.create({
name: "Randall’s Island",
zipcode: 10035
})

roosevelt_island = Neighborhood.create({
name: "Roosevelt Island",
zipcode: 10044
})

soho = Neighborhood.create({
name: "SoHo",
zipcode: 10013
})

spanish_harlem = Neighborhood.create({
name: "Spanish Harlem",
zipcode: 10035
})

stuyvesant_town = Neighborhood.create({
name: "Stuyvesant Town",
zipcode: 10009
})

sutton_place = Neighborhood.create({
name: "Sutton Place",
zipcode: 10022
})

tribeca = Neighborhood.create({
name: "TriBeCa",
zipcode: 10013
})

tudor_city = Neighborhood.create({
name: "Tudor City",
zipcode: 10017
})

turtle_bay = Neighborhood.create({
name: "Turtle Bay",
zipcode: 10017
})

two_bridges = Neighborhood.create({
name: "Two Bridges",
zipcode: 10002
})

upper_east_side = Neighborhood.create({
name: "Upper East Side",
zipcode: 10021
})

upper_west_side = Neighborhood.create({
name: "Upper West Side",
zipcode: 10023
})

washington_heights = Neighborhood.create({
name: "Washington Heights",
zipcode: 10031
})

west_village = Neighborhood.create({
name: "West Village",
zipcode: 10014
})

yorkville = Neighborhood.create({
name: "Yorkville",
zipcode: 10021
})


astoria = Neighborhood.create({
name: "Astoria",	
zipcode: 11102
})

bayside = Neighborhood.create({
name: "Bayside",
zipcode: 11359
})

breezy_point = Neighborhood.create({
name: "Breezy Point",
zipcode: 11697
})

college_point = Neighborhood.create({
name: "College Point",	
zipcode: 11356
})

corona = Neighborhood.create({
name: "Corona",	
zipcode: 11368
})

elmhurst = Neighborhood.create({
name: "Elmhurst",	
zipcode: 11373
})

far_rockaway = Neighborhood.create({
name: "Far Rockaway",
zipcode: 11690
})

flushing = Neighborhood.create({
name: "Flushing",	
zipcode: 11351
})

forest_hills = Neighborhood.create({
name: "Forest Hills",	
zipcode: 11375
})

fresh_meadows = Neighborhood.create({
name: "Fresh Meadows",	
zipcode: 11365
})

jackson_heights = Neighborhood.create({
name: "Jackson Heights",	
zipcode: 11372
})

jamaica = Neighborhood.create({
name: "Jamaica",	
zipcode: 11405
})

long_island_city = Neighborhood.create({
name: "Long Island City",	
zipcode: 11101
})

ozone_park = Neighborhood.create({
name: "Ozone Park",	
zipcode: 11416
})

queens_village = Neighborhood.create({
name: "Queens Village",	
zipcode: 11427
})

rego_park = Neighborhood.create({
name: "Rego Park",	
zipcode: 11374
})

richmond_hill = Neighborhood.create({
name: "Richmond Hill",	
zipcode: 11418
})

ridgewood = Neighborhood.create({
name: "Ridgewood",	
zipcode: 11385
})

rockaway_park = Neighborhood.create({
name: "Rockaway Park",	
zipcode: 11694
})

sunnyside = Neighborhood.create({
name: "Sunnyside",	
zipcode: 11104
})

whitestone = Neighborhood.create({
name: "Whitestone",	
zipcode: 11357
})

woodhaven = Neighborhood.create({
name: "Woodhaven",	
zipcode: 11421
})

woodside = Neighborhood.create({
name: "Woodside",	
zipcode: 11377
})

staten_island = Neighborhood.create({
name: "Staten Island",
zipcode: 10314
})



hot_air_balloon_ride = Event.create({
name: "Hot Air Balloon Ride",
url: "http://www.abovethecloudsinc.com/",
rating: 5
  })    

walking_tour = Event.create({
name: "Go on a Walking Tour",
url: "http://www.freetoursbyfoot.com/new-york-tours/",
rating: 3
  }) 

art_after_dark = Event.create({
name: "Visit Museums After Dark",
url: "http://www.newyork.com/articles/attractions/museums-after-dark-66062/",
rating: 5  
}) 

dinner_movies = Event.create({
name: "Eat Dinner at the Movies",
url: "http://nypost.com/2014/01/15/movie-theaters-with-dining-options-on-the-rise-in-the-city/",
rating: 4
  })

bowling = Event.create({
name: "Go Bowling",
url: "http://www.nyc.com/best-of-new-york/best_bowling_alleys_in_new_york.s1171/",
rating: 3
  })
  
bocce = Event.create({
name: "Bocce Ball and Beers",
url: "http://www.newyork.com/articles/attractions/10-best-nyc-bars-with-games-drink-play-fun-35341/",
rating: 4
  })  

shuffleboard = Event.create({
name: "Play Some Shuffleboard",
url: "http://www.yelp.com/search?find_desc=Bars+With+Shuffleboard&find_loc=New+York%2C+NY",  
rating: 5
  })

waterfront_walks = Event.create({
name: "Take a Waterfront Stroll",
url: "http://www.fodors.com/world/north-america/usa/new-york/new-york-city/feature_30009.html",
rating: 4
  })

ferry_ride = Event.create({
name: "Take a Ferry Ride",
url: "http://www.siferry.com/",
rating: 4
  })

botanical_garden = Event.create({
name: "Evening Events at New York City's Botanical Gardens",
url: "http://www.timeout.com/newyork/attractions/the-best-gardens-in-nyc-parks-gardens",
rating: 5
  })

batting_cages = Event.create({
  name: "Go to the Batting Cages",
  url: "http://newyork.cbslocal.com/top-lists/best-batting-cages-in-new-york/",
  rating: 3
  })

planetarium = Event.create({
  name: "Go to the Planetarium",
  url: "http://www.amnh.org/our-research/hayden-planetarium",
  rating: 3
  })

golf = Event.create({
  name: "Go to the Driving Range",
  url: "http://www.nycgo.com/articles/tee-time-6-nyc-driving-ranges",
  rating: 3
  })

horseback_riding = Event.create({
  name: "Go Horseback Riding",
  url: "http://nymag.com/nymetro/arts/columns/topfive/n_8814/",
  rating: 5
  })

cooking_class = Event.create({
  name: "Take a Cooking Class for Two",
  url: "http://newyork.cbslocal.com/top-lists/the-7-best-cooking-classes-in-n-y-n-j/",
  rating: 5
  })

ice_skating = Event.create({
  name: "Go Ice Skating",
  url: "http://manhattan.about.com/od/governmentandpolitics/tp/iceskatingnyc.htm",
  rating: 3
  })

roller_skating = Event.create({
  name: "Go Roller Skating",
  url: "http://www.timeout.com/newyork/things-to-do/where-to-roller-skate-roller-skating-rinks-and-parties-i...",
  rating: 4
  })

rock_climbing = Event.create({
  name: "Go Rock Climbing",
  url: "http://newyork.cbslocal.com/guide/indoor-climbing-10-places-to-get-your-rock-on/",
  rating: 3
  })
