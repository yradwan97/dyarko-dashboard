import { t } from "i18next";

export interface Governorate {
    name: string
    value: string
}

export enum Governorates {
    AL_AHMADI = "al_ahmadi",
    AL_ASIMAH = "al_asimah",
    AL_FARWANIYAH = "al_farwaniyah",
    HAWALLI = "hawalli",
    AL_JAHRA = "al_jahra",
    MUBARAK_AL_KABEER = "mubarak_al_kabeer",
    KUWAIT_CITY = "kuwait_city",
}

export interface Region {
    name: string;
    value: string;
}

export enum Regions {
    ABDALLAH_AS_SALIM = "abdallah_as_salim",
    ABDALLAH_MUBARAK_AL_SABAH = "abdallah_mubarak_al_sabah",
    ABU_HULAYFAH = "abu_hulayfah",
    AD_DAWHAH = "ad_dawhah",
    AL_ADAN = "al_adan",
    AL_AHMADI = "al_ahmadi",
    AL_ANDALUS = "al_andalus",
    AL_ARDHIYAH = "al_ardhiyah",
    AL_FARDAWS = "al_fardaws",
    AL_FARWANIYAH = "al_farwaniyah",
    AL_FAYHA = "al_fayha",
    AL_FINTAS = "al_fintas",
    AL_FUHAYHIL = "al_fuhayhil",
    AL_JABIRIYAH = "al_jabiriyah",
    AL_JABRIYA = "al_jabriya",
    AL_JAHRA = "al_jahra",
    AL_KUWAYT = "al_kuwayt",
    AL_MAHBULAH = "al_mahbulah",
    AL_MANQAF = "al_manqaf",
    AL_QADISIYAH = "al_qadisiyah",
    AL_QASR = "al_qasr",
    AL_QOSUR = "al_qosur",
    AL_QURAYN = "al_qurayn",
    AL_SALMIYA = "al_salmiya",
    AL_SHUWAIKH = "al_shuwaikh",
    AL_UDAYLIYAH = "al_udayliyah",
    AL_UYAWN = "al_uyawn",
    AL_WAHAH = "al_wahah",
    AL_YARMUK = "al_yarmuk",
    ALI_SUBAH_AL_SALIM = "ali_subah_al_salim",
    AN_NASIM = "an_nasim",
    AR_RABIYAH = "ar_rabiyah",
    AR_RAQAY = "ar_raqay",
    AR_RIQQAH = "ar_riqqah",
    AR_RUMAYTIYAH = "ar_rumaytiyah",
    AS_SABAHAIYAH = "as_sabahaiyah",
    AS_SULAYBIKHAT = "as_sulaybikhat",
    AS_SULAYBIYAH = "as_sulaybiyah",
    AS_SURRAH = "as_surrah",
    AZ_ZAHAR = "az_zahar",
    BANAYD_AL_QAR = "banayd_al_qar",
    BAYAN = "bayan",
    HADIYAH = "hadiyah",
    HAWALLI = "hawalli",
    KAYFAN = "kayfan",
    KHITAN = "khitan",
    KUWAIT_CITY = "kuwait_city",
    MUBARAK_AL_KABIR = "mubarak_al_kabir",
    MUSHRIF = "mushrif",
    QALIB_ASH_SHUYUKH = "qalib_ash_shuyukh",
    QARTABAH = "qartabah",
    SABAH_AN_NASR = "sabah_an_nasr",
    SABAH_AS_SALIM = "sabah_as_salim",
    SALWA = "salwa",
    TAYMA = "tayma"
}
export const regionsList: { id: Regions; info: Region }[] = [
    { id: Regions.ABDALLAH_AS_SALIM, info: { value: Regions.ABDALLAH_AS_SALIM, name: "Abdallah as-Salim" } },
    { id: Regions.ABDALLAH_MUBARAK_AL_SABAH, info: { value: Regions.ABDALLAH_MUBARAK_AL_SABAH, name: "Abdallah Mubarak al-Sabah" } },
    { id: Regions.ABU_HULAYFAH, info: { value: Regions.ABU_HULAYFAH, name: "Abu Hulayfah" } },
    { id: Regions.AD_DAWHAH, info: { value: Regions.AD_DAWHAH, name: "Ad-Dawhah" } },
    { id: Regions.AL_ADAN, info: { value: Regions.AL_ADAN, name: "Al-Adan" } },
    { id: Regions.AL_AHMADI, info: { value: Regions.AL_AHMADI, name: "Al-Ahmadi" } },
    { id: Regions.AL_ANDALUS, info: { value: Regions.AL_ANDALUS, name: "Al-Andalus" } },
    { id: Regions.AL_ARDHIYAH, info: { value: Regions.AL_ARDHIYAH, name: "Al-Ardhiyah" } },
    { id: Regions.AL_FARDAWS, info: { value: Regions.AL_FARDAWS, name: "Al-Fardaws" } },
    { id: Regions.AL_FARWANIYAH, info: { value: Regions.AL_FARWANIYAH, name: "Al-Farwaniyah" } },
    { id: Regions.AL_FAYHA, info: { value: Regions.AL_FAYHA, name: "Al-Fayha" } },
    { id: Regions.AL_FINTAS, info: { value: Regions.AL_FINTAS, name: "Al-Fintas" } },
    { id: Regions.AL_FUHAYHIL, info: { value: Regions.AL_FUHAYHIL, name: "Al-Fuhayhil" } },
    { id: Regions.AL_JABIRIYAH, info: { value: Regions.AL_JABIRIYAH, name: "Al-Jabiriyah" } },
    { id: Regions.AL_JABRIYA, info: { value: Regions.AL_JABRIYA, name: "Al-Jabriya" } },
    { id: Regions.AL_JAHRA, info: { value: Regions.AL_JAHRA, name: "Al-Jahra" } },
    { id: Regions.AL_KUWAYT, info: { value: Regions.AL_KUWAYT, name: "Al-Kuwayt" } },
    { id: Regions.AL_MAHBULAH, info: { value: Regions.AL_MAHBULAH, name: "Al-Mahbulah" } },
    { id: Regions.AL_MANQAF, info: { value: Regions.AL_MANQAF, name: "Al-Manqaf" } },
    { id: Regions.AL_QADISIYAH, info: { value: Regions.AL_QADISIYAH, name: "Al-Qadisiyah" } },
    { id: Regions.AL_QASR, info: { value: Regions.AL_QASR, name: "Al-Qasr" } },
    { id: Regions.AL_QOSUR, info: { value: Regions.AL_QOSUR, name: "Al-Qosur" } },
    { id: Regions.AL_QURAYN, info: { value: Regions.AL_QURAYN, name: "Al-Qurayn" } },
    { id: Regions.AL_SALMIYA, info: { value: Regions.AL_SALMIYA, name: "Al-Salmiya" } },
    { id: Regions.AL_SHUWAIKH, info: { value: Regions.AL_SHUWAIKH, name: "Al-Shuwaikh" } },
    { id: Regions.AL_UDAYLIYAH, info: { value: Regions.AL_UDAYLIYAH, name: "Al-Udayliyah" } },
    { id: Regions.AL_UYAWN, info: { value: Regions.AL_UYAWN, name: "Al-Uyawn" } },
    { id: Regions.AL_WAHAH, info: { value: Regions.AL_WAHAH, name: "Al-Wahah" } },
    { id: Regions.AL_YARMUK, info: { value: Regions.AL_YARMUK, name: "Al-Yarmuk" } },
    { id: Regions.ALI_SUBAH_AL_SALIM, info: { value: Regions.ALI_SUBAH_AL_SALIM, name: "Ali Subah al-Salim" } },
    { id: Regions.AN_NASIM, info: { value: Regions.AN_NASIM, name: "An-Nasim" } },
    { id: Regions.AR_RABIYAH, info: { value: Regions.AR_RABIYAH, name: "Ar-Rabiyah" } },
    { id: Regions.AR_RAQAY, info: { value: Regions.AR_RAQAY, name: "Ar-Raq'ay" } },
    { id: Regions.AR_RIQQAH, info: { value: Regions.AR_RIQQAH, name: "Ar-Riqqah" } },
    { id: Regions.AR_RUMAYTIYAH, info: { value: Regions.AR_RUMAYTIYAH, name: "Ar-Rumaytiyah" } },
    { id: Regions.AS_SABAHAIYAH, info: { value: Regions.AS_SABAHAIYAH, name: "As-Sabahaiyah" } },
    { id: Regions.AS_SULAYBIKHAT, info: { value: Regions.AS_SULAYBIKHAT, name: "As-Sulaybikhat" } },
    { id: Regions.AS_SULAYBIYAH, info: { value: Regions.AS_SULAYBIYAH, name: "As-Sulaybiyah" } },
    { id: Regions.AS_SURRAH, info: { value: Regions.AS_SURRAH, name: "As-Surrah" } },
    { id: Regions.AZ_ZAHAR, info: { value: Regions.AZ_ZAHAR, name: "Az-Zahar" } },
    { id: Regions.BANAYD_AL_QAR, info: { value: Regions.BANAYD_AL_QAR, name: "Banayd al-Qar" } },
    { id: Regions.BAYAN, info: { value: Regions.BAYAN, name: "Bayan" } },
    { id: Regions.HADIYAH, info: { value: Regions.HADIYAH, name: "Hadiyah" } },
    { id: Regions.HAWALLI, info: { value: Regions.HAWALLI, name: "Hawalli" } },
    { id: Regions.KAYFAN, info: { value: Regions.KAYFAN, name: "Kayfan" } },
    { id: Regions.KHITAN, info: { value: Regions.KHITAN, name: "Khitan" } },
    { id: Regions.KUWAIT_CITY, info: { value: Regions.KUWAIT_CITY, name: "Kuwait City" } },
    { id: Regions.MUBARAK_AL_KABIR, info: { value: Regions.MUBARAK_AL_KABIR, name: "Mubarak al-Kabir" } },
    { id: Regions.MUSHRIF, info: { value: Regions.MUSHRIF, name: "Mushrif" } },
    { id: Regions.QALIB_ASH_SHUYUKH, info: { value: Regions.QALIB_ASH_SHUYUKH, name: "Qalib ash-Shuyukh" } },
    { id: Regions.QARTABAH, info: { value: Regions.QARTABAH, name: "Qartabah" } },
    { id: Regions.SABAH_AN_NASR, info: { value: Regions.SABAH_AN_NASR, name: "Sabah an-Nasr" } },
    { id: Regions.SABAH_AS_SALIM, info: { value: Regions.SABAH_AS_SALIM, name: "Sabah as-Salim" } },
    { id: Regions.SALWA, info: { value: Regions.SALWA, name: "Salwa" } },
    { id: Regions.TAYMA, info: { value: Regions.TAYMA, name: "Tayma" } }
];


  

export const governerates: { id: Governorates; info: Governorate }[] = [
    { id: Governorates.AL_AHMADI, info: { value: Governorates.AL_AHMADI, name: "Al Ahmadi" } },
    { id: Governorates.AL_ASIMAH, info: { value: Governorates.AL_ASIMAH, name: "Al-Asimah" } },
    { id: Governorates.AL_FARWANIYAH, info: { value: Governorates.AL_FARWANIYAH, name: "Farwaniya" } },
    { id: Governorates.HAWALLI, info: { value: Governorates.HAWALLI, name: "Hawalli" } },
    { id: Governorates.AL_JAHRA, info: { value: Governorates.AL_JAHRA, name: "Jahra" } },
    { id: Governorates.MUBARAK_AL_KABEER, info: { value: Governorates.MUBARAK_AL_KABEER, name: "Mubarak Al-Kabeer" } },
    { id: Governorates.KUWAIT_CITY, info: { value: Governorates.KUWAIT_CITY, name: "Kuwait City" } },
];