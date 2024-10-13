import React, { useState, useEffect } from 'react';
import { Users, Briefcase, Map, Star, Quote } from 'lucide-react';

const stats = [
  { icon: <Users size={24} />, title: 'Happy Clients', value: '10,000+' },
  { icon: <Briefcase size={24} />, title: 'Tours Completed', value: '500+' },
  { icon: <Map size={24} />, title: 'Destinations', value: '50+' },
  { icon: <Star size={24} />, title: 'Years Experience', value: '15+' },
];

const testimonials = [
  { 
    name: 'John Doe', 
    content: 'An incredible journey! Wanderlust Adventures made our dream vacation a reality. The attention to detail and personalized service exceeded all our expectations.',
    image: 'https://images.pexels.com/photos/14854320/pexels-photo-14854320.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: 'New York, USA',
    rating: 5
  },
  { 
    name: 'Jane Smith', 
    content: 'Professional, attentive, and simply amazing. Cant wait for our next trip! The guides were knowledgeable and the itinerary was perfectly balanced.',
    image: 'https://images.pexels.com/photos/19464187/pexels-photo-19464187/free-photo-of-elderly-monk-with-beard-and-in-orange-robes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'London, UK',
    rating: 5
  },
  { 
    name: 'Alex Johnson', 
    content: 'Wanderlust Adventures transformed our family vacation into an unforgettable experience. The kids loved every moment, and we created memories that will last a lifetime.',
    image: 'https://images.pexels.com/photos/20762739/pexels-photo-20762739/free-photo-of-man-riding-motorbike-offroad.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Sydney, Australia',
    rating: 5
  },
];

const adventures = [
  {
    images: [
      'https://images.pexels.com/photos/19296851/pexels-photo-19296851/free-photo-of-an-old-man-with-a-long-beard-and-orange-turban.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/169188/pexels-photo-169188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/9119105/pexels-photo-9119105.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
    ],
    alt: 'Adventure 1',
  },
  {
    images: [
      'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/28610172/pexels-photo-28610172/free-photo-of-dynamic-off-road-motorcycle-racing-action.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
    ],
    alt: 'Adventure 2',
  },
  {
    images: [
      'https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/147050/pexels-photo-147050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    alt: 'Adventure 3',
  },
];

const AdventureCard = ({ images, alt }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds
  
      return () => clearInterval(interval); // Cleanup on component unmount
    }, [images.length]);
  
    return (
      <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentImageIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={alt}
              className="w-full h-64 object-cover flex-shrink-0"
              style={{ width: '100%' }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-lg font-semibold">Discover More</p>
        </div>
      </div>
    );
  };

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-white to-orange-50 mt-10">
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">About Wanderlust Adventures</h1>
          <p className="text-lg text-gray-600 mb-8">
            At Wanderlust Adventures, we're passionate about creating unforgettable travel experiences. Founded in 2008, we've been helping travelers explore the world's most breathtaking destinations for over a decade. Our team of expert guides and travel enthusiasts work tirelessly to craft unique, immersive journeys that go beyond the typical tourist experience.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-block p-4 bg-orange-100 rounded-full mb-4">
                {stat.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{stat.value}</h3>
              <p className="text-gray-600">{stat.title}</p>
            </div>
          ))}
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Our Previous Adventures</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {adventures.map((adventure, index) => (
              <AdventureCard key={index} images={adventure.images} alt={adventure.alt} />
            ))}
          </div>
        </div>

        <div className="my-24">
          <h2 className="text-3xl font-semibold mb-12 text-center text-gray-800">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="relative h-80 overflow-hidden">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="font-semibold text-xl text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-300">{testimonial.location}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote size={24} className="text-orange-400 mr-2" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonial.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-16 text-center">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Ready for Your Next Adventure?</h2>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors duration-300">
            Plan Your Trip Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
