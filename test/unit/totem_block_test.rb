# == Schema Information
#
# Table name: totem_blocks
#
#  id            :integer          not null, primary key
#  title         :string(255)
#  content       :text
#  position      :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  totem_flow_id :integer
#

require 'test_helper'

class TotemBlockTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
