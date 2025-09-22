document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURATION ---
    // Set your target date here (Year, Month (0-11), Day, Hour, Minute, Second)
    const targetDate = new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0);

    // --- DOM ELEMENTS ---
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const timerContainer = document.getElementById('timer-container');
    const celebrationEl = document.getElementById('celebration');

    // --- CORE LOGIC ---
    const intervalId = setInterval(updateCountdown, 1000);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // If the countdown is over
        if (distance < 0) {
            clearInterval(intervalId);
            showCelebration();
            return;
        }

        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update the display with animation
        updateElement(daysEl, formatTime(days));
        updateElement(hoursEl, formatTime(hours));
        updateElement(minutesEl, formatTime(minutes));
        updateElement(secondsEl, formatTime(seconds));
    }

    // --- HELPER FUNCTIONS ---

    /**
     * Updates an element's text content and triggers a flip animation
     * if the value has changed.
     * @param {HTMLElement} element The DOM element to update.
     * @param {string} newValue The new value to display.
     */
    function updateElement(element, newValue) {
        const currentValue = element.innerText;
        if (currentValue !== newValue) {
            element.innerText = newValue;
            element.classList.add('updating');
            // Remove the class after the animation completes
            setTimeout(() => {
                element.classList.remove('updating');
            }, 500); // Must match CSS animation duration
        }
    }

    /**
     * Formats a number to be two digits, adding a leading zero if needed.
     * @param {number} time The number to format.
     * @returns {string} The formatted two-digit string.
     */
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    /**
     * Hides the timer and shows the celebratory message.
     */
    function showCelebration() {
        timerContainer.style.display = 'none';
        celebrationEl.classList.remove('hidden');
        createConfetti();
    }

    /**
     * Creates and animates confetti particles for the celebration.
     */
    function createConfetti() {
        const confettiContainer = document.body;
        const colors = ['#f9a825', '#e91e63', '#4caf50', '#2196f3', '#9c27b0'];
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = `${-20 + Math.random() * -50}px`;
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 10 + 5}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.opacity = '1';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.transition = 'top 5s ease-out, opacity 5s ease-out, transform 5s ease-out';
            
            confettiContainer.appendChild(confetti);

            setTimeout(() => {
                confetti.style.top = '110vh';
                confetti.style.opacity = '0';
                confetti.style.transform = `rotate(${Math.random() * 360 + 360}deg) scale(0)`;
            }, 100);

            // Clean up the DOM
            setTimeout(() => {
                confetti.remove();
            }, 5100);
        }
    }

    // Initial call to set the timer right away
    updateCountdown();
});
