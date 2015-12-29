desc "Create Presidents People"
namespace :db do
  namespace :seed do
    task :presidents => :environment do
      @presidents = [

        ["https://en.wikipedia.org/wiki/George_Washington", "George_Washington", "April 30, 1789 – March 4, 1797", "Non-partisan"],
        ["https://en.wikipedia.org/wiki/John_Adams", "John_Adams", "March 4, 1797 – March 4, 1801", "Federalist"],
        ["https://en.wikipedia.org/wiki/Thomas_Jefferson", "Thomas_Jefferson", "March 4, 1801 – March 4, 1809", "Democratic-Republican"],
        ["https://en.wikipedia.org/wiki/James_Madison", "James_Madison", "March 4, 1809 – March 4, 1817", "Democratic-Republican"],
        ["https://en.wikipedia.org/wiki/James_Monroe", "James_Monroe", "March 4, 1817 – March 4, 1825", "Democratic-Republican"],
        ["https://en.wikipedia.org/wiki/John_Quincy_Adams", "John_Quincy_Adams", "March 4, 1825 – March 4, 1829", "Democratic-Republican"],
        ["https://en.wikipedia.org/wiki/Andrew_Jackson", "Andrew_Jackson", "March 4, 1829 – March 4, 1837", "Democratic"],
        ["https://en.wikipedia.org/wiki/Martin_Van_Buren", "Martin_Van_Buren", "March 4, 1837 – March 4, 1841", "Democratic"],
        ["https://en.wikipedia.org/wiki/William_Henry_Harrison", "William_Henry_Harrison", "March 4, 1841 – April 4, 1841", "Whig"],
        ["https://en.wikipedia.org/wiki/John_Tyler", "John_Tyler", "April 4, 1841 – March 4, 1845", "Whig"],
        ["https://en.wikipedia.org/wiki/James_K._Polk", "James_K._Polk", "March 4, 1845 – March 4, 1849", "Democratic"],
        ["https://en.wikipedia.org/wiki/Zachary_Taylor", "Zachary_Taylor", "March 4, 1849 – July 9, 1850", "Whig"],
        ["https://en.wikipedia.org/wiki/Millard_Fillmore", "Millard_Fillmore", "July 9, 1850 – March 4, 1853", "Whig"],
        ["https://en.wikipedia.org/wiki/Franklin_Pierce", "Franklin_Pierce", "March 4, 1853 – March 4, 1857", "Democratic"],
        ["https://en.wikipedia.org/wiki/James_Buchanan", "James_Buchanan", "March 4, 1857 – March 4, 1861", "Democratic"],
        ["https://en.wikipedia.org/wiki/Abraham_Lincoln", "Abraham_Lincoln", "March 4, 1861 – April 15, 1865", "Republican"],
        ["https://en.wikipedia.org/wiki/Andrew_Johnson", "Andrew_Johnson", "April 15, 1865 – March 4, 1869", "Democratic"],
        ["https://en.wikipedia.org/wiki/Ulysses_S._Grant", "Ulysses_S._Grant", "March 4, 1869 – March 4, 1877", "Republican"],
        ["https://en.wikipedia.org/wiki/Rutherford_B._Hayes", "Rutherford_B._Hayes", "March 4, 1877 – March 4, 1881", "Republican"],
        ["https://en.wikipedia.org/wiki/James_A._Garfield", "James_A._Garfield", "March 4, 1881 – September 19, 1881", "Republican"],
        ["https://en.wikipedia.org/wiki/Chester_A._Arthur", "Chester_A._Arthur", "September 19, 1881 – March 4, 1885", "Republican"],
        ["https://en.wikipedia.org/wiki/Grover_Cleveland", "Grover_Cleveland", "March 4, 1885 – March 4, 1889", "Democratic"],
        ["https://en.wikipedia.org/wiki/Benjamin_Harrison", "Benjamin_Harrison", "March 4, 1889 – March 4, 1893", "Republican"],
        ["https://en.wikipedia.org/wiki/Grover_Cleveland", "Grover_Cleveland", "March 4, 1893 – March 4, 1897", "Democratic"],
        ["https://en.wikipedia.org/wiki/William_McKinley", "William_McKinley", "March 4, 1897 – September 14, 1901", "Republican"],
        ["https://en.wikipedia.org/wiki/Theodore_Roosevelt", "Theodore_Roosevelt", "September 14, 1901 – March 4, 1909", "Republican"],
        ["https://en.wikipedia.org/wiki/William_Howard_Taft", "William_Howard_Taft", "March 4, 1909 – March 4, 1913", "Republican"],
        ["https://en.wikipedia.org/wiki/Woodrow_Wilson", "Woodrow_Wilson", "March 4, 1913 – March 4, 1921", "Democratic"],
        ["https://en.wikipedia.org/wiki/Warren_G._Harding", "Warren_G._Harding", "March 4, 1921 – August 2, 1923", "Republican"],
        ["https://en.wikipedia.org/wiki/Calvin_Coolidge", "Calvin_Coolidge", "August 2, 1923 – March 4, 1929", "Republican"],
        ["https://en.wikipedia.org/wiki/Herbert_Hoover", "Herbert_Hoover", "March 4, 1929 – March 4, 1933", "Republican"],
        ["https://en.wikipedia.org/wiki/Franklin_D._Roosevelt", "Franklin_D._Roosevelt", "March 4, 1933 – April 12, 1945", "Democratic"],
        ["https://en.wikipedia.org/wiki/Harry_S._Truman", "Harry_S._Truman", "April 12, 1945 – January 20, 1953", "Democratic"],
        ["https://en.wikipedia.org/wiki/Dwight_D._Eisenhower", "Dwight_D._Eisenhower", "January 20, 1953 – January 20, 1961", "Republican"],
        ["https://en.wikipedia.org/wiki/John_F._Kennedy", "John_F._Kennedy", "January 20, 1961 – November 22, 1963", "Democratic"],
        ["https://en.wikipedia.org/wiki/Lyndon_B._Johnson", "Lyndon_B._Johnson", "November 22, 1963 – January 20, 1969", "Democratic"],
        ["https://en.wikipedia.org/wiki/Richard_Nixon", "Richard_Nixon", "January 20, 1969 – August 9, 1974", "Republican"],
        ["https://en.wikipedia.org/wiki/Gerald_Ford", "Gerald_Ford", "August 9, 1974 – January 20, 1977", "Republican"],
        ["https://en.wikipedia.org/wiki/Jimmy_Carter", "Jimmy_Carter", "January 20, 1977 – January 20, 1981", "Democratic"],
        ["https://en.wikipedia.org/wiki/Ronald_Reagan", "Ronald_Reagan", "January 20, 1981 – January 20, 1989", "Republican"],
        ["https://en.wikipedia.org/wiki/George_H._W._Bush", "George_H._W._Bush", "January 20, 1989 – January 20, 1993", "Republican"],
        ["https://en.wikipedia.org/wiki/Bill_Clinton", "Bill_Clinton", "January 20, 1993 – January 20, 2001", "Democratic"],
        ["https://en.wikipedia.org/wiki/George_W._Bush", "George_W._Bush", "January 20, 2001 – January 20, 2009", "Republican"],
        ["https://en.wikipedia.org/wiki/Barack_Obama", "Barack_Obama", "January 20, 2009 – present day", "Democratic"]





      ]

      @presidents.each do |presidents|
        PresidentsWorker.perform_async(presidents)
      end
    end
  end
end

=begin
"https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=George_Washington&format=json&exintro=1" #returns intro
        "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=George_Washington&format=json" #returns a bunch of stuff
        "https://en.wikipedia.org/w/api.php?action=query&titles=George_Washington&format=json&exintro=1" #returns basic page info (title, page ID)

        "https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&titles=George_Washington&format=json&exintro=1"


        "http://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=George_Washington&format=json"


        =end
