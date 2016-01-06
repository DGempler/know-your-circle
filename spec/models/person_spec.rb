require 'rails_helper'

describe Person, 'response' do
  it { is_expected.to respond_to :first_name }
  it { is_expected.to respond_to :last_name }
  it { is_expected.to respond_to :middle_name }
  it { is_expected.to respond_to :sex }
  it { is_expected.to respond_to :nickname }
  it { is_expected.to respond_to :bio }
  it { is_expected.to respond_to :location }
  it { is_expected.to respond_to :dob }
  # it { is_expected.to respond_to :dod }
  it { is_expected.to respond_to :occupation }
  it { is_expected.to respond_to :image }
  it { is_expected.to respond_to :hints }
end

describe Person, 'validations' do
  it { should validate_presence_of :first_name }
  it { should validate_presence_of :last_name }
end

describe Person, 'associations' do
  it { is_expected.to belong_to :user }
  it { is_expected.to have_many :memberships }
  it { is_expected.to have_many :groups }
end