class ContactsController < ApplicationController
  
  # GET request to /contact-us
  # Show new contact form
  def new 
    @contact = Contact.new
  end
  
  # POST request /contacts 
  def create
    # Mass assignment of form field into contact object
    @contact = Contact.new(contact_params)
    # Save the Contact Object to the db
    if @contact.save 
      # Store form fields via parameters, into variables
      # Lift contact form inputs for Mailer variables
      name = params[:contact][:name]
      email = params[:contact][:email]
      body = params[:contact][:comments]
      # PLug variables into the Contact Mailer email
      # method and send email
      ContactMailer.contact_email(name, email, body).deliver
      # Store success message in flash hash
      # and redirect to the new action
      flash[:success] = "Message Sent"
      redirect_to contact_us_path
    else
      # If Contact object fails to save, store errors in flash hash
      # and redirect to 'new' action
      flash[:danger] = @contact.errors.full_messages.join(", ")
      redirect_to contact_us_path
    end
  end
  
  
  
  private 
    # Use strong parameters and whitelist form fields
    def contact_params
    params.require(:contact).permit(:name, :email, :comments)
    end  
    


end



