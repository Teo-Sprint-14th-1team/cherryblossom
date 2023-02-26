import CompleteLayout from '@/src/components/CompleteLayout';
import InterActionCard from '@/src/components/InterActionCard';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ToastMessage from '@/src/components/ToastMessage';
import Image from 'next/image';
import TestImage from '../../public/testImage.jpg';
import PhotoIcon from '@/public/photo_icon.svg';

export default function Received() {
  const [isAnimationOver, setIsAnimationOver] = useState(false);
  const [needOpenBtn, setNeedOpenBtn] = useState(true);
  const [imageUrl, setImageUrl] = useState<string>();

  const router = useRouter();
  const imageName = router.query.img as string;

  return (
    <div className="w-full h-full flex justify-center items-center relative">
      {isAnimationOver ? (
        <CompleteLayout type="receive" imageUrl={imageUrl} imageName={imageName} />
      ) : (
        <InterActionCard
          needOpenBtn={needOpenBtn}
          imageUrl={imageUrl}
          setIsAnimationOver={setIsAnimationOver}
        />
      )}
    </div>
  );
}
