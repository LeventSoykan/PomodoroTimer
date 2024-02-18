const formBtn = document.getElementById('email-form')

function initEmail (){
          emailjs.init("dpDYkmGTHLgdPJZhL");
      };
initEmail();

formBtn.addEventListener("click", function (event) {
  event.preventDefault()

  // Get the form data
  const formData = new FormData();
  for (let i = 0; i < formInputs.length; i++) {
    formData.append(formInputs[i].name, formInputs[i].value);
  }

  emailjs.send("service_splm5jw", "template_hhtbyiy", {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message")
  }).then(function(response) {
				alert("Email sent successfully!");
			}, function(error) {
				alert("Error sending email: " + error);
			});

			// Clear the form
            this.form.reset()
})
