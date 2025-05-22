const menuBtn = document.querySelector(".menu-icon"),
closeBtn = document.querySelector(".close"),
menuList = document.querySelector(".menu");

menuBtn.addEventListener("click", () => {
    menuList.classList.add("active");
    gsap.from(".menu", {
        opacity: 0
    })
})

closeBtn.addEventListener("click", () => {
    menuList.classList.remove("active");
})

// seekbar animation starts here 

document.addEventListener("DOMContentLoaded", function() {
    let video = document.getElementById("video"),
    seekbar = document.getElementById("seekbar-fill");

    video.addEventListener("timeupdate", function() {
        let value = (video.currentTime / video.duration) * 100;
        seekbar.style.width = value + "%";
    });

    seekbar.parentElement.addEventListener("click", function(e){
        let parent = e.clientX / this.offsetWidth;
        video.currentTime = parent * video.duration;
    })
})


// page animation starts here

gsap.to(".home .main .text h1, .home .main .text p, .home .main .text .button, .home .main .text .box", {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: .5
});

gsap.to(".home .demo .box", {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: .7
});

function animateElements(elements, options) {
    gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: options.stagger || 0.5,
        scrollTrigger: {
            trigger: options.trigger,
            start: "top 50%",
            end: "bottom 100%"
        },
    });
}

animateElements(".logos", { trigger: ".logos"});

animateElements(".summary .text h2, .summary .text p, .summary .container", { trigger: ".summary"});

animateElements(".summary .grid .box", { trigger: ".summary .grid",
stagger: 0.8,});

animateElements(".integrations h2", { trigger: ".integrations h2"});

animateElements(".integrations .box", { trigger: ".integrations .box"});

animateElements(".recording .text .heading, .recording .text p, .recording .text .button, .recording .rec", { trigger: ".recording"});

animateElements(".footer .text, .footer .link", { trigger: ".footer", stagger: 0.8});


