import { Disclosure } from '@headlessui/react'
import React, { useState } from 'react'
import { Typography, Button } from 'components/shared/UI'
import { BiChevronUp } from 'react-icons/bi'
import { BsWhatsapp } from 'react-icons/bs'
import { FaEnvelope } from 'react-icons/fa'
import { useGetFaq, useGetInfo } from './helpApi'
import { t } from 'i18next'
import { ButtonVariant } from 'components/shared/UI/buttons'
import Paginator from 'components/shared/pagination/Paginator'


function Help() {
    const [page, setPage] = useState(0)
    const { data, isSuccess } = useGetFaq(page + 1)
    const { data: infoData, isSuccess: isInfoSuccess } = useGetInfo()
    
    const sendEmail = () => {
        const subject = 'Hello';
        const body = 'How are you?';

        const mailtoUrl = `mailto:${infoData?.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoUrl, "_blank")
    };

    const createChat = async () => {
        try {
            const link = `https://wa.me/${parseInt(infoData?.whatsapp)}`
            window.open(link, "_blank")
        } catch (error) {
            console.error('Error creating chat:', error);
            // Handle error
        }
    }
    return (
        <div>
            {data?.data.length > 0 && data?.data.map((faq, index) => (
                <div key={index} className='bg-main-100 p-8 rounded-lg mb-6'>
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex justify-between items-start w-full text-left">
                                    <Typography variant='h4' as='h4' className="text-black capitalize">{faq.title}</Typography>
                                    <BiChevronUp
                                        className={`${open ? 'rotate-180 transform' : ''
                                            } text-xl text-black`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="text-lg font-medium text-gray-500 mt-6">
                                    {faq.description}
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>
            ))}
            {isInfoSuccess && infoData?.email !== null && <Button onClick={sendEmail} variant={ButtonVariant.PRIMARY} className="hover:!bg-white group md:w-6/12 rounded-2xl flex items-center gap-x-4 px-4 !py-4 mt-28">
                <FaEnvelope className='text-xl text-white group-hover:text-main-600' />
                <Typography variant='body-lg-medium' as='span' className="text-white group-hover:text-main-600">{t("account.email")}</Typography>
            </Button>}

            {isInfoSuccess && infoData?.whatsapp !== null && <Button onClick={createChat} variant={ButtonVariant.PRIMARY} className="md:w-6/12 rounded-2xl group flex items-center gap-x-4 !py-4 mt-6">
                <BsWhatsapp className='text-2xl text-white group-hover:text-main-600' />
                <Typography variant='body-lg-medium' as='span' className="text-white group-hover:text-main-600">{t("pages.help.send-message")}</Typography>
            </Button>}

            <Paginator
                page={page}
                onChange={(e) => setPage(e)}
                lastPage={data?.pages || 1}
            />
        </div>
    )
}

export default Help
