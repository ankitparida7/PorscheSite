gsap.utils.toArray(".spec").forEach((section, i) => {
    gsap.fromTo(section,
        {opacity: 0},
        {
            opacity: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 50%",
                //end: "bottom 20%",
                toggleActions: "play reverse play reverse",
                markers: true,
                // pin: true
            }
        }
    );
});