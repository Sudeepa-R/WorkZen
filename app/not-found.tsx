import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-lime-500">404</h1>
                <h2 className="mt-4 text-2xl font-semibold text-gray-800">Page Not Found</h2>
                <p className="mt-2 text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
                <Link
                    href="/"
                    className="inline-block mt-8 px-8 py-3 text-white bg-lime-500 hover:bg-lime-600 rounded-lg transition-colors font-medium"
                >
                    Return Home
                </Link>
            </div>
        </div>
    )
}
