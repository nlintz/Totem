class WorkflowsController < ApplicationController
  # before_filter :authenticate_user!

  def index
  	workflows = Workflow.all
  	respond_to do |format|
  		format.json { render json: workflows.to_json(:include => :steps) }
  	end
  end

  def show
  end

  def new
  end

  def create
  end
end
