import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import Badge from '../../common/Badge/Badge';
import Field from '../../common/Field/Field';
import Button from '../../common/Button/Button';
import type { Color } from 'App';

import CloseIcon from 'icon:../../assets/img/close.svg'

import * as styles from "./AddFolderPopup.module.css";

interface AddFolderPopupProps {
  onClose: () => void
  refresh: () => void
}

const AddFolderPopup: React.FC<AddFolderPopupProps> = ({ onClose, refresh }) => {
  const [colors, setColors] = useState<Color[]>([])
  const [selectedColorId, setSelectedColorId] = useState<Color['id']>(colors[0]?.id)
  const [nameColor, setNameColor] = useState<string>('')

  useEffect(() => {
    fetch('http://localhost:3001/colors').then(res => res.json()).then(data => {      
      setColors(data)
    })
  }, [])

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameColor(e.target.value)
  }

  const addFolder = () => {
    if (!nameColor || !selectedColorId) {
        alert('Введите название списка')
        return;
    }

    fetch('http://localhost:3001/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameColor,
        colorId: selectedColorId
      })
    }).then(() => {
      onClose()
      refresh()
    })
}

  return (
    <div className={styles.popup}>
      <CloseIcon className={styles.close} onClick={() => onClose()} />
      <Field type="text" placeholder='Название папки' onChange={onChangeField} value={nameColor} />
      <div className={styles.colorsWrapper}>
        {
          colors.length > 0 && colors.map(color => <Badge key={color.id} 
            color={color.name} 
            className={classNames({[styles.active]: selectedColorId === color.id} )} 
            onClick={() => setSelectedColorId(color.id)} />)
        }
      </div>
      <Button onClick={() => addFolder()}>Добавить</Button>
    </div>
  )
}

export default AddFolderPopup