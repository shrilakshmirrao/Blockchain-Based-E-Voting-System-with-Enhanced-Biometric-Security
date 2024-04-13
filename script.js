// Simulated vote counts database
let voteCounts = {
    'Alice': 0,
    'Bob': 0,
    'Charlie': 0
};

// Hardcoded OTP for demonstration purposes
const hardcodedOTP = "123456";

document.addEventListener('DOMContentLoaded', function() {
    var countdownDisplay = document.getElementById('countdown');
    var countdownAfterDisplay = document.getElementById('countdownAfter');
    var votingEndTime = document.getElementById('votingEndTime');
    var votingEndTimeAfter = document.getElementById('afterVoting').querySelector('p');
    var votingEndTimeResults = document.getElementById('results').querySelector('p');

    // Format the countdown date for display
    var countDownDate = new Date("Apr 13, 2024 22:52:00").getTime();
    var endDate = new Date(countDownDate).toLocaleString('en-US', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        timeZone: 'Asia/Kolkata',
        timeZoneName: 'short'
    });

    // Set the "Voting ends at" text
    votingEndTime.textContent = "Voting ends on: " + endDate + " (IST)";
    votingEndTimeAfter.textContent = "Voting ends on: " + endDate + " (IST)";
    votingEndTimeResults.textContent = "Voting ended on: " + endDate + " (IST)";

    // Countdown function
    var countdownTimer = setInterval(function() {
        var now = new Date().getTime();
        var timeLeft = countDownDate - now;

        if (timeLeft > 0) {
            // Calculate and display the countdown
            var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            countdownDisplay.textContent = "Time left until closing: " + days + " day(s)  " + hours + " hour(s)  "
            + minutes + " minute(s)  " + seconds + " second(s) ";
            countdownAfterDisplay.textContent = days + " day(s)  " + hours + " hour(s)  "
            + minutes + " minute(s)  " + seconds + " second(s) ";
        } else {
            // Stop the countdown at 0 and show the results
            clearInterval(countdownTimer);
            countdownDisplay.textContent = "Voting has ended.";
            countdownAfterDisplay.textContent = "Voting has ended.";
            showResults();
        }
    }, 1000);

    // Voting form submission event listener
    document.getElementById('voteForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var otpInput = document.getElementById('otp').value;

        if (otpInput === hardcodedOTP) {
            var selectedCandidate = document.getElementById('candidates').value;
            // Simulate vote casting
            if (voteCounts.hasOwnProperty(selectedCandidate)) {
                voteCounts[selectedCandidate]++;
            }

            // Show the after voting message
            document.getElementById('beforeVoting').style.display = 'none';
            document.getElementById('afterVoting').style.display = 'block';
        } else {
            alert("Invalid OTP. Please try again.");
        }

        // Optionally, you could call showResults() here for immediate update
        // showResults();
    });
});

// Show results function
function showResults() {
    document.getElementById('afterVoting').style.display = 'none';
    var resultsContainer = document.getElementById('results');
    resultsContainer.style.display = 'block';

    var resultsBody = document.getElementById('resultsBody');
    resultsBody.innerHTML = ''; // Clear existing rows

    // Create sorted array of results for table display
    let sortedResults = Object.entries(voteCounts)
                              .sort((a, b) => b[1] - a[1])
                              .map((entry, index) => ({ name: entry[0], votes: entry[1] }));

    // Insert rows into the table
    sortedResults.forEach(function(result, index) {
        var row = resultsBody.insertRow();
        var cellNumber = row.insertCell(0);
        var cellName = row.insertCell(1);
        var cellVotes = row.insertCell(2);
        cellNumber.textContent = index + 1;
        cellName.textContent = result.name;
        cellVotes.textContent = result.votes;
    });
}
