import React from 'react'

//muistuffs
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

export default function MyButton({children, onClick, btnClassName, tipClassName, tip}) {
    return (
        <Tooltip title={tip} className={tipClassName} placement="top">
            <iconButton onClick={onClick} className={btnClassName}>
                {children}
            </iconButton>
        </Tooltip>
        
    )
}
