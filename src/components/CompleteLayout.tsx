import React, { useEffect, useState } from 'react';
import { copyLink } from '@/pages/api/share';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ToastMessage from '@/src/components/ToastMessage';

type propsType = {
  type: 'complete' | 'receive';
  imageUrl: string | undefined;
  imageName: string;
};

export default function CompleteLayout({ type, imageUrl, imageName }: propsType) {
  const [popToastMsg, setPopToastMsg] = useState(false);
  const [toastType, setToastType] = useState<'copy' | 'save'>('copy');
  const [checkClickedBtn, setCheckClickedBtn] = useState({ copy: false, save: false });
  const router = useRouter();

  const handleClickShareBtn = () => {
    setToastType('copy');
    if (imageName) copyLink(imageName, setPopToastMsg, setCheckClickedBtn);
  };

  const handleClickRewriteBtn = () => {
    if (type === 'complete') {
      router.push('/creation');
    } else {
      router.push('/intro');
    }
  };

  useEffect(() => {
    try {
      if (!window.Kakao.isInitialized(process.env.NEXT_PUBLIC_KAKAO_KEY)) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const shareKakao = () => {
    window.Kakao.Share.sendCustom({
      templateId: 91057,
      templateArgs: {
        imageName: `${imageName}`,
      },
    });
  };

  return (
    <div className="h-full w-full">
      <div className="flex w-full justify-center">
        <ToastMessage
          popToastMsg={popToastMsg}
          setPopToastMsg={setPopToastMsg}
          image={toastType === 'copy' ? '/mail_icon.svg' : '/photo_icon.svg'}
          message={
            toastType === 'copy' ? '초대장 링크가 복사되었습니다.' : '초대장이 앨범에 담겼습니다.'
          }
        />
      </div>
      <div className="px-5 pt-[44px]">
        <section id="card" className="relative flex justify-center">
          <div className="absolute top-[44px] z-30 flex h-[40px] w-[240px] items-center justify-center rounded-[10px] border-[3px] border-solid border-[#FFC9D4] bg-[#FEEFF4] shadow-blossom-pink drop-shadow-pageTitle">
            벚꽃 초대장
          </div>
          <div className="relative z-20 mt-[66px] flex h-[300px] w-[320px] items-center justify-center overflow-hidden rounded-[8px] bg-white shadow-md">
            <div className="relative h-full w-full">
              {imageUrl !== undefined && <Image src={imageUrl} alt="image" fill />}
            </div>
          </div>
        </section>

        {type === 'complete' ? (
          <section id="middleBtn" className="mt-4 flex w-full justify-between">
            <button
              onClick={handleClickShareBtn}
              className={`${
                !checkClickedBtn.copy ? 'bg-btn-yellow' : 'bg-[#AFE6AD]'
              } h-[50px] w-full grow-0 cursor-pointer rounded-[10px] border border-solid border-white`}
            >
              <p>편지 보내기</p>
            </button>
            <button
              onClick={handleClickRewriteBtn}
              className={`ml-[15px] h-[50px] w-full grow-0 cursor-pointer rounded-[10px] border border-solid border-white bg-btn-yellow`}
            >
              <p>다시 작성하기</p>
            </button>
          </section>
        ) : (
          <section id="middleBtn" className="mt-4 flex w-full justify-between">
            <button
              onClick={handleClickRewriteBtn}
              className="h-[50px] w-full grow-0 cursor-pointer rounded-[10px] border border-solid border-white bg-btn-yellow"
            >
              <p>나도 초대장 만들어보기</p>
            </button>
          </section>
        )}
      </div>
      <section
        id="footerBtn"
        className={`absolute bottom-0 flex h-[48px] w-full cursor-pointer justify-center bg-[#FDE300] font-inter text-lg font-semibold leading-5 text-[#131210]`}
      >
        <button onClick={shareKakao} id="kakaotalk-sharing-btn">
          카카오톡 공유하기
        </button>
      </section>
    </div>
  );
}
