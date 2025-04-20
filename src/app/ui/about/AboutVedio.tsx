import React from 'react'

const AboutVedio = () => {
  return (
    <div className="mx-auto px-6 py-10 bg-gray-900">
      <div className="flex flex-col items-center gap-4 lg:gap-12">
        <div className="w-3/4">
          <video
            controls
            muted
            autoPlay
            loop
            className="w-full h-auto rounded-lg shadow-lg"
            src="/about.mp4"
          >
          </video>
        </div>
        
        <div className="w-full p-4">
          <p className="text-center lg:text-lg text-gray-300 leading-relaxed">
          Vivamus id gravida mi, nec ullamcorper purus. Suspendisse ut nibh sagittis lacus viverra aliquam. 
          Praesent ac lobortis mauris, non imperdiet quam. Praesent laoreet elit nisi, id feugiat ante accumsan sed. 
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. 
          Donec ullamcorper libero nisl, nec blandit dolor tempus feugiat. Aenean neque felis, 
          fringilla nec placerat eget, sollicitudin a sapien. Maecenas at consectetur ex, vitae consequat augue. 
          Vivamus eget dolor vel quam condimentum sodales. In bibendum odio urna, 
          sit amet fermentum purus venenatis a. Fusce vel egestas nisl.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutVedio