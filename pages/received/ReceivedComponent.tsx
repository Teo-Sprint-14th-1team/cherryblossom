import Spinner from '@/src/components/Loading/Spinner';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const CompleteLayout = dynamic(() => import('@/src/components/CompleteLayout'), {
  loading: () => <Spinner />,
});
const InterActionCard = dynamic(() => import('@/src/components/InterActionCard'), {
  loading: () => <Spinner />,
});

export default function ReceivedComponent({
  imgUrl,
  imageName,
}: {
  imgUrl: string;
  imageName: string;
}) {
  const [isAnimationOver, setIsAnimationOver] = useState(false);
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {isAnimationOver ? (
        <CompleteLayout type="receive" imageUrl={imgUrl} imageName={imageName} />
      ) : (
        <InterActionCard
          needOpenBtn={true}
          imageUrl={imgUrl}
          setIsAnimationOver={setIsAnimationOver}
        />
      )}
    </div>
  );
}
