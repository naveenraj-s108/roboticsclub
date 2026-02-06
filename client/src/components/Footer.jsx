const Footer = () => {
    return (
        <footer className="py-12 mt-20 bg-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-4 text-center">
                <p className="text-gray-500 text-sm font-medium">
                    &copy; {new Date().getFullYear()} Robotics Club. Autonomous Intelligence & Engineering.
                </p>
                <div className="mt-4 flex justify-center space-x-6">
                    <span className="text-indigo-600/50 text-xs tracking-widest uppercase font-black">Innovation • Excellence • Community</span>
                </div>
            </div>
        </footer>
    );
};


export default Footer;
