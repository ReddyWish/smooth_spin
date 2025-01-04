import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-black bg-home-img bg-cover bg-center">
      <main className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto h-dvh">
        <div className="flex flex-col gap-6 p-12 rounded-xl bg-black/80 mx-auto text-white">
          <h1 className="text-2xl font-bold">Smooth Spin | Bike Repair</h1>
          <address>
            Barcelona, Santa Carolina, 41
            <p>Open Daily: 9am to 5 pm</p>
            <Link href="tel:555555555" className="hokver: underline">
              555-555-555
            </Link>
          </address>
        </div>
      </main>
    </div>
  );
}
