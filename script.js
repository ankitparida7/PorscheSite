gsap.utils.toArray(".spec").forEach((section, i) => {
    gsap.fromTo(section,
        {opacity: 0},
        {
            opacity: 1,
            scrollTrigger: {
                trigger: section,
                start: "top center",
                toggleActions: "play reverse play reverse",
                markers: true
            }
        }
    );
});