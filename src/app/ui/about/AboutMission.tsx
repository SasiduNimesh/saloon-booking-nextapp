import React from 'react'
import Image from 'next/image'

const AboutMission = () => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-sky-900 text-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Our Story Side */}
        <div className="relative hover:scale-105">
          <Image
            src="/images/aboutImg1.jpg"
            width={500}
            height={500}
            alt="Our Story"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-pink-500 to-red-700">Our Story</h2>
          <p className="mt-4 text-gray-300">
          Vivamus id gravida mi, nec ullamcorper purus. Suspendisse ut nibh sagittis lacus viverra aliquam. 
          Praesent ac lobortis mauris, non imperdiet quam. Praesent laoreet elit nisi, id feugiat ante accumsan sed.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
          </p>
        </div>

        {/* Our Mission Section */}
        <div className="flex flex-col justify-center order-2 md:order-1">
          <h2 className="text-3xl font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Our Mission</h2>
          <p className="mt-4 text-gray-300">
          Donec ultricies lobortis eros, nec auctor nisl semper ultricies. 
          Aliquam sodales nulla dolor, sed vulputate sapien efficitur ut. Etiam tincidunt ligula ut hendrerit semper. Quisque luctus lectus non turpis bibendum posuere. Morbi tortor nibh, fringilla sed pretium sit amet, pharetra non ex. 
          Aliquam ornare nunc nibh, sit amet porta diam pretium in.
          </p>
        </div>
        <div className="relative order-1 md:order-2 hover:scale-105">
        <Image
            src="/images/tools2.jpg"
            width={500}
            height={500}
            alt="Our Mission"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default AboutMission