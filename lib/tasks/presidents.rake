desc "Create Presidents People"
namespace :db do
  namespace :seed do
    task :presidents => :environment do
      puts 'about to work'
      @presidents = [
        ["George_Washington", "April 30, 1789 – March 4, 1797", "Non-partisan"],
        ["John_Adams", "March 4, 1797 – March 4, 1801", "Federalist"],
        ["Thomas_Jefferson", "March 4, 1801 – March 4, 1809", "Democratic-Republican"],
        ["James_Madison", "March 4, 1809 – March 4, 1817", "Democratic-Republican"],
        ["James_Monroe", "March 4, 1817 – March 4, 1825", "Democratic-Republican"],
        ["John_Quincy_Adams", "March 4, 1825 – March 4, 1829", "Democratic-Republican"],
        ["Andrew_Jackson", "March 4, 1829 – March 4, 1837", "Democratic"],
        ["Martin_Van_Buren", "March 4, 1837 – March 4, 1841", "Democratic"],
        ["William_Henry_Harrison", "March 4, 1841 – April 4, 1841", "Whig"],
        ["John_Tyler", "April 4, 1841 – March 4, 1845", "Whig"],
        ["James_K._Polk", "March 4, 1845 – March 4, 1849", "Democratic"],
        ["Zachary_Taylor", "March 4, 1849 – July 9, 1850", "Whig"],
        ["Millard_Fillmore", "July 9, 1850 – March 4, 1853", "Whig"],
        ["Franklin_Pierce", "March 4, 1853 – March 4, 1857", "Democratic"],
        ["James_Buchanan", "March 4, 1857 – March 4, 1861", "Democratic"],
        ["Abraham_Lincoln", "March 4, 1861 – April 15, 1865", "Republican"],
        ["Andrew_Johnson", "April 15, 1865 – March 4, 1869", "Democratic"],
        ["Ulysses_S._Grant", "March 4, 1869 – March 4, 1877", "Republican"],
        ["Rutherford_B._Hayes", "March 4, 1877 – March 4, 1881", "Republican"],
        ["James_A._Garfield", "March 4, 1881 – September 19, 1881", "Republican"],
        ["Chester_A._Arthur", "September 19, 1881 – March 4, 1885", "Republican"],
        ["Grover_Cleveland", "March 4, 1885 – March 4, 1889", "Democratic"],
        ["Benjamin_Harrison", "March 4, 1889 – March 4, 1893", "Republican"],
        ["Grover_Cleveland", "March 4, 1893 – March 4, 1897", "Democratic"],
        ["William_McKinley", "March 4, 1897 – September 14, 1901", "Republican"],
        ["Theodore_Roosevelt", "September 14, 1901 – March 4, 1909", "Republican"],
        ["William_Howard_Taft", "March 4, 1909 – March 4, 1913", "Republican"],
        ["Woodrow_Wilson", "March 4, 1913 – March 4, 1921", "Democratic"],
        ["Warren_G._Harding", "March 4, 1921 – August 2, 1923", "Republican"],
        ["Calvin_Coolidge", "August 2, 1923 – March 4, 1929", "Republican"],
        ["Herbert_Hoover", "March 4, 1929 – March 4, 1933", "Republican"],
        ["Franklin_D._Roosevelt", "March 4, 1933 – April 12, 1945", "Democratic"],
        ["Harry_S._Truman", "April 12, 1945 – January 20, 1953", "Democratic"],
        ["Dwight_D._Eisenhower", "January 20, 1953 – January 20, 1961", "Republican"],
        ["John_F._Kennedy", "January 20, 1961 – November 22, 1963", "Democratic"],
        ["Lyndon_B._Johnson", "November 22, 1963 – January 20, 1969", "Democratic"],
        ["Richard_Nixon", "January 20, 1969 – August 9, 1974", "Republican"],
        ["Gerald_Ford", "August 9, 1974 – January 20, 1977", "Republican"],
        ["Jimmy_Carter", "January 20, 1977 – January 20, 1981", "Democratic"],
        ["Ronald_Reagan", "January 20, 1981 – January 20, 1989", "Republican"],
        ["George_H._W._Bush", "January 20, 1989 – January 20, 1993", "Republican"],
        ["Bill_Clinton", "January 20, 1993 – January 20, 2001", "Democratic"],
        ["George_W._Bush", "January 20, 2001 – January 20, 2009", "Republican"],
        ["Barack_Obama", "January 20, 2009 – present day", "Democratic"]
      ]

      @presidents.each_index do |index|
        PresidentsWorker.perform_async(@presidents[index], index)
      end
    end
  end
end