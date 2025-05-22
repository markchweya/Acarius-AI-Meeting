const menuBtn = document.querySelector(".menu-icon"),
    closeBtn = document.querySelector(".close"),
    menuList = document.querySelector(".menu");

// Mobile menu toggle functionality
menuBtn.addEventListener("click", () => {
    menuList.classList.add("active");
    // GSAP animation for opening the menu
    gsap.from(".menu", {
        opacity: 0,
        x: '100%', // Animate from right for a slide-in effect
        duration: 0.5,
        ease: "power2.out"
    });
});

closeBtn.addEventListener("click", () => {
    // GSAP animation for closing the menu
    gsap.to(".menu", {
        opacity: 0,
        x: '100%', // Animate out to the right
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
            menuList.classList.remove("active"); // Remove class after animation completes
            menuList.style.transform = ''; // Reset transform for next open
            menuList.style.opacity = ''; // Reset opacity
        }
    });
});

// All DOM-related functionalities run after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Video seekbar functionality
    let video = document.getElementById("video"),
        seekbar = document.getElementById("seekbar-fill");

    if (video && seekbar) { // Ensure video and seekbar elements exist
        video.addEventListener("timeupdate", function() {
            let value = (video.currentTime / video.duration) * 100;
            seekbar.style.width = value + "%";
        });

        seekbar.parentElement.addEventListener("click", function(e) {
            // Calculate click position relative to the seekbar's width
            let clickX = e.clientX - this.getBoundingClientRect().left;
            let parentWidth = this.offsetWidth;
            let percentage = clickX / parentWidth;
            video.currentTime = percentage * video.duration;
        });
    }

    // Copy to clipboard functionality for the summary section
    const copyIconContainer = document.querySelector(".summary .container-box .t-2 .material-symbols-outlined");

    if (copyIconContainer) {
        copyIconContainer.addEventListener("click", function() {
            // Get text from the preceding <p> tag within the same parent
            const textToCopy = this.previousElementSibling ? this.previousElementSibling.textContent : '';
            const copySpan = this.querySelector(".copy"); // Get the 'copy' span

            if (textToCopy) {
                // Use a temporary textarea to copy text to clipboard
                const textarea = document.createElement("textarea");
                textarea.value = textToCopy;
                textarea.style.position = "fixed"; // Prevent scrolling to bottom
                textarea.style.opacity = "0"; // Make it invisible
                document.body.appendChild(textarea);
                textarea.select();

                try {
                    document.execCommand('copy'); // Execute copy command
                    if (copySpan) {
                        const originalText = copySpan.textContent;
                        copySpan.textContent = "Copied!"; // Provide feedback
                        setTimeout(() => {
                            copySpan.textContent = originalText; // Revert text after a delay
                        }, 1500);
                    }
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                    // Fallback for browsers that don't support execCommand or if it fails
                    if (copySpan) {
                        copySpan.textContent = "Error!";
                        setTimeout(() => {
                            copySpan.textContent = "copy";
                        }, 1500);
                    }
                } finally {
                    document.body.removeChild(textarea); // Remove the temporary textarea
                }
            }
        });
    }

    // Tab switching functionality for the Summary section
    const tabButtons = document.querySelectorAll(".summary .container-box ul li");
    const tabContents = document.querySelectorAll(".summary .container-box > div[class^='t-']"); // Selects divs starting with 't-'

    if (tabButtons.length > 0 && tabContents.length > 0) {
        // Hide all tab contents initially except the first one (which is active by default in CSS)
        tabContents.forEach((content, index) => {
            if (index !== 0) { // Assuming the first tab is active by default
                content.style.display = "none";
            }
        });

        tabButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                // Remove 'active' class from all buttons and hide all contents
                tabButtons.forEach(btn => btn.classList.remove("active"));
                tabContents.forEach(content => content.style.display = "none");

                // Add 'active' class to the clicked button
                button.classList.add("active");

                // Display the corresponding content
                if (tabContents[index]) {
                    tabContents[index].style.display = "flex"; // Use flex if the content is a flex container (like .t-2)
                    // If content is just text, use "block" or "initial"
                    // For this specific HTML, .t-2 is flex, .t-1 is block-like.
                    // A simple solution is to ensure the CSS handles display for active/inactive states
                    // or dynamically set based on content type. For now, setting to "block" as a general display.
                    tabContents[index].style.display = (tabContents[index].classList.contains('t-2')) ? 'flex' : 'block';
                }
            });
        });
    }
});


// GSAP page animations
// Initial animation for home section elements on page load
gsap.to(".home .main .text h1, .home .main .text p, .home .main .text .button, .home .main .text .container .box", {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.2, // Reduced stagger for a slightly faster reveal
    ease: "power2.out"
});

gsap.to(".home .demo .box", {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.3, // Reduced stagger for a slightly faster reveal
    ease: "power2.out"
});

// Function to animate elements on scroll using ScrollTrigger
function animateElements(elements, options) {
    gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: options.stagger || 0.2, // Default stagger to 0.2
        ease: "power2.out", // Consistent ease
        scrollTrigger: {
            trigger: options.trigger,
            start: "top 75%", // Start animation when trigger top is 75% down the viewport
            end: "bottom 25%", // End animation when trigger bottom is 25% down the viewport
            toggleActions: "play none none none", // Play animation once when entering viewport
            // markers: true // Uncomment for debugging ScrollTrigger
        },
    });
}

// Apply scroll animations to various sections
animateElements(".logos", { trigger: ".logos", stagger: 0.1 }); // Logos section
animateElements(".summary .text h2, .summary .text p", { trigger: ".summary .text", stagger: 0.2 }); // Summary text
animateElements(".summary .container", { trigger: ".summary .container", stagger: 0.3 }); // Main summary container
animateElements(".summary .grid .box", { trigger: ".summary .grid", stagger: 0.3 }); // Summary grid boxes
animateElements(".integrations h2", { trigger: ".integrations h2", stagger: 0.1 }); // Integrations heading
animateElements(".integrations .box", { trigger: ".integrations .container", stagger: 0.2 }); // Integrations boxes
animateElements(".recording .text .heading, .recording .text p, .recording .text .button", { trigger: ".recording .text", stagger: 0.2 }); // Recording text and buttons
animateElements(".recording .rec", { trigger: ".recording .rec", stagger: 0.3 }); // Recording main box
animateElements(".footer .text, .footer .link", { trigger: ".footer", stagger: 0.1 }); // Footer elements
