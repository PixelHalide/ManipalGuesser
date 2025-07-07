import Image from 'next/image';
import Footer from '@/Components/Footer';

const page = () => {
  return (
    <>
        <div className="min-h-screen text-gray-900 dark:text-neutral-200 pt-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-8">About ManipalGuessr</h1>
              <p className="text-xl mb-6">
                ManipalGuessr is a fun geography guessing game built specifically for Manipal University and the surrounding town.
                Test your knowledge of campus landmarks, local spots, and hidden gems around Manipal!
              </p>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold mb-8">Contributors</h2>
              <p className="text-lg mb-8 text-gray-800 dark:text-neutral-300">
                Thanks to everyone who has helped make this project possible!
              </p>

              <div className="bg-neutral-900 rounded-lg p-6 max-w-md mx-auto text-neutral-300">
                <h3 className="text-xl font-semibold mb-4">KasumiNya</h3>
                <p className="mb-4">Special thanks for contributing to the project!</p>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
                <div className="flex justify-center gap-6">
                  <a
                    href="https://github.com/PixelHalide"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-neutral-800 hover:bg-neutral-700 px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    <Image src="/github.svg" alt="GitHub Logo" width={24} height={24} />
                    <p className='text-neutral-200'>GitHub</p>
                  </a>

                  <a
                    href="https://discord.com/users/180399116327714816"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#5865F2] hover:bg-indigo-700 px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    <Image src="/discord.svg" alt="Discord Logo" width={24} height={24} />
                    <p className='text-neutral-200'>Discord</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
    </>
  )
}

export default page
