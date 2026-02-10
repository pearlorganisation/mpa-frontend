const Footer = () => {
    return (

        <footer className="w-full bg-white py-16 px-4">

            <div className="max-w-6xl mx-auto bg-[#FFF7ED] border border-green-200 rounded-2xl p-10 text-center">

                {/* Heading */}
                <h2 className="text-2xl md:text-3xl font-semibold text-[#8B3A00]">
                    Office Hours
                </h2>

                {/* Description */}
                <p className="mt-4 text-[#9A4A00] text-sm md:text-base max-w-3xl mx-auto">
                    Our team is available during standard business hours. For urgent
                    submissions, our 24/7 automated system processes requests immediately.
                </p>

                {/* Inner Box */}
                <div className="mt-8 border border-green-300 rounded-xl px-6 py-6 inline-block bg-white">
                    <p className="text-[#8B3A00] font-medium">
                        Monday - Friday: 9:00 AM - 6:00 PM EST
                    </p>
                    <p className="text-[#8B3A00] font-medium mt-1">
                        Saturday - Sunday: Automated support available
                    </p>
                    <p className="text-[#8B3A00] text-sm mt-2">
                        Holiday hours: Closed on major holidays
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
