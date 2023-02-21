import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import { Badge } from 'common/Badge'
import { Field } from 'common/Field'
import { Button } from 'common/Button'
import { useToast } from 'common/Toaster'
import { useStore } from '../../store/store.context'
import { createNewFolder } from '../../services/folderService'
import { requestColorList } from '../../services/colorService'
import { Loader } from 'common/Loader/Loader'
import { useMethods } from 'hooks/useMethods'

import CloseIcon from 'icon:../../assets/img/close.svg'

import * as styles from './AddFolderPopup.module.css'

interface AddFolderPopupProps {
  onClose: () => void
}

interface Form {
  nameFolder: string
  selectedColorId: Color['id']
  isLoading: boolean
}

export const AddFolderPopup: React.FC<AddFolderPopupProps> = ({ onClose }) => {
  const [colors, setColors] = useState<Color[]>([])

  const {
    actions: { onAddFolder, onSelectFolder },
  } = useStore()

  const toaster = useToast()

  const [
    { nameFolder, isLoading, selectedColorId },
    { setNameFolder, setIsLoading, setSelectedColorId },
  ] = useMethods(
    () => ({
      setNameFolder: (state, payload: string) => {
        return { ...state, nameFolder: payload }
      },
      setIsLoading: (state, payload: boolean) => {
        return { ...state, isLoading: payload }
      },
      setSelectedColorId: (state, payload: Color['id']) => {
        return { ...state, selectedColorId: payload }
      },
    }),
    {
      nameFolder: '',
      selectedColorId: 1,
      isLoading: true,
    } as Form,
  )

  useEffect(() => {
    setIsLoading(true)

    requestColorList()
      .then(data => {
        setColors(data)
      })
      .catch(() => {
        toaster({
          type: 'danger',
          message: 'Ошибка загрузки цветов',
        })
      })
      .finally(() => setIsLoading(false))
  }, [])

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFolder(e.target.value)
  }

  const onClickColorId = (id: number) => {
    setSelectedColorId(id)
  }

  const addFolder = () => {
    if (!nameFolder && !selectedColorId) return

    createNewFolder({
      name: nameFolder,
      colorId: selectedColorId,
    })
      .then(data => {
        const color = colors.filter(v => v.id === data.colorId)[0]

        onAddFolder({ ...data, color })

        onSelectFolder(data.id)

        onClose()

        toaster({
          message: 'Папка успешно создана папки',
        })
      })
      .catch(() => {
        toaster({
          type: 'danger',
          message: 'Ошибка создания папки',
        })
      })
  }

  return (
    <div className={styles.popup}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CloseIcon className={styles.close} onClick={() => onClose()} />
          <Field
            type={'text'}
            placeholder={'Название папки'}
            onChange={onChangeField}
            value={nameFolder}
          />
          <div className={styles.colorsWrapper}>
            {colors.length > 0 &&
              colors.map(color => (
                <Badge
                  key={color.id}
                  color={color.name}
                  className={classNames({
                    [styles.active]: selectedColorId === color.id,
                  })}
                  onClick={() => onClickColorId(color.id)}
                />
              ))}
          </div>
          <Button onClick={() => addFolder()}>Добавить</Button>
        </>
      )}
    </div>
  )
}
