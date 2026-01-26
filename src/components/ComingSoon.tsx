import React from 'react';

const ComingSoon = () => {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4 overflow-hidden relative">

            {/* Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600 rounded-full blur-[120px] opacity-40"></div>

            {/* VIT Logo */}
            <div className="mb-8 z-10">
                <img
                    src="/vibrancelogo.png"
                    alt="VIT Chennai"
                    className="w-[250px] h-auto object-contain"
                />
                
            </div>

            {/* Main Heading - Using the Vibrance Font Class */}

            <div className="home-content" style={{ zIndex: 10, textAlign: 'center', mixBlendMode: 'difference' }}>
                <h1 style={{ fontSize: '10vw', lineHeight: 0.9, fontFamily: 'var(--font-display)', letterSpacing: '-0.05em', color: 'transparent', WebkitTextStroke: '2px white' }}>
                    VIBRANCE'26 <br />
                </h1>
                <h2
                    style={{
                        fontSize: '4rem',
                        fontFamily: 'var(--font-display)',
                        marginBottom: '1rem',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        fontWeight: 900,
                        // The Magic:
                        backgroundImage: 'url("https://cdn.a2ys.dev/images/IMG_3361.jpg")', // Replace with your path
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Coming Soon ...
                </h2>


            </div>

            {/* Countdown Placeholder */}
            {/* <div className="mt-12 flex gap-4 md:gap-8 z-10">
                {['Days', 'Hours', 'Min', 'Sec'].map((label) => (
                    <div key={label} className="flex flex-col items-center">
                        <span className="text-3xl md:text-5xl font-bold">00</span>
                        <span className="text-xs uppercase tracking-widest text-purple-500">{label}</span>
                    </div>
                ))}
            </div> */}


        </div>
    );
};

export default ComingSoon;