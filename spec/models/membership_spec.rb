require 'rails_helper'

describe Membership, 'associations' do
  it { is_expected.to belong_to :group }
  it { is_expected.to belong_to :person }
end