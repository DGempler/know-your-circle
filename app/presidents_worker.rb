class PresidentsWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

    def perform(president_array, index)
      president = Hash.new
      wiki_url = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=#{ president_array[1] }&format=json&exintro=1"
      wiki_response = JSON.parse(Typhoeus.get(wiki_url)).query

      name = wiki_response.normalized.to.split(" ")

      president.first_name = name[0]
      president.last_name = name[-1]

      if name.length == 3
        president.middle_name = name[1]
      elsif name.length == 4
        president.middle_name = "#{ name[1] } #{ name[2] }"
      end

      wiki_response_pages = wiki_response.pages

      wiki_response_pages.each do |key|
        president.bio = wiki_response_pages[key].extract
        #clean up HTML
      end

      order = index + 1

      if order == 1
        number_suffix = "st"
      elsif order == 2
        number_suffix = "nd"
      elsif order == 3
        number_suffix = "rd"
      else
        number_suffix = "th"
      end

      president.hints = [
        "Was our #{ order }#{ number_suffix } president.",
        "Term of office was #{ president_array[2] }.",
        "Party affiliation was #{ president_array[3] }"
      ]

      #president.image - use Paperclip to download image and then assign to president.image?

      guest_user_person = GuestUserPerson.create(president)
      puts "guest_user_person: #{guest_user_person.id}"
    end
end