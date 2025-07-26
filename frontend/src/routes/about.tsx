import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="flex flex-col items-center gap-3 py-6 leading-relaxed">
      <h1 className="text-center text-3xl font-bold">ABOUT</h1>
      <p className="max-w-prose indent-4 text-lg">
        Welcome to my imDb clone app! I know the about page isn't the most
        exciting part of a website, so I'd like to thank you for taking the time
        to read about how and why this site came to be!
      </p>
      <p className="max-w-prose indent-4 text-lg">
        The why is simple, this site serves as another stepping stone in my
        ongoing journey of learning web development. Here are some of the
        highlights:
      </p>
      <p className="max-w-prose indent-4 text-lg">
        It features a heavy emphasis on handling data from an external API
        (courtesy of tmDb) and displaying that data in various complex layouts.
      </p>
      <p className="max-w-prose indent-4 text-lg">
        This project differed greatly from my first since all data came from a
        3rd party API instead of soley user-provided information, and third
        party libraries (like shadCn and heroicons) were used to enhance the
        site aesthetically, in place of vanilla tailwind.
      </p>
      <p className="max-w-prose indent-4 text-lg">
        Under the hood, tanStack Router, tanstack Query, and axios were used in
        place of my usual mainstays react-router and the default fetch api.
      </p>
    </div>
  );
}
