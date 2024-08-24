import { useCallback, useRef, useState } from 'react'

import * as S from './styles'
// import { TbHandClick } from 'react-icons/tb'
// import { FaInstagram, FaLinkedin, FaLock } from 'react-icons/fa'
// import { TiHome } from 'react-icons/ti'
import { LucideLock, LucideHome } from 'lucide-react';

import html2canvas from 'html2canvas'

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadChangeParam } from 'antd/es/upload'


import { Controller, useForm } from 'react-hook-form'

import {
  // Button, 
  Input
} from 'antd'

// import * as domtoimage from 'dom-to-image-more';

function getCardData() {
  const cardData = {
    editor: {
      image: "/SouTrilheiro.png",
      size: {
        width: 250,
        height: 250,
      },
      position: {
        top: 0,
        left: 0,
        right: 145,
        bottom: 320,
      },
      border: {
        isCircle: 1,
        topLeft: 0,
        topRight: 0,
        bottomRight: 0,
        bottomLeft: 0,
        color: "rgb(243, 120, 32)",
        size: "7px"
      }
    }
  }
  return { cardData }
}

import useScreenSize from '@/hooks/use';
import CARD from './Card';
import { CardContainerMock, CardContainerPrint } from '@/views/Editor/styles';

interface IParticipanteDashboard { }

const ParticipanteDashboard = ({ }: IParticipanteDashboard) => {
  const { cardData } = getCardData()

  const configImg = useScreenSize()

  const { control, watch } = useForm({
    defaultValues: {
      name: ""
    }
  })

  const [tempClientImage, setTempClientImage] = useState<string>('')
  const [clientImageUploaded, setTempClientImageUploaded] = useState<RcFile>()

  const ParticipanteDashboardPostRef = useRef<HTMLDivElement>(null)

  const handleChangeClientImage: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status !== 'uploading' && !!info.file.originFileObj) {
      const file = info.file.originFileObj as RcFile

      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = () => {
        const dataURL = reader.result
        setTempClientImage(dataURL as string)
        setTempClientImageUploaded(file)
      }
    }
  }

  const handleExportImage = useCallback(async () => {
    if (ParticipanteDashboardPostRef.current && cardData?.editor.image) {
      try {
        const response = await fetch(cardData.editor.image, { mode: 'cors' })
        const blob = await response.blob()
        const localUrl = URL.createObjectURL(blob)

        // Aguardar o carregamento completo da imagem
        await new Promise<void>((resolve) => {
          const imgElement = ParticipanteDashboardPostRef.current!.querySelector('img')
          if (imgElement!.complete) {
            resolve()
          } else {
            imgElement!.onload = () => resolve()
          }
        })

        // Continuar com html2canvas depois que a imagem estiver carregada
        const canvas = await html2canvas(ParticipanteDashboardPostRef.current!, {
          useCORS: true,
          // letterRendering: true,
        })
        if (canvas.toBlob) {
          canvas.toBlob((blob) => {
            if (!blob) return
            const link = document.createElement('a')
            link.download = 'EuVouHackathonTrihas.png'
            link.href = URL.createObjectURL(blob)
            link.click()

            URL.revokeObjectURL(localUrl)
          }, 'image/png')
        } else {
          const dataUrl = canvas.toDataURL('image/png')
          const link = document.createElement('a')
          link.download = 'EuVouHackathonTrihas.png'
          link.href = dataUrl
          link.click()

          URL.revokeObjectURL(localUrl)
        }
      } catch (err) {
        console.error('Falha ao baixar e exportar imagem:', err)
      }
    }
  }, [ParticipanteDashboardPostRef, cardData])

  const nome_informado = watch("name")
  const lock_download = !tempClientImage || !nome_informado

  // const escalonar = (value: number) => {
  //   const escala = configImg.width / 540
  //   return value * escala
  // }

  // const ES = escalonar

  const scale = configImg.width <= 540 ? (configImg.width || 540) / 540 : 1
  return (
    <S.ParticipanteDashboard>
      <S.ParticipanteDashboardHeader>
        <S.ParticipanteDashboardHeaderWrapper>
          <div className='h-logo'>
            <a
              href="https://www.inova.ma.gov.br/educacao"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="logo-eixo-edu-braco.png"
                height="60px"
                alt="INOVA MARANHÂO - EIXO EDUCAÇÂO"
                title="Logo INOVA MARANHÂO"
              />
            </a>
          </div>
          <ul>
            <li>
              <a
                href="/#CARD-PARTICIPANTE"
              >
                Card Participante
              </a>
            </li>
            <li>
              <a
                href="https://www.inova.ma.gov.br/trilhas"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sobre o Trilhas
              </a>
            </li>
            <li>
              <a
                href="https://www.inova.ma.gov.br/educacao"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sobre o Eixo Educação
              </a>
            </li>
            {/* <li>
              <a
                href="https://secti.ma.gov.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                SECTI
              </a>
            </li> */}
            <li>
              <a
                href="https://www.instagram.com/inovamaranhao/p/C-3WB0rpnhz/?img_index=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sobre o Evento
              </a>
            </li>
          </ul>
          <span>
            <a
              href="https://www.instagram.com/inovamaranhao/p/C-3WB0rpnhz/?img_index=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LucideHome />
            </a>
          </span>
        </S.ParticipanteDashboardHeaderWrapper>
      </S.ParticipanteDashboardHeader>
      <S.ParticipanteDashboardWrapper>
        <S.ParticipanteDashboardHeadline>
          Crie um post <b>#EuVou</b> exclusivo do Hackathon,
          personalizado com a sua imagem.
        </S.ParticipanteDashboardHeadline>
        {/* <i id='CARD-PARTICIPANTE' style={{ display: "none" }} /> */}
        <CardContainerMock id="CARD-PARTICIPANTE" escala={scale}>
          <CARD
            id="mock"
            cardData={cardData}
            nome_informado={nome_informado}
            control={control}
            handleChangeClientImage={handleChangeClientImage}
            tempClientImage={tempClientImage}
          />
        </CardContainerMock>
        <CardContainerPrint id="edt1">
          <CARD
            id="print"
            ParticipanteDashboardPostRef={ParticipanteDashboardPostRef}
            cardData={cardData}
            nome_informado={nome_informado}
            tempClientImage={tempClientImage}
          />
        </CardContainerPrint>
        <S.ParticipanteDashboardLabel>

          Clique no botão acima e escolha a sua melhor foto;
          <br />
          <br />
          Confirme seu nome
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => <Input {...field} placeholder="MEU NOME" />}
          />
          <br />
          <br />
          {/* Escolha abaixo o formato de exportação da publicação. */}
          Clique no botão abaixo para fazer o download da publicação.
        </S.ParticipanteDashboardLabel>

        <S.ParticipanteDashboardExport lock={lock_download}>
          {/* <button onClick={handleExportImage} disabled={lock_download}>
            Compartilhar no <FaInstagram />
            {!tempClientImage && (
              <S.ExportButtonLock>
                <LucideLock />
              </S.ExportButtonLock>
            )}
          </button>
           */}
          {/* <button onClick={handleExportImage} disabled={lock_download}>
            Compartilhar no <FaLinkedin />
            {!tempClientImage && (
              <S.ExportButtonLock>
                <LucideLock />
              </S.ExportButtonLock>
            )}
          </button> */}
          <button onClick={handleExportImage} disabled={lock_download}>
            {!tempClientImage && (
              <S.ExportButtonLock>
                <LucideLock />
              </S.ExportButtonLock>
            )}
            Baixar Imagem
          </button>
        </S.ParticipanteDashboardExport>
      </S.ParticipanteDashboardWrapper>
      <footer>
        <div className="logos">
          <img src="./logo-eixo-edu-braco.png" />
          <img src="./inovaMA.webp" />
          <img src="./LOGO-SITE-SECTI_branca.png" />
        </div>
        <p>Desenvolvido por  <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/djedu28"
        >Luis Eduardo (@DjEdu28)</a></p>
      </footer>
    </S.ParticipanteDashboard>
  )
}

export default ParticipanteDashboard
