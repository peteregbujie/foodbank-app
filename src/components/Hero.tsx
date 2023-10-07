import Image from "next/image"

export const Hero = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-green-600 p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Food Banks
              </h2>

              <p className="hidden text-white/90 sm:mt-4 sm:block">
                Join the fight against hunger with our new app! With just a few
                taps, you can easily donate to local food banks and make a real
                impact in your community. Plus, signing up to volunteer at food
                banks has never been simpler, helping you connect with
                like-minded individuals and create positive change together.
                Download our app today and be a part of the solution to end
                hunger!
              </p>

              <div className="mt-4 md:mt-8">
                <a
                  href="#"
                  className="inline-block rounded border border-white bg-white px-12 py-3 text-sm font-medium text-blue-500 transition hover:bg-transparent hover:text-white focus:outline-none focus:ring focus:ring-yellow-400"
                >
                  Join Us
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
            <Image
              src="/images/dollar.jpg"
              className="h-40 w-full object-cover sm:h-56 md:h-full"
              alt="donate"
              height={160}
              width={100}
              quality={100}
            />

            <Image
              src="/images/volunteer.jpg"
              className="h-40 w-full object-cover sm:h-56 md:h-full"
              alt="volunteer"
              height={160}
              width={100}
              quality={100}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
