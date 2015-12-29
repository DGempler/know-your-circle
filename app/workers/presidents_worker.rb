class PresidentsWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform(president_array, index, groups)
    president = Hash.new
    image = ""
    party = president_array[2]
    alive_presidents = ["Carter", "Bush", "Clinton", "Obama"]
    wiki_url = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&pithumbsize=300&piprop=thumbnail&format=json&exintro=1&explaintext=1&titles=#{ president_array[0] }"
    response = Typhoeus.get(wiki_url).body
    wiki_response = JSON.parse(response)['query']

    name = wiki_response['normalized'][0]['to'].split(" ")

    president[:first_name] = name[0]
    president[:last_name] = name[-1]

    if name.length == 3
      president[:middle_name] = name[1]
    elsif name.length == 4
      president[:middle_name] = "#{ name[1] } #{ name[2] }"
    end

    wiki_response_pages = wiki_response['pages']

    wiki_response_pages.each do |page_id, object|
      president[:bio] = wiki_response_pages[page_id]['extract']
      image = wiki_response_pages[page_id]['thumbnail']['source']
    end

    order = index + 1

    if order == 1 || order == 21 || order == 31 || order == 41
      number_suffix = "st"
    elsif order == 2 || order == 22 || order == 32 || order == 42
      number_suffix = "nd"
    elsif order == 3 || order == 23 || order == 33 || order == 43
      number_suffix = "rd"
    else
      number_suffix = "th"
    end

    president[:hints] = [
      "Was the #{ order }#{ number_suffix } President of the United States",
      "Term of office was #{ president_array[1] }",
      "Party affiliation: #{ party }"
    ]

    if president[:first_name] == "Grover"
      president[:hints][0] = "Was the 22nd & 24th President of the United States"
      president[:hints][1] = "Terms of office were March 4, 1885 – March 4, 1889 AND March 4, 1893 – March 4, 1897"
    end

    guest_user_person = GuestUserPerson.create(president)
    guest_user_person.image_from_url image


    if party == "Democratic"
      dem_group = Group.find(groups['dem'])
      guest_user_person.groups << dem_group
    elsif party == "Republican"
      rep_group = Group.find(groups['rep'])
      guest_user_person.groups << rep_group
    else
      other_party_group = Group.find(groups['other_party'])
      guest_user_person.groups << other_party_group
    end



    if alive_presidents.include? president[:last_name]
      alive_group = Group.find(groups['alive'])
      guest_user_person.groups << alive_group
    else
      dead_group = Group.find(groups['dead'])
      guest_user_person.groups << dead_group
    end

    guest_user_person.save

    puts "guest_user_person: #{guest_user_person.id}"
  end
end