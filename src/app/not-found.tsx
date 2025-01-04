import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/not-found.jpg')" }}
    >
      <div className="flex flex-col items-center justify-center h-full text-center text-white bg-black/50">
        <h2 className="text-4xl font-bold">Page Not Found</h2>
        <Link href="/" className="mt-4 text-lg underline">
          Return Home
        </Link>
      </div>
    </div>
  );
}
