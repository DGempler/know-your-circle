FactoryGirl.define do
  sequence :email do |n|
    "person_#{n}@a.com"
  end
  sequence :first_name do |n|
    "first_#{n}"
  end
  sequence :last_name do |n|
    "last_#{n}"
  end
end

FactoryGirl.define do
  factory :user, :class => 'User' do
    email
    first_name
    last_name
    password 'password'
    password_confirmation 'password'
  end
end