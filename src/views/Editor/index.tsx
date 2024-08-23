import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import * as S from './styles'
import { FaPenToSquare } from 'react-icons/fa6'

import { View } from '@/components'
import ImgCrop from 'antd-img-crop'
import { Button, Checkbox, Input, Upload } from 'antd'
import { 
  PlusOutlined, 
  // InfoCircleOutlined 
} from '@ant-design/icons'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadChangeParam } from 'antd/es/upload'

import useScrollbar from '@/hooks/useScrollbar'

import { beforeUpload, onPreview } from '@/utils/functions/imageUpload'
// import { IEditorSelection } from '@/utils/styles/globals'
// import { ICardConfig } from '@/utils/styles/inputs'


const editorSettingsSchema = Yup.object().shape({
  width: Yup.number().required().min(0),
  height: Yup.number().required().min(0),
  top: Yup.number().required().min(0),
  right: Yup.number().required().min(0),
  bottom: Yup.number().required().min(0),
  left: Yup.number().required().min(0),
  isCircle: Yup.boolean().required(),
  borderTopLeft: Yup.number().required().min(0),
  borderTopRight: Yup.number().required().min(0),
  borderBottomRight: Yup.number().required().min(0),
  borderBottomLeft: Yup.number().required().min(0)
})

interface IEditor {}

const Editor = ({}: IEditor) => {
  const adminData = {}

  const [updatingEditor, setUpdatingEditor] = useState(false)

  const [tempCompanyImage, setTempCompanyImage] = useState<string>('')
  const [companyImageUploaded, setTempCompanyImageUploaded] = useState<RcFile>()
  const [companyImageModified, setCompanyImageModified] = useState(false)

  const [saveButtonEnable, setSaveButtonEnable] = useState(false)

  const editorWrapperRef = useRef(null)

  // ========================================================= START IMAGE CONTROL

  const handleChangeCompanyImage: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status !== 'uploading' && !!info.file.originFileObj) {
      const file = info.file.originFileObj as RcFile

      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = () => {
        const dataURL = reader.result
        setTempCompanyImage(dataURL as string)
        setTempCompanyImageUploaded(file)

        setCompanyImageModified(true)
      }
    }
  }

  // ========================================================= END IMAGE CONTROL

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState,
    watch
  } = useForm({
    mode: 'all',
    resolver: yupResolver(editorSettingsSchema),
    defaultValues: {
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      isCircle: false,
      borderTopLeft: 0,
      borderTopRight: 0,
      borderBottomRight: 0,
      borderBottomLeft: 0
    }
  })

  const { isValid } = formState

  const handleUpdate = async () => {
    const data = getValues()

    try {
      setUpdatingEditor(true)

      let postUrl = ''

      setCompanyImageModified(false)
      setSaveButtonEnable(false)
    } finally {
      setUpdatingEditor(false)
    }
  }

  const handleFieldChange = useCallback(() => {
    // const formData = getValues()
    
    // const editorData: ICardConfig = {};

    // const width = formData.width !== editorData?.size.width
    // const height = formData.height !== editorData?.size.height
    // const top = formData.top !== editorData?.position.top
    // const right = formData.right !== editorData?.position.right
    // const bottom = formData.bottom !== editorData?.position.bottom
    // const left = formData.left !== editorData?.position.left
    // const isCircle = formData.isCircle !== editorData?.border.isCircle
    // const borderTopLeft = formData.borderTopLeft !== editorData?.border.topLeft
    // const borderTopRight =
    //   formData.borderTopRight !== editorData?.border.topRight
    // const borderBottomRight =
    //   formData.borderBottomRight !== editorData?.border.bottomRight
    // const borderBottomLeft =
    //   formData.borderBottomLeft !== editorData?.border.bottomLeft

    // setSaveButtonEnable(
    //   width ||
    //     height ||
    //     top ||
    //     right ||
    //     bottom ||
    //     left ||
    //     isCircle ||
    //     borderTopLeft ||
    //     borderTopRight ||
    //     borderBottomRight ||
    //     borderBottomLeft
    // )
    setSaveButtonEnable(true)
  }, [])

  const watchedValues = watch([
    'width',
    'height',
    'top',
    'right',
    'bottom',
    'left',
    'isCircle',
    'borderTopLeft',
    'borderTopRight',
    'borderBottomRight',
    'borderBottomLeft'
  ])

  const formData = useMemo(() => {
    return getValues()
  }, [watchedValues])

  useEffect(() => {
    if (companyImageModified) {
      setSaveButtonEnable(companyImageModified)
    }
  }, [companyImageModified])

  const [containerHasScrollbar] = useScrollbar(editorWrapperRef)

  return (
    <View
      title="Editor"
      legend="Aqui é uma legenda para a view de editor"
      icon={<FaPenToSquare />}
    >
      <S.Editor>
        <S.EditorMenu>
          <S.EditorMenuForm
            layout="vertical"
            // @ts-ignore
            onFinish={handleSubmit(handleUpdate)}
          >
            <S.FormWrapper
              ref={editorWrapperRef}
              scroll={containerHasScrollbar ? 1 : 0}
            >
              <S.FormInputs>
                <S.FormInputsWrapper>
                  <S.FormInputsWrapperLabel>Imagem</S.FormInputsWrapperLabel>

                  <ImgCrop rotationSlider>
                    <Upload
                      name="company-image"
                      listType="picture-card"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleChangeCompanyImage}
                      onPreview={onPreview}
                      className="company_image"
                    >
                      {tempCompanyImage ? (
                        <img
                          src={tempCompanyImage}
                          alt="avatar"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8, fontSize: 13 }}>
                            Add Imagem
                          </div>
                        </div>
                      )}
                    </Upload>
                  </ImgCrop>
                </S.FormInputsWrapper>

                <S.FormInputsWrapper>
                  <S.FormInputsWrapperLabel>Formato</S.FormInputsWrapperLabel>
                  <Controller
                    name="width"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        addonBefore="Largura"
                        suffix="px"
                        defaultValue={0}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value)
                          handleFieldChange()
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="height"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        addonBefore="Altura"
                        suffix="px"
                        defaultValue={0}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value)
                          handleFieldChange()
                        }}
                      />
                    )}
                  />
                </S.FormInputsWrapper>

                <S.FormInputsWrapper>
                  <S.FormInputsWrapperLabel>
                    Posicionamento
                  </S.FormInputsWrapperLabel>
                  {/* <Controller
                    name="top"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        type="number"
                        addonBefore="Cima"
                        suffix="px"
                        defaultValue={0}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value)
                          handleFieldChange()
                        }}
                      />
                    )}
                  /> */}
                  <Controller
                    name="right"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        type="number"
                        addonBefore="Direita"
                        suffix="px"
                        defaultValue={0}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value)
                          handleFieldChange()
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="bottom"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        type="number"
                        addonBefore="Baixo"
                        suffix="px"
                        defaultValue={0}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value)
                          handleFieldChange()
                        }}
                      />
                    )}
                  />
                  {/* <Controller
                    name="left"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        type="number"
                        addonBefore="Esquerda"
                        suffix="px"
                        defaultValue={0}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value)
                          handleFieldChange()
                        }}
                      />
                    )}
                  /> */}
                </S.FormInputsWrapper>

                <S.FormInputsWrapper>
                  <S.FormInputsWrapperLabel>Bordas</S.FormInputsWrapperLabel>
                  <Controller
                    name="isCircle"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.checked)
                          handleFieldChange()
                        }}
                      >
                        Círculo
                      </Checkbox>
                    )}
                  />

                  <Controller
                    name="borderTopLeft"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        type="number"
                        addonBefore="Borda Cima-Esquerda"
                        suffix="px"
                        defaultValue={0}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value)
                          handleFieldChange()
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="borderTopRight"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        type="number"
                        addonBefore="Borda Cima-Direita"
                        suffix="px"
                        defaultValue={0}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value)
                          handleFieldChange()
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="borderBottomRight"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        type="number"
                        addonBefore="Borda Baixo-Direita"
                        suffix="px"
                        defaultValue={0}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value)
                          handleFieldChange()
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="borderBottomLeft"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        type="number"
                        addonBefore="Borda Baixo-Esquerda"
                        suffix="px"
                        defaultValue={0}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value)
                          handleFieldChange()
                        }}
                      />
                    )}
                  />
                </S.FormInputsWrapper>
              </S.FormInputs>
            </S.FormWrapper>
            <S.FormSubmit>
              <Button
                disabled={!saveButtonEnable && isValid}
                loading={updatingEditor}
                type="primary"
                onClick={() => {
                  handleUpdate()
                }}
              >
                Publicar
              </Button>
            </S.FormSubmit>
          </S.EditorMenuForm>
        </S.EditorMenu>
        <S.EditorView>
          <S.EditorViewImageWrapper>
            <img src={tempCompanyImage} alt="" />
            <S.EditorViewImageSelection
              width={formData.width}
              height={formData.height}
              top={formData.top}
              right={formData.right}
              bottom={formData.bottom}
              left={formData.left}
              iscircle={formData.isCircle ? 1 : 0}
              bordertopleft={formData.borderTopLeft}
              bordertopright={formData.borderTopRight}
              borderbottomright={formData.borderBottomRight}
              borderbottomleft={formData.borderBottomLeft}
            />
          </S.EditorViewImageWrapper>
        </S.EditorView>
      </S.Editor>
    </View>
  )
}

export default Editor
