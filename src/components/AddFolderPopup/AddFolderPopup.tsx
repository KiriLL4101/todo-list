import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import { Badge } from '../../common/Badge'
import { Field } from '../../common/Field'
import { Button } from '../../common/Button'
import { useToast } from '../../common/Toaster'
import useStore from '../../store/store.context'
import { createNewFolder } from '../../services/folderService'
import { requestColorList } from '../../services/colorService'

import CloseIcon from 'icon:../../assets/img/close.svg'

import * as styles from './AddFolderPopup.module.css'

interface AddFolderPopupProps {
  onClose: () => void
}

const AddFolderPopup: React.FC<AddFolderPopupProps> = ({ onClose }) => {
  const [colors, setColors] = useState<Color[]>([])
  const [selectedColorId, setSelectedColorId] = useState<Color['id']>(1)
  const [nameFolder, setNameFolder] = useState<string>('')

  const { actions } = useStore()

  const toaster = useToast()

  useEffect(() => {
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

        actions.onAddNewFolder({ ...data, color })

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
    </div>
  )
}

export default AddFolderPopup
