/**
 * Dark Mode and Weather Effects JavaScript
 * Handles dark mode toggle and rain/thunderstorm effects
 */

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const darkMode = localStorage.getItem('darkMode');
    
    // Function to update icon and theme
    function updateTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            document.body.classList.remove('dark-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
    
    // Set initial theme
    if (darkMode === 'enabled') {
        updateTheme(true);
    }
    
    // Add click event to theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = !document.body.classList.contains('dark-mode');
            updateTheme(isDark);
            
            // Save theme preference
            localStorage.setItem('darkMode', isDark ? 'enabled' : null);
            
            // Add animation class
            themeToggle.classList.add('clicked');
            setTimeout(() => themeToggle.classList.remove('clicked'), 300);
        });
    }
    
    // Initialize rain effect
    initRainEffect();
    
    // Initialize thunderstorm effect
    initThunderstormEffect();
});

// Initialize dark mode functionality
function initDarkMode() {
    // Create dark mode toggle switch
    createDarkModeToggle();
    
    // Check for saved user preference
    const darkModePreference = localStorage.getItem('darkMode');
    
    // If dark mode was previously enabled, turn it on
    if (darkModePreference === 'enabled') {
        enableDarkMode();
    }
}

// Create dark mode toggle switch in the DOM
function createDarkModeToggle() {
    // Create wrapper div
    const toggleWrapper = document.createElement('div');
    toggleWrapper.className = 'theme-switch-wrapper';
    
    // Create label and input elements
    const toggleLabel = document.createElement('label');
    toggleLabel.className = 'theme-switch';
    
    const toggleInput = document.createElement('input');
    toggleInput.type = 'checkbox';
    toggleInput.id = 'theme-switch';
    
    // If dark mode is already enabled, check the toggle
    if (localStorage.getItem('darkMode') === 'enabled') {
        toggleInput.checked = true;
    }
    
    // Create slider span
    const toggleSlider = document.createElement('span');
    toggleSlider.className = 'slider';
    
    // Create text label
    const textLabel = document.createElement('span');
    textLabel.className = 'switch-label';
    textLabel.textContent = localStorage.getItem('darkMode') === 'enabled' ? 'Dark' : 'Light';
    
    // Assemble the toggle
    toggleLabel.appendChild(toggleInput);
    toggleLabel.appendChild(toggleSlider);
    toggleWrapper.appendChild(toggleLabel);
    toggleWrapper.appendChild(textLabel);
    
    // Add to the DOM
    document.body.appendChild(toggleWrapper);
    
    // Add event listener for toggle
    toggleInput.addEventListener('change', function() {
        if (this.checked) {
            enableDarkMode();
            textLabel.textContent = 'Dark';
        } else {
            disableDarkMode();
            textLabel.textContent = 'Light';
        }
    });
}

// Enable dark mode
function enableDarkMode() {
    // Add dark mode class to body
    document.body.classList.add('dark-mode');
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', 'enabled');
    
    // Update toggle if it exists
    const toggle = document.getElementById('theme-switch');
    if (toggle) {
        toggle.checked = true;
    }
}

// Disable dark mode
function disableDarkMode() {
    // Remove dark mode class from body
    document.body.classList.remove('dark-mode');
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', 'disabled');
    
    // Update toggle if it exists
    const toggle = document.getElementById('theme-switch');
    if (toggle) {
        toggle.checked = false;
    }
}

// Initialize rain effect
function initRainEffect() {
    const rainContainer = document.createElement('div');
    rainContainer.className = 'rain-container';
    document.body.appendChild(rainContainer);
    
    // Create initial raindrops - increased count for more visible effect
    createRaindrops(rainContainer, 150);
    
    // Show rain when dark mode is enabled
    document.body.addEventListener('darkmode-change', (e) => {
        if (e.detail.darkMode) {
            rainContainer.style.opacity = '1';
            
            // Add more raindrops periodically for continuous effect
            const rainInterval = setInterval(() => {
                // Remove old raindrops that have completed their animation
                const oldRaindrops = rainContainer.querySelectorAll('.raindrop');
                if (oldRaindrops.length > 300) {
                    for (let i = 0; i < 50; i++) {
                        if (oldRaindrops[i]) {
                            oldRaindrops[i].remove();
                        }
                    }
                }
                
                // Add new raindrops
                createRaindrops(rainContainer, 20);
            }, 3000);
            
            // Store the interval ID as a property of the container
            rainContainer.rainInterval = rainInterval;
        } else {
            rainContainer.style.opacity = '0';
            
            // Clear the interval when dark mode is disabled
            if (rainContainer.rainInterval) {
                clearInterval(rainContainer.rainInterval);
            }
        }
    });
}

// Create raindrops
function createRaindrops(container, count) {
    for (let i = 0; i < count; i++) {
        const raindrop = document.createElement('div');
        raindrop.className = 'raindrop';
        
        // Random positioning and animation
        const left = Math.random() * 100; // Random horizontal position
        const duration = Math.random() * 1 + 0.8; // Random duration between 0.8 and 1.8 seconds
        const delay = Math.random() * 5; // Random delay up to 5 seconds for more natural effect
        
        raindrop.style.left = `${left}%`;
        raindrop.style.animationDuration = `${duration}s`;
        raindrop.style.animationDelay = `${delay}s`;
        
        // Slightly randomize the size for more natural effect
        const height = 15 + Math.random() * 10; // Between 15px and 25px
        raindrop.style.height = `${height}px`;
        
        container.appendChild(raindrop);
    }
}

// Initialize thunderstorm effect
function initThunderstormEffect() {
    // Create lightning element
    const lightning = document.createElement('div');
    lightning.className = 'lightning';
    document.body.appendChild(lightning);
    
    // Create thunder sound indicator
    createThunderIndicator();
    
    // Variable to store the lightning interval
    let lightningInterval = null;
    
    // Function to handle dark mode changes
const handleDarkModeChange = (isDarkMode) => {
    if (isDarkMode) {
        // Start the lightning effect
        if (!lightningInterval) {
            lightningInterval = startLightningEffect(lightning);
        }
        document.querySelector('.thunder-indicator').style.display = 'block';
    } else {
        // Stop the lightning effect
        if (lightningInterval) {
            clearTimeout(lightningInterval);
            lightningInterval = null;
        }
        // Clear any ongoing flash timeouts
        if (window.flashTimeouts) {
            window.flashTimeouts.forEach(timeout => clearTimeout(timeout));
            window.flashTimeouts = [];
        }
        // Hide the lightning
        lightning.style.opacity = '0';
        document.querySelector('.thunder-indicator').style.display = 'none';
        
        // Stop any playing thunder sounds
        const thunderSound = document.getElementById('thunder-sound');
        if (thunderSound) {
            thunderSound.pause();
            thunderSound.currentTime = 0;
        }
    }
};
    
    // Listen for dark mode changes
    document.body.addEventListener('darkmode-change', (e) => {
        handleDarkModeChange(e.detail.darkMode);
    });
    
    // Also use mutation observer as backup
    const darkModeObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                handleDarkModeChange(document.body.classList.contains('dark-mode'));
            }
        });
    });
    
    darkModeObserver.observe(document.body, { attributes: true });
    
    // If dark mode is already enabled, start lightning effect
    if (document.body.classList.contains('dark-mode')) {
        handleDarkModeChange(true);
    }
}

// Start lightning effect
function startLightningEffect(lightning) {
    // Initialize array to track all timeouts
    if (!window.flashTimeouts) {
        window.flashTimeouts = [];
    }
    
    // Function to safely set timeout and track it
    const safeTimeout = (callback, delay) => {
        // Only create timeout if dark mode is still active
        if (document.body.classList.contains('dark-mode')) {
            const timeoutId = setTimeout(callback, delay);
            window.flashTimeouts.push(timeoutId);
            return timeoutId;
        }
        return null;
    };
    
    // Random lightning flash
    const flash = () => {
        // Check if dark mode is still active
        if (!document.body.classList.contains('dark-mode')) {
            return null;
        }
        
        // Random intensity
        const intensity = Math.random() * 0.7 + 0.3; // Between 0.3 and 1.0 for more visible flashes
        lightning.style.opacity = intensity;
        
        // Multiple flashes for more realistic effect
        const flashCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 flashes
        let flashIndex = 0;
        
        const multipleFlashes = () => {
            // Check if dark mode is still active
            if (!document.body.classList.contains('dark-mode')) {
                lightning.style.opacity = 0;
                return;
            }
            
            if (flashIndex < flashCount) {
                // Toggle flash
                if (lightning.style.opacity > 0) {
                    lightning.style.opacity = 0;
                    safeTimeout(multipleFlashes, 50 + Math.random() * 50); // 50-100ms between flashes
                } else {
                    lightning.style.opacity = intensity * (1 - (flashIndex * 0.2)); // Decreasing intensity
                    flashIndex++;
                    safeTimeout(multipleFlashes, 100 + Math.random() * 100); // 100-200ms flash duration
                }
            } else {
                // End of flash sequence
                lightning.style.opacity = 0;
                
                // Play thunder sound with delay
                safeTimeout(() => {
                    playThunderSound();
                }, 300 + Math.random() * 500); // Delay thunder sound by 300-800ms after lightning
            }
        };
        
        // Start the multiple flashes
        multipleFlashes();
        
        // Schedule next flash sequence
        const nextFlash = Math.random() * 8000 + 4000; // Between 4 and 12 seconds
        return safeTimeout(flash, nextFlash);
    };
    
    // Initial delay before first flash
    const initialDelay = Math.random() * 3000 + 1000; // Between 1 and 4 seconds
    return safeTimeout(flash, initialDelay);
}

// Play thunder sound
function playThunderSound() {
    // Check if sound is muted
    if (localStorage.getItem('thunderMuted') === 'true') return;
    
    // Create audio element for thunder sound
    const thunder = new Audio('sounds/thunder.mp3');
    thunder.volume = 0.3; // Lower volume
    
    // Try to play the sound
    const playPromise = thunder.play();
    
    // Handle potential play() promise rejection (browser policy or missing file)
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Thunder sound could not be played:', error.message);
            // If the file doesn't exist, we'll just continue without sound
            // The visual effect will still work
        });
    }
}

// Create thunder sound indicator
function createThunderIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'thunder-indicator';
    
    // Check if thunder is muted
    const isMuted = localStorage.getItem('thunderMuted') === 'true';
    if (isMuted) {
        indicator.classList.add('muted');
    }
    
    // Create icon
    const icon = document.createElement('i');
    icon.className = isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    
    // Create text
    const text = document.createElement('span');
    text.textContent = isMuted ? 'Thunder Muted' : 'Thunder On';
    
    // Assemble indicator
    indicator.appendChild(icon);
    indicator.appendChild(text);
    
    // Add to DOM
    document.body.appendChild(indicator);
    
    // Add click event to toggle mute
    indicator.addEventListener('click', function() {
        const currentlyMuted = localStorage.getItem('thunderMuted') === 'true';
        
        if (currentlyMuted) {
            localStorage.setItem('thunderMuted', 'false');
            indicator.classList.remove('muted');
            icon.className = 'fas fa-volume-up';
            text.textContent = 'Thunder On';
        } else {
            localStorage.setItem('thunderMuted', 'true');
            indicator.classList.add('muted');
            icon.className = 'fas fa-volume-mute';
            text.textContent = 'Thunder Muted';
        }
    });
}