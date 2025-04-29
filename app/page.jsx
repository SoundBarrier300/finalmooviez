"use client";

import { useState, useEffect } from "react";

const movies = [
  {
    title: "The Princess Bride",
    poster: "https://upload.wikimedia.org/wikipedia/en/d/db/Princess_bride.jpg",
    description: "A bedridden boy's grandfather reads him the story of a farmboy-turned-pirate who encounters numerous obstacles, enemies and allies in his quest to be reunited with his true love.",
    images: ["https://upload.wikimedia.org/wikipedia/en/d/db/Princess_bride.jpg"]
  },
  {
    title: "The NeverEnding Story",
    poster: "https://upload.wikimedia.org/wikipedia/en/9/9b/Neverendingstoryposter.jpg",
    description: "Bastian is a young boy who lives a dreary life being tormented by school bullies. On one such occasion, he escapes into a book shop where the old proprietor reveals an ancient storybook to him, which he is warned can be dangerous. Shortly after, he 'borrows' the book and begins to read it in the school attic, where he is drawn into the mythical land of Fantasia, which desperately needs a hero to save it from destruction.",
    images: ["https://upload.wikimedia.org/wikipedia/en/9/9b/Neverendingstoryposter.jpg"]
  },
  {
    title: "Labyrinth",
    poster: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Labyrinth_ver2.jpg/250px-Labyrinth_ver2.jpg",
    description: "Sarah is forced by her father and stepmother to babysit her baby stepbrother, Toby, while they are out. He does not stop crying, and she wishes that he would be taken away. Out of the blue, he stops crying, and when she looks for him in his crib, she learns that her wish was granted, and the Goblin King Jareth has taken him to his castle in the Goblin City in the middle of a labyrinth. Sarah repents and asks Jareth to give him back, but Jareth tells her that she has to rescue him before midnight.",
    images: ["https://upload.wikimedia.org/wikipedia/en/6/6f/Labyrinth_ver2.jpg"]
  },
  {
    title: "Borat",
    poster: "data:image/jpeg;base64,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",
    description: "Borat Sagdiyev struggles to make a living in Kazakhstan as a TV reporter amidst well-known beliefs that his country's economy suffers because of Jews. He is selected by his government to travel to the United States of America and submit a report on its society and culture, to which he agrees. Accordingly, he and his producer Azamat Bagatov set out to experience America firsthand. Both then attempt to learn the American culture and proper etiquette, especially when using the restroom and the elevator.",
    images: ["data:image/jpeg;base64,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"]
  },
  {
    title: "The Nightmare Before Christmas",
    poster: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/The_nightmare_before_christmas_poster.jpg/250px-The_nightmare_before_christmas_poster.jpg",
    description: "Jack Skellington, king of Halloween Town, discovers Christmas Town, but his attempts to bring Christmas to his home cause confusion.", 
    images: ["https://upload.wikimedia.org/wikipedia/en/9/9a/The_Nightmare_Before_Christmas_poster.jpg"]
  },
  {
    title: "Dazed and Confused",
    poster: "https://upload.wikimedia.org/wikipedia/en/a/af/Dazed_and_Confused_%281993%29_poster.jpg",
    description: "It's the last day of school at a high school in a small town in Texas in 1976. The upperclassmen are hazing the incoming freshmen, and everyone is trying to get stoned, drunk, or laid, even the football players that signed a pledge not to.",
    images: ["https://upload.wikimedia.org/wikipedia/en/f/f4/Dazed_and_Confused_%281993%29_theatrical_poster.jpg"]
  },
  {
    title: "Dead Poets Society",
    poster: "https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Dead_poets_society.jpg/250px-Dead_poets_society.jpg",
    description: "A new English teacher, John Keating, is introduced to an all-boys preparatory school that is known for its ancient traditions and high standards. He uses unorthodox methods to reach out to his students, who face enormous pressures from their parents and the school. With Keating's help, students Neil Perry, Todd Anderson, and others learn to break out of their shells, pursue their dreams, and seize the day.",
    images: ["https://upload.wikimedia.org/wikipedia/en/4/4f/Dead_poets_society.jpg"]
  },
  {
    title: "Donnie Darko",
    poster: "https://upload.wikimedia.org/wikipedia/en/d/db/Donnie_Darko_poster.jpg",
    description: "A troubled teenager, Donnie Darko, escapes death when a jet engine crashes in his bedroom because he follows a giant bunny leading him outside. The bunny, called Frank, tells him that the world will end in twenty-eight days. As the final date comes closer and closer, Donnie is drawn into an alarming series of events that may or may not be a product of growing insanity.",
    images: ["https://upload.wikimedia.org/wikipedia/en/d/db/Donnie_Darko_poster.jpg"]
  },
  {
    title: "MirrorMask",
    poster: "https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Mirrormask.jpg/250px-Mirrormask.jpg",
    description: "In a fantasy world of opposing kingdoms, a fifteen-year-old girl must find the fabled MirrorMask in order to save the kingdom and get home.",
    images: ["https://upload.wikimedia.org/wikipedia/en/d/d8/Mirrormask_poster.jpg"]
  },
  {
    title: "Beetlejuice",
    poster: "https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Beetlejuice_%281988_film_poster%29.png/250px-Beetlejuice_%281988_film_poster%29.png",
    description: "Recently deceased couple Barbara and Adam Maitland are harassed by the new inhabitants of their beloved home and hire a sleazy ghost named Beetlejuice to drive them out—with chaotic consequences.",
    images: ["https://i.imgur.com/GONghRT.jpeg"]
  },
  {
    title: "A Series of Unfortunate Events",
    poster: "https://upload.wikimedia.org/wikipedia/en/thumb/4/46/A_Series_of_Unfortunate_Events_season_1_poster.jpg/250px-A_Series_of_Unfortunate_Events_season_1_poster.jpg",
    description: "When a massive fire kills their parents, three children are delivered to the custody of cousin and stage actor Count Olaf, who is secretly plotting to steal their parents' vast fortune.",
    images: ["https://upload.wikimedia.org/wikipedia/en/b/b7/Lemony_Snicket_Poster.jpg"]
  },
  {
    title: "The Addams Family",
    poster: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/The_Addams_Family.jpg/220px-The_Addams_Family.jpg",
    description: "An evil doctor finds out that Uncle Fester has been missing for 25 years and introduces a fake Fester in an attempt to get the Addams family fortune.",
    images: ["https://upload.wikimedia.org/wikipedia/en/7/7c/Addams_Family.jpg"]
  }
];

export default function MoviePickerApp() {
  const [scrollX, setScrollX] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});


  useEffect(() => {
    const interval = setInterval(() => {
      setScrollX((prev) => prev + 1);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const target = new Date("2025-05-14T19:20:00-04:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance <= 0) {
        setTimeLeft({ expired: true });
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const totalWidth = movies.length * 180;
  const pickRandomMovie = () => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  setSelected(movies[randomIndex]);
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1b0e1e] to-[#210022] p-6 text-[#e6e6fa] font-['Unica_One',_sans-serif] overflow-x-hidden">


      <div className="max-w-6xl mx-auto bg-black/80 border border-[#6a1b9a] p-6 shadow-[0_0_40px_8px_rgba(255,0,255,0.25)] rounded-3xl backdrop-blur">
        <h1 className="text-4xl sm:text-6xl mb-12 font-black text-center text-[#ff66cc] tracking-widest uppercase drop-shadow-[0_0_8px_#ff66cc] flex items-center justify-center gap-4 px-2">
          <span className="text-pink-500 drop-shadow-[0_0_8px_#ff66cc]">❤</span>
          Mooviez 4 Rylee
          <span className="text-pink-500 drop-shadow-[0_0_8px_#ff66cc]">❤</span>
        </h1>

        <div className="relative overflow-x-auto sm:overflow-hidden">
          <button onClick={() => setScrollX(scrollX - 900)} className="hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#7b1fa2] text-white px-3 py-2 rounded-full shadow-lg z-10 hover:bg-[#9c27b0]">‹</button>
          <div className="overflow-hidden border-y border-[#7b1fa2] py-6 bg-gradient-to-r from-[#200020] via-black to-[#200020]">
            <div
              className="flex gap-8 px-4"
              style={{ transform: `translateX(-${scrollX % totalWidth}px)` }}
            >
              {[...movies, ...movies, ...movies].map((movie, index) => (
                <img
                  key={index}
                  src={movie.poster}
                  alt={movie.title}
                  className="h-64 shadow-[0_0_20px_rgba(255,0,255,0.4)] border border-[#9c27b0] rounded-xl cursor-pointer shrink-0 hover:scale-105 transition-transform duration-300 bg-black"
                  onClick={() => setSelected(movie)}
                  style={{ minWidth: "160px" }}
                />
              ))}
            </div>
          </div>
          <button onClick={() => setScrollX(scrollX + 900)} className="hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#7b1fa2] text-white px-3 py-2 rounded-full shadow-lg z-10 hover:bg-[#9c27b0]">›</button>
        </div>
        <div className="flex justify-center mt-6">
  <button
    onClick={pickRandomMovie}
    className="bg-[#ff66cc] hover:bg-[#ff99dd] text-white font-bold py-3 px-6 rounded-full shadow-[0_0_20px_#ff66cc] transition-all duration-300"
  >
    I CAN'T CHOOSE
  </button>
</div>

      </div>

      {selected && (
      <div className={`mt-12 p-6 rounded-2xl max-w-3xl mx-auto shadow-[0_0_20px_rgba(255,0,255,0.4)] text-[#f3d9f9] ${
  selected.title === 'The Princess Bride' ? 'bg-[#1e1430]/90 border border-[#ff66cc]' :
  selected.title === 'The NeverEnding Story' ? 'bg-[#142c30]/90 border border-[#66ccff]' :
  selected.title === 'Labyrinth' ? 'bg-[#2a0032]/90 border border-[#cc66ff]' :
  selected.title === 'Borat' ? 'bg-[#302820]/90 border border-[#f4d35e]' :
  selected.title === 'The Nightmare Before Christmas' ? 'bg-[#1f1f1f]/90 border border-[#ffffff]' :
  selected.title === 'Dazed and Confused' ? 'bg-[#2e1a47]/90 border border-[#ffcc00]' :
  selected.title === 'Dead Poets Society' ? 'bg-[#2b1e0f]/90 border border-[#ff7043]' :
  selected.title === 'Donnie Darko' ? 'bg-[#0d1b2a]/90 border border-[#66ffff]' :
  selected.title === 'MirrorMask' ? 'bg-[#1c1c1c]/90 border border-[#ff99cc]' :
  selected.title === 'Beetlejuice' ? 'bg-[#101010]/90 border border-[#39ff14]' :
  selected.title === 'A Series of Unfortunate Events' ? 'bg-[#1c1c1c]/90 border border-[#b0bec5]' :
  selected.title === 'The Addams Family' ? 'bg-[#1a1a1a]/90 border border-[#e0e0e0]' :
  ''
}`}>

          <h2 className={`text-4xl sm:text-6xl font-black text-center tracking-widest uppercase drop-shadow-[0_0_8px] px-2 mb-6`}>
            {selected.title}
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-[#f5ccff]">
            {selected.description}
          </p>
           </div>
      )}


    <div className="mt-24 p-6 max-w-xl mx-auto rounded-3xl bg-black/80 border border-[#6a1b9a] shadow-[0_0_20px_rgba(255,0,255,0.4)] text-center backdrop-blur">
      <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-widest text-[#ff66cc] drop-shadow-[0_0_8px_#ff66cc] mb-4">
        Time Until We Merge Souls
      </h2>
      <p className="text-2xl sm:text-3xl font-bold text-[#f5ccff] tracking-wide drop-shadow-[0_0_5px_#f5ccff]">
        {timeLeft.expired
          ? "Can I Please Be Your Boyfriend :3"
          : `${timeLeft.days || 0}d ${timeLeft.hours || 0}h ${timeLeft.minutes || 0}m ${timeLeft.seconds || 0}s`}
      </p>
    </div>
      {/* Static Neon Hearts - Left */}
<div className="fixed left-4 top-0 flex flex-col gap-6 z-0">
  {Array.from({ length: 19 }).map((_, i) => (
    <div
      key={`left-heart-${i}`}
      className="text-pink-500 text-5xl drop-shadow-[0_0_6px_#ff66cc]"
    >
      ❤
    </div>
  ))}
</div>

{/* Static Neon Hearts - Right */}
<div className="fixed right-4 top-0 flex flex-col gap-6 z-0">
  {Array.from({ length: 19 }).map((_, i) => (
    <div
      key={`right-heart-${i}`}
      className="text-pink-500 text-5xl drop-shadow-[0_0_6px_#ff66cc]"
    >
      ❤
    </div>
  ))}
</div>
<div className="flex justify-center gap-6 mt-10">
  <div className="relative group">
    <div className="text-pink-500 text-3xl cursor-pointer">🐈</div>
    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-[#f5ccff] text-sm px-3 py-2 rounded-xl shadow-[0_0_8px_#ff66cc]">
      You make every day better
    </div>
  </div>

  <div className="relative group">
    <div className="text-pink-500 text-3xl cursor-pointer">❤</div>
    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-[#f5ccff] text-sm px-3 py-2 rounded-xl shadow-[0_0_8px_#ff66cc]">
      We were made for each other
    </div>
  </div>

  <div className="relative group">
    <div className="text-pink-500 text-3xl cursor-pointer">🐈</div>
    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-[#f5ccff] text-sm px-3 py-2 rounded-xl shadow-[0_0_8px_#ff66cc]">
      I will always try my hardest to make you happy
    </div>
  </div>
</div>

  </div> 
);
}
