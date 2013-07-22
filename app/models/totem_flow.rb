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

class TotemFlow < ActiveRecord::Base
  attr_accessible :description, :name, :created_at, :updated_at, :user_id
  has_many :totem_blocks
  belongs_to :user
end
