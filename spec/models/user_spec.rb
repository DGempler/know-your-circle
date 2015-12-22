require 'rails_helper'

describe User, 'response' do
  it { is_expected.to respond_to :email }
  it { is_expected.to respond_to :password }
  it { is_expected.to respond_to :first_name }
  it { is_expected.to respond_to :last_name }
  it { is_expected.to respond_to :middle_name }
  it { is_expected.to respond_to :sex }
  it { is_expected.to respond_to :nickname }
  it { is_expected.to respond_to :bio }
  it { is_expected.to respond_to :location }
  it { is_expected.to respond_to :dob }
  it { is_expected.to respond_to :occupation }
  it { is_expected.to respond_to :image }
end

describe User, 'validations' do
  it { should validate_uniqueness_of(:email) }
  it { should validate_presence_of(:email) }

  describe 'email when it is missing @ symbol' do
    subject(:invalid_email) { User.create(email: 'haha.com', password: 'abcdefgh', first_name: 'John', last_name: 'Doe')}
    it { is_expected.to_not be_valid }
  end

  it { should validate_presence_of(:password) }

  describe 'password when it is less than 8 characters' do
    subject(:invalid_password) { User.create(email: 'a@a.com', password: 'abcdefg', first_name: 'John', last_name: 'Doe')}
    it { is_expected.to_not be_valid }
  end
  describe 'password when it is 8 characters or longer' do
    subject(:invalid_password) { User.create(email: 'a@a.com', password: 'abcdefgh', first_name: 'John', last_name: 'Doe')}
    it { is_expected.to be_valid }
  end

  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of(:last_name) }

end



describe User, 'associations' do

  # subject(:user) { User.create }

  it { is_expected.to have_many :people }
  it { is_expected.to have_many :groups }

end