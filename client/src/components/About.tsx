function About() {
  return (
    <section className="max-container max-sm:mt-12">
      <div className="flex flex-col justify-start gap-5">
        <h2 className="text-4xl font-palanquin font-bold">
          Our <span className="text-coral-red"> Popular </span> Product
        </h2>
        <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
          Experience advanced AI-driven analytics that uncover detailed player
          and team stats from your NBA basketball videos. Track key metrics like
          player speed, distance covered, and possession percentage with
          precision and ease.
        </p>
      </div>
    </section>
  );
}

export default About;
