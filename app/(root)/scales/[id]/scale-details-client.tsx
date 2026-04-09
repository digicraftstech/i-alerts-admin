'use client';

import React, { useState } from 'react';

import ScaleCardCompact from '@/components/cards/ScaleCardCompact';
import ScaleForm from '@/components/forms/ScaleForm';
import { Scale } from '@/types/global';

interface ScaleDetailsClientProps {
  scale: Scale;
}

const ScaleDetailsClient = ({ scale }: ScaleDetailsClientProps) => {
  const [isEditVisible, setIsEditVisible] = useState(false);

  return (
    <>
      <ScaleCardCompact
        scale={scale}
        onEditClick={() => setIsEditVisible(true)}
        isEditing={isEditVisible}
      />

      {isEditVisible && (
        <div id='edit-scale-section' className='mt-9'>
          <h2 className='mb-5 h2-bold text-dark100_light900'>Edit Scale</h2>
          <ScaleForm
            scale={scale}
            onActionComplete={() => setIsEditVisible(false)}
          />
        </div>
      )}
    </>
  );
};

export default ScaleDetailsClient;
