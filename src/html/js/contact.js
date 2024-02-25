
formSubmit = document.getElementById('email-form')

formSubmit.addEventListener('click', function () {
    sendEmail()
})


async function sendEmail() {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            source: 'Chronopomo'
        };

        const response = await fetch('https://jpegresize.com/email/send', {
            method: 'POST',
            headers: {
		"Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Email sent')
        } else {
            console.error('Failed to send email');
        }
}
