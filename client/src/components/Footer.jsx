function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center">

        <h2 className="text-xl font-bold text-orange-400">
          🚩 DarshanEase
        </h2>

        <p className="mt-2 text-gray-400">
          Book Temple Darshan Easily & Securely.
        </p>

        <p className="mt-4 text-sm text-gray-500">
          © {new Date().getFullYear()} DarshanEase. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;