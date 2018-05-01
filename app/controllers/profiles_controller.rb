class ProfilesController < ApplicationController
  
  # GET to /users/:user_id/profile/new
  def new 
    # Render a blank profile details form 
    @profile = Profile.new
  end 

  # POST to /users/:user_id/profile/
  def create 
    # Ensure we have user filling out form 
    @user = User.find(params[:user_id])     
    #Create profile linked to specifc user 
    @profile = @user.build_profile(profile_params)
    if @profile.save
      flash[:success] = "Profile Update!"
      redirect_to user_path(params[:user_id])
    else
      render action :new
      flash[:success] = "You fucked up!"
    end
  end
  
  
  
  private 
  
    def profile_params 
      params.require(:profile).permit(:first_name, :last_name, :job_title, :phone_number, :contact_email, :description)  
    end
    
end 