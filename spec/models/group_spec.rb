require 'rails_helper'

describe Group, 'response' do
  it { is_expected.to respond_to :name }
end

describe Group, 'validations' do
  it { should validate_presence_of :name }
  it { should validate_uniqueness_of(:name).with_message("This group already exists.") }
  it { should validate_presence_of(:name) }
end

describe Group, 'associations' do
  it { is_expected.to belong_to :user }
  it { is_expected.to have_many :memberships }
  it { is_expected.to have_many :people }
end