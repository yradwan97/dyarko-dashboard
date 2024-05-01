import React from 'react'
import { format } from "date-fns"
import { Tent } from '../types'
import { t } from 'i18next'

const SingleTent = ({ tent } : {tent : Tent}) => {
    return (
        <ul className='space-y-2 list-disc sm:space-y-5'>
            <li className='ml-4'>
                {t("pages.properties.create.tent.code")}: <span className='ml-1 lg:ml-3'>{tent?.code}</span>
            </li>
            <li className='ml-4'>
                {t("pages.properties.create.tent.date")}: <span className='ml-1 lg:ml-3'>{format(new Date(tent?.available_date), "dd/MM/yyyy")}</span>
            </li>
            <li className='ml-4'>
                {t("pages.properties.create.tent.price")}: <span className='ml-1 lg:ml-3 text-main-yellow-500'>{t("general.dinar")} {tent?.price}</span>
            </li>
            <li className='ml-4'>
                {t("pages.properties.create.tent.insurance")}: <span className='ml-1 lg:ml-3 text-main-yellow-500'>{t("general.dinar")} {tent?.insurance}</span>
            </li>
            <li className='ml-4'>
                {t("pages.properties.create.tent.capacity")}: <span className='ml-1 lg:ml-3'>{tent?.capacity}</span>
            </li>

        </ul>
    )
}

export default SingleTent