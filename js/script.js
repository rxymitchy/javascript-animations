document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeSelect = document.getElementById('theme');
    const speedSelect = document.getElementById('animation-speed');
    const savePrefsBtn = document.getElementById('save-prefs');
    const animateBtn = document.getElementById('animate-btn');
    const animatedBox = document.querySelector('.animated-box');
    const animatedImage = document.querySelector('.animated-image img');
    const body = document.body;
  
    // Load saved preferences
    loadPreferences();

    // Save preferences to localStorage
    savePrefsBtn.addEventListener('click', function() {
        const preferences = {
            theme: themeSelect.value,
            animationSpeed: speedSelect.value
        };
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        alert('Preferences saved!');
        applyPreferences(preferences);
    });

    // Trigger animation
    animateBtn.addEventListener('click', function() {
        // Toggle box animation
        animatedBox.classList.toggle('box-animate');
        
        // Toggle image animation
        animatedImage.classList.toggle('image-animate');
        
        // Add bounce animation for 3 seconds
        animatedBox.classList.add('bounce-animation');
        setTimeout(() => {
            animatedBox.classList.remove('bounce-animation');
        }, 3000);
    });

    // Load preferences from localStorage
    function loadPreferences() {
        const savedPrefs = localStorage.getItem('userPreferences');
        if (savedPrefs) {
            const preferences = JSON.parse(savedPrefs);
            themeSelect.value = preferences.theme;
            speedSelect.value = preferences.animationSpeed;
            applyPreferences(preferences);
        }
    }

    // Apply preferences to the page
    function applyPreferences(preferences) {
        // Apply theme
        body.className = ''; // Clear existing theme classes
        body.classList.add(`${preferences.theme}-theme`);
        
        // Apply animation speed
        document.querySelectorAll('.animated-box, .animated-image img').forEach(el => {
            el.className = el.className.replace(/slow-speed|normal-speed|fast-speed/g, '');
            el.classList.add(`${preferences.animationSpeed}-speed`);
        });
    }
});