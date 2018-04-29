/* global $, Stripe */

//Document ready
$(document).on('turbolinks:load', function(){
  
  //When user click form submit btn, prevent default submission behavior
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');

  //Set Stripe public key   
  Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));  
  
  submitBtn.click(function(event){
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true);
    
    //Collect credit card fields
    //Send card information to Stripe
    var ccNum = $('#card_number').val(), 
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    
    //Use Stripe JS library to check for card errors.
    var error = false; 
    
    //Validate card number 
    if (!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert = ('The credit card number appears to be invalid');
    }
    
    //Validate CVC number 
    if (!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert = ('The CVC number appears to be invalid');
    }
    
    //Validate Expiration Date 
    if (!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert = ('The credit card expiration date is invalid');
    }
    
    if (error) {
      //If card errors, dont send to Stripe
      submitBtn.prop('disabled', false).val("Sign Up");
    } else {
    
    //Send card info to Stripe
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    return false;
    
  });
  
  //Stripe will retun a card token
  function stripeResponseHandler(status, response) {
    //Get the token from the response
    var token = response.id;
    
    
    //Inject card token as hidden field into form
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token));
    
    //Submit form to our Rails app
    theForm.get(0).submit();
  }
});

  

  
  