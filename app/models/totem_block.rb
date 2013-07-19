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

class TotemBlock < ActiveRecord::Base
  attr_accessible :content, :position, :title, :block_image
  has_attached_file :block_image, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  belongs_to :totem_flow
end
