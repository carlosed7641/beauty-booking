export const SERIVCE_INITIAL_STATE = {
    selectedService: null,
    selectedProfessional: null,
    selectedDate: null,
    selectedHour: null,
    isCompleted: false
}

export const SLIDER_SETTINGS = {
    arrows: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                arrows: false
            }
        }
    ]
}
