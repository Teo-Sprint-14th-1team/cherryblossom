import ToastMessage from '@/src/components/ToastMessage';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import TestImage from '../../public/testImage.jpg';

function Received() {
  const router = useRouter();
  const moveIntroPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/intro');
  };
  const [popToastMsg, setPopToastMsg] = useState(false);

  return (
    <div className="flex flex-col justify-between items-center w-full h-full">
      <div className=" mt-32 flex flex-col justify-center items-center">
        <Image src="/testImage.jpg" alt="test" width={290} height={230} />
        <button
          className="bg-btn-yellow rounded-[10px] border border-solid border-white cursor-pointe mt-4 w-80 h-12"
          onClick={moveIntroPage}
        >
          나도 초대장 만들어 보기
        </button>
      </div>
      <div className="flex items-center justify-center w-full bg-[#AFE6AD] ">
        <button className="w-full h-12 " onClick={() => setPopToastMsg(true)}>
          내 앨범에 담기
        </button>
      </div>
      <ToastMessage
        image={TestImage}
        popToastMsg={popToastMsg}
        setPopToastMsg={setPopToastMsg}
        message="초대장이 앨범에 담겼습니다."
      />
    </div>
  );
}

export default Received;