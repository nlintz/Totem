# == Schema Information
#
# Table name: totem_flows
#
#  id          :integer          not null, primary key
#  name        :string(255)
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :integer
#

require 'test_helper'

class TotemFlowTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
