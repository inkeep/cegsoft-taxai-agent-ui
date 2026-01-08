export function Footer() {
  return (
    <div className="text-center mt-8">
      <p className="text-sm text-gray-500">
        <a
          href="http://localhost:3002"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:text-blue-700"
        >
          Management API
        </a>{" "}
        •
        <a
          href="http://localhost:3003"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:text-blue-700 ml-1"
        >
          Run API
        </a>
      </p>
    </div>
  );
}
