import NextLink from "next/link";

export default function CtaFooter() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 z-10">
      <div className="text-center pt-16 sm:pt-20 md:pt-32 lg:pt-40" id="cta">
        <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mx-auto leading-tight pb-4">
          Achieve Natural Results that Last
        </h2>
        <h3 className="text-white text-xl lg:text-2xl max-w-2xl mb-8 mx-auto">
          Discover the transformative power of Platelet-Rich Plasma treatments and our other treatments at Ubuntu Med
          Spa.
        </h3>
        <p className="mb-8 max-w-xl mx-auto">
          Book a consultation below and let us know what questions you have and Jenny Coleman will be back to you within
          the next 2 business days.
        </p>
        <div className="mb-32">
          <div className="flex flex-col lg:flex-row lg:justify-center xl:items-center">
            <NextLink
              href="/consult"
              className="bg-blue-500 text-white py-2 px-6 text-sm lg:text-base lg:mr-4 xl:mb-4 rounded-md"
            >
              Book a Consultation
            </NextLink>
          </div>
        </div>
      </div>
    </div>
  );
}
