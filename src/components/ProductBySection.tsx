
import React, { useState } from "react";

const ProductBySection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div className="mb-10 py-3 px-5 text-xs font-medium text-[#D1D5DB] rounded-full mx-auto text-center flex items-center justify-center font-manrope overflow-visible" style={{ backgroundColor: '#0A0A0A' }}>
      <span className="mr-2">A product by</span>
      <div className="h-6 flex items-center">
        <img 
          src="/lovable-uploads/84deba27-d639-4c3d-afc3-4b9342d36ff8.png" 
          alt="CryptoBriefing Logo" 
          className="h-full"
          loading="eager"
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? 'inline-block' : 'none' }}
        />
      </div>
    </div>
  );
};

export default ProductBySection;
