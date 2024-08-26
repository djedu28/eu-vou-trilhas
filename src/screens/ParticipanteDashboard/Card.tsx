import * as S from './styles'
import { TbHandClick } from 'react-icons/tb'
import ImgCrop from 'antd-img-crop'
import { Upload } from 'antd'

import type { UploadProps } from 'antd/es/upload/interface'

import { Control, Controller } from 'react-hook-form'

import { beforeUpload, onPreview } from '@/utils/functions/imageUpload'
import { CardData } from '@/utils/styles/card';

export default function CARD({
    id,
    ParticipanteDashboardPostRef,
    cardData,
    nome_informado,
    control,
    handleChangeClientImage,
    tempClientImage,
}: {
    id:string;
    ParticipanteDashboardPostRef?: React.LegacyRef<HTMLDivElement>;
    cardData: CardData;
    nome_informado: string;
    control?: Control<{ name: string; }, any>;
    handleChangeClientImage?: UploadProps['onChange'];
    tempClientImage: string;
}) {


    const handleTrim = (value) => value.trim();

    return (
        <S.ParticipanteDashboardPost ref={ParticipanteDashboardPostRef} id={id}>
            {cardData && cardData.editor?.image ? (
                <>
                    <img src={cardData.editor?.image} alt="Post Image" />

                    <S.ParticipanteDashboardPostSelection
                        width={cardData.editor?.size?.width || 0}
                        height={cardData.editor?.size?.height || 0}
                        // top={cardData.editor?.position?.top || 0}
                        right={cardData.editor?.position?.right || 0}
                        bottom={cardData.editor?.position?.bottom || 0}
                        // left={cardData.editor?.position?.left || 0}
                        iscircle={cardData.editor?.border.isCircle ? 1 : 0}
                        bordertopleft={cardData.editor?.border.topLeft || 0}
                        bordertopright={cardData.editor?.border.topRight || 0}
                        borderbottomright={cardData.editor?.border.bottomRight || 0}
                        borderbottomleft={cardData.editor?.border.bottomLeft || 0}
                        bordercolor={cardData.editor?.border.color || ""}
                        bordersize={cardData.editor?.border.size || ""}
                    >
                        <ImgCrop
                            modalTitle="Editar Imagem"
                            modalOk='OK'
                            modalCancel='Cancelar'
                            aspect={
                                cardData?.editor.size.width / cardData?.editor.size.height
                            }
                            rotationSlider
                        >
                            <Upload
                                name="client-image"
                                listType="picture-card"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={handleChangeClientImage}
                                onPreview={onPreview}
                                className="client-image-upload"
                            >
                                {tempClientImage ? (
                                    <img
                                        src={tempClientImage}
                                        alt="Client Image"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                ) : (
                                    <div className="client-image-instructions">
                                        <TbHandClick />
                                        Clique e adicione sua foto
                                    </div>
                                )}
                            </Upload>
                        </ImgCrop>
                    </S.ParticipanteDashboardPostSelection>
                </>
            ) : (
                <S.ParticipanteDashboardPostLoading />
            )}

            {!control && <S.Texto bottom={214}>
                {nome_informado || "MEU NOME"}
            </S.Texto>}
            {control && <Controller
                name="name"
                control={control}
                rules={{ required: 'Este campo é obrigatório' }}
                render={({ field }) => <S.Input 
                    {...field} 
                    onBlur={() => field.onChange(handleTrim(field.value))}
                    bottom={214} 
                    placeholder="MEU NOME"
                />}
            />}
        </S.ParticipanteDashboardPost>
    )
}