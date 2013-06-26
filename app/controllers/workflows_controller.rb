class WorkflowsController < ApplicationController
  before_filter :authenticate_user!

  def index
  	workflows = Workflow.all
  	render json: workflows.to_json(:include => :steps)
  end

  def show
    workflows = Workflow.find(params[:id])
    format.json {render json: workflows.to_json(:include => :steps)}
  end

  def new
    #don't need a new action since all forms should be handled on the client
  end

  def create
    @workflow = Workflow.new(params[:workflow])
    if @workflow.save
      format.json {render action: 'show', status: :created, location: workflow_path(@user)}
    else
      format.json {render json: @user.errors, status: :unprocessable_entity}
    end
  end

end
