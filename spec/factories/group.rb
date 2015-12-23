FactoryGirl.define do
  sequence :name do |n|
    "group_#{n}"
  end
end

FactoryGirl.define do
  factory :group, :class => 'Group' do
    name
  end
end