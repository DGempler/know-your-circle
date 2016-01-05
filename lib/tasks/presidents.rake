desc "Create Presidents People"
namespace :db do
  namespace :seed do
    task :presidents => :environment do
      groups = Hash.new
      groups['dead'] = Group.create(name: "Dead").id
      groups['alive'] = Group.create(name: "Alive").id
      groups['dem'] = Group.create(name: "Democratic").id
      groups['rep'] = Group.create(name: "Republican").id
      groups['other_party'] = Group.create(name: "Other Party").id
      puts "Groups Ids:"
      puts groups

      presidents = [
        ["Franklin_Pierce", "March 4, 1853 – March 4, 1857", "Democratic", 13],
        ["James_Buchanan", "March 4, 1857 – March 4, 1861", "Democratic", 14],
        ["Abraham_Lincoln", "March 4, 1861 – April 15, 1865", "Republican", 15],
        ["Andrew_Johnson", "April 15, 1865 – March 4, 1869", "Democratic", 16],
        ["Ulysses_S._Grant", "March 4, 1869 – March 4, 1877", "Republican", 17],
        ["Rutherford_B._Hayes", "March 4, 1877 – March 4, 1881", "Republican", 18],
        ["James_A._Garfield", "March 4, 1881 – September 19, 1881", "Republican", 19],
        ["Chester_A._Arthur", "September 19, 1881 – March 4, 1885", "Republican", 20],
        ["Grover_Cleveland", "March 4, 1885 – March 4, 1889", "Democratic", 21],
        ["Benjamin_Harrison", "March 4, 1889 – March 4, 1893", "Republican", 22],
        ["William_McKinley", "March 4, 1897 – September 14, 1901", "Republican", 23],
        ["Theodore_Roosevelt", "September 14, 1901 – March 4, 1909", "Republican", 24],
        ["William_Howard_Taft", "March 4, 1909 – March 4, 1913", "Republican", 25],
        ["Woodrow_Wilson", "March 4, 1913 – March 4, 1921", "Democratic", 26],
        ["Warren_G._Harding", "March 4, 1921 – August 2, 1923", "Republican", 27],
        ["Calvin_Coolidge", "August 2, 1923 – March 4, 1929", "Republican", 28],
        ["Herbert_Hoover", "March 4, 1929 – March 4, 1933", "Republican", 29],
        ["Franklin_D._Roosevelt", "March 4, 1933 – April 12, 1945", "Democratic", 30],
        ["Harry_S._Truman", "April 12, 1945 – January 20, 1953", "Democratic", 31],
        ["Dwight_D._Eisenhower", "January 20, 1953 – January 20, 1961", "Republican", 32],
        ["John_F._Kennedy", "January 20, 1961 – November 22, 1963", "Democratic", 33],
        ["Lyndon_B._Johnson", "November 22, 1963 – January 20, 1969", "Democratic", 34],
        ["Richard_Nixon", "January 20, 1969 – August 9, 1974", "Republican", 35],
        ["Gerald_Ford", "August 9, 1974 – January 20, 1977", "Republican", 36],
        ["Jimmy_Carter", "January 20, 1977 – January 20, 1981", "Democratic", 37],
        ["Ronald_Reagan", "January 20, 1981 – January 20, 1989", "Republican", 38],
        ["George_H._W._Bush", "January 20, 1989 – January 20, 1993", "Republican", 39],
        ["Bill_Clinton", "January 20, 1993 – January 20, 2001", "Democratic", 40],
        ["George_W._Bush", "January 20, 2001 – January 20, 2009", "Republican", 41],
        ["Barack_Obama", "January 20, 2009 – present day", "Democratic", 42]
      ]

      presidents.each do |president|
        PresidentsWorker.perform_async(president, groups)
      end
    end
  end
end