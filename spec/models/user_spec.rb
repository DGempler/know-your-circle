require 'rails_helper'

describe User do
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

  describe 'email when it is blank' do
    subject(:invalid_email) { User.create(email: '', password: 'abcdefgh', first_name: 'John', last_name: 'Doe')}
    it { is_expected.to_not be_valid }
  end

  describe 'email when it is missing @ symbol' do
    subject(:invalid_email) { User.create(email: 'haha.com', password: 'abcdefgh', first_name: 'John', last_name: 'Doe')}
    it { is_expected.to_not be_valid }
  end

  describe 'email when it has the @ symbol' do
    subject(:valid_emaik) { User.create(email: 'a@a.com', password: 'abcdefgh', first_name: 'John', last_name: 'Doe')}
    it { is_expected.to be_valid }
  end

  describe '#first_name' do
    it 'cannot be blank' do
      invalid_first_name = User.create(email: 'haha.com', password: 'abcdefgh', first_name: '', last_name: 'Doe')
      expect(invalid_first_name).to_not be_valid
    end
  end

end

