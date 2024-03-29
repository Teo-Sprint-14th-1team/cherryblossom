import React, { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';

import { copyLink } from '@/pages/api/share';

import Image from 'next/image';

import ToastMessage from '@/src/components/ToastMessage';
import Script from 'next/script';
import SelectionModal from './SelectionModal';

import { MESSAGE } from '../constants/message';

type propsType = {
  type: 'complete' | 'receive';
  imageName: string;
  image: ReactElement;
};

export default function CompleteLayout({ type, imageName, image }: propsType) {
  const [popToastMsg, setPopToastMsg] = useState(false);
  const [toastType, setToastType] = useState<'copy' | 'save'>('copy');
  const [checkClickedBtn, setCheckClickedBtn] = useState({ copy: false, save: false });
  const [isModal, setIsModal] = useState(false);
  const router = useRouter();

  const { img: completePageQuery } = router.query;

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

  const kakaoInit = () => {
    if (!window.Kakao.isInitialized(process.env.NEXT_PUBLIC_KAKAO_KEY)) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
    }
  };

  const shareKakao = () => {
    window.Kakao.Share.sendCustom({
      templateId: 91057,
      templateArgs: {
        completePageQuery: `${completePageQuery}`,
      },
    });
  };

  const handleQuestionClick = () => {
    setPopToastMsg(true);
    setToastType('save');
  };
  const handleClickAgreeButton = () => {
    window.open('http://bit.ly/3JnAOza');
    setIsModal(false);
  };

  return (
    <div className="h-full w-full">
      <div
        className={`${innerHeight > 700 ? 'pt-[35%]' : 'pt-[44px]'} flex flex-col justify-center`}
      >
        <Script
          strategy="afterInteractive"
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js "
          onLoad={kakaoInit}
        />

        <section id="card" className="relative flex justify-center">
          <ToastMessage
            popToastMsg={popToastMsg}
            setPopToastMsg={setPopToastMsg}
            image={'/mail_icon.svg'}
            message={toastType === 'copy' ? MESSAGE.copy : MESSAGE.save}
          />
          {isModal && (
            <SelectionModal
              message="서비스에 대한 의견을 보내시겠습니까?"
              setIsModal={setIsModal}
              handleClickAgreeButton={handleClickAgreeButton}
            />
          )}
          <div
            onClick={handleQuestionClick}
            className="absolute top-[30px] flex w-full max-w-[320px] cursor-pointer justify-end"
          >
            <Image src={'/question_mark.svg'} alt="question_mark" width={28} height={28} />
          </div>

          <div className="absolute top-[44px] z-30 flex h-[40px] w-[240px] items-center justify-center rounded-[10px] border-[3px] border-solid border-[#FFC9D4] bg-[#FEEFF4] shadow-blossom-pink drop-shadow-pageTitle">
            벚꽃 초대장
          </div>
          <div className="relative z-20 mt-[66px] flex h-[300px] w-[320px] items-center justify-center overflow-hidden rounded-[8px] bg-white shadow-md">
            <div className="relative h-full w-full">{image}</div>
          </div>
        </section>

        {type === 'complete' ? (
          <section id="middleBtn" className="mt-4 flex w-full flex-col items-center justify-center">
            <div className="flex w-full max-w-[320px] justify-between">
              <button
                onClick={handleClickShareBtn}
                className={`${
                  !checkClickedBtn.copy ? 'bg-btn-yellow' : 'bg-[#AFE6AD]'
                } h-[50px] w-full grow-0 cursor-pointer rounded-[10px] border border-solid border-white text-[20px]`}
              >
                <p>링크 복사하기</p>
              </button>
              <button
                onClick={handleClickRewriteBtn}
                className={`ml-[15px] h-[50px] w-full grow-0 cursor-pointer rounded-[10px] border border-solid border-white bg-btn-yellow text-[20px]`}
              >
                <p>다시 작성하기</p>
              </button>
            </div>
            <div className="flex w-full max-w-[320px] justify-end pt-5">
              <div
                className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-lg border border-solid border-[#D9D9D9] bg-[#F6F6F6]"
                onClick={() => setIsModal(true)}
              >
                <Image src="/feedback_icon.svg" width={18} height={12} alt="feedback_btn" />
              </div>
            </div>
          </section>
        ) : (
          <section id="middleBtn" className="mt-4 flex w-full justify-center">
            <button
              onClick={handleClickRewriteBtn}
              className="h-[50px] w-full max-w-[320px] grow-0 cursor-pointer rounded-[10px] border border-solid border-white bg-btn-yellow"
            >
              <p>나도 초대장 만들어보기</p>
            </button>
          </section>
        )}
      </div>
      {type === 'complete' && (
        <section
          id="footerBtn"
          className={`${
            innerHeight > 700 ? 'relative mt-10 block' : 'absolute bottom-0'
          } flex w-full justify-center `}
        >
          <button
            onClick={shareKakao}
            id="kakaotalk-sharing-btn"
            className={`fixed bottom-0 z-10 h-[48px]  w-full cursor-pointer bg-[#FDE300] font-pretendard text-[18px] font-semibold text-[#131210] web:w-[360px]`}
          >
            카카오톡 공유하기
          </button>
        </section>
      )}
    </div>
  );
}
