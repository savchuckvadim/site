import {  Instagram, Mail, MapPinHouse, Phone, X } from "lucide-react";

import Link from "next/link";

export default function Footer() {

  return (
   
    <footer className="h-full p-2 md:p-10 bg-background text-accent-foreground">
      <div className="bg-secondary   w-full  flex flex-col md:flex-row  items-center justify-center gap-4 p-6 ">

        <div className="h-72 md:h-96 w-full 
                md:w-1/2
                bg-secondary 
                mx-2
                ">
          <div className="h-12 md:h-full p-2 md:p-7">
            <div>
              <h5 className="text-3xl mb-3">Contact Us</h5>
            </div>
            <div>
              <div className="w-full flex flex-row items-center justify-start mb-3">

                <MapPinHouse size={32} className="text-primary" />

                <div className="ml-4">
                  <h6 className="font-bold">Address</h6>
                  <p>Herengracht 545, 1017 BW Amsterdam </p>
                </div>
              </div>


              <div className="w-full flex flex-row items-center justify-start mb-3">


                <Phone size={32} className="text-primary" />
                <div className="ml-4">
                  <h6 className="font-bold">Call Us</h6>
                  <p>+31 6 41 47 67 81 </p>
                </div>
              </div>

              <div className="w-full flex flex-row items-center justify-start mb-3">

                <Mail size={32} className="text-primary" />

                <div className="ml-4">
                  <h6 className="font-bold">Email Us</h6>
                  <p>volkovgoods@gmail.com</p>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div className="h-72 md:h-96 w-full 
                md:w-1/2 
                bg-secondary 
                ">

          <div className="h-12 md:h-full p-2 md:p-7">

            <div>
              <h3 className="text-4xl font-bold mb-3">
                Volkov Design
              </h3>
            </div>
            <div className="h-48 flex flex-col justify-between">


              <div className="flex flex-row mt-8 ">
                <Link href={'https://x.com/volkovkostia116'}
                  target="_blank"
                    rel="noopener noreferrer"
                >
                  <div className="rounded-full border p-3 border-foreground">
                    <X />
                  </div>
                </Link>
                <Link href={'https://www.instagram.com/_kostya.volkov/reels/'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="ml-5 rounded-full border p-3 border-foreground">
                    <Instagram className="" />
                  </div>
                </Link>

              </div>

              <div>
                <p>
                  © 2024, Modern interiors. Made with passion by
                  <Link className="text-primary" href="/"> Kostya Volkov</Link>.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>


    </footer>
  );
}
