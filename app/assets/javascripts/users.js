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
    
    //Collect credit card fields
    //Send card information to Stripe
    var ccNum = $('#card_number').val(), 
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    
    //Send card info to Strip
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
    
  });
  

  
  
  
  
});

  

  //Stripe will retun a card token
  //Inject card token as hidden field into form
  //Submit form to our Rails app