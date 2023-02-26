import CompleteLayout from '@/src/components/CompleteLayout';
import InterActionCard from '@/src/components/InterActionCard';
import React, { useEffect, useState } from 'react';

export default function InviTationComplete() {
  const [isAnimationOver, setIsAnimationOver] = useState(false);

  const imageName = '/성택미모티콘.png';

  useEffect(() => {
    const animation = setTimeout(() => {
      setIsAnimationOver(true);
    }, 2200);
    return () => clearTimeout(animation);
  }, [isAnimationOver]);

  return (
    <div className="w-full h-full flex justify-center items-center relative">
      {isAnimationOver ? (
        <CompleteLayout imageName={imageName} type="complete" />
      ) : (
        <InterActionCard needOpenBtn={false} imageName={imageName} />
      )}
    </div>
  );
}