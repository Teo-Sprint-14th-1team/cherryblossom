import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Spinner from '@/src/components/Loading/Spinner';

const CompleteLayout = dynamic(() => import('@/src/components/CompleteLayout'), {
  loading: () => <Spinner />,
});
const InterActionCard = dynamic(() => import('@/src/components/InterActionCard'), {
  loading: () => <Spinner />,
});

export default function CompleteComponent({
  imgUrl,
  imageName,
}: {
  imgUrl: string;
  imageName: string;
}) {
  const [isAnimationOver, setIsAnimationOver] = useState(false);

  useEffect(() => {
    const animation = setTimeout(() => {
      setIsAnimationOver(true);
    }, 2200);
    return () => clearTimeout(animation);
  }, [isAnimationOver]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {isAnimationOver ? (
        <CompleteLayout type="complete" imageUrl={imgUrl} imageName={imageName} />
      ) : (
        <InterActionCard needOpenBtn={false} imageUrl={imgUrl} />
      )}
    </div>
  );
}
