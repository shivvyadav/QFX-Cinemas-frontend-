const Gallery = () => {
  return (
    <div className="min-h-screen pt-20">
      <h1 className="bg-[#e2e2e2] text-center font-heading text-3xl leading-18 font-semibold md:leading-24">
        Gallery
      </h1>
      <div className="flex flex-col gap-6 px-6 py-8 md:flex-row md:flex-wrap md:px-16 md:py-16 lg:px-24 xl:px-36">
        <div className="overflow-hidden rounded-md shadow">
          <img
            src="../premium.jpg"
            alt=""
            className="h-48 w-full md:w-76 lg:w-80"
          />
          <p className="bg-black text-center text-sm leading-8 text-white">
            premium
          </p>
        </div>
        <div className="overflow-hidden rounded-md shadow">
          <img
            src="../Itahari.jpg"
            alt=""
            className="h-48 w-full md:w-76 lg:w-80"
          />
          <p className="bg-black text-center text-sm leading-8 text-white">
            QFX Cinema (Itahari)
          </p>
        </div>
        <div className="overflow-hidden rounded-md shadow">
          <img
            src="../biratnagar.jpeg"
            alt=""
            className="h-48 w-full md:w-76 lg:w-80"
          />
          <p className="bg-black text-center text-sm leading-8 text-white">
            QFX Cinema (Biratnagar)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
