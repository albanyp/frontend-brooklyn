import React from 'react'

interface ImageProps {
  src: string;
  name: string;
  height: string;
  width: string;
  round: boolean
}

export const Image = (props: ImageProps) => {
  return (
    <img 
      src={props.src}
      height={props.height}
      width={props.width}
      alt={props.name}
      className={`${props && 'rounded-xl'}`} />
  )
}
