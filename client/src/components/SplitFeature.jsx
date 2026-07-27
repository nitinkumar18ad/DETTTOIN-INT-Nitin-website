import { useState } from "react";
import SectionShell from "./SectionShell.jsx";

export default function SplitFeature({
  id,
  image,
  alt,
  category,
  heading,
  body,
  linkText,
  linkHref = "#",
  isReversed = false,
  bgColor = "bg-white"
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <SectionShell id={id} className={bgColor}>
      <div className="grid gap-8 items-center md:grid-cols-2">
        {/* Image Container */}
        <div className={`relative overflow-hidden rounded-heritage bg-sandstone-100 shadow-soft aspect-[4/3] md:aspect-[16/10] ${isReversed ? "md:order-1" : "md:order-2"}`}>
          {imgError ? (
            <div className="flex h-full w-full items-center justify-center bg-sandstone-200 px-8 text-center text-ink-700">
              {alt}
            </div>
          ) : (
            <img
              src={image}
              alt={alt}
              loading="lazy"
              className="h-full w-full object-cover bg-sandstone-200"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Text Container */}
        <div className={`flex flex-col justify-center ${isReversed ? "md:order-2" : "md:order-1"}`}>
          {category && (
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-maroon-700 mb-3">
              {category}
            </p>
          )}
          <h2 className="mb-4">{heading}</h2>
          <p className="mb-6 text-lg leading-8 text-ink-700">{body}</p>
          <div>
            <a
              href={linkHref}
              className="inline-flex items-center font-semibold text-maroon-700 hover:text-maroon-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500 rounded"
            >
              {linkText}
              <span className="ml-2" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
