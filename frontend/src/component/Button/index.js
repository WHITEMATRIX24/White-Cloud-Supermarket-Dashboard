import React from 'react'
import { Button } from 'react-bootstrap'

export const RenderButton = (
    { variant, type, title, onClick }
) => {
    return (
        <Button variant={variant} type={type} onClick={(e) => onClick(e)} className="btn-cutsom m-1">
            {title}
        </Button>
    )
}