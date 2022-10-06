import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import Badge from '../../common/Badge/Badge';
import Field from '../../common/Field/Field';
import Button from '../../common/Button/Button';
import type { Color } from 'App';

import CloseIcon from 'icon:../../assets/img/close.svg'

import * as styles from "./AddFolderPopup.module.css";

interface AddFolderPopupProps {

}

const AddFolderPopup: React.FC<AddFolderPopupProps> = () => {
  const [colors, setColors] = useState<Color[]>([])
  const [activeColorId, setActiveColorId] = useState<Color['id']>(colors[0]?.id)

  useEffect(() => {
    fetch('http://localhost:3001/colors').then(res => res.json()).then(data => {      
      setColors(data)
    })
  }, [])

  return (
    <div className={styles.popup}>
      <CloseIcon className={styles.close}/>
      <Field type="text" placeholder='Название папки' />
      <div className={styles.colorsWrapper}>
        {
          colors.length > 0 && colors.map(color => <Badge key={color.id} 
            color={color.name} 
            className={classNames({[styles.active]: activeColorId === color.id} )} 
            onClick={() => setActiveColorId(color.id)} />)
        }
      </div>
      <Button>Добавить</Button>
    </div>
  )
}

export default AddFolderPopup