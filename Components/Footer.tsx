function Footer() {
    return (
      <footer className="bg-gray-800 text-white text-center py-4 mt-10">
        <p className="text-sm">
          © {new Date().getFullYear()} ManipalGuessr. Licensed under the GPL V3.
        </p>
        <p className="text-xs mt-1">
          Built with ❤️ by PixelHalide (Harsh K) & Shlok Sharma
        </p>
      </footer>
    );
  }

  export default Footer;
