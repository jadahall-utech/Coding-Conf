// Show the saved registration as a ticket
const fullname = localStorage.getItem('fullname');

// Return to registration if no attendee name was saved
if (fullname === null) 
    {
        window.location.href = '../index.html';
    }
else
    {
        // Get the elements that display ticket details
        const ticketName = document.getElementById('ticket-name');
        const ticketEmail = document.getElementById('ticket-email');
        const ticketFullname = document.getElementById('ticket-fullname');
        const ticketGithub = document.getElementById('ticket-github');
        const ticketSerial = document.getElementById('ticket-serial');
        const ticketAvatar = document.getElementById('ticket-avatar');

        // Read the saved details and look for an existing serial
        const github = localStorage.getItem('github');
        const email = localStorage.getItem('email');
        const avatar = localStorage.getItem('avatar');
        let serial = localStorage.getItem('serial');

        // Create and save a serial only when this ticket does not have one
        if (serial === null)
            {
                const randomNumber = Math.floor(Math.random() * 100000);
                const paddedNumber = String(randomNumber).padStart(5, '0');
                serial = '#' + paddedNumber;
                localStorage.setItem('serial', serial);
            }

        // Fill in the ticket
        ticketName.textContent = fullname;
        ticketEmail.textContent = email;
        ticketFullname.textContent = fullname;
        ticketGithub.textContent = github;
        ticketGithub.href = 'https://github.com/' + github.slice(1);
        ticketAvatar.src = avatar;
        ticketSerial.textContent = serial;
    }